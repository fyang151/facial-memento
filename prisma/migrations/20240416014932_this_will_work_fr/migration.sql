-- CreateTable
CREATE TABLE "Face" (
    "id" SERIAL NOT NULL,
    "faceKey" TEXT NOT NULL,
    "memorability" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Face_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Face_faceKey_key" ON "Face"("faceKey");
