import { getSiteContent } from "@/lib/site-content"
import { HeroForm } from "./hero-form"

export default async function ConteudoInicioPage() {
	const content = await getSiteContent()
	return <HeroForm content={content} />
}
