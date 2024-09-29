ALTER TABLE "Teacher" RENAME COLUMN "user_id" TO "student_id";--> statement-breakpoint
ALTER TABLE "TeacherChapter" RENAME COLUMN "user_id" TO "student_id";--> statement-breakpoint
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_user_id_User_id_fk";
--> statement-breakpoint
ALTER TABLE "TeacherChapter" DROP CONSTRAINT "TeacherChapter_user_id_User_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_student_id_User_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TeacherChapter" ADD CONSTRAINT "TeacherChapter_student_id_User_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
