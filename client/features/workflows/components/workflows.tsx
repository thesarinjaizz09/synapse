import { useSuspenseWorkflows } from "../hooks/use-workflows"

const WorkflowsContainer = () => {
    const workflows = useSuspenseWorkflows()
    
    return (
        <div>
            {workflows.data?.workflows.map((workflow) => (
                <div key={workflow.id}>
                    <h2>{workflow.name}</h2>
                    <p>Status: {workflow.status}</p>
                </div>
            ))}
        </div>
    )
}

export default WorkflowsContainer