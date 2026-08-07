"use client";

import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
	id?: string;
	titleLine1?: string;
	titleHighlight?: string;
	items?: string[];
	buttonText?: string;
	subtext?: ReactNode;
}

const CTASection = ({
	id = "contato",
	titleLine1 = "Transforme sua",
	titleHighlight = "ideia em realidade",
	items = [
		"Consultoria gratuita de 30 minutos",
		"Orçamento sem compromisso",
		"Suporte completo durante todo o projeto",
	],
	buttonText = "Começar meu projeto",
	subtext = (
		<>
			4.9/5 estrelas <br />
			Baseado em +200 projetos entregues
		</>
	),
}: CTASectionProps) => {
	return (
		<section id={id} className="flex flex-col items-center justify-center relative w-full max-w-6xl mx-auto py-16 lg:py-24 overflow-hidden px-4 sm:px-6">
			{/* Background blur effect - similar to other sections */}
			<div className="w-[300px] h-[400px] absolute top-[50px] right-[30%] bg-rose-500/8 blur-[80px] z-0" />

			{/* Bottom glow effect */}
			<div className="absolute bottom-0 lg:bottom-0 inset-x-0 mx-auto bg-rose-500/30 lg:bg-rose-500/50 rounded-full w-1/3 h-1/16 blur-[4rem]"></div>

			<div className="grid grid-cols-1 lg:grid-cols-2 w-full py-8 relative z-10">
				<div className="flex flex-col items-start justify-center w-full">
					<div className="w-max mx-auto lg:mx-0">
						<h2 className="text-3xl lg:text-5xl leading-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-400 font-semibold font-aeonik">
							{titleLine1} <br />
							<span className="text-rose-500">{titleHighlight}</span>
						</h2>
						{items.length > 0 && (
							<div className="flex flex-col gap-3 mt-6">
								{items.map((item) => (
									<div key={item} className="flex items-center gap-2">
										<CheckCircle2 className="size-4 text-rose-400 flex-shrink-0" />
										<span className="text-sm font-medium text-muted-foreground">
											{item}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="flex flex-col justify-center w-full mt-8 lg:mt-0">
					<div className="w-max mx-auto lg:mx-0">
						<div className="flex size-20 mb-6">
							<Image
								src="/logos-svg/5-1.svg"
								alt="Gwapo Logo"
								width={80}
								height={80}
								className="object-contain size-full rounded-lg"
							/>
						</div>
						<div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
							<Button asChild className="neon-glow block font-semibold py-2 px-5 bg-[#fd356e] hover:bg-[#fd356e] text-white rounded-lg transition-all duration-300 hover:brightness-110">
								<a
									href="https://wa.me/5549999215720"
									target="_blank"
									rel="noopener noreferrer"
								>
									{buttonText}
								</a>
							</Button>
							{subtext && (
								<span className="text-sm text-zinc-300">{subtext}</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTASection;
