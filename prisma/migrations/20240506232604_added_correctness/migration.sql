/*
  Warnings:

  - Added the required column `correctNess` to the `Face` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occurence` to the `Face` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Face" ADD COLUMN     "correctNess" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "occurence" DOUBLE PRECISION NOT NULL;
