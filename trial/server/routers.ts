import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  
  // Authentication router
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Workflow router - CRUD operations
  workflow: router({
    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1, "Workflow name is required"),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const workflowId = await db.createWorkflow(
          ctx.user.id,
          input.name,
          input.description
        );
        return { id: workflowId, name: input.name };
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUserWorkflows(ctx.user.id);
      }),

    get: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ ctx, input }) => {
        const workflow = await db.getWorkflowById(input.id);
        if (!workflow || workflow.userId !== ctx.user.id) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }
        return workflow;
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        definition: z.any().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const workflow = await db.getWorkflowById(input.id);
        if (!workflow || workflow.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const updates: any = {};
        if (input.name !== undefined) updates.name = input.name;
        if (input.description !== undefined) updates.description = input.description;
        if (input.definition !== undefined) updates.definition = input.definition;
        if (input.isActive !== undefined) updates.isActive = input.isActive;

        await db.updateWorkflow(input.id, updates);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const workflow = await db.getWorkflowById(input.id);
        if (!workflow || workflow.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        await db.deleteWorkflow(input.id);
        return { success: true };
      }),

    duplicate: protectedProcedure
      .input(z.object({
        id: z.string(),
        newName: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const workflow = await db.getWorkflowById(input.id);
        if (!workflow || workflow.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const newId = await db.createWorkflow(
          ctx.user.id,
          input.newName,
          workflow.description || undefined,
          workflow.definition
        );
        return { id: newId };
      }),
  }),

  // Execution router - run workflows and fetch logs
  execution: router({
    run: protectedProcedure
      .input(z.object({ workflowId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const workflow = await db.getWorkflowById(input.workflowId);
        if (!workflow || workflow.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const executionId = await db.createExecution(
          input.workflowId,
          ctx.user.id,
          "running"
        );

        // TODO: Trigger workflow execution engine
        // For now, just return the execution ID
        return { executionId };
      }),

    list: protectedProcedure
      .input(z.object({
        workflowId: z.string(),
        limit: z.number().default(50),
      }))
      .query(async ({ ctx, input }) => {
        const workflow = await db.getWorkflowById(input.workflowId);
        if (!workflow || workflow.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        return await db.getWorkflowExecutions(input.workflowId, input.limit);
      }),

    get: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ ctx, input }) => {
        const execution = await db.getExecutionById(input.id);
        if (!execution || execution.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return execution;
      }),
  }),

  // Integration router - list available triggers and actions
  integration: router({
    list: protectedProcedure
      .query(async () => {
        return await db.getIntegrations();
      }),

    get: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await db.getIntegrationById(input.id);
      }),
  }),

  // User router - manage API tokens and connected services
  user: router({
    getProfile: protectedProcedure
      .query(async ({ ctx }) => {
        const user = await db.getUserById(ctx.user.id);
        if (!user) throw new TRPCError({ code: "NOT_FOUND" });
        return user;
      }),

    updateProfile: protectedProcedure
      .input(z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement profile update
        return { success: true };
      }),

    // API Tokens
    listApiTokens: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUserApiTokens(ctx.user.id);
      }),

    createApiToken: protectedProcedure
      .input(z.object({
        name: z.string(),
        expiresAt: z.date().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const token = `wfp_${Date.now()}_${Math.random().toString(36).substr(2, 32)}`;
        const id = await db.createApiToken(
          ctx.user.id,
          input.name,
          token,
          input.expiresAt || undefined
        );
        return { id, token, name: input.name };
      }),

    deleteApiToken: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Verify token ownership before deletion
        await db.deleteApiToken(input.id);
        return { success: true };
      }),

    // Connected Integrations
    listIntegrations: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUserIntegrations(ctx.user.id);
      }),

    connectIntegration: protectedProcedure
      .input(z.object({
        integrationId: z.string(),
        credentials: z.record(z.string(), z.any()),
      }))
      .mutation(async ({ ctx, input }) => {
        const id = await db.createUserIntegration(
          ctx.user.id,
          input.integrationId,
          input.credentials
        );
        return { id };
      }),
  }),
});

export type AppRouter = typeof appRouter;
