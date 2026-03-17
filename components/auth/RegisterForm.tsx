"use client"

import { useFormState, useFormStatus } from "react-dom"
import { registerAction } from "@/actions/auth"
import Link from "next/link"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
    >
      {pending ? "Creating account..." : "Create account"}
    </button>
  )
}

export function RegisterForm() {
  const [state, formAction] = useFormState(registerAction, null)

  return (
    <div className="bg-white rounded-2xl p-8 w-full max-w-md border border-gray-200">
      <h1 className="text-2xl font-bold text-stone-800 mb-2">Create an account</h1>
      <p className="text-stone-500 mb-6">Start tracking your portfolio today</p>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full bg-stone-50 border border-stone-300 text-stone-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          {state?.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
          )}
        </div>

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
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
          )}
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
            autoComplete="new-password"
            className="w-full bg-stone-50 border border-stone-300 text-stone-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password[0]}</p>
          )}
        </div>

        <SubmitButton />
      </form>

      <p className="mt-6 text-center text-stone-500 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-gray-900 hover:text-gray-700 font-medium underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </div>
  )
}
