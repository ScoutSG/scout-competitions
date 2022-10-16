import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { notifyGroup } from "../../../core/utils/telegram";

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

async function handleRead(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
  } else {
    const applications = await prisma.application.findMany({
      where: {
        userId: session.user.id,
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
    res.status(200).json(applications);
  }
}

async function handleAdd(req, res) {
  const { formId, userId, answers, groupId } = req.body;

  let existingApplication = await prisma.application.findFirst({
    where: {
      group: {
        id: groupId,
      },
      applicant: {
        id: userId,
      },
    },
  });

  if (existingApplication) {
    res.statusMessage = "You've already requested to join this team!";
    res.status(400).end();
    return;
  }

  let competitions = await prisma.competition.findMany({
    include: {
      groups: {
        include: {
          members: true,
        },
      },
    },
  });

  const competition = competitions.filter(
    (comp) => comp.groups.filter((grp) => grp.id === groupId).length > 0
  )[0];
  let isMember =
    competition.groups.filter(
      (grp) => grp.members.filter((mbr) => mbr.id === userId).length > 0
    ).length > 0;

  if (isMember) {
    res.statusMessage = `You're already a member of a team for ${competition.name}! For each competition, you can only be in one group at a time.`;
    res.status(400).end();
    return;
  }

  const application = await prisma.application.create({
    data: {
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

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });
  if (group.telegramLink !== "" && group.telegramLink !== null) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    await notifyGroup(
      group.telegramLink,
      `${user.name} has just requested to join this team!\n\nReview their request at ${process.env.NEXTAUTH_URL}/competitions/${competition.id}/groups/${groupId}.`
    );
  }

  res.status(200).json(application);
}
