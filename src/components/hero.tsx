"use client"
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AdminDashboard from "./admin-dashboard"
import { TechShowcase } from "./tech-showcase"
import { TECH_ICONS } from "@/lib/tech-icons"

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

const svgGroups = [
	[
		{ name: "Company 1", src: "/brands/discord.svg" },
		{ name: "Company 2", src: "/brands/tiktok.svg" },
		{ name: "Company 3", src: "/brands/facebook.svg" },
		{ name: "Company 4", src: "/brands/maps.svg" },
	],
	[
		{ name: "Company 5", src: "/brands/youtube.svg" },
		{ name: "Company 6", src: "/brands/github.svg" },
		{ name: "Company 8", src: "/brands/instagram.svg" },
		{ name: "Company 7", src: "/brands/gmail.svg" },
	],
	[
		{ name: "Company 9", src: "/brands/linkedin.svg" },
		{ name: "Company 10", src: "/brands/paypal.svg" },
		{ name: "Company 11", src: "/brands/whatsapp.svg" },
		{ name: "Company 12", src: "/brands/amazon.svg" },
	],
]
interface HeroProps {
	badge?: string
	title?: string
	description?: string
	primaryButtonText?: string
	primaryButtonLink?: string
	secondaryButtonText?: string
}

export default function Hero({
	badge = "Mais de 200 projetos entregues com sucesso",
	title = "Nós criamos sites que geram resultados",
	description = "Desenvolvemos sites modernos, rápidos e responsivos, pensados para impulsionar sua presença online e atrair mais clientes para o seu negócio.",
	primaryButtonText = "Vamos começar",
	primaryButtonLink = "https://wa.me/5549999215720",
	secondaryButtonText = "Ver Portfólio",
}: HeroProps = {}) {
	const [currentGroup, setCurrentGroup] = useState(0)
	const [isTransitioning, setIsTransitioning] = useState(false)

	const heroRef = useRef<HTMLElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLHeadingElement>(null)
	const descriptionRef = useRef<HTMLParagraphElement>(null)
	const buttonsRef = useRef<HTMLDivElement>(null)
	const techSectionRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const interval = setInterval(() => {
			setIsTransitioning(true)
			setTimeout(() => {
				setCurrentGroup((prev) => (prev + 1) % svgGroups.length)
				setIsTransitioning(false)
			}, 1000)
		}, 4000)

		return () => clearInterval(interval)
	}, [])

	useIsomorphicLayoutEffect(() => {
		if (typeof window === "undefined") return

		const ctx = gsap.context(() => {
			// Hero entrance animations
			// Note: the tech-item logos row uses a pure-CSS entrance animation
			// (.tech-item-in in globals.css) instead of GSAP, so it starts as
			// soon as the browser paints the element instead of waiting for
			// React hydration + this effect to run.
			const tl = gsap.timeline()

			tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
				.fromTo(
					subtitleRef.current,
					{ opacity: 0, y: 30 },
					{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
					"-=0.4",
				)
				.fromTo(
					descriptionRef.current,
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
					"-=0.3",
				)
				.fromTo(
					buttonsRef.current,
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
					"-=0.2",
				)
		}, heroRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={heroRef}
			className="py-8 md:py-16 lg:py-28 relative overflow-hidden bg-[#19191c] mt-32 border-b border-[#ffffff0f]"
		>
			<div className="animate-lighting absolute -top-12 left-0 z-0 h-screen w-[200vw] -translate-x-[25%] translate-y-8 rotate-12 overflow-hidden blur-3xl md:w-full bg-[image:radial-gradient(ellipse_390px_50px_at_10%_30%,_rgba(254,_149,_103,_0.5)_0%,_rgba(254,_149,_103,_0)_70%),_radial-gradient(ellipse_1100px_170px_at_15%_40%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%),_radial-gradient(ellipse_1200px_180px_at_30%_30%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%)] bg-position-[0%_0%] pointer-events-none" />
			<div className="hidden lg:block absolute right-0 top-0 h-[680px] w-1/2 lg:w-2/4 xl:w-1/2 z-50">
				<div className="relative h-full">
					<AdminDashboard />
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-50% to-[#19191c] pointer-events-none" />
				</div>
			</div>
			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 relative z-40">
				<div className="flex flex-col md:flex-row md:items-start md:gap-x-8 lg:gap-x-12">
					<div className="flex-none space-y-4 sm:space-y-5 max-w-full md:max-w-[60%] lg:max-w-[50%] xl:max-w-[50%]">
						<h2 ref={titleRef} className="text-sm text-rose-400 font-medium opacity-0 translate-y-[50px]">
							{badge}
						</h2>
						<h1
							ref={subtitleRef}
							className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-gray-100 font-extrabold max-w-11/12 leading-tight opacity-0 translate-y-[30px]"
						>
							{title}
							<span className="text-rose-500">_</span>
						</h1>
						<p ref={descriptionRef} className="text-gray-300 text-base md:text-base lg:text-lg leading-relaxed opacity-0 translate-y-[20px]">
							{description}
						</p>
						<div
							ref={buttonsRef}
							className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-x-3 relative z-20 opacity-0 translate-y-[20px]"
						>
							<a
								href={primaryButtonLink}
								target="_blank"
								rel="noopener noreferrer"
								className="neon-glow block py-2 px-5 bg-[#fd356e] text-white rounded-lg transition-all duration-300 hover:brightness-110"
							>
								{primaryButtonText}
							</a>

							<Link href="/projetos" className="btn-inner-exact flex items-center justify-center gap-x-2 py-2 px-5 lg:px-6 text-gray-200 font-medium border border-[#fd356e] rounded-lg text-sm lg:text-base transition-colors duration-150 relative z-30" > {secondaryButtonText} <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" /> </Link>

						</div>
					</div>
					<div className="md:hidden lg:block w-full mt-8">
						<div className="relative h-64 sm:h-80 w-full">
							<Image
								src="/image.png"
								fill
								priority
								fetchPriority="high"
								className="object-cover rounded-lg"
								alt="Equipe Gwapo desenvolvendo um site"
							/>
							<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-50% to-[#19191c] rounded-lg" />
						</div>
					</div>
				</div>
			</div>
			<div ref={techSectionRef} className="relative z-[100] mt-12 md:mt-32 lg:mt-52">
				<TechShowcase label="Desenvolvido com as melhores tecnologias" items={TECH_ICONS} />
			</div>
			<div className="relative z-[100] mt-8 md:mt-10 lg:mt-12">
				<p className="text-greyscale-100 text-description mx-auto max-w-[312px] md:max-w-[400px] text-center text-lg md:text-xl text-pretty mb-12 md:mb-16 lg:mb-20 px-4">
					Utilizamos as tecnologias mais inovadoras para criar o seu site
				</p>
				<div className="relative h-20 md:h-20 overflow-hidden">
					<div className="flex justify-center items-center max-w-6xl mx-auto px-4">
						{svgGroups.map((group, groupIndex) => (
							<div key={groupIndex} className="absolute inset-0 flex justify-center items-center">
								<div className="hidden md:flex gap-4 lg:gap-8 w-full justify-center">
									{group.map((svg, index) => (
										<div
											key={index}
											className={`flex-1 max-w-[140px] md:max-w-[160px] lg:max-w-[200px] h-10 md:h-12 flex items-center justify-center transition-all duration-[1500ms] ease-in-out ${groupIndex === currentGroup
												? isTransitioning
													? "transform -translate-y-full opacity-0 blur-[8px]"
													: "transform translate-y-0 opacity-100 blur-0"
												: groupIndex === (currentGroup + 1) % svgGroups.length
													? isTransitioning
														? "transform translate-y-0 opacity-100 blur-0"
														: "transform translate-y-full opacity-0 blur-[8px]"
													: "transform translate-y-full opacity-0 blur-[8px]"
												}`}
											style={{
												aspectRatio: "8/2",
												transitionDelay: `${index * 100}ms`,
												position: "relative",
											}}
										>
											<Image
												src={svg.src || "/placeholder.svg"}
												alt={svg.name}
												fill
												className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
											/>
										</div>
									))}
								</div>
								<div className="md:hidden grid grid-cols-2 gap-4 w-full max-w-sm mx-auto">
									{group.map((svg, index) => (
										<div
											key={index}
											className={`h-8 flex items-center justify-center transition-all duration-[1500ms] ease-in-out ${groupIndex === currentGroup
												? isTransitioning
													? "transform -translate-y-full opacity-0 blur-[8px]"
													: "transform translate-y-0 opacity-100 blur-0"
												: groupIndex === (currentGroup + 1) % svgGroups.length
													? isTransitioning
														? "transform translate-y-0 opacity-100 blur-0"
														: "transform translate-y-full opacity-0 blur-[8px]"
													: "transform translate-y-full opacity-0 blur-[8px]"
												}`}
											style={{
												aspectRatio: "8/2",
												transitionDelay: `${index * 100}ms`,
												position: "relative",
											}}
										>
											<Image
												src={svg.src || "/placeholder.svg"}
												alt={svg.name}
												fill
												className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
											/>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<style jsx>{`
        @keyframes lighting {
          0%,
          100% {
            opacity: 0.8;
            transform: translateX(-35%) translateY(8px) rotate(12deg) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateX(-30%) translateY(12px) rotate(12deg)
              scale(1.05);
          }
        }
        .animate-lighting {
          animation: lighting 8s ease-in-out infinite;
        }
      `}</style>
		</section>
	)
}
