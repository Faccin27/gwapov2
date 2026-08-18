"use client"

import { useActionState } from "react"
import { LayoutGrid } from "lucide-react"
import { updateProjectsContent } from "../../site-content-actions"
import { Field, Section, SaveBar } from "../content-ui"
import type { SiteContent } from "@prisma/client"

export function ProjectsContentForm({ content }: { content: SiteContent }) {
	const [message, formAction, isPending] = useActionState(updateProjectsContent, undefined)

	return (
		<form action={formAction} className="flex flex-col gap-6 pb-24">
			<Section
				title="Página de Projetos"
				description="Cabeçalho exibido em /projetos, acima da lista."
				icon={LayoutGrid}
			>
				<Field label="Selo" name="projectsBadge" defaultValue={content.projectsBadge} />
				<Field label="Título" name="projectsTitle" defaultValue={content.projectsTitle} />
				<div className="sm:col-span-2">
					<Field label="Descrição" name="projectsDescription" defaultValue={content.projectsDescription} textarea />
				</div>
			</Section>

			<SaveBar isPending={isPending} message={message} />
		</form>
	)
}
