CREATE TABLE `players` (
	`id` text PRIMARY KEY NOT NULL,
	`token_hash` text NOT NULL,
	`name` text NOT NULL,
	`best_score` integer DEFAULT 0 NOT NULL,
	`best_gifts` integer DEFAULT 0 NOT NULL,
	`rounds` integer DEFAULT 0 NOT NULL,
	`best_at` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `players_token_idx` ON `players` (`token_hash`);--> statement-breakpoint
CREATE INDEX `players_ranking_idx` ON `players` (`best_score`,`best_at`,`id`);--> statement-breakpoint
CREATE TABLE `runs` (
	`id` text PRIMARY KEY NOT NULL,
	`player_id` text NOT NULL,
	`started_at` integer NOT NULL,
	`finished_at` integer,
	`score` integer,
	`gifts` integer,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `runs_player_started_idx` ON `runs` (`player_id`,`started_at`);--> statement-breakpoint
CREATE INDEX `runs_started_idx` ON `runs` (`started_at`);