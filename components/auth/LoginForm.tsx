"use client"

import { useFormState, useFormStatus } from "react-dom"
import { loginAction } from "@/actions/auth"
import Link from "next/link"
import { signIn } from "next-auth/react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  )
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, null)

  return (
    <div className="bg-white rounded-2xl p-8 w-full max-w-md border border-gray-200">
      <h1 className="text-2xl font-bold text-stone-800 mb-2">Welcome back</h1>
      <p className="text-stone-500 mb-6">Sign in to your account</p>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full bg-stone-50 border border-stone-300 text-stone-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full bg-stone-50 border border-stone-300 text-stone-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        {state?.error && (
          <p className="text-red-500 text-sm">{state.error}</p>
        )}

        <SubmitButton />
      </form>

      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-stone-200" />
        <span className="text-stone-400 text-xs">or</span>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="w-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-medium py-2.5 px-4 rounded-lg transition-colors"
      >
        Continue with Google
      </button>

      <p className="mt-6 text-center text-stone-500 text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-gray-900 hover:text-gray-700 font-medium underline underline-offset-2">
          Register
        </Link>
      </p>
    </div>
  )
}
