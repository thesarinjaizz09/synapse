import z from "zod";
import prismaClient from "@/lib/db";
import { WorkflowStatus } from "@/lib/generated/prisma/enums";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const workflowsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const newWorkflow = await prismaClient.workflow.create({
          data: {
            id: crypto.randomUUID(),
            name: input.name,
            status: WorkflowStatus.INACTIVE,
            userId: ctx.session.user.id,
          },
        });

        return {
          workflow: newWorkflow,
          success: true,
          message: "Workflow created successfully!",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create workflow",
          cause: error,
        });
      }
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const deletedWorkflow = await prismaClient.workflow.delete({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
        });

        return {
          workflow: deletedWorkflow,
          success: true,
          message: "Workflow deleted successfully!",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete workflow",
          cause: error,
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        status: z.enum(WorkflowStatus).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedWorkflow = await prismaClient.workflow.update({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
          data: {
            ...(input.name && { name: input.name }),
            ...(input.status && { status: input.status }),
          },
        });

        return {
          workflow: updatedWorkflow,
          success: true,
          message: "Workflow updated successfully!",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update workflow",
          cause: error,
        });
      }
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const workflow = await prismaClient.workflow.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!workflow) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workflow not found",
        });
      }

      return {
        workflow,
        success: true,
        message: "Workflow fetched successfully!",
      };
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const workflows = await prismaClient.workflow.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        orderBy: { createdAt: "desc" },
      });

      return {
        workflows,
        success: true,
        message: "Workflows fetched successfully!",
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch workflows",
        cause: error,
      });
    }
  }),
});
