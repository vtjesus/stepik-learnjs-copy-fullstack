ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_chapter_id_fkey";
--> statement-breakpoint
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "UserWork" DROP CONSTRAINT "UserWork_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "UserWork" DROP CONSTRAINT "UserWork_work_id_fkey";
--> statement-breakpoint
ALTER TABLE "Work" DROP CONSTRAINT "Work_chapter_id_fkey";
--> statement-breakpoint
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_chapter_id_fkey";
--> statement-breakpoint
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "LikesComment" DROP CONSTRAINT "LikesComment_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "LikesComment" DROP CONSTRAINT "LikesComment_comment_id_fkey";
--> statement-breakpoint
ALTER TABLE "FeedbackComment" DROP CONSTRAINT "FeedbackComment_comment_id_fkey";
--> statement-breakpoint
ALTER TABLE "FeedbackComment" DROP CONSTRAINT "FeedbackComment_user_id_fkey";
--> statement-breakpoint
DROP INDEX IF EXISTS "Chapter_title_key";--> statement-breakpoint
DROP INDEX IF EXISTS "User_name_key";--> statement-breakpoint
ALTER TABLE "Chapter" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Chapter" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Chapter" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "UserBook" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "UserBook" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "UserBook" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "UserBook" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "UserWork" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "UserWork" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "UserWork" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Work" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Work" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Work" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Comment" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Comment" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Comment" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "LikesComment" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "LikesComment" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "LikesComment" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "FeedbackComment" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "FeedbackComment" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "FeedbackComment" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_chapter_id_Chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."Chapter"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserWork" ADD CONSTRAINT "UserWork_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserWork" ADD CONSTRAINT "UserWork_work_id_Work_id_fk" FOREIGN KEY ("work_id") REFERENCES "public"."Work"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Work" ADD CONSTRAINT "Work_chapter_id_Chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."Chapter"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_chapter_id_Chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."Chapter"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "LikesComment" ADD CONSTRAINT "LikesComment_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "LikesComment" ADD CONSTRAINT "LikesComment_comment_id_Comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."Comment"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FeedbackComment" ADD CONSTRAINT "FeedbackComment_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FeedbackComment" ADD CONSTRAINT "FeedbackComment_comment_id_Comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."Comment"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Chapter_title_key" ON "Chapter" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_name_key" ON "User" USING btree ("name");