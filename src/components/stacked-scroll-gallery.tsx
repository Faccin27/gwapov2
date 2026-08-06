"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export interface StackedGalleryItem {
	icon: ReactNode;
	step: string;
	title: string;
	description: string;
	highlights: string[];
	tags?: string[];
}

interface StackedScrollGalleryProps {
	items: StackedGalleryItem[];
}

export function StackedScrollGallery({ items }: StackedScrollGalleryProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
	const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		if (typeof window === "undefined" || items.length === 0) return;

		const ctx = gsap.context(() => {
			const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
			const dots = dotsRef.current.filter(Boolean) as HTMLButtonElement[];
			if (!cards.length || !sectionRef.current) return;

			const n = cards.length;

			gsap.set(cards[0], { yPercent: 0, opacity: 1, scale: 1 });
			if (n > 1) {
				gsap.set(cards.slice(1), { yPercent: 100, opacity: 0, scale: 0.85 });
			}
			if (dots[0]) dots[0].dataset.active = "true";

			const setActiveDot = (index: number) => {
				dots.forEach((dot, i) => {
					dot.dataset.active = i === index ? "true" : "false";
				});
			};

			const tl = gsap.timeline({
				defaults: { ease: "power2.out", duration: 1 },
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top top",
					end: () => `+=${n * window.innerHeight}`,
					scrub: 1,
					pin: true,
					onUpdate: (self) => {
						const index = Math.min(n - 1, Math.floor(self.progress * n + 0.0001));
						setActiveDot(index);
					},
				},
			});

			for (let i = 1; i < n; i++) {
				tl.fromTo(
					cards[i],
					{ yPercent: 100, opacity: 0, scale: 0.85 },
					{ yPercent: 0, opacity: 1, scale: 1 },
					i - 1
				);
				tl.to(cards[i - 1], { scale: 0.94, opacity: 0.45 }, i - 1);
			}

			tl.to(
				cards[n - 1],
				{
					width: "100%",
					maxWidth: "100%",
					height: "100vh",
					borderRadius: 0,
					duration: 1,
					ease: "power2.inOut",
				},
				n - 1
			);
		}, sectionRef);

		return () => ctx.revert();
	}, [items]);

	return (
		<div
			ref={sectionRef}
			className="relative grid h-screen w-full place-items-center overflow-hidden bg-[#19191c]"
		>
			{items.map((item, i) => {
				return (
					<div
						key={item.title}
						ref={(el) => {
							cardsRef.current[i] = el;
						}}
						className="relative h-[72vh] w-[92%] max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-2xl shadow-black/60 [grid-area:1/1]"
						style={{ zIndex: i + 1 }}
					>
						{/* Decorative dot-grid background */}
						<div
							className="absolute inset-0 opacity-[0.15]"
							style={{
								backgroundImage:
									"radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
								backgroundSize: "24px 24px",
							}}
						/>

						{/* Decorative glow blobs */}
						<div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-rose-500/20 blur-[120px] rounded-full pointer-events-none" />
						<div className="absolute -bottom-32 -left-16 w-[300px] h-[300px] bg-rose-500/10 blur-[100px] rounded-full pointer-events-none" />

						{/* Giant ghost step number */}
						<span className="absolute -bottom-10 -right-4 text-[16rem] md:text-[20rem] font-black leading-none text-white/[0.04] select-none pointer-events-none">
							{item.step}
						</span>

						<div className="relative z-10 h-full w-full flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-14 overflow-y-auto">
							{/* Left: icon + step label */}
							<div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6 md:w-56 flex-shrink-0">
								<div className="relative">
									<div className="absolute inset-0 rounded-2xl bg-rose-500/30 blur-xl animate-pulse" />
									<div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center backdrop-blur-sm">
										{item.icon}
									</div>
								</div>
								<div>
									<span className="text-xs font-semibold uppercase tracking-widest text-rose-400">
										Etapa {item.step}
									</span>
									<div className="text-xs text-gray-500 mt-0.5">
										{i + 1} de {items.length}
									</div>
								</div>
							</div>

							{/* Right: content */}
							<div className="flex-1 flex flex-col justify-center min-h-0">
								<h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
									{item.title}
								</h3>
								<p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
									{item.description}
								</p>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-2xl">
									{item.highlights.map((highlight) => (
										<div
											key={highlight}
											className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 transition-colors duration-300 hover:border-rose-500/30 hover:bg-white/[0.06]"
										>
											<CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
											<span className="text-xs md:text-sm text-gray-200">
												{highlight}
											</span>
										</div>
									))}
								</div>

								{item.tags && item.tags.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{item.tags.map((tag) => (
											<span
												key={tag}
												className="text-[11px] md:text-xs font-medium px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:border-rose-500/40 hover:text-rose-300 hover:scale-105"
											>
												{tag}
											</span>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				);
			})}

			{/* Progress dots */}
			<div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5">
				{items.map((item, i) => (
					<button
						key={item.title}
						ref={(el) => {
							dotsRef.current[i] = el;
						}}
						type="button"
						aria-label={`Etapa ${item.step}`}
						data-active={i === 0 ? "true" : "false"}
						className="h-1.5 w-6 rounded-full bg-white/15 transition-all duration-300 data-[active=true]:w-10 data-[active=true]:bg-rose-500"
					/>
				))}
			</div>
		</div>
	);
}
