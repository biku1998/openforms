-- CreateTable
CREATE TABLE "Responses" (
    "responseId" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "respondentEmail" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,

    CONSTRAINT "Responses_pkey" PRIMARY KEY ("responseId")
);

-- CreateTable
CREATE TABLE "Answers" (
    "answerId" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "textAnswers" JSONB,
    "fileUploadAnswers" JSONB,
    "responseId" INTEGER NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("answerId")
);

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Responses"("responseId") ON DELETE RESTRICT ON UPDATE CASCADE;
