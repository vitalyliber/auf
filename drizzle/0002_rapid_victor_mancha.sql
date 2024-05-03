CREATE TABLE IF NOT EXISTS "devices" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"online_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL,
	"user_agent" varchar NOT NULL
);
