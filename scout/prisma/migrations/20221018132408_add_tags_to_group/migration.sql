-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "formId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "telegramUrl" TEXT;
