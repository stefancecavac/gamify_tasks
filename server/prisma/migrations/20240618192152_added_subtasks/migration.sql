/*
  Warnings:

  - You are about to drop the column `content` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `subTasks` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "content",
DROP COLUMN "difficulty",
ADD COLUMN     "subTasks" JSON NOT NULL;

-- DropEnum
DROP TYPE "taskDifficulty";
