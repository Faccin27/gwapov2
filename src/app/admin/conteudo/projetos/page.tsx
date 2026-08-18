import { getSiteContent } from "@/lib/site-content"
import { ProjectsContentForm } from "./projects-content-form"

export default async function ConteudoProjetosPage() {
	const content = await getSiteContent()
	return <ProjectsContentForm content={content} />
}
