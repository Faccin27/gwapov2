"use client"

import { useActionState } from "react"
import { Sparkles, Megaphone, Grid3x3 } from "lucide-react"
import { updateHeroContent } from "../../site-content-actions"
import { Field, Section, SaveBar } from "../content-ui"
import type { SiteContent } from "@prisma/client"

export function HeroForm({ content }: { content: SiteContent }) {
	const [message, formAction, isPending] = useActionState(updateHeroContent, undefined)

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
				title="Chamada para ação (CTA)"
				description="Seção de call-to-action no fim da página inicial."
				icon={Megaphone}
			>
				<Field label="Primeira linha do título" name="ctaTitleLine1" defaultValue={content.ctaTitleLine1} />
				<Field label="Segunda linha (destaque em rosa)" name="ctaTitleHighlight" defaultValue={content.ctaTitleHighlight} />
				<Field label="Texto do botão" name="ctaButtonText" defaultValue={content.ctaButtonText} />
			</Section>

			<Section
				title="Seção de Funcionalidades"
				description="Título acima das pílulas Build/Deploy, exibido na home e nas páginas de projeto."
				icon={Grid3x3}
			>
				<div className="sm:col-span-2">
					<Field label="Título" name="functionsHeading" defaultValue={content.functionsHeading} />
				</div>
			</Section>

			<SaveBar isPending={isPending} message={message} />
		</form>
	)
}
