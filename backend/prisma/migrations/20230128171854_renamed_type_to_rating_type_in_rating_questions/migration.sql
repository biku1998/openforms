/*
  Warnings:

  - You are about to drop the column `type` on the `rating_questions` table. All the data in the column will be lost.
  - Added the required column `rating_type` to the `rating_questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rating_questions" DROP COLUMN "type",
ADD COLUMN     "rating_type" "rating_type" NOT NULL;
