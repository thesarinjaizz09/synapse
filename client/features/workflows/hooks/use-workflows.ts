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
                queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}))
                toast.success(data.message || "Workflow created successfully!")
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
                queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}))
                queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({
                    id: data.workflow.id
                }))
                toast.success(data.message || "Workflow deleted successfully!")
            },
            onError: (data) => {
                toast.error(data.message || "Failed to delete workflow...")
            },
        }),
    )
}

export const useUpdateWorkflow = () => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    return useMutation(
        trpc.workflows.update.mutationOptions({
            onSuccess: (data) => {
                queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}))
                queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({
                    id: data.workflow.id
                }))
                toast.success(data.message || "Workflow updated successfully!")
            },
            onError: (data) => {
                toast.error(data.message || "Failed to update workflow...")
            },
        }),
    )
}