import { useQueryStates } from "nuqs";
import { workflowParams } from "@/features/workflows/params";

export const useWorkflowParams = () => {
  const [params, setParams] = useQueryStates(workflowParams);

  return {
    page: params.page,
    pageSize: params.pageSize,
    search: params.search,

    setPage: (page: number) => setParams({ page }),
    setPageSize: (pageSize: number) => setParams({ pageSize }),
    setSearch: (search: string) => setParams({ search }),
  };
};
