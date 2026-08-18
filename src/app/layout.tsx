import type React from "react";
import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";

import "./globals.css";
import ScrollToTop from "@/components/scroll-to-top";
import PageTransition from "@/components/page-transition";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { getSiteContent } from "@/lib/site-content";

const baiJamjuree = Bai_Jamjuree({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-bai",
	display: "swap",
});

const siteUrl = "https://gwapo.com.br";

export async function generateMetadata(): Promise<Metadata> {
	const content = await getSiteContent();
	const ogImages = content.ogImageUrl ? [content.ogImageUrl] : undefined;

	return {
		metadataBase: new URL(siteUrl),
		title: content.seoTitle,
		description: content.seoDescription,
		keywords: content.seoKeywords || undefined,
		alternates: {
			canonical: "/",
		},
		robots: content.robotsIndexingEnabled
			? { index: true, follow: true }
			: { index: false, follow: false },
		verification: content.googleSiteVerification
			? { google: content.googleSiteVerification }
			: undefined,
		openGraph: {
			title: content.seoTitle,
			description: content.seoDescription,
			url: siteUrl,
			siteName: content.organizationName,
			locale: "pt_BR",
			type: "website",
			images: ogImages,
		},
		twitter: {
			card: "summary_large_image",
			title: content.seoTitle,
			description: content.seoDescription,
			site: content.twitterHandle || undefined,
			images: ogImages,
		},
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const content = await getSiteContent();

	const organizationJsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": `${siteUrl}/#organization`,
		name: content.organizationName,
		url: siteUrl,
		logo: content.organizationLogoUrl.startsWith("http")
			? content.organizationLogoUrl
			: `${siteUrl}${content.organizationLogoUrl}`,
		description: content.organizationDescription,
		email: content.footerEmail,
		contactPoint: [
			{
				"@type": "ContactPoint",
				telephone: `+${content.contactWhatsappNumber}`,
				contactType: "customer service",
				email: content.footerEmail,
				areaServed: "BR",
				availableLanguage: ["pt-BR"],
			},
		],
		sameAs: [content.footerInstagramUrl],
	};

	const websiteJsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${siteUrl}/#website`,
		url: siteUrl,
		name: content.organizationName,
		publisher: { "@id": `${siteUrl}/#organization` },
		inLanguage: "pt-BR",
	};

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
				<AnalyticsTracker />
				<PageTransition>{children}</PageTransition>
			</body>
		</html>
	);
}
