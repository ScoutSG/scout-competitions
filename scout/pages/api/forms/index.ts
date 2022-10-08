import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// GET POST /api/forms
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
  const forms = await prisma.form.findMany({
    include: {
      questions: true,
      applications: true,
    },
  });

  res.status(200).json(forms);
}

async function handleAdd(req, res) {
  const { groupId, questions } = req.body;

  const form = await prisma.form.create({
    data: {
      groupId,
    },
  });

  const questionsData = questions.map((questionString) => ({
    formId: form.id,
    questionString: questionString,
  }))

  await prisma.question.createMany({ data: questionsData })

  res.status(200).json(form);
}
