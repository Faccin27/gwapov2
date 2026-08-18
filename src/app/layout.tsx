import type React from "react";
import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";

import "./globals.css";
import ScrollToTop from "@/components/scroll-to-top";
import PageTransition from "@/components/page-transition";

const baiJamjuree = Bai_Jamjuree({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-bai",
	display: "swap",
});

const siteUrl = "https://gwapo.com.br";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: "Gwapo | Criação de sites que geram resultados",
	description:
		"Criação de sites profissionais, rápidos e responsivos para gerar mais clientes. +200 projetos entregues com a Gwapo. Peça seu orçamento sem compromisso.",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Gwapo | Criação de sites que geram resultados",
		description:
			"Criação de sites profissionais, rápidos e responsivos para gerar mais clientes. +200 projetos entregues com a Gwapo. Peça seu orçamento sem compromisso.",
		url: siteUrl,
		siteName: "Gwapo",
		locale: "pt_BR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Gwapo | Criação de sites que geram resultados",
		description:
			"Criação de sites profissionais, rápidos e responsivos para gerar mais clientes. +200 projetos entregues com a Gwapo. Peça seu orçamento sem compromisso.",
	},
};

const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	"@id": `${siteUrl}/#organization`,
	name: "Gwapo",
	url: siteUrl,
	logo: `${siteUrl}/logo.png`,
	description:
		"Agência de desenvolvimento web que cria sites modernos, rápidos e responsivos para impulsionar a presença online e atrair mais clientes.",
	email: "contact@gwapo.com.br",
	contactPoint: [
		{
			"@type": "ContactPoint",
			telephone: "+55-49-99921-5720",
			contactType: "customer service",
			email: "contact@gwapo.com.br",
			areaServed: "BR",
			availableLanguage: ["pt-BR"],
		},
	],
	sameAs: ["https://instagram.com/gui.faccin"],
};

const websiteJsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": `${siteUrl}/#website`,
	url: siteUrl,
	name: "Gwapo",
	publisher: { "@id": `${siteUrl}/#organization` },
	inLanguage: "pt-BR",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${baiJamjuree.className} antialiased`}>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
				/>
				<ScrollToTop />
				<PageTransition>{children}</PageTransition>
			</body>
		</html>
	);
}
