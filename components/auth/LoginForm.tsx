"use client"

import { useFormState, useFormStatus } from "react-dom"
import { loginAction } from "@/actions/auth"
import Link from "next/link"
import Image from "next/image"
import { signIn } from "next-auth/react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  )
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, null)

  return (
    <div className="card w-full max-w-md p-8">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
            <h1 className="text-display-sm text-[var(--color-text-main)]">Welcome back</h1>
            <p className="mt-1 text-sm text-[var(--color-text-sub)]">Sign in to your account</p>
        </div>
        <Image src="/logo.png" alt="BullStack" width={90} height={24} className="hidden md:block shrink-0 object-contain" style={{ maxHeight: '80px', width: 'auto' }} priority />
      </div>
    

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-sub)] mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="input-base"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[var(--color-text-sub)] mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="input-base"
          />
        </div>

        {state?.error && (
          <p className="text-xs text-down">{state.error}</p>
        )}

        <SubmitButton />
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-black/10" />
        <span className="text-xs text-[var(--color-text-sub)]">or</span>
        <div className="h-px flex-1 bg-black/10" />
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="btn-ghost w-full"
      >
        Continue with Google
      </button>

      <p className="mt-6 text-center text-xs text-[var(--color-text-sub)]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-[var(--color-text-main)] hover:text-[var(--color-text-hover)] underline underline-offset-2">
          Register
        </Link>
      </p>
    </div>
  )
}
