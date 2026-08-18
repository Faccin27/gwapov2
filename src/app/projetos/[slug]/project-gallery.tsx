"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
	const [selected, setSelected] = useState(images[0]);

	if (images.length <= 1) return null;

	return (
		<div>
			<div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
				<Image src={selected} alt={title} fill className="object-cover" />
			</div>
			<div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
				{images.map((image, index) => (
					<button
						key={image}
						type="button"
						onClick={() => setSelected(image)}
						className={cn(
							"relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
							selected === image
								? "border-rose-500"
								: "border-transparent opacity-70 hover:opacity-100"
						)}
					>
						<Image src={image} alt={`${title} - imagem ${index + 1}`} fill className="object-cover" />
					</button>
				))}
			</div>
		</div>
	);
}
