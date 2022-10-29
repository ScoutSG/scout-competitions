import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
  attemptToAddToGroup,
  createGroup,
  sendWelcomeMessage,
} from "../../../core/utils/telegram";

// GET, PATCH, DELETE /api/groups/id/
export default async function handle(req, res) {
  try {
    const httpMethod = req.method;
    const groupId = parseInt(req.query.groupId);

    if (httpMethod === "GET") {
      const group = await prisma.group.findFirst({
        where: {
          id: groupId,
        },
        include: {
          members: true,
          form: true,
          applications: {
            include: {
              applicant: true,
              answers: {
                include: {
                  question: true,
                },
              },
            },
          },
        },
      });

      res.status(200).json(group);
    } else if (httpMethod === "DELETE") {
      const group = await prisma.group.delete({
        where: {
          id: groupId,
        },
      });

      res.status(200).json(group);

      // updates member array of group
    } else if (httpMethod === "PATCH") {
      const {
        name,
        currentSize,
        targetSize,
        description,
        targetSkills,
        tags,
        form,
        leaderId,
        members,
        withTelegramGroup,
      } = req.body;

      let telegramGroupId: number;
      if (withTelegramGroup) {
        const group = await prisma.group.findUnique({
          where: {
            id: groupId,
          },
          include: {
            members: true,
          },
        });

        if (group.telegramLink === null) {
          const leader = await prisma.user.findUnique({
            where: {
              id: leaderId,
            },
          });
          try {
            telegramGroupId = await createGroup(name, leader);
            await sendWelcomeMessage(
              telegramGroupId,
              name,
              group.competitionId,
              groupId
            );
            await Promise.all(
              group.members.map((member) =>
                attemptToAddToGroup(telegramGroupId, member)
              )
            );
          } catch (err) {
            res.statusMessage = err;
            res.status(400).end();
          }
        }
      }

      const group = await prisma.group.update({
        where: {
          id: groupId,
        },
        data: {
          name,
          currentSize,
          targetSize,
          description,
          targetSkills,
          tags,
          members: {
            connect: members.map((x) => ({ id: x })),
          },
          telegramLink: telegramGroupId ? String(telegramGroupId) : null,
        },
      });

      const updatedGroup = await prisma.group.findUnique({
        where: {
          id: groupId,
        },
        include: {
          members: true,
          form: true,
          applications: true,
        },
      });

      res.status(200).json(updatedGroup);
    } else {
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}
