/*
  Warnings:

  - The `types` column on the `file_upload_questions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `question_type` on the `answers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `choice_questions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `question_type` on the `gradings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `info_questions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `question_type` on the `options` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `rating_questions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "choice_type" AS ENUM ('RADIO', 'CHECKBOX', 'DROP_DOWN');

-- CreateEnum
CREATE TYPE "file_type" AS ENUM ('ANY', 'DOCUMENT', 'PRESENTATION', 'SPREADSHEET', 'PDF', 'IMAGE', 'VIDEO', 'AUDIO');

-- CreateEnum
CREATE TYPE "rating_type" AS ENUM ('STAR', 'HEART');

-- CreateEnum
CREATE TYPE "info_type" AS ENUM ('WEBSITE', 'PHONE', 'EMAIL');

-- CreateEnum
CREATE TYPE "question_type" AS ENUM ('CHOICE', 'FILE_UPLOAD', 'DATE', 'NPS', 'RATING', 'INFO', 'TEXT');

-- AlterTable
ALTER TABLE "answers" DROP COLUMN "question_type",
ADD COLUMN     "question_type" "question_type" NOT NULL;

-- AlterTable
ALTER TABLE "choice_questions" DROP COLUMN "type",
ADD COLUMN     "type" "choice_type" NOT NULL;

-- AlterTable
ALTER TABLE "file_upload_questions" DROP COLUMN "types",
ADD COLUMN     "types" "file_type"[];

-- AlterTable
ALTER TABLE "gradings" DROP COLUMN "question_type",
ADD COLUMN     "question_type" "question_type" NOT NULL;

-- AlterTable
ALTER TABLE "info_questions" DROP COLUMN "type",
ADD COLUMN     "type" "info_type" NOT NULL;

-- AlterTable
ALTER TABLE "options" DROP COLUMN "question_type",
ADD COLUMN     "question_type" "question_type" NOT NULL;

-- AlterTable
ALTER TABLE "rating_questions" DROP COLUMN "type",
ADD COLUMN     "type" "rating_type" NOT NULL;

-- DropEnum
DROP TYPE "ChoiceType";

-- DropEnum
DROP TYPE "FileType";

-- DropEnum
DROP TYPE "InfoType";

-- DropEnum
DROP TYPE "QuestionType";

-- DropEnum
DROP TYPE "RatingType";
