DO $$ BEGIN
 ALTER TABLE "TeacherChapter" ADD CONSTRAINT "TeacherChapter_chapter_id_User_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
