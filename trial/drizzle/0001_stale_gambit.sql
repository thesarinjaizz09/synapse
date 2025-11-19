CREATE TABLE `apiTokens` (
	`id` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`token` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`lastUsedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp,
	CONSTRAINT `apiTokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `apiTokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `executions` (
	`id` varchar(64) NOT NULL,
	`workflowId` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`status` enum('pending','running','success','failed','cancelled') NOT NULL,
	`logs` json NOT NULL,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`endedAt` timestamp,
	`duration` int,
	`errorMessage` text,
	CONSTRAINT `executions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `integrations` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`category` enum('trigger','action','both') NOT NULL,
	`logo` varchar(512),
	`color` varchar(7),
	`metadata` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `integrations_id` PRIMARY KEY(`id`),
	CONSTRAINT `integrations_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `userIntegrations` (
	`id` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`integrationId` varchar(64) NOT NULL,
	`credentials` json NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userIntegrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workflows` (
	`id` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`definition` json NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `workflows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);