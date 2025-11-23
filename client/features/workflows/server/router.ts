import z from "zod";
import prismaClient from "@/lib/db";
import { WorkflowStatus } from "@/lib/generated/prisma/enums";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

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
                    message: "Workflow created successfully",
                    error: null
                };
            } catch (error) {
                return { 
                    error: "Failed to create workflow", 
                    success: false, 
                    message: null, 
                    workflow: null 
                };
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
                    message: "Workflow deleted successfully",
                    error: null
                };
            } catch (error) {
                return { 
                    error: "Failed to delete workflow", 
                    success: false, 
                    message: null, 
                    workflow: null 
                };
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
                const updated = await prismaClient.workflow.update({
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
                    workflow: updated,
                    success: true,
                    message: "Workflow updated successfully",
                    error: null,
                };
            } catch (error) {
                return {
                    workflow: null,
                    success: false,
                    message: null,
                    error: "Failed to update workflow",
                };
            }
        }),
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                const workflow = await prismaClient.workflow.findFirst({
                    where: {
                        id: input.id,
                        userId: ctx.session.user.id,
                    },
                });

                if (!workflow) {
                    return {
                        workflow: null,
                        success: false,
                        message: null,
                        error: "Workflow not found",
                    };
                }

                return {
                    workflow,
                    success: true,
                    message: "Workflow fetched successfully",
                    error: null,
                };
            } catch (error) {
                return {
                    workflow: null,
                    success: false,
                    message: null,
                    error: "Failed to fetch workflow",
                };
            }
        }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
        try {
            const workflows = await prismaClient.workflow.findMany({
                where: { userId: ctx.session.user.id },
                orderBy: { createdAt: "desc" },
            });

            return {
                workflows,
                success: true,
                message: "Workflows fetched successfully",
                error: null,
            };
        } catch (error) {
            return {
                workflows: [],
                success: false,
                message: null,
                error: "Failed to fetch workflows",
            };
        }
    })
});