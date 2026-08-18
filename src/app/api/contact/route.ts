import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/site-content";

interface ContactAnswer {
	question: string;
	answer: string;
}

interface ContactPayload {
	name: string;
	email?: string;
	phone?: string;
	businessName?: string;
	currentSite?: string;
	answers?: ContactAnswer[];
	message?: string;
}

function field(name: string, value: string | undefined, inline = true) {
	if (!value || !value.trim()) return null;
	return { name, value: value.trim().slice(0, 1024), inline };
}

export async function POST(request: Request) {
	const content = await getSiteContent();
	const webhookUrl = content.contactWebhookUrl || process.env.DISCORD_WEBHOOK_URL;
	if (!webhookUrl) {
		return NextResponse.json(
			{ error: "Nenhum webhook configurado. Defina um em /admin/conteudo/contato." },
			{ status: 500 }
		);
	}

	let body: ContactPayload;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
	}

	if (!body.name || !body.name.trim()) {
		return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
	}

	const dynamicFields = Array.isArray(body.answers)
		? body.answers.slice(0, 20).map((a) => field((a.question || "Pergunta").slice(0, 200), a.answer))
		: [];

	const fields = [
		field("E-mail", body.email),
		field("Telefone", body.phone),
		field("Negócio", body.businessName),
		field("Site/rede atual", body.currentSite, false),
		...dynamicFields,
		field("Detalhes do projeto", body.message, false),
	].filter((f): f is { name: string; value: string; inline: boolean } => f !== null);

	const discordRes = await fetch(webhookUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			content: "📬 Novo contato pelo site da Gwapo",
			embeds: [
				{
					title: body.name.trim(),
					color: 0xfd356e,
					fields,
					timestamp: new Date().toISOString(),
				},
			],
		}),
	});

	if (!discordRes.ok) {
		return NextResponse.json({ error: "Falha ao enviar para o Discord." }, { status: 502 });
	}

	return NextResponse.json({ ok: true });
}
