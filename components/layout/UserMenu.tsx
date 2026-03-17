"use client"

import { signOut } from "next-auth/react"
import { Session } from "next-auth"

interface Props {
    session: Session
}

export function UserMenu({ session }: Props) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-stone-600">{session.user?.email}</span>
            <button
                onClick={() => signOut({ callbackUrl: "/login"})}
                className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700"
            >
                Sign out
            </button>
        </div>
    )
}