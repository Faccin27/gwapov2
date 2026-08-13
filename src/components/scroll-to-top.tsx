"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function ScrollToTop() {
	const pathname = usePathname();

	useEffect(() => {
		const smoother = ScrollSmoother.get();
		if (smoother) {
			smoother.scrollTo(0, false);
		}
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}, [pathname]);

	return null;
}
