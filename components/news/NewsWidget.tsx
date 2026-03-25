"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchMarketNews } from "@/lib/api"
import { format } from "date-fns"
import Link from "next/link"
import { Skeleton } from "@/components/ui/Skeleton"

function NewsWidgetSkeleton() {
    return (
        <div className="card p-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-md font-semibold text-[var(--color-text-sub)]">Market News</h2>
                <Link href="/news" className="text-xs text-[var(--color-text-sub)] transition-colors hover:text-[var(--color-text-hover)]">
                    View all →
                </Link>
            </div>
            <div className="divide-y divide-black/10">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="py-2.5 space-y-1.5">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function NewsWidget() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["market-news"],
        queryFn: fetchMarketNews,
    })

    if (isLoading) return <NewsWidgetSkeleton />

    return (
        <div className="card p-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-md font-semibold text-[var(--color-text-sub)]">Market News</h2>
                <div className="px-2 rounded-xl btn-view-all">
                    <Link href="/news" className="text-xs text-[var(--color-text-sub)] transition-colors hover:text-[var(--color-text-hover)]">
                        View all →
                    </Link>
                </div>
            </div>

            {isError && (
                <p className="text-sm text-down">Failed to load news.</p>
            )}

            {!isError && data && data.length === 0 && (
                <p className="text-sm text-[var(--color-text-main)]">No news available.</p>
            )}

            {!isError && data && data.length > 0 && (
                <div className="divide-y divide-black/10 px-4 widget-list">
                    {data.slice(0, 5).map((article) => (
                        <a
                            key={article.id}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-2.5 group"
                        >
                            <p className="section-label text-[var(--color-text-sub)] mb-0.5">
                                {article.source} · {format(new Date(article.datetime * 1000), "MMM d")}
                            </p>
                            <p className="text-sm font-medium text-[var(--color-text-main)] line-clamp-1 group-hover:text-[var(--color-text-hover)] transition-colors">
                                {article.headline}
                            </p>
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}
