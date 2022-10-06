/*
  Warnings:

  - Made the column `groupId` on table `Application` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_groupId_fkey";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "groupId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
