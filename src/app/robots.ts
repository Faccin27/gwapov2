import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/site-content";

const baseUrl = "https://gwapo.com.br";

export const revalidate = 300;

export default async function robots(): Promise<MetadataRoute.Robots> {
	const content = await getSiteContent();

	if (!content.robotsIndexingEnabled) {
		return {
			rules: {
				userAgent: "*",
				disallow: "/",
			},
		};
	}

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/admin",
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
