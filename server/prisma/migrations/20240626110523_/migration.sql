/*
  Warnings:

  - Added the required column `title` to the `habit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "habit" ADD COLUMN     "title" TEXT NOT NULL;
