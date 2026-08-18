"use client"

import { useState } from "react"
import { Plus, Trash2, GripVertical } from "lucide-react"
import type { ContactQuestion, ContactQuestionType } from "@/lib/contact-questions"

function newQuestion(): ContactQuestion {
	return {
		id: crypto.randomUUID(),
		question: "",
		type: "choice",
		options: [],
		required: true,
	}
}

export function QuestionBuilder({ initialQuestions }: { initialQuestions: ContactQuestion[] }) {
	const [questions, setQuestions] = useState<ContactQuestion[]>(
		initialQuestions.length > 0 ? initialQuestions : [newQuestion()]
	)

	function update(id: string, patch: Partial<ContactQuestion>) {
		setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)))
	}

	function remove(id: string) {
		setQuestions((qs) => qs.filter((q) => q.id !== id))
	}

	function move(index: number, direction: -1 | 1) {
		setQuestions((qs) => {
			const target = index + direction
			if (target < 0 || target >= qs.length) return qs
			const next = [...qs]
			;[next[index], next[target]] = [next[target], next[index]]
			return next
		})
	}

	return (
		<div className="flex flex-col gap-3">
			<input type="hidden" name="contactQuestions" value={JSON.stringify(questions)} />

			{questions.map((q, index) => (
				<div key={q.id} className="rounded-xl border border-white/10 bg-[#0f0f11] p-4">
					<div className="flex items-start gap-3">
						<div className="mt-2.5 flex shrink-0 flex-col text-gray-600">
							<GripVertical className="h-4 w-4" />
						</div>

						<div className="flex-1 flex flex-col gap-3">
							<div className="flex flex-col gap-3 sm:flex-row">
								<input
									value={q.question}
									onChange={(e) => update(q.id, { question: e.target.value })}
									placeholder="Texto da pergunta (ex.: Qual seu orçamento?)"
									className="flex-1 rounded-lg border border-white/10 bg-[#19191c] px-3.5 py-2.5 text-sm text-gray-100 outline-none focus:border-rose-500/60"
								/>
								<select
									value={q.type}
									onChange={(e) => update(q.id, { type: e.target.value as ContactQuestionType })}
									className="rounded-lg border border-white/10 bg-[#19191c] px-3.5 py-2.5 text-sm text-gray-100 outline-none focus:border-rose-500/60 sm:w-56"
								>
									<option value="choice">Múltipla escolha</option>
									<option value="text">Resposta descritiva</option>
								</select>
							</div>

							{q.type === "choice" && (
								<textarea
									value={q.options.join("\n")}
									onChange={(e) =>
										update(q.id, {
											options: e.target.value.split("\n"),
										})
									}
									placeholder={"Uma opção por linha"}
									rows={4}
									className="w-full rounded-lg border border-white/10 bg-[#19191c] px-3.5 py-2.5 text-sm text-gray-100 outline-none focus:border-rose-500/60"
								/>
							)}

							<div className="flex items-center justify-between">
								<label className="flex items-center gap-2 text-sm text-gray-300">
									<input
										type="checkbox"
										checked={q.required}
										onChange={(e) => update(q.id, { required: e.target.checked })}
										className="h-4 w-4 rounded border-white/10 bg-[#19191c] accent-rose-500"
									/>
									Obrigatória
								</label>

								<div className="flex items-center gap-1.5">
									<button
										type="button"
										onClick={() => move(index, -1)}
										disabled={index === 0}
										className="rounded-full px-2 py-1 text-xs text-gray-400 hover:bg-white/5 hover:text-gray-100 disabled:opacity-30"
									>
										Mover para cima
									</button>
									<button
										type="button"
										onClick={() => move(index, 1)}
										disabled={index === questions.length - 1}
										className="rounded-full px-2 py-1 text-xs text-gray-400 hover:bg-white/5 hover:text-gray-100 disabled:opacity-30"
									>
										Mover para baixo
									</button>
									<button
										type="button"
										onClick={() => remove(q.id)}
										aria-label="Remover pergunta"
										className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10"
									>
										<Trash2 className="h-3.5 w-3.5" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}

			<button
				type="button"
				onClick={() => setQuestions((qs) => [...qs, newQuestion()])}
				className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-dashed border-white/15 px-4 py-2 text-sm text-gray-300 hover:border-rose-500/40 hover:text-rose-300"
			>
				<Plus className="h-4 w-4" />
				Adicionar pergunta
			</button>
		</div>
	)
}
