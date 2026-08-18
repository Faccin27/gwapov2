"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
	{ href: "/admin", label: "Projetos", icon: LayoutGrid, exact: true },
	{ href: "/admin/conteudo", label: "Conteúdo do Site", icon: FileText, exact: false },
]

export function AdminNav() {
	const pathname = usePathname()

	return (
		<nav className="flex gap-1 overflow-x-auto">
			{links.map((link) => {
				const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href)
				const Icon = link.icon
				return (
					<Link
						key={link.href}
						href={link.href}
						className={cn(
							"inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
							isActive
								? "bg-rose-500/15 text-rose-400"
								: "text-gray-400 hover:bg-white/5 hover:text-gray-100"
						)}
					>
						<Icon className="h-4 w-4" />
						{link.label}
					</Link>
				)
			})}
		</nav>
	)
}
