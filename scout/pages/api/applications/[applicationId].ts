import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { addToGroup, notifyGroup } from "../../../core/utils/telegram";
import { validateIfApplicationIsReviewed } from "../../../lib/services/ApplicationValidation";

// GET, PATCH, DELETE /api/applications/id/
export default async function handle(req, res) {
  try {
    const httpMethod = req.method;
    const applicationId = parseInt(req.query.applicationId);

    if (httpMethod === "GET") {
      const application = await prisma.application.findFirst({
        where: {
          id: applicationId,
        },
        include: {
          form: true,
          applicant: true,
          answers: {
            include: {
              question: true,
            },
          },
          group: {
            include: {
              members: true,
            },
          },
        },
      });

      res.status(200).json(application);
    } else if (httpMethod === "DELETE") {
      const application = await prisma.application.delete({
        where: {
          id: applicationId,
        },
      });

      res.status(200).json(application);
    } else if (httpMethod === "PATCH") {
      // approving / rejecting applications
      const { isApproved, answers } = req.body;
      validateIfApplicationIsReviewed(applicationId).catch((err) => {
        res.statusMessage = err;
        res.status(400);
        res.end();
      });
      if (res.writableEnded) {
        return;
      }

      const application = await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          isApproved,
        },
      });

      if (answers) {
        const answersData = answers.map((answer) => ({
          applicationId: application.id,
          answerResponse: String(answer.answerString),
          questionId: answer.questionId,
        }));

        await prisma.answer.createMany({ data: answersData });
      }

      let warningMessage = "";

      if (isApproved) {
        const approvedMember = await prisma.user.findUnique({
          where: {
            id: application.userId,
          },
        });
        const currentGroup = await prisma.group.findUnique({
          where: {
            id: application.groupId,
          },
          include: {
            members: true,
          },
        });

        // add to Telegram group if there is one
        if (currentGroup.telegramLink) {
          if (!approvedMember.telegramUrl) {
            warningMessage = `They did not indicate their Telegram username on their Scout profile. Please contact them at ${approvedMember.email} to get their Telegram username to add them to this group.`;
          } else {
            try {
              await addToGroup(
                currentGroup.telegramLink,
                approvedMember.telegramUrl
              );
              notifyGroup(
                currentGroup.telegramLink,
                `Welcome to the group, ${
                  approvedMember.name ? approvedMember.name : "Anonymous"
                }!`
              );
            } catch (err) {
              if (err.errorMessage === "USER_PRIVACY_RESTRICTED") {
                warningMessage = `They have enabled privacy settings and we are unable to add them to the group. Please add @${approvedMember.telegramUrl} to this group yourself.`;
              } else if (
                err.message ===
                `No user has "${approvedMember.telegramUrl}" as username`
              ) {
                warningMessage = `The Telegram username they indicated in their profile is incorrect. Please contact them at ${approvedMember.email} to get their Telegram username to add them to this group.`;
              }
            }
          }
        }

        if (warningMessage !== "") {
          notifyGroup(
            currentGroup.telegramLink,
            `You've approved a new member ${
              approvedMember.name ? approvedMember.name : "Anonymous"
            } to join your team. ${warningMessage}`
          );
        }

        const currentMembers = currentGroup.members;
        const updatedMembers = [...currentMembers, approvedMember];
        const updatedMemberIds = updatedMembers.map((mem) => ({ id: mem.id }));

        await prisma.group.update({
          where: {
            id: application.groupId,
          },
          data: {
            members: {
              set: updatedMemberIds.map((mem) => ({ ...mem })),
            },
            currentSize: updatedMembers.length,
          },
        });
      }

      res.status(200).json({ application, warningMessage });
    } else {
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}
