import prisma from "../../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = parseInt(req.query.userId as string);
  const competitionId = parseInt(req.query.competitionId as string);
  switch (req.method) {
    case "GET":
      const userCompetitionGroup = await prisma.group.findMany({
        where: {
          competitionId: competitionId,
          OR: [
            {
              leaderId: userId,
            },
            {
              members: {
                some: {
                  id: userId,
                },
              },
            },
          ],
        },
      });
      res.status(200).json(userCompetitionGroup);
  }
};
