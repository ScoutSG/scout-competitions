import prisma from "../prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export const validateIfApplicationIsReviewed = async (
  applicationId: number
) => {
  let application = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  if (application.isApproved === null || application.isApproved === undefined) {
    // no decision made on application
    return;
  }
  throw "Application has already been reviewed";
};

export const validateIfAlreadyRequested = async (
  groupId: number,
  userId: number
) => {
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
    throw "You've already requested to join this group!";
  }
};
