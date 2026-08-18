"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { deleteProject } from "./actions"

export function DeleteButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Excluir "${title}"? Essa ação não pode ser desfeita.`)) return
        startTransition(async () => {
          await deleteProject(id)
        })
      }}
      className="rounded-full border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
