-- CreateTable
CREATE TABLE "EventTypes" (
    "eventID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "EventTypes_pkey" PRIMARY KEY ("eventID")
);

-- CreateTable
CREATE TABLE "EventLogs" (
    "logId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "objectId" INTEGER,
    "context" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "EventLogs_pkey" PRIMARY KEY ("logId")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventTypes_name_key" ON "EventTypes"("name");

-- AddForeignKey
ALTER TABLE "EventLogs" ADD CONSTRAINT "EventLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
