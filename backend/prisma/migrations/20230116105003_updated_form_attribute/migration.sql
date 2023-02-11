-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_last_updated_by_id_fkey";

-- AlterTable
ALTER TABLE "forms" ALTER COLUMN "last_updated_by_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
