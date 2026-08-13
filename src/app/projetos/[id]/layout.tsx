import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	return {
		title: "Projeto | Gwapo",
		alternates: {
			canonical: `/projetos/${id}`,
		},
	};
}

export default function ProjetoDetailLayout({ children }: { children: React.ReactNode }) {
	return children;
}
