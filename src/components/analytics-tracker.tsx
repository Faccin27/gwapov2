"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function AnalyticsTracker() {
	const pathname = usePathname()

	useEffect(() => {
		if (!pathname || pathname.startsWith("/admin")) return

		const body = JSON.stringify({ path: pathname, referrer: document.referrer || null })

		if (navigator.sendBeacon) {
			navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }))
			return
		}

		fetch("/api/track", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(
			() => {}
		)
	}, [pathname])

	return null
}
