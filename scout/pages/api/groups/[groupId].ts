import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

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
          applications: true,
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
        size,
        targetSize,
        description,
        targetSkills,

        formId,
        members,
        competitionId,
      } = req.body;

      const group = await prisma.group.update({
        where: {
          id: groupId,
        },
        data: {
          name,
          size,
          targetSize,
          description,
          targetSkills,
          members: {
            connect: members.map((x) => ({ id: x })),
          },
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
