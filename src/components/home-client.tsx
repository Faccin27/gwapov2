"use client";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Cardsection from "@/components/card-section";
import { BentoSection } from "@/components/bento-section";
import MaximizeResultsSection from "@/components/results";
import MetricsSection from "@/components/metrics-section";
import PortfolioSection from "@/components/portfolio-section";
import CTA from "@/components/cta-section";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import type { ComponentProps } from "react";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollSmoother);
}

interface HomeClientProps {
	heroContent: ComponentProps<typeof Hero>;
	ctaContent: ComponentProps<typeof CTA>;
	functionsHeading: string;
	footer: React.ReactNode;
}

export default function HomeClient({ heroContent, ctaContent, functionsHeading, footer }: HomeClientProps) {
	const smootherRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let ctx: gsap.Context | undefined;

		// Defer ScrollSmoother's (expensive) DOM wrapping/measurement past the
		// first paint so the browser shows content before doing this work,
		// instead of the setup itself delaying that first paint.
		const raf = requestAnimationFrame(() => {
			ctx = gsap.context(() => {
				ScrollSmoother.create({
					wrapper: wrapperRef.current,
					content: smootherRef.current,
					smooth: 1.2,
					normalizeScroll: true,
				});
			});
		});

		return () => {
			cancelAnimationFrame(raf);
			ctx?.revert();
		};
	}, []);

	return (
		<div
			ref={wrapperRef}
			className="bg-[#19191c] text-gray-200 min-h-screen font-aeonik"
		>
			<Header />
			<div ref={smootherRef}>
				<Hero {...heroContent} />
				<div className="bg-white max-w-[96%] mx-auto rounded-4xl">
					<MaximizeResultsSection />
					<MetricsSection />
				</div>
				<PortfolioSection />
				<Cardsection heading={functionsHeading} />
				<BentoSection />

				<CTA {...ctaContent} />
				{footer}
			</div>
		</div>
	);
}
