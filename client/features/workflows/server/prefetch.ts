import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type Input = inferInput<typeof trpc.workflows.getAll>;

export const prefetchWorkflows = async (params: Input) => {
    return prefetch(trpc.workflows.getAll.queryOptions(params));
}