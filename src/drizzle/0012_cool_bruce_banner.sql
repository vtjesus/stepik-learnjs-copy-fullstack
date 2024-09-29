ALTER TABLE "TeacherChapter" DROP CONSTRAINT "TeacherChapter_chapter_id_User_id_fk";
--> statement-breakpoint
ALTER TABLE "TeacherChapter" ADD COLUMN "teacher_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TeacherChapter" ADD CONSTRAINT "TeacherChapter_teacher_id_User_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
