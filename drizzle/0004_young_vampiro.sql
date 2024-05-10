ALTER TABLE "doors" ALTER COLUMN "name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "doors" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "devices" ADD COLUMN "token" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "doors" ADD COLUMN "domain" varchar(256) NOT NULL;