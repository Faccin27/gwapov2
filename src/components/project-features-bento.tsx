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

export function ProjectFeaturesBento({ features }: { features: string[] }) {
	const cards = BENTO_FEATURES.filter((f) => features.includes(f.key)).map((feature) => ({
		...feature,
		Component: componentByKey[feature.key as keyof typeof componentByKey],
	}))

	if (cards.length === 0) return null

	return (
		<section className="w-full max-w-7xl mx-auto px-5">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
				{cards.map(({ key, ...card }) => (
					<BentoCard key={key} {...card} />
				))}
			</div>
		</section>
	)
}
