import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// GET, PATCH, DELETE /api/competitions/id/
export default async function handle(req, res) {
  try {
    const httpMethod = req.method;
    const competitionId = parseInt(req.query.competitionId);

    if (httpMethod === "GET") {
      const competition = await prisma.competition.findFirst({
        where: {
          id: competitionId,
        },
      });

      res.status(200).json(competition);
    } else if (httpMethod === "DELETE") {
      const competition = await prisma.competition.delete({
        where: {
          id: competitionId,
        },
      });

      res.status(200).json(competition);
    } else if (httpMethod === "PATCH") {
      const competitionData = JSON.parse(req.body);
      const competition = await prisma.competition.update({
        where: {
          id: competitionId,
        },
        data: competitionData,
      });
      res.status(200).json(competition);
    } else {
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}
