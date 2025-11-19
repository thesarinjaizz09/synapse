import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, workflows, executions, integrations, userIntegrations, apiTokens } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Workflow queries
export async function createWorkflow(userId: number, name: string, description?: string, definition?: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await db.insert(workflows).values({
    id,
    userId,
    name,
    description,
    definition: definition || { nodes: [], edges: [] },
  });
  return id;
}

export async function getWorkflowById(id: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(workflows).where(eq(workflows.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserWorkflows(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(workflows)
    .where(eq(workflows.userId, userId))
    .orderBy(desc(workflows.updatedAt));
}

export async function updateWorkflow(id: string, updates: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(workflows).set(updates).where(eq(workflows.id, id));
}

export async function deleteWorkflow(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(workflows).where(eq(workflows.id, id));
}

// Execution queries
export async function createExecution(workflowId: string, userId: number, status: string = "pending") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await db.insert(executions).values({
    id,
    workflowId,
    userId,
    status,
    logs: [],
  });
  return id;
}

export async function getExecutionById(id: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(executions).where(eq(executions.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getWorkflowExecutions(workflowId: string, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(executions)
    .where(eq(executions.workflowId, workflowId))
    .orderBy(desc(executions.startedAt))
    .limit(limit);
}

export async function updateExecution(id: string, updates: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(executions).set(updates).where(eq(executions.id, id));
}

// Integration queries
export async function getIntegrations() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(integrations);
}

export async function getIntegrationById(id: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(integrations).where(eq(integrations.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// User Integration queries
export async function getUserIntegrations(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(userIntegrations).where(eq(userIntegrations.userId, userId));
}

export async function createUserIntegration(userId: number, integrationId: string, credentials: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = `ui_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await db.insert(userIntegrations).values({
    id,
    userId,
    integrationId,
    credentials,
  });
  return id;
}

// API Token queries
export async function createApiToken(userId: number, name: string, token: string, expiresAt?: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await db.insert(apiTokens).values({
    id,
    userId,
    name,
    token,
    expiresAt,
  });
  return id;
}

export async function getUserApiTokens(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(apiTokens).where(eq(apiTokens.userId, userId));
}

export async function deleteApiToken(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(apiTokens).where(eq(apiTokens.id, id));
}
