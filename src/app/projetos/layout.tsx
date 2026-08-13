import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Todos os Projetos | Gwapo",
	description:
		"Explore os projetos desenvolvidos pela Gwapo: sites corporativos, e-commerce, landing pages, aplicativos web, identidade visual e UI/UX.",
	alternates: {
		canonical: "/projetos",
	},
};

export default function ProjetosLayout({ children }: { children: React.ReactNode }) {
	return children;
}
