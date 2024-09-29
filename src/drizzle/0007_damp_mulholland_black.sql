ALTER TABLE "Teacher" DROP CONSTRAINT "undefined";--> statement-breakpoint
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_chapter_id_pk" PRIMARY KEY("chapter_id");