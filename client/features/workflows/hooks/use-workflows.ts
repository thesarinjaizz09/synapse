import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useWorkflowParams } from "./use-workflow-params"

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC()
    const { params } = useWorkflowParams()

    return useSuspenseQuery(trpc.workflows.getAll.queryOptions(params))
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

export const useDeleteWorkflow = () => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    return useMutation(
        trpc.workflows.remove.mutationOptions({
            onSuccess: (data) => {
                toast.success(data.message || "Workflow deleted successfully!")
                queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}))
                queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({
                    id: data.workflow.id
                }))
            },
            onError: (data) => {
                toast.error(data.message || "Failed to delete workflow...")
            },
        }),
    )
}