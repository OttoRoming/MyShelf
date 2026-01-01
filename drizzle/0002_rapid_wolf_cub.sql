ALTER TABLE `book` ADD `olid` text;--> statement-breakpoint
CREATE UNIQUE INDEX `book_olid_unique` ON `book` (`olid`);