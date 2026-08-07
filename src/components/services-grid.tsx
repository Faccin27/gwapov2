"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
	ArrowRight,
	CheckCircle2,
	X,
	Building2,
	ShoppingCart,
	Rocket,
	Smartphone,
	Palette,
	PenTool,
} from "lucide-react";
import { gsap } from "gsap";

interface Service {
	icon: ReactNode;
	step: string;
	title: string;
	description: string;
	highlights: string[];
	tags: string[];
	type: string;
}

const iconClass = "w-6 h-6 text-rose-400";

const services: Service[] = [
	{
		icon: <Building2 className={iconClass} />,
		step: "01",
		title: "Sites Corporativos",
		description:
			"Presença digital profissional para sua empresa, com design moderno e foco em transmitir confiança.",
		highlights: [
			"Design responsivo e institucional",
			"Otimização para SEO",
			"Painel de conteúdo fácil de atualizar",
			"Performance e carregamento rápido",
		],
		tags: ["Institucional", "SEO", "Responsivo"],
		type: "Sites+Corporativos",
	},
	{
		icon: <ShoppingCart className={iconClass} />,
		step: "02",
		title: "E-commerce",
		description:
			"Lojas virtuais completas, com carrinho, pagamento integrado e experiência de compra fluida.",
		highlights: [
			"Carrinho e checkout integrados",
			"Gestão de produtos e estoque",
			"Pagamentos via Pix e cartão",
			"Painel de pedidos e clientes",
		],
		tags: ["Loja virtual", "Pagamentos", "Estoque"],
		type: "E-commerce",
	},
	{
		icon: <Rocket className={iconClass} />,
		step: "03",
		title: "Landing Pages",
		description:
			"Páginas de conversão pensadas para transformar visitantes em clientes, rápidas e objetivas.",
		highlights: [
			"Foco total em conversão",
			"Carregamento rápido",
			"Testes de copy e CTA",
			"Integração com pixels e analytics",
		],
		tags: ["Conversão", "Performance", "CTA"],
		type: "Landing+Pages",
	},
	{
		icon: <Smartphone className={iconClass} />,
		step: "04",
		title: "Aplicativos Web",
		description:
			"Soluções personalizadas — dashboards, sistemas internos e ferramentas sob medida para o seu negócio.",
		highlights: [
			"Sistemas sob medida",
			"Dashboards e automações",
			"Integrações com APIs",
			"Controle de usuários e permissões",
		],
		tags: ["Dashboards", "Automação", "APIs"],
		type: "Aplicativos+Web",
	},
	{
		icon: <Palette className={iconClass} />,
		step: "05",
		title: "Identidade Visual",
		description:
			"Logo, paleta de cores e branding completo para sua marca ser reconhecida em qualquer lugar.",
		highlights: [
			"Logo e variações de marca",
			"Paleta de cores e tipografia",
			"Manual de identidade visual",
			"Aplicações em redes sociais",
		],
		tags: ["Branding", "Logo", "Manual de marca"],
		type: "Identidade+Visual",
	},
	{
		icon: <PenTool className={iconClass} />,
		step: "06",
		title: "UI/UX Design",
		description:
			"Experiências de usuário intuitivas, com pesquisa, wireframes e protótipos antes de qualquer linha de código.",
		highlights: [
			"Pesquisa e wireframes",
			"Protótipos navegáveis",
			"Testes de usabilidade",
			"Design system consistente",
		],
		tags: ["Wireframes", "Protótipo", "Usabilidade"],
		type: "UI%2FUX+Design",
	},
];

export default function ServicesGrid() {
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const overlayRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const sourceRect = useRef<DOMRect | null>(null);
	const activeIndexRef = useRef<number | null>(null);
	const navLockRef = useRef(false);
	const [expanded, setExpanded] = useState<number | null>(null);
	const [mounted, setMounted] = useState<number | null>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	useEffect(() => {
		activeIndexRef.current = activeIndex;
	}, [activeIndex]);

	const openCard = (index: number) => {
		const el = cardRefs.current[index];
		if (!el) return;
		sourceRect.current = el.getBoundingClientRect();
		setExpanded(index);
		setMounted(index);
		setActiveIndex(index);
	};

	const closeCard = () => {
		const overlay = overlayRef.current;
		const current = activeIndexRef.current;
		const rect =
			(current !== null ? cardRefs.current[current]?.getBoundingClientRect() : null) ??
			sourceRect.current;
		if (!overlay || !rect) {
			setExpanded(null);
			setMounted(null);
			setActiveIndex(null);
			return;
		}
		setExpanded(null);
		gsap.to(overlay, {
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height,
			borderRadius: 24,
			duration: 0.45,
			ease: "power2.inOut",
			onComplete: () => {
				setMounted(null);
				setActiveIndex(null);
			},
		});
	};

	const goToCard = (next: number, direction: 1 | -1) => {
		if (navLockRef.current) return;
		if (next < 0 || next >= services.length) return;
		const content = contentRef.current;
		navLockRef.current = true;
		if (!content) {
			setActiveIndex(next);
			navLockRef.current = false;
			return;
		}
		gsap.to(content, {
			opacity: 0,
			y: direction * -16,
			duration: 0.2,
			ease: "power2.in",
			onComplete: () => {
				setActiveIndex(next);
				requestAnimationFrame(() => {
					gsap.fromTo(
						content,
						{ opacity: 0, y: direction * 16 },
						{
							opacity: 1,
							y: 0,
							duration: 0.25,
							ease: "power2.out",
							onComplete: () => {
								navLockRef.current = false;
							},
						}
					);
				});
			},
		});
	};

	useLayoutEffect(() => {
		const overlay = overlayRef.current;
		const rect = sourceRect.current;
		if (mounted === null || expanded === null || !overlay || !rect) return;

		gsap.set(overlay, {
			position: "fixed",
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height,
			borderRadius: 24,
			zIndex: 100,
		});
		gsap.to(overlay, {
			top: 0,
			left: 0,
			width: "100vw",
			height: "100vh",
			borderRadius: 0,
			duration: 0.55,
			ease: "power2.inOut",
		});
	}, [mounted, expanded]);

	useEffect(() => {
		document.body.style.overflow = mounted !== null ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mounted]);

	useEffect(() => {
		if (mounted === null) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeCard();
			} else if (e.key === "ArrowDown") {
				const current = activeIndexRef.current;
				if (current !== null) goToCard(current + 1, 1);
			} else if (e.key === "ArrowUp") {
				const current = activeIndexRef.current;
				if (current !== null) goToCard(current - 1, -1);
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mounted]);

	useEffect(() => {
		if (mounted === null) return;
		let wheelCooldown = false;
		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			if (wheelCooldown || Math.abs(e.deltaY) < 12) return;
			const current = activeIndexRef.current;
			if (current === null) return;
			wheelCooldown = true;
			if (e.deltaY > 0) {
				goToCard(current + 1, 1);
			} else {
				goToCard(current - 1, -1);
			}
			setTimeout(() => {
				wheelCooldown = false;
			}, 500);
		};
		window.addEventListener("wheel", onWheel, { passive: false });
		return () => window.removeEventListener("wheel", onWheel);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mounted]);

	const activeService = activeIndex !== null ? services[activeIndex] : null;

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{services.map((service, index) => (
					<div
						key={service.title}
						ref={(el) => {
							cardRefs.current[index] = el;
						}}
						onClick={() => openCard(index)}
						className="group relative h-64 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 shadow-2xl shadow-black/40 transition-transform duration-300 hover:-translate-y-1"
						style={{ visibility: activeIndex === index ? "hidden" : "visible" }}
					>
						<div
							className="absolute inset-0 opacity-[0.15]"
							style={{
								backgroundImage:
									"radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
								backgroundSize: "20px 20px",
							}}
						/>
						<div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-500/20 blur-[80px] rounded-full pointer-events-none" />

						<span className="absolute -bottom-6 -right-2 text-7xl font-black leading-none text-white/[0.04] select-none pointer-events-none">
							{service.step}
						</span>

						<div className="relative z-10 flex h-full flex-col">
							<div className="relative w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center backdrop-blur-sm transition-colors duration-300 group-hover:bg-rose-500/20">
								{service.icon}
							</div>

							<span className="text-[11px] font-semibold uppercase tracking-widest text-rose-400 mt-5">
								Serviço {service.step}
							</span>
							<h3 className="text-lg font-extrabold text-white mt-1">
								{service.title}
							</h3>
							<p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-2">
								{service.description}
							</p>

							<span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-rose-400/80 group-hover:gap-2.5 group-hover:text-rose-400 transition-all duration-300">
								Clique para expandir
								<ArrowRight className="w-3.5 h-3.5" />
							</span>
						</div>
					</div>
				))}
			</div>

			{mounted !== null && activeService && (
				<div
					ref={overlayRef}
					className="overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-2xl shadow-black/60"
				>
					<div
						className="absolute inset-0 opacity-[0.15]"
						style={{
							backgroundImage:
								"radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
					/>
					<div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-rose-500/20 blur-[120px] rounded-full pointer-events-none" />
					<div className="absolute -bottom-32 -left-16 w-[300px] h-[300px] bg-rose-500/10 blur-[100px] rounded-full pointer-events-none" />

					<span className="absolute -bottom-10 -right-4 text-[16rem] md:text-[20rem] font-black leading-none text-white/[0.04] select-none pointer-events-none">
						{activeService.step}
					</span>

					<button
						type="button"
						onClick={closeCard}
						aria-label="Fechar"
						className="absolute top-24 right-6 md:top-28 md:right-10 z-20 w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-gray-300 hover:text-white hover:border-rose-500/40 hover:bg-white/[0.08] transition-all duration-300"
					>
						<X className="w-5 h-5" />
					</button>

					<div
						ref={contentRef}
						className="relative z-10 h-full w-full flex flex-col md:flex-row gap-8 md:gap-12 p-8 pt-24 md:p-14 md:pt-32 overflow-y-auto"
					>
						<div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6 md:w-56 flex-shrink-0">
							<div className="relative">
								<div className="absolute inset-0 rounded-2xl bg-rose-500/30 blur-xl animate-pulse" />
								<div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center backdrop-blur-sm">
									{activeService.icon}
								</div>
							</div>
							<div>
								<span className="text-xs font-semibold uppercase tracking-widest text-rose-400">
									Serviço {activeService.step}
								</span>
								<div className="text-xs text-gray-500 mt-0.5">
									{(activeIndex ?? 0) + 1} de {services.length}
								</div>
							</div>
						</div>

						<div className="flex-1 flex flex-col justify-center min-h-0">
							<h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
								{activeService.title}
							</h3>
							<p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
								{activeService.description}
							</p>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-2xl">
								{activeService.highlights.map((highlight) => (
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

							<div className="flex flex-wrap gap-2 mb-8">
								{activeService.tags.map((tag) => (
									<span
										key={tag}
										className="text-[11px] md:text-xs font-medium px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:border-rose-500/40 hover:text-rose-300 hover:scale-105"
									>
										{tag}
									</span>
								))}
							</div>

							<Link
								href={`/projetos?tipo=${activeService.type}`}
								className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-[#fd356e] px-5 py-3 text-sm font-medium text-gray-200 transition-colors duration-150 hover:bg-[#fd356e]/10"
							>
								Ver projetos
								<ArrowRight className="w-4 h-4" />
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
