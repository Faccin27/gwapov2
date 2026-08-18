import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
	let body: unknown
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ ok: false }, { status: 400 })
	}

	const path = typeof (body as Record<string, unknown>)?.path === "string" ? (body as { path: string }).path : null
	const referrerRaw = (body as Record<string, unknown>)?.referrer
	const referrer = typeof referrerRaw === "string" && referrerRaw ? referrerRaw.slice(0, 512) : null

	if (!path || path.length > 512) {
		return NextResponse.json({ ok: false }, { status: 400 })
	}

	await prisma.pageView.create({
		data: { path, referrer },
	})

	return NextResponse.json({ ok: true })
}
