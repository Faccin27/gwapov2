import { getSiteContent } from "@/lib/site-content"
import { ContentForm } from "./content-form"

export default async function AdminContentPage() {
	const content = await getSiteContent()

	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold text-gray-100">Conteúdo do Site</h1>
				<p className="mt-1 text-sm text-gray-400">
					Edite os textos das principais seções do site sem precisar mexer em código.
				</p>
			</div>

			<div className="mt-8">
				<ContentForm content={content} />
			</div>
		</div>
	)
}
