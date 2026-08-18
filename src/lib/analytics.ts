import "server-only"
import { prisma } from "@/lib/prisma"

const DAY_MS = 24 * 60 * 60 * 1000

export interface AnalyticsSummary {
	totalViews: number
	last7Days: number
	last30Days: number
	topPaths: { path: string; views: number }[]
	topReferrers: { referrer: string; views: number }[]
	dailyViews: { date: string; views: number }[]
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
	const now = new Date()
	const since7 = new Date(now.getTime() - 7 * DAY_MS)
	const since14 = new Date(now.getTime() - 14 * DAY_MS)
	const since30 = new Date(now.getTime() - 30 * DAY_MS)

	const [totalViews, last7Days, last30Days, topPathsRaw, recentViews] = await Promise.all([
		prisma.pageView.count(),
		prisma.pageView.count({ where: { createdAt: { gte: since7 } } }),
		prisma.pageView.count({ where: { createdAt: { gte: since30 } } }),
		prisma.pageView.groupBy({
			by: ["path"],
			where: { createdAt: { gte: since30 } },
			_count: { path: true },
			orderBy: { _count: { path: "desc" } },
			take: 8,
		}),
		prisma.pageView.findMany({
			where: { createdAt: { gte: since14 } },
			select: { createdAt: true, referrer: true },
		}),
	])

	const topPaths = topPathsRaw.map((row) => ({ path: row.path, views: row._count.path }))

	const referrerCounts = new Map<string, number>()
	for (const view of recentViews) {
		if (!view.referrer) continue
		let host: string
		try {
			host = new URL(view.referrer).hostname.replace(/^www\./, "")
		} catch {
			continue
		}
		if (host === "gwapo.com.br") continue
		referrerCounts.set(host, (referrerCounts.get(host) ?? 0) + 1)
	}
	const topReferrers = [...referrerCounts.entries()]
		.map(([referrer, views]) => ({ referrer, views }))
		.sort((a, b) => b.views - a.views)
		.slice(0, 5)

	const dailyBuckets = new Map<string, number>()
	for (let i = 13; i >= 0; i--) {
		const date = new Date(now.getTime() - i * DAY_MS).toISOString().slice(0, 10)
		dailyBuckets.set(date, 0)
	}
	for (const view of recentViews) {
		const date = view.createdAt.toISOString().slice(0, 10)
		if (dailyBuckets.has(date)) {
			dailyBuckets.set(date, (dailyBuckets.get(date) ?? 0) + 1)
		}
	}
	const dailyViews = [...dailyBuckets.entries()].map(([date, views]) => ({ date, views }))

	return { totalViews, last7Days, last30Days, topPaths, topReferrers, dailyViews }
}
