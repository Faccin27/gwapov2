import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getProjects } from "@/lib/projects-db";
import { DeleteButton } from "./delete-button";

export default async function AdminDashboardPage() {
	const projects = await getProjects();

	return (
		<div>
			<div className="flex items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-100">Projetos</h1>
					<p className="mt-1 text-sm text-gray-400">{projects.length} projetos cadastrados</p>
				</div>
				<Link
					href="/admin/projetos/novo"
					className="inline-flex items-center gap-2 rounded-full bg-[#fd356e] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:brightness-110"
				>
					<Plus className="h-4 w-4" />
					Novo projeto
				</Link>
			</div>

			<div className="mt-8 flex flex-col gap-3">
				{projects.map((p) => (
					<div
						key={p.id}
						className="flex items-center gap-4 rounded-2xl border border-[#ffffff0f] bg-[#1f1f23] p-4 shadow-sm"
					>
						<div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5">
							<Image src={p.images[0] || "/placeholder.svg"} alt={p.title} fill className="object-cover" />
						</div>
						<div className="min-w-0 flex-1">
							<p className="truncate text-base font-semibold text-gray-100">{p.title}</p>
							<p className="truncate text-sm text-gray-400">
								/projetos/{p.slug} · {p.type}
							</p>
						</div>
						<div className="flex shrink-0 items-center gap-2">
							<Link
								href={`/admin/projetos/${p.id}`}
								className="rounded-full border border-[#ffffff1f] px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/5"
							>
								Editar
							</Link>
							<DeleteButton id={p.id} title={p.title} />
						</div>
					</div>
				))}

				{projects.length === 0 && (
					<p className="rounded-2xl border border-dashed border-[#ffffff1f] p-8 text-center text-sm text-gray-400">
						Nenhum projeto cadastrado ainda.
					</p>
				)}
			</div>
		</div>
	);
}
