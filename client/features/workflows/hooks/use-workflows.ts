import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useWorkflowParams } from "./use-workflow-params"

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC()
    const { page, pageSize, search } = useWorkflowParams()

    return useSuspenseQuery(trpc.workflows.getAll.queryOptions({
        page,
        pageSize,
        search
    }))
}

export const useCreateWorkflow = () => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(data.message || "Workflow created successfully!")
                queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}))
            },
            onError: (data) => {
                toast.error(data.message || "Failed to create workflow...")
            },
        }),
    )
}