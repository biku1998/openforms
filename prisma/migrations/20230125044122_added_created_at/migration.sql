/*
  Warnings:

  - Added the required column `created_by_id` to the `form_presentation_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `form_quiz_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `form_response_settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "form_presentation_settings" ADD COLUMN     "created_by_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "form_quiz_settings" ADD COLUMN     "created_by_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "form_response_settings" ADD COLUMN     "created_by_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "form_quiz_settings" ADD CONSTRAINT "form_quiz_settings_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_response_settings" ADD CONSTRAINT "form_response_settings_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_presentation_settings" ADD CONSTRAINT "form_presentation_settings_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
