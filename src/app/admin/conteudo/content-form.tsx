"use client"

import { useActionState } from "react"
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
					className="mt-1.5 w-full rounded-xl border border-[#ffffff1a] bg-[#19191c] px-3.5 py-2.5 text-sm text-gray-100 outline-none transition-colors focus:border-rose-500/60"
				/>
			) : (
				<input
					type={type}
					name={name}
					defaultValue={defaultValue}
					className="mt-1.5 w-full rounded-xl border border-[#ffffff1a] bg-[#19191c] px-3.5 py-2.5 text-sm text-gray-100 outline-none transition-colors focus:border-rose-500/60"
				/>
			)}
		</label>
	)
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
	return (
		<div className="rounded-2xl border border-[#ffffff0f] bg-[#1f1f23] p-6">
			<h2 className="text-lg font-semibold text-gray-100">{title}</h2>
			<p className="mt-1 text-sm text-gray-400">{description}</p>
			<div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
		</div>
	)
}

export function ContentForm({ content }: { content: SiteContent }) {
	const [message, formAction, isPending] = useActionState(updateSiteContent, undefined)

	return (
		<form action={formAction} className="flex flex-col gap-6">
			<Section title="Hero (página inicial)" description="Textos e botões que aparecem no topo da home.">
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

			<Section title="Página de Projetos" description="Cabeçalho exibido em /projetos, acima da lista.">
				<Field label="Selo" name="projectsBadge" defaultValue={content.projectsBadge} />
				<Field label="Título" name="projectsTitle" defaultValue={content.projectsTitle} />
				<div className="sm:col-span-2">
					<Field label="Descrição" name="projectsDescription" defaultValue={content.projectsDescription} textarea />
				</div>
			</Section>

			<Section title="Rodapé & Contato" description="Informações exibidas no rodapé de todas as páginas.">
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

			<div className="flex items-center gap-4">
				<button
					type="submit"
					disabled={isPending}
					className="inline-flex items-center gap-2 rounded-full bg-[#fd356e] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:brightness-110 disabled:opacity-60"
				>
					{isPending ? "Salvando..." : "Salvar alterações"}
				</button>
				{message && <p className="text-sm text-gray-300">{message}</p>}
			</div>
		</form>
	)
}
