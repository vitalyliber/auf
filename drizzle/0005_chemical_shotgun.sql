ALTER TABLE "devices" ALTER COLUMN "user_agent" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "devices" ALTER COLUMN "user_agent" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "devices" ALTER COLUMN "user_agent" DROP NOT NULL;