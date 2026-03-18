import { auth } from "@/lib/auth"
import { UserMenu } from "./UserMenu"
import StockSearchBar from "../stock/StockSearchBar"

export async function TopBar() {
    const session = await auth()

    return (
        <header className="sticky top-0 z-40 h-14 border-b border-surface-200 bg-white/95 backdrop-blur-sm shadow-topbar flex items-center justify-between px-6">
            <span className="logo-mark">BullStack</span>
            <StockSearchBar />
            {session && <UserMenu session={session} />}
        </header>
    )
}