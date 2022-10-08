import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// GET POST /api/applications
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
  const applications = await prisma.application.findMany({
    include: {
      form: true,
      applicant: true,
      answers: true,
      group: {
        include: {
          members: true,
        },
      },
    },
  });

  res.status(200).json(applications);
}

async function handleAdd(req, res) {
  const { isApproved, formId, userId, answers, groupId } = req.body;

  const application = await prisma.application.create({
    data: {
      isApproved,
      applicant: {
        connect: {
          id: userId,
        },
      },
      form: {
        connect: {
          id: formId,
        },
      },
      group: {
        connect: {
          id: groupId,
        },
      },
    },
  });

  const answersData = answers.map((answer) => ({
    applicationId: application.id,
    answerResponse: answer.answerString,
    questionId: answer.questionId,
  }));

  await prisma.answer.createMany({ data: answersData });

  res.status(200).json(application);
}
