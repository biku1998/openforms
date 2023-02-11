/*
  Warnings:

  - You are about to drop the `Answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChoiceQuestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DateQuestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventLogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FileUploadAnswers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FileUploadQuestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormPresentationSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormResponseSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Forms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GradingCorrectOptionIds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gradings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InfoQuestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NpsQuestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RatingQuestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Responses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TextAnswers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TextQuestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Texts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_responseId_fkey";

-- DropForeignKey
ALTER TABLE "ChoiceQuestions" DROP CONSTRAINT "ChoiceQuestions_formId_fkey";

-- DropForeignKey
ALTER TABLE "DateQuestions" DROP CONSTRAINT "DateQuestions_formId_fkey";

-- DropForeignKey
ALTER TABLE "EventLogs" DROP CONSTRAINT "EventLogs_userId_fkey";

-- DropForeignKey
ALTER TABLE "FileUploadAnswers" DROP CONSTRAINT "FileUploadAnswers_answerId_fkey";

-- DropForeignKey
ALTER TABLE "FileUploadQuestions" DROP CONSTRAINT "FileUploadQuestions_formId_fkey";

-- DropForeignKey
ALTER TABLE "FormPresentationSettings" DROP CONSTRAINT "FormPresentationSettings_formId_fkey";

-- DropForeignKey
ALTER TABLE "FormResponseSettings" DROP CONSTRAINT "FormResponseSettings_formId_fkey";

-- DropForeignKey
ALTER TABLE "Forms" DROP CONSTRAINT "Forms_userId_fkey";

-- DropForeignKey
ALTER TABLE "GradingCorrectOptionIds" DROP CONSTRAINT "GradingCorrectOptionIds_gradingId_fkey";

-- DropForeignKey
ALTER TABLE "GradingCorrectOptionIds" DROP CONSTRAINT "GradingCorrectOptionIds_optionId_fkey";

-- DropForeignKey
ALTER TABLE "InfoQuestions" DROP CONSTRAINT "InfoQuestions_formId_fkey";

-- DropForeignKey
ALTER TABLE "NpsQuestions" DROP CONSTRAINT "NpsQuestions_formId_fkey";

-- DropForeignKey
ALTER TABLE "QuizSettings" DROP CONSTRAINT "QuizSettings_formId_fkey";

-- DropForeignKey
ALTER TABLE "RatingQuestions" DROP CONSTRAINT "RatingQuestions_formId_fkey";

-- DropForeignKey
ALTER TABLE "Responses" DROP CONSTRAINT "Responses_formId_fkey";

-- DropForeignKey
ALTER TABLE "TextAnswers" DROP CONSTRAINT "TextAnswers_answerId_fkey";

-- DropForeignKey
ALTER TABLE "TextQuestions" DROP CONSTRAINT "TextQuestions_formId_fkey";

-- DropForeignKey
ALTER TABLE "Texts" DROP CONSTRAINT "Texts_formId_fkey";

-- DropTable
DROP TABLE "Answers";

-- DropTable
DROP TABLE "ChoiceQuestions";

-- DropTable
DROP TABLE "DateQuestions";

-- DropTable
DROP TABLE "EventLogs";

-- DropTable
DROP TABLE "EventTypes";

-- DropTable
DROP TABLE "FileUploadAnswers";

-- DropTable
DROP TABLE "FileUploadQuestions";

-- DropTable
DROP TABLE "FormPresentationSettings";

-- DropTable
DROP TABLE "FormResponseSettings";

-- DropTable
DROP TABLE "Forms";

-- DropTable
DROP TABLE "GradingCorrectOptionIds";

-- DropTable
DROP TABLE "Gradings";

-- DropTable
DROP TABLE "InfoQuestions";

-- DropTable
DROP TABLE "NpsQuestions";

-- DropTable
DROP TABLE "Options";

-- DropTable
DROP TABLE "QuizSettings";

-- DropTable
DROP TABLE "RatingQuestions";

-- DropTable
DROP TABLE "Responses";

-- DropTable
DROP TABLE "TextAnswers";

-- DropTable
DROP TABLE "TextQuestions";

-- DropTable
DROP TABLE "Texts";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "avatar_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forms" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "icon_url" TEXT,
    "description" TEXT,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_settings" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "default_point_value" INTEGER NOT NULL DEFAULT 0,
    "release_score_immediately" BOOLEAN NOT NULL DEFAULT true,
    "view_missed_questions" BOOLEAN NOT NULL DEFAULT true,
    "view_correct_answers" BOOLEAN NOT NULL DEFAULT true,
    "view_point_values" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "quiz_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_response_settings" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "collect_email" BOOLEAN NOT NULL DEFAULT true,
    "all_questions_required" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "form_response_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_presentation_settings" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "show_progress_bar" BOOLEAN NOT NULL DEFAULT false,
    "shuffle_question" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "form_presentation_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "choice_questions" (
    "questionId" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" "ChoiceType" NOT NULL,
    "shuffle_options" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,
    "form_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "choice_questions_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "file_upload_questions" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "max_file_size" INTEGER NOT NULL,
    "max_files" INTEGER NOT NULL,
    "types" "FileType"[],
    "position" INTEGER NOT NULL,
    "form_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "file_upload_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "date_questions" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "include_year" BOOLEAN NOT NULL DEFAULT true,
    "include_time" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL,
    "form_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "date_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nps_questions" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "high" INTEGER NOT NULL,
    "low" INTEGER NOT NULL,
    "low_label" TEXT NOT NULL,
    "high_label" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "form_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "nps_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating_questions" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" "RatingType" NOT NULL,
    "high" INTEGER NOT NULL,
    "low" INTEGER NOT NULL,
    "low_label" TEXT NOT NULL,
    "high_label" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "form_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "rating_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_questions" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" "InfoType" NOT NULL,
    "position" INTEGER NOT NULL,
    "form_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "info_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_questions" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "paragraph" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,
    "form_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "text_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "texts" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "form_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "texts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "image_url" TEXT,
    "position" INTEGER NOT NULL,
    "question_type" "QuestionType" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gradings" (
    "id" SERIAL NOT NULL,
    "question_id" TEXT NOT NULL,
    "question_type" "QuestionType" NOT NULL,
    "point_value" INTEGER NOT NULL,
    "feedback_when_right" TEXT NOT NULL,
    "feedback_when_wrong" TEXT NOT NULL,
    "general_feedback" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "gradings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grading_correct_option_ids" (
    "grading_id" INTEGER NOT NULL,
    "option_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3)
);

-- CreateTable
CREATE TABLE "responses" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "respondent_email" TEXT NOT NULL,
    "total_score" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "question_type" "QuestionType" NOT NULL,
    "response_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_answers" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "answer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "text_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_upload_answers" (
    "id" SERIAL NOT NULL,
    "original_file_name" TEXT NOT NULL,
    "uploadUrl" TEXT NOT NULL,
    "answer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "file_upload_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "event_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "object_id" INTEGER,
    "context" JSONB,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "event_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_settings_form_id_key" ON "quiz_settings"("form_id");

-- CreateIndex
CREATE UNIQUE INDEX "form_response_settings_form_id_key" ON "form_response_settings"("form_id");

-- CreateIndex
CREATE UNIQUE INDEX "form_presentation_settings_form_id_key" ON "form_presentation_settings"("form_id");

-- CreateIndex
CREATE UNIQUE INDEX "options_id_question_id_key" ON "options"("id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "gradings_id_question_id_key" ON "gradings"("id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "grading_correct_option_ids_option_id_key" ON "grading_correct_option_ids"("option_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_types_name_key" ON "event_types"("name");

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_settings" ADD CONSTRAINT "quiz_settings_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_response_settings" ADD CONSTRAINT "form_response_settings_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_presentation_settings" ADD CONSTRAINT "form_presentation_settings_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choice_questions" ADD CONSTRAINT "choice_questions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload_questions" ADD CONSTRAINT "file_upload_questions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "date_questions" ADD CONSTRAINT "date_questions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nps_questions" ADD CONSTRAINT "nps_questions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_questions" ADD CONSTRAINT "rating_questions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_questions" ADD CONSTRAINT "info_questions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_questions" ADD CONSTRAINT "text_questions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "texts" ADD CONSTRAINT "texts_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grading_correct_option_ids" ADD CONSTRAINT "grading_correct_option_ids_grading_id_fkey" FOREIGN KEY ("grading_id") REFERENCES "gradings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grading_correct_option_ids" ADD CONSTRAINT "grading_correct_option_ids_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "responses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_answers" ADD CONSTRAINT "text_answers_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_upload_answers" ADD CONSTRAINT "file_upload_answers_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_logs" ADD CONSTRAINT "event_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
