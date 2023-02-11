-- CreateTable
CREATE TABLE "TempTable" (
    "name" TEXT NOT NULL,
    "launchedAt" TIMESTAMPTZ(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TempTable_name_key" ON "TempTable"("name");
