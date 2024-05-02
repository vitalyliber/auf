CREATE TABLE IF NOT EXISTS "doors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"email" varchar(256) NOT NULL,
	"door_id" integer NOT NULL
);
