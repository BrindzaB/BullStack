import { auth } from "@/lib/auth"
import WatchlistWidget from "@/components/watchlist/WatchlistWidget"

export default async function DashboardPage() {
    const session = await auth()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-display-sm text-surface-900">Dashboard</h1>
                <p className="mt-1 text-sm text-surface-500">Welcome back, {session?.user?.email}</p>
            </div>
            <WatchlistWidget />
        </div>
    )
}