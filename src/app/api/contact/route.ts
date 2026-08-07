import { NextResponse } from "next/server";

interface ContactPayload {
	name: string;
	email?: string;
	phone?: string;
	businessName?: string;
	segment?: string;
	currentSite?: string;
	goal?: string;
	service?: string;
	budget?: string;
	timeline?: string;
	message?: string;
}

function field(name: string, value: string | undefined, inline = true) {
	if (!value || !value.trim()) return null;
	return { name, value: value.trim().slice(0, 1024), inline };
}

export async function POST(request: Request) {
	const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
	if (!webhookUrl) {
		return NextResponse.json(
			{ error: "DISCORD_WEBHOOK_URL não configurada no servidor." },
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

	const fields = [
		field("E-mail", body.email),
		field("Telefone", body.phone),
		field("Negócio", body.businessName),
		field("Segmento", body.segment),
		field("Objetivo principal", body.goal),
		field("Site/rede atual", body.currentSite, false),
		field("Serviço de interesse", body.service),
		field("Orçamento", body.budget),
		field("Prazo desejado", body.timeline),
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
