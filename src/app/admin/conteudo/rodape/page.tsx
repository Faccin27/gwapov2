import { getSiteContent } from "@/lib/site-content"
import { FooterForm } from "./footer-form"

export default async function ConteudoRodapePage() {
	const content = await getSiteContent()
	return <FooterForm content={content} />
}
