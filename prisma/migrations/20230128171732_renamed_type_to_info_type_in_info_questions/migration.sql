/*
  Warnings:

  - You are about to drop the column `type` on the `info_questions` table. All the data in the column will be lost.
  - Added the required column `info_type` to the `info_questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "info_questions" DROP COLUMN "type",
ADD COLUMN     "info_type" "info_type" NOT NULL;
