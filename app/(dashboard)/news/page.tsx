"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchMarketNews } from "@/lib/api"
import NewsCard from "@/components/news/NewsCard"

export default function NewsPage() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["market-news"],
        queryFn: fetchMarketNews,
    })

    return (
        <div className="space-y-3">
            <h1 className="text-display-sm text-surface-900">Market News</h1>

            {isLoading && (
                <div className="card p-6">
                    <p className="text-sm text-surface-500">Loading news...</p>
                </div>
            )}

            {isError && (
                <div className="card p-6">
                    <p className="text-sm text-down">Failed to load news.</p>
                </div>
            )}

            {!isLoading && !isError && data && (
                <div className="space-y-3">
                    {data.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    )
}
