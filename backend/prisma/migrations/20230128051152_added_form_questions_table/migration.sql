-- CreateTable
CREATE TABLE "form_questions" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "question_type" "question_type" NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "form_questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "form_questions" ADD CONSTRAINT "form_questions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
