import type { Metadata } from "next";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import ContactExperience from "@/components/contact-experience";
import { getSiteContent } from "@/lib/site-content";
import { parseContactQuestions } from "@/lib/contact-questions";

export const revalidate = 300;

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
		{ "@type": "ListItem", position: 1, name: "Início", item: "https://gwapo.com.br" },
		{ "@type": "ListItem", position: 2, name: "Contato", item: "https://gwapo.com.br/contato" },
	],
};

export default async function ContatoPage() {
	const content = await getSiteContent();

	return (
		<div className="bg-[#19191c] text-gray-200 min-h-screen font-aeonik">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<Header />
			<ContactExperience
				contactEmail={content.footerEmail}
				contactPhone={content.footerPhone}
				instagramUrl={content.footerInstagramUrl}
				whatsappNumber={content.contactWhatsappNumber}
				questions={parseContactQuestions(content.contactQuestions)}
			/>
			<Footer />
		</div>
	);
}
