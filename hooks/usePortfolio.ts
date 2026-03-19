"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPortfolio, addHolding, updateHolding, removeHolding } from "@/lib/api";
import type { PortfolioResponse } from "@/types/portfolio";

export function usePortfolio() {
    const queryClient = useQueryClient();

    const query = useQuery<PortfolioResponse>({
        queryKey: ["portfolio"],
        queryFn: fetchPortfolio,
    });

    const addMutation = useMutation({
        mutationFn: addHolding,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateHolding,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        },
    });

    const removeMutation = useMutation({
        mutationFn: removeHolding,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        },
    });

    return {
        holdings: query.data?.holdings ?? [],
        summary: query.data?.summary ?? {
            totalValue: 0,
            totalCost: 0,
            totalPnL: 0,
            totalPnLPercent: 0,
        },
        isLoading: query.isLoading,
        addHolding: addMutation.mutate,
        updateHolding: updateMutation.mutate,
        removeHolding: removeMutation.mutate,
    };
}
