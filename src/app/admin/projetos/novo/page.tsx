import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createProject } from "@/app/admin/actions";
import { ProjectForm } from "@/app/admin/projetos/project-form";

export default function NewProjectPage() {
	return (
		<div>
			<Link
				href="/admin"
				className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-gray-100"
			>
				<ArrowLeft className="h-4 w-4" />
				Voltar
			</Link>
			<h1 className="mt-4 text-2xl font-bold text-gray-100">Novo projeto</h1>

			<ProjectForm action={createProject} submitLabel="Criar projeto" />
		</div>
	);
}
