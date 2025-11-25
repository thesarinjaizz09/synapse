import z from "zod";
import prismaClient from "@/lib/db";
import { WorkflowStatus, NodeType } from "@/lib/generated/prisma/enums";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { WORKFLOW_TABLE_PAGINATION } from "@/constants/config";
import { generateSlug } from "random-word-slugs";
import { NodeCreateWithoutWorkflowInput } from "@/lib/generated/prisma/models";

export const workflowsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            try {
                const newWorkflow = await prismaClient.workflow.create({
                    data: {
                        name: input.name,
                        status: WorkflowStatus.INACTIVE,
                        userId: ctx.session.user.id,
                        nodes: {
                            create: {
                                type: NodeType.INITIAL,
                                name: generateSlug(1),
                                position: { x: 0, y: 0 },
                            }
                        }
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
            const workflow = await prismaClient.workflow.findUnique({
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

    getAll: protectedProcedure
        .input(z.object({
            page: z.number().default(WORKFLOW_TABLE_PAGINATION.DEFAULT_PAGE),
            pageSize: z.number().min(WORKFLOW_TABLE_PAGINATION.MIN_PAGE_SIZE).max(WORKFLOW_TABLE_PAGINATION.MAX_PAGE_SIZE).default(WORKFLOW_TABLE_PAGINATION.DEFAULT_PAGE_SIZE),
            search: z.string().default(""),
        }))
        .query(async ({ ctx, input }) => {
            const { page, pageSize, search } = input;
            try {
                const [workflows, totalCount] = await Promise.all([
                    prismaClient.workflow.findMany({
                        where: {
                            userId: ctx.session.user.id,
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        orderBy: { createdAt: "desc" },
                        skip: (page - 1) * pageSize,
                        take: pageSize,
                    }),
                    prismaClient.workflow.count({
                        where: {
                            userId: ctx.session.user.id,
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    }),
                ]);

                const totalPages = Math.ceil(totalCount / pageSize);
                const hasNextPage = page < totalPages;
                const hasPreviousPage = page > 1;

                return {
                    page,
                    pageSize,
                    workflows,
                    totalCount,
                    totalPages,
                    hasNextPage,
                    success: true,
                    hasPreviousPage,
                    message: "Workflows fetched successfully!",
                };
            } catch (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to fetch workflows...",
                    cause: error,
                });
            }
        }),
});
