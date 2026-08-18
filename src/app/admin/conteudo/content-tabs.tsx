"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, LayoutGrid, PanelBottom, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
	{ href: "/admin/conteudo/inicio", label: "Página Inicial", icon: Sparkles },
	{ href: "/admin/conteudo/projetos", label: "Projetos", icon: LayoutGrid },
	{ href: "/admin/conteudo/rodape", label: "Rodapé", icon: PanelBottom },
	{ href: "/admin/conteudo/contato", label: "Contato", icon: MessageCircle },
]

export function ContentTabs() {
	const pathname = usePathname()

	return (
		<nav className="flex gap-1 overflow-x-auto border-b border-white/5 pb-3">
			{tabs.map((tab) => {
				const isActive = pathname.startsWith(tab.href)
				const Icon = tab.icon
				return (
					<Link
						key={tab.href}
						href={tab.href}
						className={cn(
							"inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
							isActive
								? "bg-rose-500/15 text-rose-400"
								: "text-gray-400 hover:bg-white/5 hover:text-gray-100"
						)}
					>
						<Icon className="h-4 w-4" />
						{tab.label}
					</Link>
				)
			})}
		</nav>
	)
}
