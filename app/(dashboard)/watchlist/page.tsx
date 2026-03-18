import WatchlistTable from "@/components/watchlist/WatchlistTable";

export default function WatchlistPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-display-sm text-surface-900">Watchlist</h1>
            <WatchlistTable />
        </div>
    )
}