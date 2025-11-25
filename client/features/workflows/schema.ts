import { z } from "zod";

export const CreateWorkflowSchema = z.object({
    name: z.string().min(1, { message: "Workflow name is required" }),
    tags: z.string(),
});


export type CreateWorkflowValues = z.infer<typeof CreateWorkflowSchema>;