import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET, PATCH, DELETE /api/competitions/id/
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const competitionId = parseInt(req.query.competitionId as string);
    switch (req.method) {
        case "GET":
            const competition = await prisma.competition.findUnique({
                where: {
                    id: competitionId
                },
                include: {
                    groups: {
                        include: {
                            members: true
                        }
                    }
                }
            });
            res.status(200).json(competition);
            break;
        case "DELETE":
            const deleteCompetition = await prisma.competition.delete({
                where: {
                    id: competitionId
                }
            });
            res.status(200).json(deleteCompetition);
            break;
        case "PATCH":
            const updateCompetition = await prisma.competition.update({
                where: {
                    id: competitionId
                },
                data: req.body
            });
            res.status(200).json(updateCompetition);
            break;
        default:
            res.status(405).end();
    }
}
