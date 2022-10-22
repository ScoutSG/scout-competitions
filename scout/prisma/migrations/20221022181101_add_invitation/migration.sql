/*
  Warnings:

  - You are about to drop the column `groupId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "goal" SET DEFAULT '';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "groupId";

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
