CREATE TABLE IF NOT EXISTS "Teacher" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"chapter_id" integer,
	"created_at" timestamp(3) DEFAULT now(),
	"completed" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp(3) DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_chapter_id_User_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_chapter_id_Chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."Chapter"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
