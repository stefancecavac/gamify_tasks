/*
  Warnings:

  - You are about to drop the column `experience_points` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "experience_points",
ADD COLUMN     "currency" INTEGER NOT NULL DEFAULT 0;
