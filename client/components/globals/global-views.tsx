import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";
import { SearchForm } from "../search-form";
import { Button } from "../ui/button";

export type GlobalHeaderProps = {
    title: string;
    description?: string;
    newButtonLabel: string;
    disabled?: boolean;
    isCreating?: boolean;
} & (
        | { onNew: () => void; newButtonHref?: never }
        | { newButtonHref: string; onNew?: never }
        | { onNew?: never; newButtonHref?: never }
    );

export interface GlobalSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export interface GlobalPaginationProps {
    page: number;
    pageSize: number;
    totalPages: number;
    disabled?: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}


export const GlobalHeader = ({
    title,
    description,
    newButtonLabel,
    disabled,
    isCreating,
    onNew,
    newButtonHref,
}: GlobalHeaderProps) => {
    return (
        <header className="mb-8 flex items-center justify-between border-b border-gray-500 pb-5">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                </h2>
                {description && (
                    <p className="text-[12.5px] text-muted-foreground dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>
            {newButtonLabel && (onNew || newButtonHref) && (
                newButtonHref ? (
                    <Link
                        href={newButtonHref}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
                        aria-disabled={disabled || isCreating}
                    >
                        {newButtonLabel}
                    </Link>
                ) : (
                    <button
                        onClick={onNew}
                        className={cn(`inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-sm shadow-sm text-white bg-primary hover:bg-secondary disabled:opacity-50 cursor-pointer`, disabled || isCreating ? 'cursor-not-allowed pointer-events-none opacity-50 bg-secondary' : '')}
                        aria-disabled={disabled || isCreating}
                    >
                        {
                            isCreating ? <><Spinner className="mr-2 " /> Creating Workflow...</> : <><PlusIcon className="mr-2 h-4 w-4" />{newButtonLabel}</>
                        }
                    </button>
                )
            )}
        </header >
    )
}

export const GlobalContainer = ({
    header,
    search,
    pagination,
    children,
}: {
    header: React.ReactNode;
    search: React.ReactNode;
    pagination: React.ReactNode;
    children: React.ReactNode;
}) => {
    return (
        <div className="flex flex-col gap-6 bg-red border w-full h-full max-w-screen max-h-screen p-7 overflow-y-auto">
            {header}
            {search}
            {children}
            {pagination}
        </div>
    )
}

export const GlobalSearch = ({ value, onChange, placeholder }: GlobalSearchProps) => {
    return (
        <SearchForm value={value} onChange={onChange} placeholder={placeholder} />
    )
}

export const GlobalPagination = ({ page, pageSize, totalPages, onPageChange, onPageSizeChange, disabled }: GlobalPaginationProps) => {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages || 1}
                </span>
                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="border border-muted-foreground rounded-md p-1"
                >
                    {[10, 25, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    onClick={() => onPageChange(Math.max(page - 1, 1))}
                    disabled={page === 1 || disabled}
                    size="sm"
                    className="border border-muted-foreground rounded-md p-1"
                >
                    Previous
                </Button>
                <Button
                    onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                    disabled={page === totalPages || totalPages === 0 || disabled}
                    className="border border-muted-foreground rounded-md p-1"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}