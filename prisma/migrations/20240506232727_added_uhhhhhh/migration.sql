/*
  Warnings:

  - You are about to drop the column `correctNess` on the `Face` table. All the data in the column will be lost.
  - Added the required column `correctness` to the `Face` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Face" DROP COLUMN "correctNess",
ADD COLUMN     "correctness" DOUBLE PRECISION NOT NULL;
