'use client'

import { generateSlug } from "random-word-slugs";
import { GlobalContainer, GlobalHeader } from "@/components/globals/global-views"
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { toast } from "sonner";

export const WorkflowsTable = () => {
    const workflows = useSuspenseWorkflows()

    return (
        <div>
            <p>
                {JSON.stringify(workflows.data, null, 2)}
            </p>
        </div>
    )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
    const { mutate: createWorkflow, isPending } = useCreateWorkflow()
    const handleCreateWorkflow = () => {
        createWorkflow({ name: generateSlug() }, {
            onError: (error) => {
                toast.error(error.message || "Failed to create workflow...")
            }
        }
        )
    }
    return (
        <>
            <GlobalHeader title="Workflows" description="Create and manage all the workflows you have access to..." onNew={handleCreateWorkflow} disabled={disabled} newButtonLabel="New Workflow" isCreating={isPending} />
        </>
    )
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <GlobalContainer
            header={<WorkflowsHeader />}
            search={<></>}
            pagination={<></>}
        >
            {children}
        </GlobalContainer>
    )
}