"use client"

import { signOut } from "next-auth/react"
import { Session } from "next-auth"
import { LogOut } from "lucide-react"

interface Props {
    session: Session
}

export function UserMenu({ session }: Props) {
    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => signOut({ callbackUrl: "/login"})}
                className="text-xs font-medium text-[var(--color-text-sub)] transition-colors hover:text-[var(--color-text-main)]"
            >
                <LogOut className="text-[var(--color-text-main)] hover:text-[var(--color-text-hover)]"/>
            </button>
        </div>
    )
}
