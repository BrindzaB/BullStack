"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchQuote } from "@/lib/api";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";

function QuoteSkeleton() {
    return (
        <div className="card p-8">
            <Skeleton className="h-3 w-12 mb-2" />
            <Skeleton className="h-9 w-40 mb-3" />
            <Skeleton className="h-5 w-28 rounded-md" />
            <div className="mt-6 grid grid-cols-3 gap-4 pt-5" style={{ borderTop: '1px solid rgba(72,71,77,0.22)' }}>
                {["Open", "High", "Low"].map((label) => (
                    <div key={label}>
                        <p className="section-label">{label}</p>
                        <Skeleton className="mt-1 h-4 w-16" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function StockQuoteCard({ symbol }: { symbol: string }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["quote", symbol],
        queryFn: () => fetchQuote(symbol),
        refetchInterval: 60_000
    });

    if (isLoading) return <QuoteSkeleton />;

    if (isError || !data) {
        return (
            <div className="card p-8">
                <p className="text-sm text-down">Failed to load quote for {symbol}.</p>
            </div>
        );
    }

    const isPositive = data.dp >= 0;

    return (
        <div className="card p-6">
            <p className="section-label text-[var(--color-text-sub)]">{symbol}</p>
            <p className="mt-1 text-display-md num text-[var(--color-text-main)]">{formatCurrency(data.c)}</p>
            <div className="mt-2">
                <span className={isPositive ? "badge-up" : "badge-down"}>
                    {isPositive ? "+" : ""}{formatCurrency(data.d)} ({formatPercent(data.dp)})
                </span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-8 pt-5">
                <div className="widget-list pl-2 py-2 text-center">
                    <p className="section-label text-[var(--color-text-sub)]">Open</p>
                    <p className="num mt-1 text-sm font-medium text-[var(--color-text-main)]">{formatCurrency(data.o)}</p>
                </div>
                <div className="widget-list pl-2 py-2 text-center">
                    <p className="section-label text-[var(--color-text-sub)]">High</p>
                    <p className="num mt-1 text-sm font-medium text-[var(--color-text-main)]">{formatCurrency(data.h)}</p>
                </div>
                <div className="widget-list pl-2 py-2 text-center">
                    <p className="section-label text-[var(--color-text-sub)]">Low</p>
                    <p className="num mt-1 text-sm font-medium text-[var(--color-text-main)]">{formatCurrency(data.l)}</p>
                </div>
            </div>
        </div>
    );
}
