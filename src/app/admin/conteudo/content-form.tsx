"use client"

import { useActionState } from "react"
import { Sparkles, LayoutGrid, PhoneCall, Check } from "lucide-react"
import { updateSiteContent } from "../actions"
import type { SiteContent } from "@prisma/client"

function Field({
	label,
	name,
	defaultValue,
	textarea,
	type = "text",
	hint,
}: {
	label: string
	name: string
	defaultValue: string
	textarea?: boolean
	type?: string
	hint?: string
}) {
	return (
		<label className="block">
			<span className="block text-sm font-medium text-gray-300">{label}</span>
			{hint && <span className="mt-0.5 block text-xs text-gray-500">{hint}</span>}
			{textarea ? (
				<textarea
					name={name}
					defaultValue={defaultValue}
					rows={3}
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

function Section({
	title,
	description,
	icon: Icon,
	children,
}: {
	title: string
	description: string
	icon: React.ComponentType<{ className?: string }>
	children: React.ReactNode
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

export function ContentForm({ content }: { content: SiteContent }) {
	const [message, formAction, isPending] = useActionState(updateSiteContent, undefined)

	return (
		<form action={formAction} className="flex flex-col gap-6 pb-24">
			<Section
				title="Hero (página inicial)"
				description="Textos e botões que aparecem no topo da home."
				icon={Sparkles}
			>
				<Field label="Selo (texto pequeno acima do título)" name="heroBadge" defaultValue={content.heroBadge} />
				<Field label="Título" name="heroTitle" defaultValue={content.heroTitle} />
				<div className="sm:col-span-2">
					<Field label="Descrição" name="heroDescription" defaultValue={content.heroDescription} textarea />
				</div>
				<Field label="Texto do botão principal" name="heroPrimaryButtonText" defaultValue={content.heroPrimaryButtonText} />
				<Field
					label="Link do botão principal"
					name="heroPrimaryButtonLink"
					defaultValue={content.heroPrimaryButtonLink}
					hint="Ex.: link do WhatsApp"
				/>
				<Field label="Texto do botão secundário" name="heroSecondaryButtonText" defaultValue={content.heroSecondaryButtonText} />
			</Section>

			<Section
				title="Página de Projetos"
				description="Cabeçalho exibido em /projetos, acima da lista."
				icon={LayoutGrid}
			>
				<Field label="Selo" name="projectsBadge" defaultValue={content.projectsBadge} />
				<Field label="Título" name="projectsTitle" defaultValue={content.projectsTitle} />
				<div className="sm:col-span-2">
					<Field label="Descrição" name="projectsDescription" defaultValue={content.projectsDescription} textarea />
				</div>
			</Section>

			<Section
				title="Rodapé & Contato"
				description="Informações exibidas no rodapé de todas as páginas."
				icon={PhoneCall}
			>
				<Field label="E-mail" name="footerEmail" defaultValue={content.footerEmail} type="email" />
				<Field label="Telefone" name="footerPhone" defaultValue={content.footerPhone} />
				<Field label="Texto da equipe" name="footerTeamText" defaultValue={content.footerTeamText} />
				<Field label="Instagram (URL)" name="footerInstagramUrl" defaultValue={content.footerInstagramUrl} type="url" />
				<div className="sm:col-span-2">
					<Field label="Texto sobre redes sociais" name="footerSocialText" defaultValue={content.footerSocialText} textarea />
				</div>
				<div className="sm:col-span-2">
					<Field label="Texto de copyright" name="footerCopyright" defaultValue={content.footerCopyright} />
				</div>
			</Section>

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
		</form>
	)
}
