import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// GET POST /api/groups
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
  const groups = await prisma.group.findMany({
    include: {
      members: true,
      form: true,
      applications: true,
    },
  });

  res.status(200).json(groups);
}

async function handleAdd(req, res) {
  const {
    name,
    currentSize,
    targetSize,
    description,
    targetSkills,

    form,
    members,
    competitionId,
  } = req.body;

  const group = await prisma.group.create({
    data: {
      name,
      currentSize,
      targetSize,
      description,
      targetSkills,
      members: {
        connect: members.map((x) => ({ id: x })),
      },
      competition: {
        connect: {
          id: competitionId,
        },
      },
    },
  });

  if (form) {
    const newForm = await prisma.form.create({
      data: {
        groupId: group.id
      }
    })

    const questionsData = form.questions.map((question) => ({
      formId: newForm.id,
      questionString: question.questionString,
    }));

    await prisma.question.createMany({ data: questionsData });
  }

  res.status(200).json(group);
}
