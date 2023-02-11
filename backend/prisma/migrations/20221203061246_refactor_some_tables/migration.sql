/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `answers` table. All the data in the column will be lost.
  - The primary key for the `choice_questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questionId` on the `choice_questions` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `event_logs` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `event_logs` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `event_types` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `file_upload_answers` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `form_presentation_settings` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `form_presentation_settings` table. All the data in the column will be lost.
  - You are about to drop the column `collect_email` on the `form_response_settings` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `form_response_settings` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `form_response_settings` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `gradings` table. All the data in the column will be lost.
  - You are about to drop the column `general_feedback` on the `gradings` table. All the data in the column will be lost.
  - The `feedback_when_right` column on the `gradings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `feedback_when_wrong` column on the `gradings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `created_at` on the `quiz_settings` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `quiz_settings` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `responses` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `text_answers` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "feedback_parent_type" AS ENUM ('GRADING', 'RESPONSE');

-- CreateEnum
CREATE TYPE "feedback_sentiment" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');

-- AlterTable
ALTER TABLE "answers" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "choice_questions" DROP CONSTRAINT "choice_questions_pkey",
DROP COLUMN "questionId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "choice_questions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "event_logs" DROP COLUMN "deleted_at",
DROP COLUMN "updated_at",
ALTER COLUMN "occurred_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "event_types" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "file_upload_answers" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "form_presentation_settings" DROP COLUMN "created_at",
DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "form_response_settings" DROP COLUMN "collect_email",
DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
ADD COLUMN     "single_response" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "gradings" DROP COLUMN "deleted_at",
DROP COLUMN "general_feedback",
DROP COLUMN "feedback_when_right",
ADD COLUMN     "feedback_when_right" INTEGER,
DROP COLUMN "feedback_when_wrong",
ADD COLUMN     "feedback_when_wrong" INTEGER;

-- AlterTable
ALTER TABLE "quiz_settings" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
ADD COLUMN     "is_quiz" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "release_score_immediately" SET DEFAULT false;

-- AlterTable
ALTER TABLE "responses" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "text_answers" DROP COLUMN "deleted_at";

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "parent_type" "feedback_parent_type" NOT NULL,
    "content" TEXT NOT NULL,
    "sentiment" "feedback_sentiment" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);
