ALTER TABLE "devices" DROP COLUMN "user_agent";
ALTER TABLE "devices" ADD COLUMN "user_agent" jsonb;--> statement-breakpoint
ALTER TABLE "devices" ALTER COLUMN "user_agent" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "devices" ALTER COLUMN "user_agent" DROP NOT NULL;
