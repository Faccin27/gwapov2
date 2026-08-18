import { getSiteContent } from "@/lib/site-content"
import { SeoForm } from "./seo-form"

export default async function AdminSeoPage() {
	const content = await getSiteContent()

	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold text-gray-100">SEO</h1>
				<p className="mt-1 text-sm text-gray-400">
					Título, descrição, compartilhamento, dados estruturados e indexação do site.
				</p>
			</div>

			<div className="mt-6">
				<SeoForm content={content} />
			</div>
		</div>
	)
}
