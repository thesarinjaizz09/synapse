'use client'

import React, { useMemo } from 'react'
import { formatDistanceToNow } from 'date-fns'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge';
import { generateSlug } from "random-word-slugs";
import { GlobalContainer, GlobalEmptyView, GlobalErrorView, GlobalHeader, GlobalItem, GlobalList, GlobalLoadingView, GlobalPagination, GlobalSearch } from "@/components/globals/global-views"
import { useCreateWorkflow, useDeleteWorkflow, useSuspenseWorkflows, useUpdateWorkflow } from "../hooks/use-workflows"
import { toast } from "sonner";
import { useWorkflowParams } from "../hooks/use-workflow-params";
import { useGlobalSearch } from "../hooks/use-global-search";
import type { Workflow } from '@/lib/generated/prisma/client';
import { Ban, Pause, PlayCircle, Clock, TrashIcon, WorkflowIcon, Cog } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { themeClasses } from '@/components/ui/stats';

export const WorkflowsTableTanstack = () => {
    const workflows = useSuspenseWorkflows()

    const columns = useMemo<ColumnDef<Workflow>[]>(() => [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: info => {
                const value = info.getValue<string>()
                return <span>{value}</span>
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: info => {
                const status = info.getValue<'ACTIVE' | 'INACTIVE'>()
                return (
                    <Badge
                        variant={status === 'ACTIVE' ? 'default' : 'destructive'}
                        className="uppercase"
                    >
                        {status}
                    </Badge>
                )
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: info => (
                <span className="text-gray-600">
                    {new Date(info.getValue<string>()).toLocaleString()}
                </span>
            ),
        },
        {
            accessorKey: 'updatedAt',
            header: 'Updated At',
            cell: info => (
                <span className="text-gray-600">
                    {new Date(info.getValue<string>()).toLocaleString()}
                </span>
            ),
        },
    ], [])


    const table = useReactTable({
        data: workflows.data?.workflows || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:bg-gray-900 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {workflows.isFetching && (
                <div className="p-2 text-gray-500 text-sm">Updating...</div>
            )}
        </div>
    )
}
export const WorkflowsTable = () => {
    const workflows = useSuspenseWorkflows()

    if (workflows.data?.workflows.length === 0) return <WorkflowsEmpty />

    return (
        <div className='min-h-[300px] h-fit overflow-y-auto rounded-md'>
            {workflows.isLoading ? <WorkflowsLoader /> :
                <GlobalList
                    items={workflows.data?.workflows || []}
                    getKey={workflow => workflow.id}
                    renderItem={workflow => <WorkflowsItem workflow={workflow} />}
                    emptyView={<WorkflowsEmpty />}
                />
            }
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

export const WorkflowsSearch = () => {
    const { params, setParams } = useWorkflowParams()
    const { search, onSearchChange } = useGlobalSearch({ params, setParams })

    return (
        <GlobalSearch placeholder="Search workflows..." onChange={onSearchChange} value={search} />
    )
}

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows()
    const { params, setParams } = useWorkflowParams()

    return (
        workflows.data?.workflows.length !== 0 && <GlobalPagination disabled={workflows.isFetching} {...params} onPageChange={(page) => setParams({ ...params, page })} totalPages={workflows.data?.totalPages} page={workflows.data?.page} onPageSizeChange={pageSize => setParams({ ...params, pageSize })} />
    )
}

export const WorkflowsLoader = () => {
    return (
        <GlobalLoadingView message='Fetching workflows...' />
    )
}

export const WorkflowsError = () => {
    return (
        <GlobalErrorView message='Error fetching workflows...' />
    )
}

export const WorkflowsEmpty = ({ disabled }: { disabled?: boolean }) => {
    const { params, setParams } = useWorkflowParams()
    const { mutate: createWorkflow, isPending } = useCreateWorkflow()

    const handleCreateWorkflow = () => {
        createWorkflow({ name: generateSlug() }, {
            onSuccess: (data) => {
                setParams({ ...params, page: 1, search: "" })
            },
            onError: (error) => {
                toast.error(error.message || "Failed to create workflow...")
            }
        }
        )
    }

    return (
        <>
            <GlobalEmptyView title='No Workflows Found!' message='No workflows found. Get started by creating a workflow...' newButtonLabel='Create Workflow' secondaryButtonLabel='Import Workflow' isCreating={isPending} disabled={disabled} onNew={handleCreateWorkflow} />
        </>
    )
}

export const WorkflowsItem = ({ workflow }: { workflow: Workflow }) => {
    const { mutateAsync: removeWorkflow, isPending } = useDeleteWorkflow()
    const { mutateAsync: updateWorkflow, isPending: isUpdating } = useUpdateWorkflow()

    const handleRemoveWorkflow = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isPending) {
            return
        }

        removeWorkflow({ id: workflow.id })
    }

    const handleUpdateWorkflow = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isUpdating) {
            return
        }

        updateWorkflow({ id: workflow.id, status: workflow.status === "ACTIVE" ? "INACTIVE" : "ACTIVE", name: workflow.name })
    }

    const actions = <div className="flex items-center justify-center gap-2">
        <div className={`border px-2 py-1.5 flex items-center gap-1 rounded-sm transition-transform duration-200 hover:rounded-lg hover:scale-102 ${themeClasses[workflow.status]}`}>
            <p className={`text-[10.5px] tracking-wider`}>
                {workflow.status}
            </p>
        </div>

        {workflow.status === "ACTIVE" && <div className="border px-2 py-1.5 flex items-center justify-center rounded-sm transition-transform duration-200 hover:rounded-lg hover:scale-102 bg-blue-500/10 border-blue-500/20 text-blue-400 gap-2">
            <Clock className="size-4" />
            <p className='text-[10.5px] tracking-wider'>
                98.58%
            </p>
        </div>}

        <div className="border px-2 py-1.5 flex items-center gap-3 rounded-sm transition-transform duration-200 hover:rounded-lg hover:scale-102 bg-primary/10 border-primary/20">
            {workflow.status === "FAILED" &&
                <button className='cursor-pointer'>
                    <Ban className="size-4 text-red-500" />
                </button>}
            {workflow.status !== "ACTIVE" ?
                <button onClick={handleUpdateWorkflow} disabled={isUpdating} className='cursor-pointer'>
                    {isUpdating ?
                        <Spinner className="size-4" /> :
                        <PlayCircle className="size-4" />}
                </button> :
                <button onClick={handleUpdateWorkflow} disabled={isUpdating} className='cursor-pointer'>
                    {isUpdating ?
                        <Spinner className="size-4" /> :
                        <Pause className="size-4 text-red-500" />}
                </button>}
            <button onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                e.stopPropagation()
            }} disabled={true} className="cursor-pointer">
                {isPending ?
                    <Spinner className="size-4" /> :
                    <Cog className="size-4" />}
            </button>
            <button onClick={handleRemoveWorkflow} disabled={isPending} className="cursor-pointer">
                {isPending ?
                    <Spinner className="size-4" /> :
                    <TrashIcon className="size-4" />}
            </button>
        </div>
    </div>

    return (
        <GlobalItem href={`/workflows/${workflow.id}`} title={workflow.name} subtitle={
            <>
                Updated {formatDistanceToNow(new Date(workflow.updatedAt), { addSuffix: true })}{" "}
                &bull; Created{" "}{formatDistanceToNow(new Date(workflow.createdAt), { addSuffix: true })}
            </>
        } image={
            <div className="flex items-center justify-center border rounded-sm p-2">
                <WorkflowIcon className='size-5 text-primary' />
            </div>
        } isRemoving={isPending || isUpdating} actions={actions} />
    )
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <GlobalContainer
            header={<WorkflowsHeader />}
            search={<WorkflowsSearch />}
            pagination={<WorkflowsPagination />}
        >
            {children}
        </GlobalContainer>
    )
}