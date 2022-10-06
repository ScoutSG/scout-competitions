import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// GET /api/group/
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const httpMethod = req.method;
    if (httpMethod === "GET") {
      await handleRead(req, res);
    } else if (httpMethod === "POST") {
      await handleAdd(req, res);
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}

async function handleRead(req, res) {
  const groups = await prisma.group.findMany();

  res.status(200).json(groups);
}

async function handleAdd(req, res) {
  const groupData = JSON.parse(req.body);

  const group = await prisma.group.create({
    data: groupData
  });

  res.status(200).json(group);
}
