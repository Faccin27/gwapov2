"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { PROJECT_TYPES } from "@/lib/projects"
import { BENTO_FEATURES } from "@/lib/bento-features"
import { CARD_TOOLS } from "@/lib/card-tools"
import type { Project } from "@prisma/client"

type ProjectAction = (
  prevState: string | undefined,
  formData: FormData,
) => Promise<string | undefined>

export function ProjectForm({
  action,
  project,
  submitLabel,
}: {
  action: ProjectAction
  project?: Project
  submitLabel: string
}) {
  const [error, formAction, pending] = useActionState(action, undefined)
  const [keepImages, setKeepImages] = useState<string[]>(project?.images ?? [])

  function moveKeepImage(index: number, direction: -1 | 1) {
    setKeepImages((imgs) => {
      const target = index + direction
      if (target < 0 || target >= imgs.length) return imgs
      const next = [...imgs]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  return (
    <form
      action={formAction}
      className="mt-8 flex flex-col gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-gray-200">
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={project?.title}
          className="rounded-lg border border-white/10 bg-[#0f0f11] px-3.5 py-2.5 text-sm text-gray-100 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-gray-200">
          Descrição curta
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={2}
          defaultValue={project?.description}
          className="rounded-lg border border-white/10 bg-[#0f0f11] px-3.5 py-2.5 text-sm text-gray-100 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="story" className="text-sm font-medium text-gray-200">
          História completa (opcional)
        </label>
        <textarea
          id="story"
          name="story"
          rows={4}
          defaultValue={project?.story ?? ""}
          className="rounded-lg border border-white/10 bg-[#0f0f11] px-3.5 py-2.5 text-sm text-gray-100 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
        />
        <p className="text-xs text-gray-500">
          Se deixado em branco, a página do projeto usa a descrição curta.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="type" className="text-sm font-medium text-gray-200">
            Categoria
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue={project?.type ?? PROJECT_TYPES[0]}
            className="rounded-lg border border-white/10 bg-[#0f0f11] px-3.5 py-2.5 text-sm text-gray-100 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="year" className="text-sm font-medium text-gray-200">
            Ano
          </label>
          <input
            id="year"
            name="year"
            type="number"
            required
            min={2000}
            max={2100}
            defaultValue={project?.year ?? new Date().getFullYear()}
            className="rounded-lg border border-white/10 bg-[#0f0f11] px-3.5 py-2.5 text-sm text-gray-100 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="url" className="text-sm font-medium text-gray-200">
          Link do site (opcional)
        </label>
        <input
          id="url"
          name="url"
          type="url"
          placeholder="https://"
          defaultValue={project?.url ?? ""}
          className="rounded-lg border border-white/10 bg-[#0f0f11] px-3.5 py-2.5 text-sm text-gray-100 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="technologies" className="text-sm font-medium text-gray-200">
          Tecnologias (uma por linha)
        </label>
        <textarea
          id="technologies"
          name="technologies"
          rows={4}
          defaultValue={project?.technologies.join("\n")}
          className="rounded-lg border border-white/10 bg-[#0f0f11] px-3.5 py-2.5 text-sm text-gray-100 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
        <input
          type="checkbox"
          name="forSale"
          defaultChecked={project?.forSale}
          className="h-4 w-4 rounded border-white/10 bg-[#0f0f11] accent-rose-500"
        />
        Projeto à venda
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-200">Funcionalidades exibidas na página do projeto</span>
        <p className="text-xs text-gray-500">
          Só as funcionalidades marcadas aparecem na seção de destaques (os cards grandes) do projeto.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {BENTO_FEATURES.map((feature) => (
            <label
              key={feature.key}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0f0f11] px-3 py-2.5 text-sm text-gray-200"
            >
              <input
                type="checkbox"
                name="features"
                value={feature.key}
                defaultChecked={project?.features.includes(feature.key)}
                className="h-4 w-4 rounded border-white/10 bg-[#0f0f11] accent-rose-500"
              />
              {feature.title}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-200">
          Opções exibidas em &quot;Todas as funções que você precisa, em um só lugar&quot;
        </span>
        <p className="text-xs text-gray-500">
          Só as marcadas aparecem nas pilulas Build/Deploy abaixo desse título, na página do projeto.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CARD_TOOLS.map((tool) => (
            <label
              key={tool.key}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0f0f11] px-3 py-2.5 text-sm text-gray-200"
            >
              <input
                type="checkbox"
                name="cardTools"
                value={tool.key}
                defaultChecked={project?.cardTools.includes(tool.key)}
                className="h-4 w-4 rounded border-white/10 bg-[#0f0f11] accent-rose-500"
              />
              {tool.label}
              <span className="ml-auto text-[10px] uppercase text-gray-500">{tool.group}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-200">Fotos do projeto</span>
        <p className="text-xs text-gray-500">
          Use as setas para reordenar. A primeira foto (marcada como &quot;Capa&quot;) é usada como thumbnail do
          projeto.
        </p>

        {keepImages.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {keepImages.map((url, index) => (
              <div
                key={url}
                className="group relative h-24 w-24 overflow-hidden rounded-xl border border-[#ffffff1f] bg-white/5"
              >
                <Image src={url} alt="" fill className="object-cover" />
                <input type="hidden" name="keepImages" value={url} />

                {index === 0 && (
                  <span className="absolute left-1 top-1 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                    Capa
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setKeepImages((imgs) => imgs.filter((u) => u !== url))}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Remover imagem"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-1 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => moveKeepImage(index, -1)}
                    disabled={index === 0}
                    aria-label="Mover para a esquerda"
                    className="flex h-6 w-6 items-center justify-center rounded-full text-white disabled:opacity-30"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveKeepImage(index, 1)}
                    disabled={index === keepImages.length - 1}
                    aria-label="Mover para a direita"
                    className="flex h-6 w-6 items-center justify-center rounded-full text-white disabled:opacity-30"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <NewImagesPicker showCoverBadge={keepImages.length === 0} />
        <p className="text-xs text-gray-500">
          {project
            ? "Novas fotos entram no fim da lista — se quiser usar uma delas como capa, salve e reordene em seguida."
            : "Selecione uma ou mais fotos e reordene abaixo. A primeira vira a capa."}{" "}
          Máximo 5MB por imagem.
        </p>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="neon-glow self-start rounded-full bg-[#fd356e] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Salvando..." : submitLabel}
      </button>
    </form>
  )
}

function NewImagesPicker({ showCoverBadge }: { showCoverBadge: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState<{ file: File; url: string }[]>([])

  function syncInput(next: { file: File; url: string }[]) {
    const dt = new DataTransfer()
    next.forEach(({ file }) => dt.items.add(file))
    if (inputRef.current) inputRef.current.files = dt.files
    setItems(next)
  }

  useEffect(() => {
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.url))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function moveItem(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[index], next[target]] = [next[target], next[index]]
    syncInput(next)
  }

  return (
    <div className="flex flex-col gap-2">
      {items.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {items.map((item, i) => (
            <div
              key={item.url}
              className="group relative h-24 w-24 overflow-hidden rounded-xl border border-rose-500/40 bg-white/5"
            >
              <Image src={item.url} alt="" fill className="object-cover" />

              {showCoverBadge && i === 0 && (
                <span className="absolute left-1 top-1 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Capa
                </span>
              )}

              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(item.url)
                  syncInput(items.filter((_, idx) => idx !== i))
                }}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remover imagem"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-1 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => moveItem(i, -1)}
                  disabled={i === 0}
                  aria-label="Mover para a esquerda"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white disabled:opacity-30"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(i, 1)}
                  disabled={i === items.length - 1}
                  aria-label="Mover para a direita"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white disabled:opacity-30"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        name="images"
        accept="image/*"
        multiple
        onChange={(e) => {
          const selected = Array.from(e.target.files ?? [])
          if (selected.length === 0) return
          syncInput([
            ...items,
            ...selected.map((file) => ({
              file,
              url: URL.createObjectURL(file),
            })),
          ])
        }}
        className="text-sm text-gray-200 file:mr-4 file:rounded-full file:border-0 file:bg-rose-500/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-rose-400"
      />
    </div>
  )
}
