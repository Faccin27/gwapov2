"use client"

import Image from "next/image"
import type { TechIcon } from "@/lib/tech-icons"

interface ToolItemProps {
	tool: TechIcon
	index: number
}

export function ToolItem({ tool, index }: ToolItemProps) {
	return (
		<div
			className={`group tech-item tech-item-in relative flex h-16 w-16 shrink-0 items-center justify-center border-dashed border-[#ffffff0f] lg:border-r ${index === 0 ? "lg:border-l" : ""
				}`}
			style={{ animationDelay: `${(index % 15) * 120}ms` }}
		>
			{/* Gradient background */}
			<div
				className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300"
				style={{
					background: `linear-gradient(135deg, ${tool.color1} 0%, ${tool.color2} 50%, transparent 100%)`,
				}}
			/>

			{/* Intense noise overlay */}
			<div className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300 noise-bg-intense" />

			<div className="flex items-center justify-center w-full h-full p-2 relative z-10">
				<Image
					src={tool.icon || "/placeholder.svg"}
					alt={tool.name}
					width={32}
					height={32}
					className="w-7 h-7 md:w-8 md:h-8 object-contain transition-all duration-300 group-hover:scale-110 md:grayscale md:group-hover:grayscale-0"
				/>
			</div>

			{/* Tooltip */}
			<div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap shadow-xl border border-gray-600">
				{tool.name}
				<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
			</div>
		</div>
	)
}

interface TechShowcaseProps {
	label: string
	items: TechIcon[]
}

/** The dashed-border tech marquee used in the hero, reusable with any icon list. */
export function TechShowcase({ label, items }: TechShowcaseProps) {
	if (items.length === 0) return null

	return (
		<div className="relative z-[100]">
			<div className="border-[#ffffff0f] relative z-10 border-dashed border-[1px] overflow-visible">
				<div className="container max-w-6xl mx-auto flex flex-col items-center md:flex-row overflow-visible">
					<span className="-mb-1 block bg-gradient-to-r from-[#f8a1ba] to-white bg-clip-text pb-1 text-transparent ">
						<span className="flex items-center pr-3 md:pr-4 text-xs md:text-sm font-medium md:w-full md:max-w-[160px] lg:max-w-[185px]">
							{label}
						</span>
					</span>
					<div className="flex w-full flex-nowrap overflow-x-hidden md:overflow-visible">
						<div className="md:hidden flex animate-scroll-infinite overflow-visible">
							<div className="flex flex-nowrap overflow-visible ">
								{items.map((tool, index) => (
									<ToolItem key={`mobile-1-${tool.name}-${index}`} tool={tool} index={index} />
								))}
							</div>
							<div className="flex flex-nowrap overflow-visible">
								{items.map((tool, index) => (
									<ToolItem key={`mobile-2-${tool.name}-${index}`} tool={tool} index={index} />
								))}
							</div>
						</div>
						<div className="hidden md:flex w-full flex-nowrap justify-center divide-x divide-dashed divide-[#ffffff0f] overflow-visible">
							{items.map((tool, index) => (
								<ToolItem key={`desktop-${tool.name}-${index}`} tool={tool} index={index} />
							))}
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
				@keyframes scroll-infinite {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
				.animate-scroll-infinite {
					animation: scroll-infinite 20s linear infinite;
				}
				@media (max-width: 768px) {
					.animate-scroll-infinite:hover {
						animation-play-state: paused;
					}
				}
				.noise-bg-intense {
					background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.8) 0.5px, transparent 0),
						radial-gradient(circle at 2px 3px, rgba(0, 0, 0, 0.7) 0.5px, transparent 0),
						radial-gradient(circle at 4px 2px, rgba(255, 255, 255, 0.6) 0.5px, transparent 0),
						radial-gradient(circle at 3px 4px, rgba(0, 0, 0, 0.5) 0.5px, transparent 0),
						radial-gradient(circle at 5px 1px, rgba(255, 255, 255, 0.4) 0.5px, transparent 0),
						radial-gradient(circle at 1px 5px, rgba(0, 0, 0, 0.6) 0.5px, transparent 0);
					background-size: 3px 3px, 4px 4px, 5px 5px, 6px 6px, 7px 7px, 8px 8px;
					background-position: 0 0, 1px 1px, 2px 2px, 3px 3px, 4px 4px, 5px 5px;
				}
				.noise-bg-intense::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-image: radial-gradient(circle at 2px 1px, rgba(255, 255, 255, 0.9) 0.5px, transparent 0),
						radial-gradient(circle at 4px 3px, rgba(0, 0, 0, 0.8) 0.5px, transparent 0),
						radial-gradient(circle at 1px 4px, rgba(255, 255, 255, 0.7) 0.5px, transparent 0),
						radial-gradient(circle at 5px 2px, rgba(0, 0, 0, 0.6) 0.5px, transparent 0),
						radial-gradient(circle at 3px 5px, rgba(255, 255, 255, 0.5) 0.5px, transparent 0),
						radial-gradient(circle at 6px 1px, rgba(0, 0, 0, 0.7) 0.5px, transparent 0),
						radial-gradient(circle at 2px 6px, rgba(255, 255, 255, 0.6) 0.5px, transparent 0),
						radial-gradient(circle at 4px 4px, rgba(0, 0, 0, 0.4) 0.5px, transparent 0);
					background-size: 4px 4px, 5px 5px, 6px 6px, 7px 7px, 8px 8px, 9px 9px, 10px 10px, 11px 11px;
					background-position: 1px 1px, 2px 2px, 3px 3px, 4px 4px, 5px 5px, 6px 6px, 7px 7px, 8px 8px;
					opacity: 1;
				}
				.noise-bg-intense::after {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-image: radial-gradient(circle at 3px 2px, rgba(255, 255, 255, 0.8) 0.5px, transparent 0),
						radial-gradient(circle at 1px 3px, rgba(0, 0, 0, 0.9) 0.5px, transparent 0),
						radial-gradient(circle at 5px 4px, rgba(255, 255, 255, 0.6) 0.5px, transparent 0),
						radial-gradient(circle at 2px 5px, rgba(0, 0, 0, 0.7) 0.5px, transparent 0),
						radial-gradient(circle at 4px 1px, rgba(255, 255, 255, 0.5) 0.5px, transparent 0),
						radial-gradient(circle at 6px 3px, rgba(0, 0, 0, 0.8) 0.5px, transparent 0),
						radial-gradient(circle at 1px 6px, rgba(255, 255, 255, 0.4) 0.5px, transparent 0),
						radial-gradient(circle at 3px 6px, rgba(0, 0, 0, 0.5) 0.5px, transparent 0),
						radial-gradient(circle at 5px 5px, rgba(255, 255, 255, 0.7) 0.5px, transparent 0),
						radial-gradient(circle at 6px 6px, rgba(0, 0, 0, 0.6) 0.5px, transparent 0);
					background-size: 5px 5px, 6px 6px, 7px 7px, 8px 8px, 9px 9px, 10px 10px, 11px 11px, 12px 12px, 13px 13px,
						14px 14px;
					background-position: 2px 2px, 3px 3px, 4px 4px, 5px 5px, 6px 6px, 7px 7px, 8px 8px, 9px 9px, 10px 10px,
						11px 11px;
					opacity: 0.9;
				}
			`}</style>
		</div>
	)
}
