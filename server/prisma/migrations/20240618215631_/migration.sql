/*
  Warnings:

  - You are about to drop the column `subTasks` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "subTasks";

-- CreateTable
CREATE TABLE "subTask" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "subTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subTask" ADD CONSTRAINT "subTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
