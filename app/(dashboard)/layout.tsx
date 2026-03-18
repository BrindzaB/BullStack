import { TopBar } from "@/components/layout/Topbar"

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen bg-surface-200">
            <TopBar />
            <main className="mx-auto max-w-7xl p-6">{children}</main>
        </div>
    )
}