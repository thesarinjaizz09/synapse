'use client'

import React, { useMemo } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge';
import { generateSlug } from "random-word-slugs";
import { GlobalContainer, GlobalErrorView, GlobalHeader, GlobalLoadingView, GlobalPagination, GlobalSearch } from "@/components/globals/global-views"
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { toast } from "sonner";
import { useWorkflowParams } from "../hooks/use-workflow-params";
import { useGlobalSearch } from "../hooks/use-global-search";
import type { Workflow } from '@/lib/generated/prisma/client';

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


    return (
        <div className='h-full max-h-screen overflow-y-auto border rounded-md'>
            {workflows.isLoading ? <GlobalLoadingView /> : <p>
                {JSON.stringify(workflows.data?.workflows, null, 2)}
            </p>}
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
        <GlobalPagination disabled={workflows.isFetching} {...params} onPageChange={(page) => setParams({ ...params, page })} totalPages={workflows.data?.totalPages} page={workflows.data?.page} onPageSizeChange={pageSize => setParams({ ...params, pageSize })} />
    )
}

export const WorkflowLoader = () => {
    return (
        <GlobalLoadingView message='Fetching workflows...' />
    )
}

export const WorkflowError = () => {
    return (
        <GlobalErrorView message='Error fetching workflows...' />
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