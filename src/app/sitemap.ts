import type { MetadataRoute } from "next";

const baseUrl = "https://www.gwapo.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: baseUrl },
		{ url: `${baseUrl}/projetos` },
		{ url: `${baseUrl}/servicos` },
		{ url: `${baseUrl}/producoes` },
		{ url: `${baseUrl}/contato` },
	];
}
