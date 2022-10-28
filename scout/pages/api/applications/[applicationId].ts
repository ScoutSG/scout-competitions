import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
  addToGroup,
  attemptToAddToGroup,
  notifyGroup,
} from "../../../core/utils/telegram";
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

      const application = await prisma.application.findUnique({
        where: {
          id: applicationId,
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
          warningMessage = await attemptToAddToGroup(
            currentGroup.telegramLink,
            approvedMember
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

      await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          isApproved,
        },
      });

      res.status(200).json({ application, warningMessage });
    } else {
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}
