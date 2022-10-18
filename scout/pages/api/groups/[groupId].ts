import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { createGroup, sendWelcomeMessage } from "../../../core/utils/telegram";

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
        members,
        withTelegramGroup,
      } = req.body;

      let telegramGroupId: number;
      if (withTelegramGroup) {
        const group = await prisma.group.findUnique({
          where: {
            id: groupId,
          },
        });

        if (group.telegramLink === null) {
          const leader = await prisma.user.findUnique({
            where: {
              id: members[0],
            },
          });
          telegramGroupId = await createGroup(name, leader.telegramUrl);
          await sendWelcomeMessage(
            telegramGroupId,
            name,
            group.competitionId,
            groupId
          );
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
      res.status(200).json(group);
    } else {
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}
