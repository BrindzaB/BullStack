import { auth } from "@/lib/auth"
import { UserMenu } from "./UserMenu"
import StockSearchBar from "../stock/StockSearchBar"

export async function TopBar() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-40 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <span className="text-xl font-bold tracking-tight text-brand-500 select-none">BullStack</span>
      <div className="flex items-center justify-center flex-1">
        <StockSearchBar />
      </div>
      {session && <UserMenu session={session} />}
    </header>
  )
}
