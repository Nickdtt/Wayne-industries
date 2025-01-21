-- DropIndex
DROP INDEX "User_senha_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT true;
