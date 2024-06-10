/*
  Warnings:

  - Added the required column `difficulty` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "taskDifficulty" AS ENUM ('easy', 'medium', 'hard');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "difficulty" "taskDifficulty" NOT NULL;
