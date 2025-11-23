import { parseAsInteger, parseAsString } from "nuqs/server"
import { WORKFLOW_TABLE_PAGINATION } from "@/constants/config"

export const workflowParams = {
    page: parseAsInteger.withDefault(WORKFLOW_TABLE_PAGINATION.DEFAULT_PAGE).withOptions({
        clearOnDefault: true,
    }),

    pageSize: parseAsInteger.withDefault(WORKFLOW_TABLE_PAGINATION.DEFAULT_PAGE_SIZE).withOptions({
        clearOnDefault: true,
    }),

    search: parseAsString.withDefault("").withOptions({
        clearOnDefault: true,
    }),
}