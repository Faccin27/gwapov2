export interface BentoFeature {
	key: string
	title: string
	description: string
	icon: string
}

export const BENTO_FEATURES: BentoFeature[] = [
	{
		key: "auth",
		title: "Auth",
		description: "Gerencie o acesso de usuários com segurança e facilidade.",
		icon: "/auth.png",
	},
	{
		key: "storage",
		title: "Storage",
		description: "Armazene e gerencie seus arquivos de forma segura e escalável.",
		icon: "/storage.png",
	},
	{
		key: "functions",
		title: "Functions",
		description: "Execute lógica de backend sem gerenciar servidores.",
		icon: "/functions.png",
	},
	{
		key: "messaging",
		title: "Messaging",
		description: "Conecte-se facilmente com pessoas ou com nossa IA nos chats.",
		icon: "/messaging.png",
	},
	{
		key: "databases",
		title: "Databases",
		description: "Conecte e gerencie seus bancos de dados sem esforço.",
		icon: "/databases.png",
	},
]

export function isValidBentoFeature(key: string): boolean {
	return BENTO_FEATURES.some((f) => f.key === key)
}
