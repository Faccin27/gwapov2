export interface CardTool {
	key: string
	label: string
	icon: string
	group: "build" | "deploy"
}

export const CARD_TOOLS: CardTool[] = [
	{ key: "auth", label: "Auth", icon: "/auth.png", group: "build" },
	{ key: "databases", label: "Databases", icon: "/databases.png", group: "build" },
	{ key: "storage", label: "Storage", icon: "/storage.png", group: "build" },
	{ key: "functions", label: "Functions", icon: "/functions.png", group: "build" },
	{ key: "realtime", label: "Realtime", icon: "/realtime.png", group: "build" },
	{ key: "messaging", label: "Messaging", icon: "/messaging.png", group: "build" },
	{ key: "sites", label: "Sites", icon: "/sites.png", group: "deploy" },
]

export function isValidCardTool(key: string): boolean {
	return CARD_TOOLS.some((t) => t.key === key)
}
