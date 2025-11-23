'use client'

import { GlobalContainer, GlobalHeader } from "@/components/globals/global-views"
import { useSuspenseWorkflows } from "../hooks/use-workflows"

export const WorkflowsTable = () => {
    const workflows = useSuspenseWorkflows()

    return (
        <div>
            <p>
                {JSON.stringify(workflows.data?.workflows, null, 2)}
            </p>
        </div>
    )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
    return (
        <>
            <GlobalHeader title="Workflows" description="Create and manage all the workflows you have access to..." onNew={() => { }} disabled={disabled} newButtonLabel="New Workflow" isCreating={false} />
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