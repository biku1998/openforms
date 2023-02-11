/*
  Warnings:

  - You are about to drop the column `created_at` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `last_updated_at` on the `forms` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_first_name_idx";

-- AlterTable
ALTER TABLE "forms" DROP COLUMN "created_at",
DROP COLUMN "last_updated_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastUpdatedAt" TIMESTAMPTZ(3);
