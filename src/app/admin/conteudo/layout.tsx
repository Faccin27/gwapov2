import { ContentTabs } from "./content-tabs"

export default function ConteudoLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold text-gray-100">Conteúdo do Site</h1>
				<p className="mt-1 text-sm text-gray-400">
					Edite os textos das principais seções do site sem precisar mexer em código.
				</p>
			</div>

			<div className="mt-6">
				<ContentTabs />
			</div>

			<div className="mt-6">{children}</div>
		</div>
	)
}
