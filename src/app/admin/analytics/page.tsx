import { Eye, TrendingUp, CalendarDays, ExternalLink } from "lucide-react"
import { getAnalyticsSummary } from "@/lib/analytics"

export default async function AdminAnalyticsPage() {
	const summary = await getAnalyticsSummary()

	const stats = [
		{ label: "Visualizações totais", value: summary.totalViews, icon: Eye },
		{ label: "Últimos 7 dias", value: summary.last7Days, icon: TrendingUp },
		{ label: "Últimos 30 dias", value: summary.last30Days, icon: CalendarDays },
	]

	const maxDaily = Math.max(1, ...summary.dailyViews.map((d) => d.views))

	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold text-gray-100">Analytics</h1>
				<p className="mt-1 text-sm text-gray-400">
					Visualizações de página coletadas diretamente pelo site, sem serviços externos.
				</p>
			</div>

			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="flex items-center gap-4 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-5"
					>
						<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
							<stat.icon className="h-5 w-5" />
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-100">{stat.value}</p>
							<p className="text-sm text-gray-400">{stat.label}</p>
						</div>
					</div>
				))}
			</div>

			<div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
				<h2 className="text-lg font-semibold text-gray-100">Últimos 14 dias</h2>
				<div className="mt-6 flex h-40 items-end gap-1.5 sm:gap-2">
					{summary.dailyViews.map((day) => (
						<div key={day.date} className="group relative flex flex-1 flex-col items-center justify-end gap-1.5">
							<div className="pointer-events-none absolute -top-9 rounded-md border border-white/10 bg-black px-2 py-1 text-[11px] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
								{day.views}
							</div>
							<div
								className="w-full rounded-t-sm bg-rose-500/70 transition-colors group-hover:bg-rose-500"
								style={{ height: `${Math.max(4, (day.views / maxDaily) * 100)}%` }}
							/>
							<span className="hidden text-[10px] text-gray-500 sm:block">
								{day.date.slice(8, 10)}/{day.date.slice(5, 7)}
							</span>
						</div>
					))}
				</div>
			</div>

			<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
				<div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
					<h2 className="text-lg font-semibold text-gray-100">Páginas mais vistas</h2>
					<p className="text-sm text-gray-400">Últimos 30 dias</p>
					<div className="mt-4 flex flex-col gap-2">
						{summary.topPaths.length === 0 && (
							<p className="text-sm text-gray-500">Ainda não há dados suficientes.</p>
						)}
						{summary.topPaths.map((row) => (
							<div
								key={row.path}
								className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-[#0f0f11] px-4 py-2.5"
							>
								<span className="truncate text-sm text-gray-200">{row.path}</span>
								<span className="shrink-0 text-sm font-semibold text-rose-400">{row.views}</span>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
					<h2 className="text-lg font-semibold text-gray-100">De onde vêm os visitantes</h2>
					<p className="text-sm text-gray-400">Domínios de referência, últimos 14 dias</p>
					<div className="mt-4 flex flex-col gap-2">
						{summary.topReferrers.length === 0 && (
							<p className="text-sm text-gray-500">Sem referências externas registradas ainda.</p>
						)}
						{summary.topReferrers.map((row) => (
							<div
								key={row.referrer}
								className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-[#0f0f11] px-4 py-2.5"
							>
								<span className="flex items-center gap-1.5 truncate text-sm text-gray-200">
									<ExternalLink className="h-3.5 w-3.5 shrink-0 text-gray-500" />
									{row.referrer}
								</span>
								<span className="shrink-0 text-sm font-semibold text-rose-400">{row.views}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
