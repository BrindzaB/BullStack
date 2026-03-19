"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Star, ChartNoAxesCombined} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/watchlist", label: "Watchlist",  icon: Star },
  { href: "/portfolio", label: "Portfolio", icon: ChartNoAxesCombined}
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-56 shrink-0 self-start sticky top-[4.5rem] h-[calc(100vh-5.5rem)]
                 rounded-2xl bg-white shadow-card border border-gray-200 flex flex-col overflow-hidden"
    >
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/")

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${active
                  ? "bg-brand-500/10 text-brand-700"
                  : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
                }`}
            >
              <Icon
                size={18}
                className={active ? "text-brand-500" : "text-surface-400"}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-5 py-4 border-t border-surface-100">
        <p className="text-xs text-surface-400">⌘K to search</p>
      </div>
    </aside>
  )
}
