import type { Metadata } from "next";
import { getProjectBySlug } from "@/lib/projects-db";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) {
		return {
			title: "Projeto | Gwapo",
			alternates: {
				canonical: `/projetos/${slug}`,
			},
		};
	}

	const title = `${project.title} | Projetos Gwapo`;
	const description = project.description;

	return {
		title,
		description,
		alternates: {
			canonical: `/projetos/${slug}`,
		},
		openGraph: {
			title,
			description,
			images: project.images[0] ? [project.images[0]] : undefined,
		},
	};
}

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
	return children;
}
