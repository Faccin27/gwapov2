export interface TechIcon {
	name: string
	icon: string
	color1: string
	color2: string
}

export const TECH_ICONS: TechIcon[] = [
	// Front-end
	{ name: "React", icon: "/techs/react.png", color1: "#61DAFB", color2: "#20232A" },
	{ name: "Next.js", icon: "/techs/next.png", color1: "#000000", color2: "#FFFFFF" },
	{ name: "JavaScript", icon: "/techs/javascript.png", color1: "#F7DF1E", color2: "#000000" },
	{ name: "TypeScript", icon: "/techs/typescript.png", color1: "#3178C6", color2: "#235A97" },
	{ name: "Tailwind", icon: "/techs/tailwind.png", color1: "#06B6D4", color2: "#0E7490" },

	// Back-end
	{ name: "Node.js", icon: "/techs/node.png", color1: "#339933", color2: "#68CC68" },
	{ name: "PHP", icon: "/techs/php.png", color1: "#777BB4", color2: "#8892BE" },
	{ name: "Laravel", icon: "/techs/laravel.png", color1: "#FF2D20", color2: "#B71C1C" },
	{ name: "NestJS", icon: "/techs/nest.png", color1: "#E0234E", color2: "#C71F3A" },
	{ name: "Python", icon: "/techs/python.png", color1: "#3776AB", color2: "#FFD43B" },

	// Banco de dados
	{ name: "PostgreSQL", icon: "/techs/postgree.png", color1: "#336791", color2: "#336791" },

	// DevOps / Infra
	{ name: "Docker", icon: "/techs/docker.png", color1: "#2496ED", color2: "#0DB7ED" },
	{ name: "AWS", icon: "/techs/aws.png", color1: "#FF9900", color2: "#232F3E" },
	{ name: "Ubuntu", icon: "/techs/ubuntu.png", color1: "#E95420", color2: "#333333" },
]

/** Finds the closest known icon for a free-text technology name (e.g. "Next.js 15" -> Next.js). */
export function matchTechIcon(name: string): TechIcon | null {
	const normalized = name.trim().toLowerCase()
	if (!normalized) return null

	const exact = TECH_ICONS.find((t) => t.name.toLowerCase() === normalized)
	if (exact) return exact

	return (
		TECH_ICONS.find(
			(t) => normalized.includes(t.name.toLowerCase()) || t.name.toLowerCase().includes(normalized)
		) ?? null
	)
}

/** Maps free-text technology names (e.g. from a project's tech list) to icons, falling back to a generic mark. */
export function toTechIcons(names: string[]): TechIcon[] {
	return names.map(
		(name) =>
			matchTechIcon(name) ?? {
				name,
				icon: "/placeholder.svg",
				color1: "#fd356e",
				color2: "#19191c",
			}
	)
}
