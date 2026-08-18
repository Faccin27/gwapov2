"use client"

import { useActionState } from "react"
import { loginAction } from "./actions"

export default function AdminLoginPage() {
  const [error, formAction, pending] = useActionState(loginAction, undefined)

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#19191c] px-5 font-aeonik">
      <div className="w-full max-w-sm rounded-2xl border border-[#ffffff0f] bg-[#1f1f23] p-8 shadow-sm">
        <h1 className="text-xl font-bold text-gray-100">Painel Gwapo</h1>
        <p className="mt-1 text-sm text-gray-400">Entre com sua conta de administrador.</p>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-200">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="rounded-lg border border-[#ffffff1f] bg-[#19191c] px-3.5 py-2.5 text-sm text-gray-100 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-200">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="rounded-lg border border-[#ffffff1f] bg-[#19191c] px-3.5 py-2.5 text-sm text-gray-100 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="neon-glow mt-2 rounded-full bg-[#fd356e] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 disabled:opacity-60"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  )
}
