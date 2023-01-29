/*
  Warnings:

  - You are about to drop the column `type` on the `choice_questions` table. All the data in the column will be lost.
  - Added the required column `choice_type` to the `choice_questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "choice_questions" DROP COLUMN "type",
ADD COLUMN     "choice_type" "choice_type" NOT NULL;
