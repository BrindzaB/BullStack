"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWatchlist, addToWatchlist, removeFromWatchlist } from "@/lib/api";

export function useWatchlist() {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ["watchlist"],
        queryFn: fetchWatchlist
    });

    const addMutation = useMutation({
        mutationFn: addToWatchlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watchlist"] })
        }
    });

    const removeMutation = useMutation({
        mutationFn: removeFromWatchlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watchlist"] })
        }
    });

    return {
        watchlist: query.data ?? [],
        isLoading: query.isLoading,
        addToWatchlist: addMutation.mutate,
        removeFromWatchlist: removeMutation.mutate,
    }
}
