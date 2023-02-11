/*
  Warnings:

  - A unique constraint covering the columns `[form_id,question_id]` on the table `form_questions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "form_questions_form_id_question_id_key" ON "form_questions"("form_id", "question_id");
