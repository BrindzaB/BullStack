"use client"

import { useWatchlist } from "@/hooks/useWatchlist";
import { Star } from "lucide-react";

export default function AddToWatchlistButton({symbol}: {symbol: string}) {
    const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

    const isInWatchlist = watchlist.some((item) => item.symbol === symbol);

    function handleClick() {
        if (isInWatchlist) {
            removeFromWatchlist(symbol);
        } else {
            addToWatchlist(symbol);
        }
    }

    return (
        <button
            onClick={handleClick}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all
                ${isInWatchlist
                    ? "border-[rgba(0,0,0,0.4)] bg-[rgba(0,0,0,0.1)] text-[var(--color-text-main)]"
                    : "btn-primary"
                }`}
        >
            <Star
                size={14}
                className={isInWatchlist ? "text-[var(--color-text-main)]" : "text-[var(--color-light-layer-2)]"}
                fill={isInWatchlist ? "currentColor" : "none"}
            />
            {isInWatchlist ? "Watching" : "Watch"}
        </button>
    )
}
