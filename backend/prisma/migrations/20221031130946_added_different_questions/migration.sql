-- CreateTable
CREATE TABLE "ChoiceQuestions" (
    "questionId" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" "ChoiceType" NOT NULL,
    "shuffleOptions" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "ChoiceQuestions_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "FileUploadQuestions" (
    "questionId" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "maxFileSize" INTEGER NOT NULL,
    "maxFiles" INTEGER NOT NULL,
    "types" "FileType"[],
    "position" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "FileUploadQuestions_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "DateQuestions" (
    "questionId" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "includeYear" BOOLEAN NOT NULL DEFAULT true,
    "includeTime" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "DateQuestions_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "NpsQuestions" (
    "questionId" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "high" INTEGER NOT NULL,
    "low" INTEGER NOT NULL,
    "lowLabel" TEXT NOT NULL,
    "highLabel" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "NpsQuestions_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "RatingQuestions" (
    "questionId" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" "RatingType" NOT NULL,
    "high" INTEGER NOT NULL,
    "low" INTEGER NOT NULL,
    "lowLabel" TEXT NOT NULL,
    "highLabel" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "RatingQuestions_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "InfoQuestions" (
    "questionId" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" "InfoType" NOT NULL,
    "position" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "InfoQuestions_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "TextQuestions" (
    "questionId" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "paragraph" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "TextQuestions_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "Texts" (
    "textId" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "Texts_pkey" PRIMARY KEY ("textId")
);

-- AddForeignKey
ALTER TABLE "ChoiceQuestions" ADD CONSTRAINT "ChoiceQuestions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUploadQuestions" ADD CONSTRAINT "FileUploadQuestions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateQuestions" ADD CONSTRAINT "DateQuestions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NpsQuestions" ADD CONSTRAINT "NpsQuestions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingQuestions" ADD CONSTRAINT "RatingQuestions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfoQuestions" ADD CONSTRAINT "InfoQuestions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextQuestions" ADD CONSTRAINT "TextQuestions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Texts" ADD CONSTRAINT "Texts_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;
