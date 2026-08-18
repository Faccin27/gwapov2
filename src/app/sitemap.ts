import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects-db";

const baseUrl = "https://gwapo.com.br";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const projects = await getProjects();

	return [
		{ url: `${baseUrl}/` },
		{ url: `${baseUrl}/projetos` },
		{ url: `${baseUrl}/servicos` },
		{ url: `${baseUrl}/producoes` },
		{ url: `${baseUrl}/contato` },
		...projects.map((project) => ({
			url: `${baseUrl}/projetos/${project.slug}`,
			lastModified: project.updatedAt,
		})),
	];
}
