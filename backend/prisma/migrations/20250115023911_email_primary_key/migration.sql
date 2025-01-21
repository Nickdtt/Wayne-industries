-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("email");

-- DropIndex
DROP INDEX "User_email_key";
