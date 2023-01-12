/*
  Warnings:

  - You are about to drop the column `fileUploadAnswers` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `textAnswers` on the `Answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "fileUploadAnswers",
DROP COLUMN "textAnswers";

-- CreateTable
CREATE TABLE "TextAnswers" (
    "textAnswerId" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "TextAnswers_pkey" PRIMARY KEY ("textAnswerId")
);

-- CreateTable
CREATE TABLE "FileUploadAnswers" (
    "fileUploadAnswerId" SERIAL NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "uploadUrl" TEXT NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "FileUploadAnswers_pkey" PRIMARY KEY ("fileUploadAnswerId")
);

-- AddForeignKey
ALTER TABLE "TextAnswers" ADD CONSTRAINT "TextAnswers_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answers"("answerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUploadAnswers" ADD CONSTRAINT "FileUploadAnswers_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answers"("answerId") ON DELETE RESTRICT ON UPDATE CASCADE;
