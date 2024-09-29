ALTER TABLE "Teacher" RENAME COLUMN "chapter_id" TO "teacher_id";--> statement-breakpoint
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_chapter_id_User_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_teacher_id_User_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
