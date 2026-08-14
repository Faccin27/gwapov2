"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();

	const overlayRef = useRef<HTMLDivElement>(null);
	const markRef = useRef<HTMLDivElement>(null);
	const isTransitioningRef = useRef(false);
	const prevPathnameRef = useRef(pathname);

	// Establish GSAP's own baseline for the transform it will animate — using
	// a plain inline/CSS transform here would desync from GSAP's internal
	// yPercent tracking and make the first tween a no-op.
	useEffect(() => {
		gsap.set(overlayRef.current, { yPercent: 100 });
		gsap.set(markRef.current, { opacity: 0, scale: 0.9 });
	}, []);

	// Intercept clicks on internal links and cover the screen before navigating,
	// so the route swap happens while hidden instead of as a hard visual cut.
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (event.button !== 0) return;
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

			const anchor = (event.target as HTMLElement | null)?.closest("a");
			if (!anchor) return;
			if (anchor.target && anchor.target !== "_self") return;
			if (anchor.hasAttribute("download")) return;

			const href = anchor.getAttribute("href");
			if (!href || !href.startsWith("/") || href.startsWith("//")) return;

			const targetUrl = new URL(href, window.location.href);
			if (targetUrl.pathname === pathname) return; // same page (hash/anchor links)

			if (isTransitioningRef.current) {
				event.preventDefault();
				event.stopPropagation();
				return;
			}

			// Capture phase + stopPropagation: next/link's own click handler
			// (attached during React's bubble-phase delegation) would otherwise
			// fire first and navigate immediately, before we ever get a chance
			// to play the cover animation.
			event.preventDefault();
			event.stopPropagation();
			isTransitioningRef.current = true;

			gsap.timeline()
				.set(overlayRef.current, { visibility: "visible" })
				.to(overlayRef.current, {
					yPercent: 0,
					duration: 0.55,
					ease: "power3.inOut",
				})
				.to(
					markRef.current,
					{ opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
					"-=0.2",
				)
				.call(() => {
					router.push(href);
				});
		};

		document.addEventListener("click", handleClick, true);
		return () => document.removeEventListener("click", handleClick, true);
	}, [pathname, router]);

	// Once the new route has actually mounted, reveal it.
	useEffect(() => {
		if (prevPathnameRef.current === pathname) return;
		prevPathnameRef.current = pathname;

		if (!isTransitioningRef.current) return;

		const tl = gsap.timeline({
			onComplete: () => {
				gsap.set(overlayRef.current, { yPercent: 100, visibility: "hidden" });
				isTransitioningRef.current = false;
			},
		});

		tl.to(markRef.current, { opacity: 0, scale: 0.9, duration: 0.2, ease: "power2.in" })
			.to(
				overlayRef.current,
				{
					yPercent: -100,
					duration: 0.6,
					ease: "power3.inOut",
				},
				"-=0.05",
			);
	}, [pathname]);

	return (
		<>
			<div
				ref={overlayRef}
				aria-hidden="true"
				className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#19191c] pointer-events-none"
				style={{ visibility: "hidden" }}
			>
				<div ref={markRef} className="opacity-0">
					<Image src="/icon.svg" alt="" width={96} height={96} className="opacity-90" />
				</div>
			</div>
			{children}
		</>
	);
}
