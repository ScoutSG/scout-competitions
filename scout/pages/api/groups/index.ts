import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { createGroup, sendWelcomeMessage } from "../../../core/utils/telegram";
import { validateUserIsNotInCompetition } from "../../../lib/services/GroupValidation";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

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
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }

  const userId = session.user.id;
  const groups = await prisma.group.findMany({
    where: {
      members: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      leader: true,
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
    tags,
    form,
    members,
    competitionId,
    goal,
    leaderId,
    withTelegramGroup,
  } = req.body;
  await validateUserIsNotInCompetition(leaderId, competitionId).catch((err) => {
    res.status(400).json({ message: err.toString() });
  });
  if (res.writableEnded) {
    return;
  }

  let telegramGroupId: number;
  if (withTelegramGroup) {
    const leader = await prisma.user.findUnique({
      where: {
        id: leaderId,
      },
    });
    try {
      telegramGroupId = await createGroup(name, leader);
    } catch (err) {
      res.status(400).json({ message: err.toString() });
      return;
    }
  }

  let memberResult = members.map((x) => ({ id: x }));
  if (members.length === 0) {
    memberResult.push({ id: leaderId }); // add leader to member
  }

  const group = await prisma.group.create({
    data: {
      name,
      currentSize,
      targetSize,
      description,
      targetSkills,
      tags,
      goal,
      leader: {
        connect: { id: leaderId },
      },
      members: {
        connect: memberResult,
      },
      competition: {
        connect: {
          id: competitionId,
        },
      },
      telegramLink: telegramGroupId ? String(telegramGroupId) : null,
    },
  });

  if (telegramGroupId) {
    await sendWelcomeMessage(telegramGroupId, name, competitionId, group.id);
  }

  if (form) {
    const newForm = await prisma.form.create({
      data: {
        groupId: group.id,
      },
    });

    const questionsData = form.questions.map((question) => ({
      formId: newForm.id,
      questionString: question.questionString,
      questionType: question.questionType,
    }));

    await prisma.question.createMany({ data: questionsData });
  }

  res.status(200).json(group);

  // On-demand revalidation.
  // Read more here: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation
  try {
    await res.revalidate(`/competitions/${competitionId}`);
    res.json({ revalidated: true });
  } catch (err) {
    // if there was an error, next will continue to show
    // the last successfully generated page
  }
}
