import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// GET, PATCH, DELETE /api/forms/id/
export default async function handle(req, res) {
  try {
    const httpMethod = req.method;
    const formId = parseInt(req.query.formId);

    if (httpMethod === "GET") {
      const form = await prisma.form.findFirst({
        where: {
          id: formId,
        },
        include: {
          questions: true,
          applications: true,
        },
      });
      res.status(200).json(form);
    } else if (httpMethod === "DELETE") {
      const form = await prisma.form.delete({
        where: {
          id: formId,
        },
      });

      res.status(200).json(form);
    } else if (httpMethod === "PATCH") {
      const { questions } = req.body;
      
      const form = await prisma.form.update({
        where: {
          id: formId,
        },
        data: {
          questions: {
            set: [],
          },
        },
      });

      const questionsData = questions.map((question) => ({
        formId: form.id,
        questionString: question.questionString,
        questionType: question.questionType,
      }));

      await prisma.question.createMany({ data: questionsData });
      res.status(200).json(form);
    } else {
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}
