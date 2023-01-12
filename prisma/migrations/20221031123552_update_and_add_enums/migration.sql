/*
  Warnings:

  - You are about to drop the column `releaseScoreImmedietly` on the `QuizSettings` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ChoiceType" AS ENUM ('RADIO', 'CHECKBOX', 'DROP_DOWN');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('ANY', 'DOCUMENT', 'PRESENTATION', 'SPREADSHEET', 'PDF', 'IMAGE', 'VIDEO', 'AUDIO');

-- CreateEnum
CREATE TYPE "RatingType" AS ENUM ('STAR', 'HEART');

-- CreateEnum
CREATE TYPE "InfoType" AS ENUM ('WEBSITE', 'PHONE', 'EMAIL');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('CHOICE', 'FILE_UPLOAD', 'DATE', 'NPS', 'RATING', 'INFO', 'TEXT');

-- AlterTable
ALTER TABLE "FormPresentationSettings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "FormResponseSettings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Forms" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "QuizSettings" DROP COLUMN "releaseScoreImmedietly",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "releaseScoreImmediately" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
