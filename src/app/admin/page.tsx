import Image from "next/image";
import Link from "next/link";
import { Plus, FolderKanban, Tag, Star, Pencil } from "lucide-react";
import { getProjects } from "@/lib/projects-db";
import { DeleteButton } from "./delete-button";

export default async function AdminDashboardPage() {
	const projects = await getProjects();
	const forSaleCount = projects.filter((p) => p.forSale).length;
	const typeCount = new Set(projects.map((p) => p.type)).size;

	const stats = [
		{ label: "Projetos cadastrados", value: projects.length, icon: FolderKanban },
		{ label: "Categorias em uso", value: typeCount, icon: Tag },
		{ label: "À venda", value: forSaleCount, icon: Star },
	];

	return (
		<div>
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-100">Projetos</h1>
					<p className="mt-1 text-sm text-gray-400">Gerencie os projetos exibidos em /projetos</p>
				</div>
				<Link
					href="/admin/projetos/novo"
					className="neon-glow inline-flex items-center gap-2 rounded-full bg-[#fd356e] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:brightness-110"
				>
					<Plus className="h-4 w-4" />
					Novo projeto
				</Link>
			</div>

			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="flex items-center gap-4 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-5"
					>
						<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
							<stat.icon className="h-5 w-5" />
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-100">{stat.value}</p>
							<p className="text-sm text-gray-400">{stat.label}</p>
						</div>
					</div>
				))}
			</div>

			<div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{projects.map((p) => (
					<div
						key={p.id}
						className="group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-colors hover:border-white/10"
					>
						<div className="relative aspect-video overflow-hidden bg-white/5">
							<Image
								src={p.images[0] || "/placeholder.svg"}
								alt={p.title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							{p.forSale && (
								<span className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-semibold text-white">
									À Venda
								</span>
							)}
							<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
								<p className="truncate text-base font-semibold text-white">{p.title}</p>
								<p className="truncate text-xs text-gray-300">
									{p.type} · {p.year}
								</p>
							</div>
						</div>

						<div className="flex items-center justify-between gap-2 p-3">
							<span className="truncate text-xs text-gray-500">/projetos/{p.slug}</span>
							<div className="flex shrink-0 items-center gap-1.5">
								<Link
									href={`/admin/projetos/${p.id}`}
									aria-label="Editar"
									className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
								>
									<Pencil className="h-4 w-4" />
								</Link>
								<DeleteButton id={p.id} title={p.title} />
							</div>
						</div>
					</div>
				))}

				{projects.length === 0 && (
					<p className="col-span-full rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-gray-400">
						Nenhum projeto cadastrado ainda.
					</p>
				)}
			</div>
		</div>
	);
}
