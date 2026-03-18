"use client"

import { signOut } from "next-auth/react"
import { Session } from "next-auth"

interface Props {
    session: Session
}

export function UserMenu({ session }: Props) {
    return (
        <div className="flex items-center gap-4">
            <span className="hidden text-xs text-surface-500 sm:block">{session.user?.email}</span>
            <button
                onClick={() => signOut({ callbackUrl: "/login"})}
                className="text-xs font-medium text-surface-600 transition-colors hover:text-surface-900"
            >
                Sign out
            </button>
        </div>
    )
}
