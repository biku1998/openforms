/*
  Warnings:

  - You are about to drop the `TempTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TempTable";

-- CreateTable
CREATE TABLE "Temps" (
    "name" TEXT NOT NULL,
    "launchedAt" TIMESTAMPTZ(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Temps_name_key" ON "Temps"("name");
