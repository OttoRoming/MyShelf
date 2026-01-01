CREATE TABLE `author` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `book` (
	`id` text PRIMARY KEY NOT NULL,
	`isbn` text,
	`title` text NOT NULL,
	`subtitle` text,
	`publish_year` integer,
	`description` text,
	`publisher` text,
	`language` text,
	`explicit` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `book_isbn_unique` ON `book` (`isbn`);--> statement-breakpoint
CREATE TABLE `book_author` (
	`book_id` text NOT NULL,
	`author_id` text NOT NULL,
	FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author_id`) REFERENCES `author`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `age`;