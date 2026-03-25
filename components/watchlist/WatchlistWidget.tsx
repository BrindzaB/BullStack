"use client"

import { useQuery } from "@tanstack/react-query";
import { useWatchlist } from "@/hooks/useWatchlist";
import { fetchQuote } from "@/lib/api";
import type { FinnhubQuote } from "@/types/finnhub";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/Skeleton";

function WatchlistWidgetRow({symbol}: {symbol: string}) {
    const { data } = useQuery<FinnhubQuote>({
        queryKey: ["quote", symbol],
        queryFn: () => fetchQuote(symbol)
    })

    const isPositive = (data?.dp ?? 0) >= 0

    return (
        <Link href={`/stocks/${symbol}`} className="flex items-center justify-between py-2.5 px-2 group hover:rounded-lg hover:bg-[var(--color-light-layer-1)]">
            <span className="num font-semibold text-[var(--color-text-main)] transition-colors group-hover:text-[var(--color-text-hover)]">{symbol}</span>
            <div className="text-right">
                <p className="num text-sm font-medium text-[var(--color-text-main)]">
                    {data ? formatCurrency(data.c) : "—"}
                </p>
                <p className={`num text-xs ${isPositive ? "text-up" : "text-down"}`}>
                    {data ? `${isPositive ? "+" : ""}${data.dp.toFixed(2)}%` : "—"}
                </p>
            </div>
        </Link>
    )
}

function WatchlistWidgetSkeleton() {
    return (
        <div className="divide-y divide-black/10">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 px-2">
                    <Skeleton className="h-4 w-12" />
                    <div className="text-right space-y-1.5">
                        <Skeleton className="h-4 w-16 ml-auto" />
                        <Skeleton className="h-3 w-12 ml-auto" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function WatchlistWidget() {
    const { watchlist, isLoading } = useWatchlist()

    return (
        <div className="card p-4 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-md font-semibold text-[var(--color-text-sub)]">Watchlist</h2>
                <div className="px-2 rounded-xl btn-view-all">
                    <Link href="/watchlist" className="text-xs text-[var(--color-text-sub)] transition-colors hover:text-[var(--color-text-hover)]">
                        View all →
                    </Link>
                </div>
            </div>

            {isLoading && <WatchlistWidgetSkeleton />}

            {!isLoading && watchlist.length === 0 && (
                <p className="text-sm text-[var(--color-text-main)]">No stocks in your watchlist yet.</p>
            )}

            {!isLoading && watchlist.length > 0 && (
                <div className="flex-1 divide-y divide-black/10 rounded-xl widget-list px-4 py-3">
                    {watchlist.slice(0, 4).map((item) => (
                        <WatchlistWidgetRow key={item.symbol} symbol={item.symbol} />
                    ))}
                </div>
            )}
        </div>
    )
}
