/*
  Warnings:

  - You are about to drop the column `updated_at` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `choice_questions` table. All the data in the column will be lost.
  - You are about to drop the column `form_id` on the `choice_questions` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `choice_questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `choice_questions` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `date_questions` table. All the data in the column will be lost.
  - You are about to drop the column `form_id` on the `date_questions` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `date_questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `date_questions` table. All the data in the column will be lost.
  - You are about to drop the column `object_id` on the `event_logs` table. All the data in the column will be lost.
  - You are about to drop the column `occurred_at` on the `event_logs` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `event_types` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `parent_type` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `original_file_name` on the `file_upload_answers` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `file_upload_answers` table. All the data in the column will be lost.
  - You are about to drop the column `uploadUrl` on the `file_upload_answers` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `file_upload_questions` table. All the data in the column will be lost.
  - You are about to drop the column `form_id` on the `file_upload_questions` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `file_upload_questions` table. All the data in the column will be lost.
  - You are about to drop the column `types` on the `file_upload_questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `file_upload_questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `form_presentation_settings` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `form_response_settings` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `icon_url` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `feedback_when_right` on the `gradings` table. All the data in the column will be lost.
  - You are about to drop the column `feedback_when_wrong` on the `gradings` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `gradings` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `info_questions` table. All the data in the column will be lost.
  - You are about to drop the column `form_id` on the `info_questions` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `info_questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `info_questions` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `nps_questions` table. All the data in the column will be lost.
  - You are about to drop the column `form_id` on the `nps_questions` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `nps_questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `nps_questions` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `options` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `options` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `options` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `rating_questions` table. All the data in the column will be lost.
  - You are about to drop the column `form_id` on the `rating_questions` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `rating_questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `rating_questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `responses` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `text_answers` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `text_questions` table. All the data in the column will be lost.
  - You are about to drop the column `form_id` on the `text_questions` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `text_questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `text_questions` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `grading_correct_option_ids` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiz_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `texts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_by_id` to the `choice_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `date_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_type_id` to the `event_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_upload_id` to the `file_upload_answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `file_upload_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_updated_by_id` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `gradings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `info_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `nps_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `rating_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `text_questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "choice_questions" DROP CONSTRAINT "choice_questions_form_id_fkey";

-- DropForeignKey
ALTER TABLE "date_questions" DROP CONSTRAINT "date_questions_form_id_fkey";

-- DropForeignKey
ALTER TABLE "file_upload_questions" DROP CONSTRAINT "file_upload_questions_form_id_fkey";

-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_user_id_fkey";

-- DropForeignKey
ALTER TABLE "grading_correct_option_ids" DROP CONSTRAINT "grading_correct_option_ids_grading_id_fkey";

-- DropForeignKey
ALTER TABLE "grading_correct_option_ids" DROP CONSTRAINT "grading_correct_option_ids_option_id_fkey";

-- DropForeignKey
ALTER TABLE "info_questions" DROP CONSTRAINT "info_questions_form_id_fkey";

-- DropForeignKey
ALTER TABLE "nps_questions" DROP CONSTRAINT "nps_questions_form_id_fkey";

-- DropForeignKey
ALTER TABLE "quiz_settings" DROP CONSTRAINT "quiz_settings_form_id_fkey";

-- DropForeignKey
ALTER TABLE "rating_questions" DROP CONSTRAINT "rating_questions_form_id_fkey";

-- DropForeignKey
ALTER TABLE "text_questions" DROP CONSTRAINT "text_questions_form_id_fkey";

-- DropForeignKey
ALTER TABLE "texts" DROP CONSTRAINT "texts_form_id_fkey";

-- AlterTable
ALTER TABLE "answers" DROP COLUMN "updated_at",
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "choice_questions" DROP COLUMN "deleted_at",
DROP COLUMN "form_id",
DROP COLUMN "position",
DROP COLUMN "updated_at",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "date_questions" DROP COLUMN "deleted_at",
DROP COLUMN "form_id",
DROP COLUMN "position",
DROP COLUMN "updated_at",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "event_logs" DROP COLUMN "object_id",
DROP COLUMN "occurred_at",
ADD COLUMN     "event_type_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "event_types" DROP COLUMN "updated_at",
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "deleted_at",
DROP COLUMN "parent_id",
DROP COLUMN "parent_type",
DROP COLUMN "updated_at",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "file_upload_answers" DROP COLUMN "original_file_name",
DROP COLUMN "updated_at",
DROP COLUMN "uploadUrl",
ADD COLUMN     "file_upload_id" INTEGER NOT NULL,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "file_upload_questions" DROP COLUMN "deleted_at",
DROP COLUMN "form_id",
DROP COLUMN "position",
DROP COLUMN "types",
DROP COLUMN "updated_at",
ADD COLUMN     "accepted_file_types" "file_type"[],
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "form_presentation_settings" DROP COLUMN "updated_at",
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "form_response_settings" DROP COLUMN "updated_at",
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "forms" DROP COLUMN "deleted_at",
DROP COLUMN "icon_url",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "header_img_file_upload_id" INTEGER,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "gradings" DROP COLUMN "feedback_when_right",
DROP COLUMN "feedback_when_wrong",
DROP COLUMN "updated_at",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "feedback_id_when_right" INTEGER,
ADD COLUMN     "feedback_id_when_wrong" INTEGER,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "info_questions" DROP COLUMN "deleted_at",
DROP COLUMN "form_id",
DROP COLUMN "position",
DROP COLUMN "updated_at",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "nps_questions" DROP COLUMN "deleted_at",
DROP COLUMN "form_id",
DROP COLUMN "position",
DROP COLUMN "updated_at",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "options" DROP COLUMN "deleted_at",
DROP COLUMN "image_url",
DROP COLUMN "updated_at",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "image_file_id" INTEGER,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "rating_questions" DROP COLUMN "deleted_at",
DROP COLUMN "form_id",
DROP COLUMN "position",
DROP COLUMN "updated_at",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "responses" DROP COLUMN "updated_at",
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "text_answers" DROP COLUMN "updated_at",
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "text_questions" DROP COLUMN "deleted_at",
DROP COLUMN "form_id",
DROP COLUMN "position",
DROP COLUMN "updated_at",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3),
ADD COLUMN     "last_updated_by_id" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "deleted_at",
DROP COLUMN "updated_at",
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3);

-- DropTable
DROP TABLE "grading_correct_option_ids";

-- DropTable
DROP TABLE "quiz_settings";

-- DropTable
DROP TABLE "texts";

-- DropEnum
DROP TYPE "feedback_parent_type";

-- CreateTable
CREATE TABLE "file_uploads" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alt_text" TEXT,
    "caption" TEXT,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "formats" JSONB,
    "hash" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "url" TEXT NOT NULL,
    "preview_url" TEXT NOT NULL,
    "created_by_id" INTEGER NOT NULL,
    "last_updated_by_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_uploads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_quiz_settings" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "default_point_value" INTEGER NOT NULL DEFAULT 0,
    "release_score_immediately" BOOLEAN NOT NULL DEFAULT false,
    "view_missed_questions" BOOLEAN NOT NULL DEFAULT true,
    "view_correct_answers" BOOLEAN NOT NULL DEFAULT true,
    "view_point_values" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMPTZ(3),
    "last_updated_by_id" INTEGER,

    CONSTRAINT "form_quiz_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_links" (
    "id" SERIAL NOT NULL,
    "feedback_id" INTEGER NOT NULL,
    "link_text" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" INTEGER NOT NULL,
    "last_updated_by_id" INTEGER,

    CONSTRAINT "feedback_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grading_correct_options" (
    "id" SERIAL NOT NULL,
    "grading_id" INTEGER NOT NULL,
    "option_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMPTZ(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by_id" INTEGER NOT NULL,
    "last_updated_by_id" INTEGER,

    CONSTRAINT "grading_correct_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grades" (
    "id" SERIAL NOT NULL,
    "answer_id" INTEGER NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "feedback_id" INTEGER,
    "score" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMPTZ(3),

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "form_quiz_settings_form_id_key" ON "form_quiz_settings"("form_id");

-- CreateIndex
CREATE UNIQUE INDEX "grading_correct_options_option_id_key" ON "grading_correct_options"("option_id");

-- CreateIndex
CREATE UNIQUE INDEX "grades_answer_id_key" ON "grades"("answer_id");

-- CreateIndex
CREATE INDEX "users_first_name_idx" ON "users"("first_name");

-- AddForeignKey
ALTER TABLE "file_uploads" ADD CONSTRAINT "file_uploads_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_uploads" ADD CONSTRAINT "file_uploads_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_header_img_file_upload_id_fkey" FOREIGN KEY ("header_img_file_upload_id") REFERENCES "file_uploads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_quiz_settings" ADD CONSTRAINT "form_quiz_settings_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_quiz_settings" ADD CONSTRAINT "form_quiz_settings_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_response_settings" ADD CONSTRAINT "form_response_settings_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_presentation_settings" ADD CONSTRAINT "form_presentation_settings_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choice_questions" ADD CONSTRAINT "choice_questions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choice_questions" ADD CONSTRAINT "choice_questions_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload_questions" ADD CONSTRAINT "file_upload_questions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload_questions" ADD CONSTRAINT "file_upload_questions_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "date_questions" ADD CONSTRAINT "date_questions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "date_questions" ADD CONSTRAINT "date_questions_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nps_questions" ADD CONSTRAINT "nps_questions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nps_questions" ADD CONSTRAINT "nps_questions_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_questions" ADD CONSTRAINT "rating_questions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_questions" ADD CONSTRAINT "rating_questions_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_questions" ADD CONSTRAINT "info_questions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_questions" ADD CONSTRAINT "info_questions_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_questions" ADD CONSTRAINT "text_questions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_questions" ADD CONSTRAINT "text_questions_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_image_file_id_fkey" FOREIGN KEY ("image_file_id") REFERENCES "file_uploads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_links" ADD CONSTRAINT "feedback_links_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_links" ADD CONSTRAINT "feedback_links_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gradings" ADD CONSTRAINT "gradings_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gradings" ADD CONSTRAINT "gradings_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gradings" ADD CONSTRAINT "gradings_feedback_id_when_right_fkey" FOREIGN KEY ("feedback_id_when_right") REFERENCES "feedbacks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gradings" ADD CONSTRAINT "gradings_feedback_id_when_wrong_fkey" FOREIGN KEY ("feedback_id_when_wrong") REFERENCES "feedbacks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grading_correct_options" ADD CONSTRAINT "grading_correct_options_grading_id_fkey" FOREIGN KEY ("grading_id") REFERENCES "gradings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grading_correct_options" ADD CONSTRAINT "grading_correct_options_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grading_correct_options" ADD CONSTRAINT "grading_correct_options_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grading_correct_options" ADD CONSTRAINT "grading_correct_options_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload_answers" ADD CONSTRAINT "file_upload_answers_file_upload_id_fkey" FOREIGN KEY ("file_upload_id") REFERENCES "file_uploads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "feedbacks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_logs" ADD CONSTRAINT "event_logs_event_type_id_fkey" FOREIGN KEY ("event_type_id") REFERENCES "event_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
