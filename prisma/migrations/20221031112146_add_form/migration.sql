-- CreateTable
CREATE TABLE "Forms" (
    "formId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "iconUrl" TEXT,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Forms_pkey" PRIMARY KEY ("formId")
);

-- AddForeignKey
ALTER TABLE "Forms" ADD CONSTRAINT "Forms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
