import { useQueryStates } from "nuqs";
import { workflowParams } from "@/features/workflows/params";

export const useWorkflowParams = () => {
    const [params, setParams] = useQueryStates(workflowParams);

    return {
        params,
        setParams,
    };
};
