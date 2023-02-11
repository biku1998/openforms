/*
  Warnings:

  - The primary key for the `Forms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `formId` column on the `Forms` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `QuizSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `settingId` column on the `QuizSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `userId` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `userId` on the `Forms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `formId` on the `QuizSettings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Forms" DROP CONSTRAINT "Forms_userId_fkey";

-- DropForeignKey
ALTER TABLE "QuizSettings" DROP CONSTRAINT "QuizSettings_formId_fkey";

-- AlterTable
ALTER TABLE "Forms" DROP CONSTRAINT "Forms_pkey",
DROP COLUMN "formId",
ADD COLUMN     "formId" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Forms_pkey" PRIMARY KEY ("formId");

-- AlterTable
ALTER TABLE "QuizSettings" DROP CONSTRAINT "QuizSettings_pkey",
DROP COLUMN "settingId",
ADD COLUMN     "settingId" SERIAL NOT NULL,
DROP COLUMN "formId",
ADD COLUMN     "formId" INTEGER NOT NULL,
ADD CONSTRAINT "QuizSettings_pkey" PRIMARY KEY ("settingId");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "FormResponseSettings" (
    "settingId" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "defaultPointValue" INTEGER NOT NULL DEFAULT 0,
    "releaseScoreImmedietly" BOOLEAN NOT NULL DEFAULT true,
    "viewMissedQuestions" BOOLEAN NOT NULL DEFAULT true,
    "viewCorrectAnswers" BOOLEAN NOT NULL DEFAULT true,
    "viewPointValues" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "FormResponseSettings_pkey" PRIMARY KEY ("settingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormResponseSettings_formId_key" ON "FormResponseSettings"("formId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizSettings_formId_key" ON "QuizSettings"("formId");

-- AddForeignKey
ALTER TABLE "Forms" ADD CONSTRAINT "Forms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSettings" ADD CONSTRAINT "QuizSettings_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponseSettings" ADD CONSTRAINT "FormResponseSettings_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;
