import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// GET, PUT, DELETE /api/forms/id/
export default async function handle(req, res) {
  try {
    const httpMethod = req.method;
    const formId = parseInt(req.query.formId);
    const groupId = parseInt(req.query.groupId);

    if (httpMethod === "GET") {
      const form = await prisma.form.findFirst({
        where: {
          id: formId,
        },
      });

      res.status(200).json(form);
      // } else if (httpMethod === "POST") {
      //   const formData = JSON.parse(req.body);

      //   const form = await prisma.form.create({
      //     data: [...formData, groupId],
      //   });

      //   res.status(200).json(form);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}
