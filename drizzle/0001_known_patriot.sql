CREATE TABLE `doors` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text DEFAULT '',
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
ALTER TABLE users ADD `door_id` integer;