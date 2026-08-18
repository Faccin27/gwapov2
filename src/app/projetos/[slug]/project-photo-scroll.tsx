"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProjectPhotoScroll({ images, title }: { images: string[]; title: string }) {
	const trackRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(0);

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		const onScroll = () => {
			const itemWidth = track.scrollWidth / images.length;
			const index = Math.round(track.scrollLeft / itemWidth);
			setActive(Math.min(images.length - 1, Math.max(0, index)));
		};

		track.addEventListener("scroll", onScroll, { passive: true });
		return () => track.removeEventListener("scroll", onScroll);
	}, [images.length]);

	function scrollToIndex(index: number) {
		const track = trackRef.current;
		if (!track) return;
		const itemWidth = track.scrollWidth / images.length;
		track.scrollTo({ left: itemWidth * index, behavior: "smooth" });
	}

	return (
		<section className="py-16 md:py-20">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
				<div className="relative">
					<div
						ref={trackRef}
						className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
					>
						{images.map((image, i) => (
							<div
								key={image}
								className="relative aspect-video w-[88%] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 sm:w-[75%] md:w-[70%]"
							>
								<Image
									src={image}
									alt={`${title} - tela ${i + 1}`}
									fill
									priority={i === 0}
									sizes="(max-width: 768px) 88vw, 70vw"
									className="object-cover"
								/>
							</div>
						))}
					</div>

					{images.length > 1 && (
						<>
							<button
								type="button"
								aria-label="Imagem anterior"
								onClick={() => scrollToIndex(Math.max(0, active - 1))}
								disabled={active === 0}
								className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 p-2.5 text-white backdrop-blur-sm transition-opacity hover:bg-black/80 disabled:opacity-0 sm:flex"
							>
								<ChevronLeft className="h-5 w-5" />
							</button>
							<button
								type="button"
								aria-label="Próxima imagem"
								onClick={() => scrollToIndex(Math.min(images.length - 1, active + 1))}
								disabled={active === images.length - 1}
								className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 p-2.5 text-white backdrop-blur-sm transition-opacity hover:bg-black/80 disabled:opacity-0 sm:flex"
							>
								<ChevronRight className="h-5 w-5" />
							</button>
						</>
					)}
				</div>

				{images.length > 1 && (
					<div className="mt-5 flex items-center justify-center gap-2">
						{images.map((image, i) => (
							<button
								key={image}
								type="button"
								aria-label={`Ir para a imagem ${i + 1}`}
								onClick={() => scrollToIndex(i)}
								className={cn(
									"h-1.5 rounded-full transition-all duration-300",
									i === active ? "w-8 bg-rose-500" : "w-2 bg-white/20 hover:bg-white/40"
								)}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
