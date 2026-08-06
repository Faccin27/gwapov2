import type React from "react";
import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";

import "./globals.css";

const baiJamjuree = Bai_Jamjuree({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-bai",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Gwapo | Criação de sites que geram resultados",
	description:
		"Desenvolvemos sites modernos, rápidos e responsivos, pensados para impulsionar sua presença online e atrair mais clientes para o seu negócio. Mais de 200 projetos entregues.",
	openGraph: {
		title: "Gwapo | Criação de sites que geram resultados",
		description:
			"Desenvolvemos sites modernos, rápidos e responsivos, pensados para impulsionar sua presença online e atrair mais clientes para o seu negócio.",
		url: "https://gwapo.com.br",
		siteName: "Gwapo",
		locale: "pt_BR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Gwapo | Criação de sites que geram resultados",
		description:
			"Desenvolvemos sites modernos, rápidos e responsivos, pensados para impulsionar sua presença online e atrair mais clientes para o seu negócio.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${baiJamjuree.className} antialiased`}>{children}</body>
		</html>
	);
}
