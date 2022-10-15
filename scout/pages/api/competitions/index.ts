import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case "GET":
            const competitions = await prisma.competition.findMany({
                include: {
                    groups: true
                }
            });
            const sorted_competitions = competitions.sort((a, b) => a.deadline.getTime() -  b.deadline.getTime());
            res.status(200).json(sorted_competitions);
            break;
        case "POST":
            const createCompetition = await prisma.competition.create({
                data: req.body
            });
            res.status(200).json(createCompetition);
            break;
        default:
            res.status(405).end();
    }
}