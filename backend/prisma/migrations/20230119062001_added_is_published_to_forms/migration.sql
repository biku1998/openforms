/*
  Warnings:

  - A unique constraint covering the columns `[id,created_by_id]` on the table `forms` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "forms_id_created_by_id_key" ON "forms"("id", "created_by_id");
