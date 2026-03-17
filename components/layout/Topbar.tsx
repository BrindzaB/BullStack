import { auth } from "@/lib/auth"
import { UserMenu } from "./UserMenu"
import StockSearchBar from "../stock/StockSearchBar"

export async function TopBar() {
    const session = await auth()

    return (
        <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6">
            <span className="font-bold text-stone-800">BullStack</span>
            <StockSearchBar />
            {session && <UserMenu session={session} />}
        </header>
    )
}