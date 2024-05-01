CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP),
	`email` text
);
