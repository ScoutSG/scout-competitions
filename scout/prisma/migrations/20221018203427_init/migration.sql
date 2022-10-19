-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "answerResponse" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "questionType" TEXT NOT NULL DEFAULT 'Range';
