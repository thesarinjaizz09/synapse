import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

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
        <header className="mb-5 flex items-center justify-between border-b border-gray-500 pb-5">
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
        <div className="flex flex-col gap-8 bg-red border w-full h-full max-w-screen max-h-screen p-7 overflow-y-auto">
            {header}
            {search}
            {children}
            {pagination}
        </div>
    )
}