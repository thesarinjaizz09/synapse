'use client'
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type Node, type Edge, type NodeChange, type EdgeChange, type Connection, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GlobalContainer, GlobalErrorView, GlobalHeader, GlobalLoadingView } from "@/components/globals/global-views"
import { Spinner } from "@/components/ui/spinner"
import { themeClasses } from "@/components/ui/stats"
import { useDeleteWorkflow, useSuspenseWorkflow, useUpdateWorkflow } from "@/features/workflows/hooks/use-workflows"
import { formatDistanceToNow } from "date-fns"
import { Ban, Clock, Cog, Pause, PlayCircle, Save, TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { NODE_COMPONENTS } from '@/constants/node-components';
import { GlobalButton } from '@/components/globals/global-components';


export const CanvasHeader = ({ disabled, id }: { disabled?: boolean, id: string }) => {
    const router = useRouter()

    const { data, isLoading } = useSuspenseWorkflow(id)
    const { workflow } = data

    const { mutateAsync: removeWorkflow, isPending } = useDeleteWorkflow()
    const { mutateAsync: updateWorkflow, isPending: isUpdating } = useUpdateWorkflow()

    const handleRemoveWorkflow = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isPending || isPending) {
            return
        }

        removeWorkflow({ id: workflow.id }, {
            onSuccess: () => {
                router.push('/workflows')
            }
        })
    }

    const handleUpdateWorkflow = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isUpdating || isPending) {
            return
        }

        updateWorkflow({ id: workflow.id, status: workflow.status === "ACTIVE" ? "INACTIVE" : "ACTIVE", name: workflow.name })
    }


    const actions = <div className="flex items-center justify-center gap-2">
        <div className={`border px-2 py-1.5 flex items-center gap-1 rounded-sm ${themeClasses[workflow.status]}`}>
            <p className={`text-[11px] tracking-wider`}>
                {workflow.status}
            </p>
        </div>

        {workflow.status === "ACTIVE" && <div className="border px-2 py-1.5 flex items-center justify-center rounded-sm bg-blue-500/10 border-blue-500/20 text-blue-400 gap-2">
            <Clock className="size-4" />
            <p className='text-[10.5px] tracking-wider'>
                98.58%
            </p>
        </div>}

        <div className="border px-2 py-1.5 flex items-center gap-3 rounded-sm bg-primary/10 border-primary/20" aria-disabled={isLoading || isUpdating || isPending}>
            <GlobalButton onClick={() => { }} disabled={true} className="cursor-pointer">
                {
                    false ?
                        <Spinner className="size-4" /> :
                        <Save className="size-4" />
                }
            </GlobalButton>
            {
                workflow.status === "FAILED" &&
                <GlobalButton className='cursor-pointer'>
                    <Ban className="size-4 text-red-500" />
                </GlobalButton>
            }
            {
                workflow.status !== "ACTIVE" ?
                    <GlobalButton onClick={handleUpdateWorkflow} disabled={isUpdating || isPending} className='cursor-pointer'>
                        {isUpdating ?
                            <Spinner className="size-4" /> :
                            <PlayCircle className="size-4 text-green-500 hover:scale-120 hover:text-primary/80" />}
                    </GlobalButton> :
                    <GlobalButton onClick={handleUpdateWorkflow} disabled={isUpdating || isPending} className='cursor-pointer'>
                        {isUpdating ?
                            <Spinner className="size-4" /> :
                            <Pause className="size-4 text-red-500 hover:scale-120 hover:text-primary/80" />}
                    </GlobalButton>
            }
            <GlobalButton onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                e.stopPropagation()
            }} disabled={true} className="cursor-pointer">
                {false ?
                    <Spinner className="size-4" /> :
                    <Cog className="size-4 " />}
            </GlobalButton>
            <GlobalButton onClick={handleRemoveWorkflow} disabled={isPending || isUpdating} className="cursor-pointer">
                {isPending ?
                    <Spinner className="size-4" /> :
                    <TrashIcon className="size-4 text-red-500 hover:scale-120 hover:text-primary/80" />}
            </GlobalButton>
        </div>
    </div>

    return (
        <>
            <GlobalHeader title={workflow.name} description={
                <>
                    Updated {formatDistanceToNow(new Date(workflow.updatedAt), { addSuffix: true })}{" "}
                    &bull; Created{" "}{formatDistanceToNow(new Date(workflow.createdAt), { addSuffix: true })}
                </>
            } disabled={disabled} isCreating={false} showNewButton={false} actions={actions} isFetching={isLoading} />
        </>
    )
}

export const CanvasLoader = () => {
    return (
        <GlobalLoadingView message='Rendering canvas...' />
    )
}

export const CanvasError = () => {
    return (
        <GlobalErrorView message='Error rendering canvas...' />
    )
}

export const CanvasContainer = ({ children, id }: { children: React.ReactNode, id: string }) => {
    return (
        <GlobalContainer
            header={<CanvasHeader id={id} />}
        >
            {children}
        </GlobalContainer>
    )
}


// --------CANVAS EDITOR---------

export const CanvasEditor = ({ id }: { id: string }) => {
    const { data, isLoading } = useSuspenseWorkflow(id)
    const { workflow } = data
    if (isLoading) return <CanvasLoader />

    const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
    const [edges, setEdges] = useState<Edge[]>(workflow.edges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );


    return (
        <div className="size-full bg-muted rounded-md">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={NODE_COMPONENTS}
                fitView
                proOptions={{
                    hideAttribution: true
                }}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div >
    )
}