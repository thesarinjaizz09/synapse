import { AlertCircleIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";
import { SearchForm } from "../search-form";
import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StateViewProps {
    message?: string
}

interface HelperViewProps extends StateViewProps {
    view?: string
}

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

export const GlobalPagination = ({
    page,
    pageSize,
    totalPages,
    onPageChange,
    onPageSizeChange,
    disabled
}: GlobalPaginationProps) => {
    return (
        <div className="flex items-center justify-between w-full py-[6.5px] px-2 rounded-md bg-input/30 backdrop-blur-md border border-white/10 shadow-lg">

            {/* Left side */}
            <div className="flex items-center">
                <span className="text-[12.5px] tracking-wide text-muted-foreground">
                    Page <span className="text-white/70 font-medium">{page}</span> of{" "}
                    <span className="text-white/70 font-medium">{totalPages || 1}</span>
                </span>

                {/* <Select
                    value={String(pageSize)}
                    onValueChange={(val) => onPageSizeChange(Number(val))}
                >
                    <SelectTrigger className="h-8 w-[85px] bg-black/30 border-white/10 text-white text-[13px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/80 border-white/10 text-white">
                        {[5, 10, 25, 50, 100].map((size) => (
                            <SelectItem key={size} value={String(size)} className="text-white text-[13px]">
                                {size} / page
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    variant="outline"
                    disabled={page === 1 || disabled}
                    onClick={() => onPageChange(Math.max(page - 1, 1))}
                    className="
            h-6 p-0 px-5 rounded-sm 
            border-white/10 bg-white/5 text-white
            hover:bg-white/10 hover:border-white/20
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all
          "
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    disabled={page === totalPages || totalPages === 0 || disabled}
                    onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                    className="
            h-6 p-0 px-5 rounded-sm  
            border-white/10 bg-white/5 text-white
            hover:bg-white/10 hover:border-white/20
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all
          "
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export const GlobalLoadingView = ({
    view = 'items',
    message
}: HelperViewProps) => {
    return (
        <div className="flex items-center justify-center h-full border rounded-md">
            <div className="flex flex-col items-center justify-center gap-2">
                <Spinner className="text-primary size-5" />
                {
                    !!message ? <p className="text-sm font-semibold text-muted-foreground">{message}</p> : <p className="text-sm font-semibold text-muted-foreground">
                        {`Loading ${view}...`}
                    </p>
                }
            </div>
        </div>
    )
}

export const GlobalErrorView = ({
    view = 'items',
    message
}: HelperViewProps) => {
    return (
        <div className="flex items-center justify-center h-full border rounded-md">
            <div className="flex flex-col items-center justify-center gap-2">
                <AlertCircleIcon className="text-primary size-5" />
                {
                    !!message ? <p className="text-sm font-semibold text-muted-foreground">{message}</p> : <p className="text-sm font-semibold text-muted-foreground">
                        {`Error in ${view}...`}
                    </p>
                }
            </div>
        </div>
    )
}


