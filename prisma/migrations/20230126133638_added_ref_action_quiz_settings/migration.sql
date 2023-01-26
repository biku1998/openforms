-- DropForeignKey
ALTER TABLE "form_quiz_settings" DROP CONSTRAINT "form_quiz_settings_form_id_fkey";

-- AddForeignKey
ALTER TABLE "form_quiz_settings" ADD CONSTRAINT "form_quiz_settings_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
