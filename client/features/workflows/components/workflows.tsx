'use client'

import { useSuspenseWorkflows } from "../hooks/use-workflows"

const WorkflowsContainer = () => {
    const workflows = useSuspenseWorkflows()

    return (
        <div>
            <p>
                {JSON.stringify(workflows.data.workflows, null, 2)}
            </p>
        </div>
    )
}

export default WorkflowsContainer