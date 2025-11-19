import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow with better-auth integration.
 * Extended with workflow-specific fields.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Workflow table stores workflow definitions and metadata.
 * Definition is stored as JSON containing nodes, edges, and configuration.
 */
export const workflows = mysqlTable("workflows", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  definition: json("definition").notNull(), // { nodes: Node[], edges: Edge[] }
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Workflow = typeof workflows.$inferSelect;
export type InsertWorkflow = typeof workflows.$inferInsert;

/**
 * Execution table tracks workflow runs with logs and status.
 * Logs are stored as JSON for flexible schema.
 */
export const executions = mysqlTable("executions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  workflowId: varchar("workflowId", { length: 64 }).notNull(),
  userId: int("userId").notNull(),
  status: mysqlEnum("status", ["pending", "running", "success", "failed", "cancelled"]).notNull(),
  logs: json("logs").notNull(), // Array of log entries with timestamps
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  endedAt: timestamp("endedAt"),
  duration: int("duration"), // Duration in milliseconds
  errorMessage: text("errorMessage"),
});

export type Execution = typeof executions.$inferSelect;
export type InsertExecution = typeof executions.$inferInsert;

/**
 * Integration table defines available triggers and actions.
 * Metadata includes logo, color, category for UI rendering.
 */
export const integrations = mysqlTable("integrations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  category: mysqlEnum("category", ["trigger", "action", "both"]).notNull(),
  logo: varchar("logo", { length: 512 }), // URL to logo image
  color: varchar("color", { length: 7 }), // Hex color code
  metadata: json("metadata").notNull(), // Configuration schema, auth requirements, etc.
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Integration = typeof integrations.$inferSelect;
export type InsertIntegration = typeof integrations.$inferInsert;

/**
 * User integrations table for storing connected accounts and API keys.
 * Encrypted storage of credentials is recommended in production.
 */
export const userIntegrations = mysqlTable("userIntegrations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("userId").notNull(),
  integrationId: varchar("integrationId", { length: 64 }).notNull(),
  credentials: json("credentials").notNull(), // Encrypted in production
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserIntegration = typeof userIntegrations.$inferSelect;
export type InsertUserIntegration = typeof userIntegrations.$inferInsert;

/**
 * API tokens table for user-generated tokens for external access.
 */
export const apiTokens = mysqlTable("apiTokens", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("userId").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  lastUsedAt: timestamp("lastUsedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt"),
});

export type ApiToken = typeof apiTokens.$inferSelect;
export type InsertApiToken = typeof apiTokens.$inferInsert;
