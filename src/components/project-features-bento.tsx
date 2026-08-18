import { BentoCard } from "./bento-card"
import AuthBentoContent from "./bento/auth-bento-content"
import DatabaseBentoContent from "./bento/database-bento-content"
import StorageBentoContent from "./bento/storage-bento-content"
import FunctionsBentoContent from "./bento/functions-bento-content"
import ChatBentoContent from "./bento/chat-bento-content"
import { BENTO_FEATURES } from "@/lib/bento-features"

const componentByKey = {
	auth: AuthBentoContent,
	storage: StorageBentoContent,
	functions: FunctionsBentoContent,
	messaging: ChatBentoContent,
	databases: DatabaseBentoContent,
} as const

// Matches the two size classes used in BentoSection on the homepage: Auth/Databases
// render as "wide" cards (2-col row), Storage/Functions/Messaging as "narrow" cards
// (3-col row). The bento content components assume one of these two widths, so
// keeping cards in their original group avoids them overflowing/clipping.
const WIDE_KEYS = new Set(["auth", "databases"])

function toCards(features: typeof BENTO_FEATURES) {
	return features.map(({ key, ...feature }) => ({
		key,
		...feature,
		Component: componentByKey[key as keyof typeof componentByKey],
	}))
}

export function ProjectFeaturesBento({ features }: { features: string[] }) {
	const selected = BENTO_FEATURES.filter((f) => features.includes(f.key))
	const wide = toCards(selected.filter((f) => WIDE_KEYS.has(f.key)))
	const narrow = toCards(selected.filter((f) => !WIDE_KEYS.has(f.key)))

	if (wide.length === 0 && narrow.length === 0) return null

	return (
		<section className="w-full max-w-7xl mx-auto px-5">
			<div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
				{wide.length > 0 && (
					<div className={`grid grid-cols-1 gap-4 md:gap-5 lg:gap-6 ${wide.length > 1 ? "sm:grid-cols-2" : ""}`}>
						{wide.map(({ key, ...card }) => (
							<BentoCard key={key} {...card} />
						))}
					</div>
				)}
				{narrow.length > 0 && (
					<div
						className={`grid grid-cols-1 gap-4 md:gap-5 lg:gap-6 ${narrow.length > 1 ? "sm:grid-cols-2" : ""} ${narrow.length > 2 ? "lg:grid-cols-3" : ""
							}`}
					>
						{narrow.map(({ key, ...card }) => (
							<BentoCard key={key} {...card} />
						))}
					</div>
				)}
			</div>
		</section>
	)
}
