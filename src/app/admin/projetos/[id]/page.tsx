import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProjectById } from "@/lib/projects-db";
import { updateProject } from "@/app/admin/actions";
import { ProjectForm } from "@/app/admin/projetos/project-form";

export default async function EditProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const project = await getProjectById(id);
	if (!project) notFound();

	const action = updateProject.bind(null, id);

	return (
		<div>
			<Link
				href="/admin"
				className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-gray-100"
			>
				<ArrowLeft className="h-4 w-4" />
				Voltar
			</Link>
			<h1 className="mt-4 text-2xl font-bold text-gray-100">Editar projeto</h1>

			<ProjectForm action={action} project={project} submitLabel="Salvar alterações" />
		</div>
	);
}
