-- CreateTable
CREATE TABLE "QuizSettings" (
    "settingId" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "defaultPointValue" INTEGER NOT NULL DEFAULT 0,
    "releaseScoreImmedietly" BOOLEAN NOT NULL DEFAULT true,
    "viewMissedQuestions" BOOLEAN NOT NULL DEFAULT true,
    "viewCorrectAnswers" BOOLEAN NOT NULL DEFAULT true,
    "viewPointValues" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "QuizSettings_pkey" PRIMARY KEY ("settingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizSettings_formId_key" ON "QuizSettings"("formId");

-- AddForeignKey
ALTER TABLE "QuizSettings" ADD CONSTRAINT "QuizSettings_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;
