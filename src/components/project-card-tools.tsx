import Image from "next/image";
import { CARD_TOOLS } from "@/lib/card-tools";

export function ProjectCardTools({
	selected,
	heading = "Todas as funções que você precisa, em um só lugar",
}: {
	selected: string[];
	heading?: string;
}) {
	const buildTools = CARD_TOOLS.filter((t) => t.group === "build" && selected.includes(t.key));
	const deployTools = CARD_TOOLS.filter((t) => t.group === "deploy" && selected.includes(t.key));

	if (buildTools.length === 0 && deployTools.length === 0) return null;

	return (
		<div className="container py-20 mx-auto">
			<div className="mx-auto mb-16 flex max-w-5xl flex-col gap-8">
				<h2 className="text-[#F4F4F4] mx-auto max-w-[600px] text-4xl md:text-5xl text-center">
					{heading}
				</h2>
				<div className="hidden justify-center gap-8 lg:flex">
					{buildTools.length > 0 && (
						<div className="bg-zinc-800 text-[#f4f4f4] relative flex h-12 items-center gap-4 rounded-full border border-[#ffffff0f] border-dashed p-1 text-sm">
							<span className="text-sm text-[#afafaf] font-semibold  ml-3 uppercase ">
								Build
							</span>
							<div className="flex h-full w-full justify-between gap-2">
								{buildTools.map((tool) => (
									<div
										key={tool.key}
										className="bg-zinc-700/40 flex h-full w-fit items-center justify-center gap-2 rounded-full px-3 py-2 backdrop-blur-lg"
									>
										<span className="text-[#f4f4f4] flex items-center justify-center gap-1 font-medium">
											<Image src={tool.icon} alt={tool.label} width={32} height={32} className="w-8 h-8" />
											<span className="text-label text-[#f4f4f4]">{tool.label}</span>
										</span>
									</div>
								))}
							</div>
						</div>
					)}
					{deployTools.length > 0 && (
						<div className="bg-zinc-800 text-[#f4f4f4] relative flex h-12 items-center gap-4 rounded-full border border-[#ffffff0f] border-dashed p-1 text-sm">
							{" "}
							<span className="text-sm font-semibold text-[#afafaf]  ml-3 uppercase">
								Deploy
							</span>
							{deployTools.map((tool) => (
								<div
									key={tool.key}
									className="bg-zinc-700/40 flex h-full w-fit items-center justify-center gap-2 rounded-full px-3 py-2 backdrop-blur-lg"
								>
									<span className="text-[#f4f4f4] flex items-center justify-center gap-1 font-medium">
										<Image src={tool.icon} alt={tool.label} width={32} height={32} className="w-8 h-8" />
										<span className="text-xs text-[#f4f4f4]">{tool.label}</span>
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
