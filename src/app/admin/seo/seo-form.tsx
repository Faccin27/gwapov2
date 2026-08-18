"use client"

import { useActionState } from "react"
import { Search, Image as ImageIcon, Building2, ShieldCheck } from "lucide-react"
import { updateSeoContent } from "../site-content-actions"
import { Field, Section, CheckboxField, SaveBar } from "../conteudo/content-ui"
import type { SiteContent } from "@prisma/client"

export function SeoForm({ content }: { content: SiteContent }) {
	const [message, formAction, isPending] = useActionState(updateSeoContent, undefined)

	return (
		<form action={formAction} className="flex flex-col gap-6 pb-24">
			<Section
				title="Título & Descrição"
				description="Usados pelo Google e como padrão ao compartilhar o link do site."
				icon={Search}
			>
				<div className="sm:col-span-2">
					<Field label="Título do site" name="seoTitle" defaultValue={content.seoTitle} />
				</div>
				<div className="sm:col-span-2">
					<Field label="Descrição" name="seoDescription" defaultValue={content.seoDescription} textarea />
				</div>
				<div className="sm:col-span-2">
					<Field
						label="Palavras-chave (opcional)"
						name="seoKeywords"
						defaultValue={content.seoKeywords}
						hint="Separadas por vírgula. Pouco usado pelo Google hoje, mas ainda lido por alguns buscadores."
					/>
				</div>
			</Section>

			<Section
				title="Compartilhamento (Open Graph)"
				description="Imagem e identificação usadas ao compartilhar o link em redes sociais."
				icon={ImageIcon}
			>
				<div className="sm:col-span-2">
					<Field
						label="URL da imagem de compartilhamento"
						name="ogImageUrl"
						defaultValue={content.ogImageUrl}
						hint="1200x630px recomendado. Se deixado em branco, usa a imagem padrão do site."
					/>
				</div>
				<Field
					label="Usuário do Twitter/X (opcional)"
					name="twitterHandle"
					defaultValue={content.twitterHandle}
					hint="Ex.: @gwapo"
				/>
				<Field
					label="Verificação do Google Search Console (opcional)"
					name="googleSiteVerification"
					defaultValue={content.googleSiteVerification}
					hint="Código do meta tag google-site-verification"
				/>
			</Section>

			<Section
				title="Organização (dados estruturados)"
				description="Usados no schema.org/Organization que ajuda o Google a entender o site."
				icon={Building2}
			>
				<Field label="Nome da organização" name="organizationName" defaultValue={content.organizationName} />
				<Field label="URL do logo" name="organizationLogoUrl" defaultValue={content.organizationLogoUrl} />
				<div className="sm:col-span-2">
					<Field
						label="Descrição da organização"
						name="organizationDescription"
						defaultValue={content.organizationDescription}
						textarea
					/>
				</div>
			</Section>

			<Section
				title="Indexação"
				description="Controla se os buscadores podem indexar o site."
				icon={ShieldCheck}
			>
				<div className="sm:col-span-2">
					<CheckboxField
						label="Permitir que o Google indexe o site"
						name="robotsIndexingEnabled"
						defaultChecked={content.robotsIndexingEnabled}
						hint="Desative apenas em ambientes de teste/staging — isso remove o site dos resultados de busca."
					/>
				</div>
			</Section>

			<SaveBar isPending={isPending} message={message} />
		</form>
	)
}
