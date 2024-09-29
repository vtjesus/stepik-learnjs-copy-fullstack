ALTER TABLE "TeacherChapter" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "Teacher" DROP COLUMN IF EXISTS "description";