/*
  Warnings:

  - Made the column `userId` on table `habit` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "habit" DROP CONSTRAINT "habit_userId_fkey";

-- AlterTable
ALTER TABLE "habit" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "habit" ADD CONSTRAINT "habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
