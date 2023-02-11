/*
  Warnings:

  - You are about to drop the column `defaultPointValue` on the `FormResponseSettings` table. All the data in the column will be lost.
  - You are about to drop the column `releaseScoreImmedietly` on the `FormResponseSettings` table. All the data in the column will be lost.
  - You are about to drop the column `viewCorrectAnswers` on the `FormResponseSettings` table. All the data in the column will be lost.
  - You are about to drop the column `viewMissedQuestions` on the `FormResponseSettings` table. All the data in the column will be lost.
  - You are about to drop the column `viewPointValues` on the `FormResponseSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FormResponseSettings" DROP COLUMN "defaultPointValue",
DROP COLUMN "releaseScoreImmedietly",
DROP COLUMN "viewCorrectAnswers",
DROP COLUMN "viewMissedQuestions",
DROP COLUMN "viewPointValues",
ADD COLUMN     "allQuestionsRequired" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "collectEmail" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "FormPresentationSettings" (
    "settingId" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "showProgressBar" BOOLEAN NOT NULL DEFAULT false,
    "shuffleQuestion" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FormPresentationSettings_pkey" PRIMARY KEY ("settingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormPresentationSettings_formId_key" ON "FormPresentationSettings"("formId");

-- AddForeignKey
ALTER TABLE "FormPresentationSettings" ADD CONSTRAINT "FormPresentationSettings_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;
