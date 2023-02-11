-- CreateTable
CREATE TABLE "Gradings" (
    "gradingId" SERIAL NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "pointValue" INTEGER NOT NULL,
    "feedbackWhenRight" TEXT NOT NULL,
    "feedbackWhenWrong" TEXT NOT NULL,
    "generalFeedback" TEXT NOT NULL,

    CONSTRAINT "Gradings_pkey" PRIMARY KEY ("gradingId")
);

-- CreateTable
CREATE TABLE "GradingCorrectOptionIds" (
    "gradingId" INTEGER NOT NULL,
    "optionId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Gradings_gradingId_questionId_key" ON "Gradings"("gradingId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "GradingCorrectOptionIds_optionId_key" ON "GradingCorrectOptionIds"("optionId");

-- AddForeignKey
ALTER TABLE "GradingCorrectOptionIds" ADD CONSTRAINT "GradingCorrectOptionIds_gradingId_fkey" FOREIGN KEY ("gradingId") REFERENCES "Gradings"("gradingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradingCorrectOptionIds" ADD CONSTRAINT "GradingCorrectOptionIds_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Options"("optionId") ON DELETE RESTRICT ON UPDATE CASCADE;
