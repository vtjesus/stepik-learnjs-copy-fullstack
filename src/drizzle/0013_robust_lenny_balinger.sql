CREATE TABLE IF NOT EXISTS "Achievement" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"photo" text,
	"descripion" text,
	"tasks" text,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserAchievement" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"achievement_id" integer NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "achievements" text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "rate" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "photo" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievement_id_Achievement_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."Achievement"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
