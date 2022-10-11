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
            res.status(200).json(competitions);
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