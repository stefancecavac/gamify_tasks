-- DropForeignKey
ALTER TABLE "subTask" DROP CONSTRAINT "subTask_taskId_fkey";

-- AddForeignKey
ALTER TABLE "subTask" ADD CONSTRAINT "subTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
