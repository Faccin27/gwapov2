import { getSiteContent } from "@/lib/site-content"
import { ContactForm } from "./contact-form"

export default async function ConteudoContatoPage() {
	const content = await getSiteContent()
	return <ContactForm content={content} />
}
