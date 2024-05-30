ALTER TABLE "doors" ADD COLUMN "user_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doors" ADD CONSTRAINT "doors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
