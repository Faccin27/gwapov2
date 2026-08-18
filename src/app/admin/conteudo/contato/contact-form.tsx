"use client"

import { useActionState } from "react"
import { Phone, Webhook, ListChecks } from "lucide-react"
import { updateContactContent } from "../../site-content-actions"
import { Field, Section, SaveBar } from "../content-ui"
import { QuestionBuilder } from "./question-builder"
import { parseContactQuestions } from "@/lib/contact-questions"
import type { SiteContent } from "@prisma/client"

export function ContactForm({ content }: { content: SiteContent }) {
	const [message, formAction, isPending] = useActionState(updateContactContent, undefined)

	return (
		<form action={formAction} className="flex flex-col gap-6 pb-24">
			<Section
				title="Informações de contato"
				description="Usadas no rodapé e na página /contato."
				icon={Phone}
			>
				<Field label="E-mail" name="footerEmail" defaultValue={content.footerEmail} type="email" />
				<Field label="Telefone (texto exibido)" name="footerPhone" defaultValue={content.footerPhone} />
				<Field
					label="Número de WhatsApp"
					name="contactWhatsappNumber"
					defaultValue={content.contactWhatsappNumber}
					hint="Só números, com DDI e DDD. Ex.: 5549999215720"
				/>
				<Field label="Instagram (URL)" name="footerInstagramUrl" defaultValue={content.footerInstagramUrl} type="url" />
			</Section>

			<Section
				title="Envio do formulário"
				description="Para onde as respostas do formulário de /contato são enviadas."
				icon={Webhook}
			>
				<div className="sm:col-span-2">
					<Field
						label="Webhook (Discord)"
						name="contactWebhookUrl"
						defaultValue={content.contactWebhookUrl}
						hint="URL do webhook do Discord. Se deixado em branco, usa a variável de ambiente DISCORD_WEBHOOK_URL configurada no servidor."
					/>
				</div>
			</Section>

			<div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
						<ListChecks className="h-5 w-5" />
					</div>
					<div>
						<h2 className="text-lg font-semibold text-gray-100">Perguntas do formulário</h2>
						<p className="text-sm text-gray-400">
							Cada pergunta vira um passo no formulário de /contato. Escolha entre múltipla escolha (o
							visitante clica numa opção) ou resposta descritiva (campo de texto livre).
						</p>
					</div>
				</div>
				<div className="mt-6">
					<QuestionBuilder initialQuestions={parseContactQuestions(content.contactQuestions)} />
				</div>
			</div>

			<SaveBar isPending={isPending} message={message} />
		</form>
	)
}
