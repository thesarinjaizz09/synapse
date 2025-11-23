import { useState, useEffect } from "react";
import { WORKFLOW_TABLE_PAGINATION } from "@/constants/config";

interface useGlobalSearchProps<T extends {
    search: string;
    page: number
}> {
    params: T;
    setParams: (params: T) => void;
    debounceMs?: number
}

export const useGlobalSearch = <T extends {
    search: string;
    page: number
}>({ params, setParams, debounceMs = 500 }: useGlobalSearchProps<T>) => {
    const [search, setSearch] = useState(params.search);

    useEffect(() => {
        if (search === "" && params.search !== "") {
            setParams({
                ...params,
                search: "",
                page: WORKFLOW_TABLE_PAGINATION.DEFAULT_PAGE
            })

            return
        }

        const timer = setTimeout(() => {
            if (search !== params.search) {
                setParams({
                    ...params,
                    search: search,
                    page: WORKFLOW_TABLE_PAGINATION.DEFAULT_PAGE
                })
            }
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [search, params, setParams, debounceMs]);

    useEffect(() => {
        setSearch(params.search);
    }, [params.search]);

    return { search, onSearchChange: setSearch };
};