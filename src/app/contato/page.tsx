import type { Metadata } from "next";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import ContactExperience from "@/components/contact-experience";

export const metadata: Metadata = {
	title: "Contato | Gwapo",
	description:
		"Fale com a Gwapo. Conte sobre seu projeto em poucos passos e receba um retorno direto no WhatsApp.",
	alternates: {
		canonical: "/contato",
	},
};

const breadcrumbJsonLd = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{ "@type": "ListItem", position: 1, name: "Início", item: "https://www.gwapo.com.br" },
		{ "@type": "ListItem", position: 2, name: "Contato", item: "https://www.gwapo.com.br/contato" },
	],
};

export default function ContatoPage() {
	return (
		<div className="bg-[#19191c] text-gray-200 min-h-screen font-aeonik">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<Header />
			<ContactExperience />
			<Footer />
		</div>
	);
}
