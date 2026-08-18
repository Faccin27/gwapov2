import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Layers } from "lucide-react";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import MetricsSection from "@/components/metrics-section";
import CTASection from "@/components/cta-section";
import { getProjectBySlug, getRelatedProjects } from "@/lib/projects-db";
import { ProjectGallery } from "./project-gallery";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);
	if (!project) notFound();

	const relatedProjects = await getRelatedProjects(project.type, project.id, 3);

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Início", item: "https://gwapo.com.br" },
			{ "@type": "ListItem", position: 2, name: "Projetos", item: "https://gwapo.com.br/projetos" },
			{ "@type": "ListItem", position: 3, name: project.title, item: `https://gwapo.com.br/projetos/${project.slug}` },
		],
	};

	return (
		<div className="min-h-screen bg-[#19191c] text-gray-200">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<Header />

			<section className="relative overflow-hidden pt-40 pb-16 md:pt-48 border-b border-[#ffffff0f]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
					<Link
						href="/projetos"
						className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-gray-100"
					>
						<ArrowLeft className="w-4 h-4" />
						Todos os projetos
					</Link>

					<div className="mt-6 flex flex-wrap items-center gap-3">
						<span className="px-3 py-1 text-xs font-medium rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400">
							{project.type}
						</span>
						{project.forSale && (
							<span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-500 text-white animate-pulse">
								À Venda
							</span>
						)}
					</div>

					<h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-100 max-w-4xl leading-tight">
						{project.title}
						<span className="text-rose-500">_</span>
					</h1>

					<p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
						{project.story || project.description}
					</p>

					<div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-400">
						<span className="inline-flex items-center gap-2">
							<Calendar className="w-4 h-4" />
							{project.year}
						</span>
						<span className="inline-flex items-center gap-2">
							<Layers className="w-4 h-4" />
							{project.technologies.join(", ") || "—"}
						</span>
						{project.url && (
							<a
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors"
							>
								Ver site
								<ArrowUpRight className="w-4 h-4" />
							</a>
						)}
					</div>
				</div>
			</section>

			<section className="py-16 md:py-20">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
					{project.images.length > 1 ? (
						<ProjectGallery images={project.images} title={project.title} />
					) : (
						<div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
							<Image
								src={project.images[0] || "/placeholder.svg"}
								alt={project.title}
								fill
								priority
								className="object-cover"
							/>
						</div>
					)}
				</div>
			</section>

			{relatedProjects.length > 0 && (
				<section className="py-16 md:py-20 border-t border-[#ffffff0f]">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
						<h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-8">
							Projetos relacionados
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{relatedProjects.map((related) => (
								<Link
									href={`/projetos/${related.slug}`}
									key={related.id}
									className="group relative overflow-hidden rounded-xl"
								>
									<div className="relative h-56 overflow-hidden">
										<Image
											src={related.images[0] || "/placeholder.svg"}
											alt={related.title}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
										<div className="absolute bottom-0 left-0 right-0 p-5">
											<span className="inline-block px-3 py-1 bg-rose-500/80 text-white text-xs font-medium rounded-full mb-2">
												{related.type}
											</span>
											<h3 className="text-lg font-bold text-white">{related.title}</h3>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>
			)}

			<MetricsSection />

			<CTASection
				titleLine1="Gostou desse projeto?"
				titleHighlight="Vamos criar o seu"
				buttonText="Quero um projeto assim"
			/>

			<Footer />
		</div>
	);
}
