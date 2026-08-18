"use client"

import { useActionState } from "react"
import { PanelBottom } from "lucide-react"
import { updateFooterContent } from "../../site-content-actions"
import { Field, Section, SaveBar } from "../content-ui"
import type { SiteContent } from "@prisma/client"

export function FooterForm({ content }: { content: SiteContent }) {
	const [message, formAction, isPending] = useActionState(updateFooterContent, undefined)

	return (
		<form action={formAction} className="flex flex-col gap-6 pb-24">
			<Section
				title="Rodapé"
				description="Textos de apresentação exibidos no rodapé de todas as páginas. E-mail, telefone, WhatsApp e Instagram ficam na aba Contato."
				icon={PanelBottom}
			>
				<Field label="Texto da equipe" name="footerTeamText" defaultValue={content.footerTeamText} />
				<Field label="Texto de copyright" name="footerCopyright" defaultValue={content.footerCopyright} />
				<div className="sm:col-span-2">
					<Field label="Texto sobre redes sociais" name="footerSocialText" defaultValue={content.footerSocialText} textarea />
				</div>
			</Section>

			<SaveBar isPending={isPending} message={message} />
		</form>
	)
}
