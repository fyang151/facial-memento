/*
  Warnings:

  - You are about to drop the column `occurence` on the `Face` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[score]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `occurrence` to the `Face` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequency` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Face" DROP COLUMN "occurence",
ADD COLUMN     "occurrence" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "frequency" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Score_score_key" ON "Score"("score");
