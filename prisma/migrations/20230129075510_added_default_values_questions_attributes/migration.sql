-- AlterTable
ALTER TABLE "file_upload_questions" ALTER COLUMN "max_file_size" SET DEFAULT 10,
ALTER COLUMN "max_files" SET DEFAULT 2,
ALTER COLUMN "accepted_file_types" SET DEFAULT ARRAY[]::"file_type"[];

-- AlterTable
ALTER TABLE "nps_questions" ALTER COLUMN "high" SET DEFAULT 10,
ALTER COLUMN "low" SET DEFAULT 1,
ALTER COLUMN "low_label" SET DEFAULT 'low',
ALTER COLUMN "high_label" SET DEFAULT 'high';

-- AlterTable
ALTER TABLE "rating_questions" ALTER COLUMN "high" SET DEFAULT 10,
ALTER COLUMN "low" SET DEFAULT 1,
ALTER COLUMN "low_label" SET DEFAULT 'low',
ALTER COLUMN "high_label" SET DEFAULT 'high';
