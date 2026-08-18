export type ContactQuestionType = "choice" | "text"

export interface ContactQuestion {
	id: string
	question: string
	type: ContactQuestionType
	options: string[]
	required: boolean
}

export const DEFAULT_CONTACT_QUESTIONS: ContactQuestion[] = [
	{
		id: "segment",
		question: "Qual o segmento do seu negócio?",
		type: "choice",
		options: [
			"Varejo / E-commerce",
			"Serviços",
			"Saúde",
			"Educação",
			"Alimentação",
			"Tecnologia",
			"Imobiliário",
			"Outro",
		],
		required: true,
	},
	{
		id: "goal",
		question: "Qual seu objetivo principal?",
		type: "choice",
		options: [
			"Vender online",
			"Gerar leads e contatos",
			"Passar mais credibilidade",
			"Divulgar portfólio",
			"Automatizar um processo interno",
		],
		required: true,
	},
	{
		id: "service",
		question: "Qual serviço você precisa?",
		type: "choice",
		options: [
			"Site institucional",
			"E-commerce",
			"Landing page",
			"Aplicativo web",
			"Identidade visual",
			"UI/UX Design",
			"Ainda não sei",
		],
		required: true,
	},
	{
		id: "budget",
		question: "Qual sua faixa de orçamento?",
		type: "choice",
		options: ["Até R$ 2 mil", "R$ 2 mil – R$ 5 mil", "R$ 5 mil – R$ 10 mil", "Acima de R$ 10 mil", "Prefiro conversar"],
		required: true,
	},
	{
		id: "timeline",
		question: "Qual o prazo desejado?",
		type: "choice",
		options: ["Urgente (até 2 semanas)", "Até 1 mês", "2 a 3 meses", "Sem pressa definida"],
		required: true,
	},
]

/** Validates and normalizes a parsed JSON value into a safe ContactQuestion[]. */
export function parseContactQuestions(value: unknown): ContactQuestion[] {
	if (!Array.isArray(value)) return []

	const questions: ContactQuestion[] = []
	for (const raw of value) {
		if (!raw || typeof raw !== "object") continue
		const item = raw as Record<string, unknown>

		const question = typeof item.question === "string" ? item.question.trim() : ""
		if (!question) continue

		const type: ContactQuestionType = item.type === "text" ? "text" : "choice"
		const options = Array.isArray(item.options)
			? item.options.filter((o): o is string => typeof o === "string" && o.trim().length > 0)
			: []

		if (type === "choice" && options.length === 0) continue

		questions.push({
			id: typeof item.id === "string" && item.id ? item.id : crypto.randomUUID(),
			question,
			type,
			options,
			required: item.required !== false,
		})
	}

	return questions
}
