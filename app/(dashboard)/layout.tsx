import { TopBar } from "@/components/layout/Topbar"

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen bg-[#F0EFEB]">
            <TopBar />
            <main className="p-6">{children}</main>
        </div>
    )
}