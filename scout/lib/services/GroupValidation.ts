import prisma from "../prisma";

export const validateUserIsNotInGroup = async (userId, groupId) => {
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

export const validateUserIsNotInCompetition = async (userId, competitionId) => {
  const userGroup = await prisma.group.findMany({
    where: {
      competitionId: competitionId,
      OR: [
        {
          leaderId: userId,
        },
        {
          members: {
            some: {
              id: userId,
            },
          },
        },
      ],
    },
  });

  if (userGroup.length > 0) {
    throw "User is already part of a group in the competition";
  }
}