"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, FileText, BarChart3, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
	{ href: "/admin", label: "Projetos", icon: LayoutGrid, exact: true },
	{ href: "/admin/analytics", label: "Analytics", icon: BarChart3, exact: false },
	{ href: "/admin/conteudo", label: "Conteúdo do Site", icon: FileText, exact: false },
	{ href: "/admin/seo", label: "SEO", icon: Search, exact: false },
]

export function AdminNav({ variant = "sidebar" }: { variant?: "sidebar" | "mobile" }) {
	const pathname = usePathname()

	if (variant === "mobile") {
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

	return (
		<nav className="flex flex-col gap-1">
			{links.map((link) => {
				const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href)
				const Icon = link.icon
				return (
					<Link
						key={link.href}
						href={link.href}
						className={cn(
							"group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
							isActive
								? "bg-gradient-to-r from-rose-500/15 to-transparent text-rose-400"
								: "text-gray-400 hover:bg-white/5 hover:text-gray-100"
						)}
					>
						{isActive && (
							<span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-rose-500" />
						)}
						<Icon className="h-4 w-4 shrink-0" />
						{link.label}
					</Link>
				)
			})}
		</nav>
	)
}
