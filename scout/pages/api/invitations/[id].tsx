import { truncate } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// PATCH /api/invitations/id/
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const httpMethod = req.method;
    const id = req.query.id; // request params

    // updates invitation and adds member to group
    if (httpMethod === "PATCH") {
      const { userId } = req.body;
      const invitation = await getInvitation(id);
      await validateUserIsNotInGroup(userId, invitation.groupId);
      await addUserToGroup(userId, invitation.groupId);
      const competition = await getCompetition(invitation.groupId);
      const response = {
        competitionId: competition.id,
        groupId: invitation.groupId,
      };
      res.status(200).json(response);
    } else {
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
}

// helper functions
const getInvitation = async (id) => {
  const invitation = await prisma.invitation.findUnique({
    where: {
      id: id,
    },
  });
  return invitation;
};

const addUserToGroup = async (userId, groupId) => {
  const {
    name,
    currentSize,
    targetSize,
    description,
    targetSkills,
    tags,
    members,
  } = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      members: true,
    },
  });

  if (currentSize >= targetSize) {
    throw "Max group size reached.";
  }

  const updatedMembers = members.map((x) => x.id);
  updatedMembers.push(userId);

  await prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      name,
      currentSize: updatedMembers.length,
      targetSize,
      description,
      targetSkills,
      tags,
      members: {
        connect: updatedMembers.map((x) => ({ id: x })),
      },
    },
  });
};

const getCompetition = async (groupId) => {
  const competitions = await prisma.competition.findMany({
    include: {
      groups: true,
    },
  });
  const competition = competitions.filter(
    (comp) => comp.groups.filter((group) => group.id === groupId).length === 1
  )[0];

  return competition;
};

// validation services
const validateUserIsNotInGroup = async (userId, groupId) => {
  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      members: true,
    },
  });

  if (group.members.filter((member) => member.id === userId).length > 0) {
    throw "User is already a member of the group";
  }
};