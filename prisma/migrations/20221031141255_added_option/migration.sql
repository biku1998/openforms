-- CreateTable
CREATE TABLE "Options" (
    "optionId" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "position" INTEGER NOT NULL,
    "questionType" "QuestionType" NOT NULL,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("optionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Options_optionId_questionId_key" ON "Options"("optionId", "questionId");
