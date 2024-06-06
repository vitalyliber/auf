ALTER TABLE "doors" ADD COLUMN "users_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "devices_count" integer DEFAULT 0;