import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// GET, PATCH, DELETE /api/applications/id/
export default async function handle(req, res) {
  try {
    const httpMethod = req.method;
    const applicationId = parseInt(req.query.applicationId);

    if (httpMethod === "GET") {
      const application = await prisma.application.findFirst({
        where: {
          id: applicationId,
        },
        include: {
          form: true,
          applicant: true,
          answers: {
            include: {
              question: true,
            },
          },
          group: {
            include: {
              members: true,
            },
          },
        },
      });

      res.status(200).json(application);
    } else if (httpMethod === "DELETE") {
      const application = await prisma.application.delete({
        where: {
          id: applicationId,
        },
      });

      res.status(200).json(application);
    } else if (httpMethod === "PATCH") {
      const { isApproved, answers } = req.body;

      const application = await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          isApproved,
          // applicant: {
          //   connect: {
          //     id: userId,
          //   },
          // },
          // form: {
          //   connect: {
          //     id: formId,
          //   },
          // },
          // group: {
          //   connect: {
          //     id: groupId,
          //   },
          // },
        },
      });

      if (answers) {
        const answersData = answers.map((answer) => ({
          applicationId: application.id,
          answerResponse: answer.answerString,
          questionId: answer.questionId,
        }));

        await prisma.answer.createMany({ data: answersData });
      }
    } else {
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}
