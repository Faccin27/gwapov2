"use client"

import type { ComponentType, ReactNode } from "react"
import { Check } from "lucide-react"

export function Field({
	label,
	name,
	defaultValue,
	textarea,
	type = "text",
	hint,
	rows = 3,
}: {
	label: string
	name: string
	defaultValue: string
	textarea?: boolean
	type?: string
	hint?: string
	rows?: number
}) {
	return (
		<label className="block">
			<span className="block text-sm font-medium text-gray-300">{label}</span>
			{hint && <span className="mt-0.5 block text-xs text-gray-500">{hint}</span>}
			{textarea ? (
				<textarea
					name={name}
					defaultValue={defaultValue}
					rows={rows}
					className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f0f11] px-3.5 py-2.5 text-sm text-gray-100 outline-none transition-colors focus:border-rose-500/60"
				/>
			) : (
				<input
					type={type}
					name={name}
					defaultValue={defaultValue}
					className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f0f11] px-3.5 py-2.5 text-sm text-gray-100 outline-none transition-colors focus:border-rose-500/60"
				/>
			)}
		</label>
	)
}

export function CheckboxField({
	label,
	name,
	defaultChecked,
	hint,
}: {
	label: string
	name: string
	defaultChecked: boolean
	hint?: string
}) {
	return (
		<label className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-[#0f0f11] px-3.5 py-2.5">
			<input
				type="checkbox"
				name={name}
				defaultChecked={defaultChecked}
				className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/10 bg-[#0f0f11] accent-rose-500"
			/>
			<span>
				<span className="block text-sm font-medium text-gray-200">{label}</span>
				{hint && <span className="block text-xs text-gray-500">{hint}</span>}
			</span>
		</label>
	)
}

export function Section({
	title,
	description,
	icon: Icon,
	children,
}: {
	title: string
	description: string
	icon: ComponentType<{ className?: string }>
	children: ReactNode
}) {
	return (
		<div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
					<Icon className="h-5 w-5" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-gray-100">{title}</h2>
					<p className="text-sm text-gray-400">{description}</p>
				</div>
			</div>
			<div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
		</div>
	)
}

export function SaveBar({ isPending, message }: { isPending: boolean; message: string | undefined }) {
	return (
		<div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/5 bg-[#0f0f11]/95 backdrop-blur-md md:left-64">
			<div className="mx-auto flex max-w-4xl items-center gap-4 px-5 py-4 md:px-10">
				<button
					type="submit"
					disabled={isPending}
					className="neon-glow inline-flex items-center gap-2 rounded-full bg-[#fd356e] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:brightness-110 disabled:opacity-60"
				>
					{isPending ? "Salvando..." : "Salvar alterações"}
				</button>
				{message && (
					<p className="flex items-center gap-1.5 text-sm text-gray-300">
						<Check className="h-4 w-4 text-emerald-400" />
						{message}
					</p>
				)}
			</div>
		</div>
	)
}
