import z from "zod";
import prismaClient from "@/lib/db";
import { WorkflowStatus } from "@/lib/generated/prisma/enums";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const workflowsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ name: z.string() }))
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
                return { error: "Failed to create workflow", success: false, message: null, workflow: null };
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
                return { error: "Failed to delete workflow", success: false, message: null, workflow: null };
            }
        }),
});