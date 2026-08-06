import type { Metadata } from "next";
import Link from "next/link";
import {
	Building2,
	ShoppingCart,
	Rocket,
	Smartphone,
	Palette,
	PenTool,
	CheckCircle2,
	ArrowRight,
} from "lucide-react";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
	title: "Serviços | Gwapo",
	description:
		"Sites corporativos, e-commerce, landing pages, aplicativos web, identidade visual e UI/UX. Conheça os serviços da Gwapo.",
};

const services = [
	{
		icon: Building2,
		title: "Sites Corporativos",
		description:
			"Presença digital profissional para sua empresa, com design moderno e foco em transmitir confiança.",
		type: "Sites+Corporativos",
	},
	{
		icon: ShoppingCart,
		title: "E-commerce",
		description:
			"Lojas virtuais completas, com carrinho, pagamento integrado e experiência de compra fluida.",
		type: "E-commerce",
	},
	{
		icon: Rocket,
		title: "Landing Pages",
		description:
			"Páginas de conversão pensadas para transformar visitantes em clientes, rápidas e objetivas.",
		type: "Landing+Pages",
	},
	{
		icon: Smartphone,
		title: "Aplicativos Web",
		description:
			"Soluções personalizadas — dashboards, sistemas internos e ferramentas sob medida para o seu negócio.",
		type: "Aplicativos+Web",
	},
	{
		icon: Palette,
		title: "Identidade Visual",
		description:
			"Logo, paleta de cores e branding completo para sua marca ser reconhecida em qualquer lugar.",
		type: "Identidade+Visual",
	},
	{
		icon: PenTool,
		title: "UI/UX Design",
		description:
			"Experiências de usuário intuitivas, com pesquisa, wireframes e protótipos antes de qualquer linha de código.",
		type: "UI%2FUX+Design",
	},
];

const process = [
	{
		step: "01",
		title: "Descoberta",
		description:
			"Entendemos seu negócio, objetivos e público-alvo pra definir o escopo certo do projeto.",
	},
	{
		step: "02",
		title: "Design",
		description:
			"Criamos wireframes e protótipos visuais alinhados à sua identidade antes de programar qualquer coisa.",
	},
	{
		step: "03",
		title: "Desenvolvimento",
		description:
			"Construímos o site com tecnologia moderna, performance e responsividade em primeiro lugar.",
	},
	{
		step: "04",
		title: "Deploy & Suporte",
		description:
			"Publicamos, testamos em produção e seguimos disponíveis pra ajustes e suporte contínuo.",
	},
];

export default function ServicosPage() {
	return (
		<div className="bg-[#19191c] text-gray-200 min-h-screen font-aeonik">
			<Header />

			<section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28 border-b border-[#ffffff0f]">
				<div className="animate-lighting absolute -top-12 left-0 z-0 h-screen w-[200vw] -translate-x-[25%] translate-y-8 rotate-12 overflow-hidden blur-3xl md:w-full bg-[image:radial-gradient(ellipse_390px_50px_at_10%_30%,_rgba(254,_149,_103,_0.5)_0%,_rgba(254,_149,_103,_0)_70%),_radial-gradient(ellipse_1100px_170px_at_15%_40%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%),_radial-gradient(ellipse_1200px_180px_at_30%_30%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%)] bg-position-[0%_0%] pointer-events-none" />

				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
					<h1 className="text-sm text-rose-400 font-medium mb-4">
						O que fazemos
					</h1>
					<h2 className="text-4xl sm:text-5xl md:text-6xl text-gray-100 font-extrabold max-w-3xl mx-auto leading-tight">
						Serviços que impulsionam seu negócio
						<span className="text-rose-500">_</span>
					</h2>
					<p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-6">
						Da identidade visual ao site no ar: cuidamos de cada etapa pra
						entregar um produto digital que realmente gera resultado.
					</p>
				</div>
			</section>

			<section className="py-20 md:py-28">
				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{services.map((service) => (
							<Link
								key={service.title}
								href={`/projetos?tipo=${service.type}`}
								className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-rose-500/30 hover:bg-white/[0.04]"
							>
								<div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/10 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
								<div className="relative z-10">
									<div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 group-hover:bg-rose-500/20 transition-colors duration-300">
										<service.icon className="w-6 h-6 text-rose-400" />
									</div>
									<h3 className="text-xl font-semibold text-gray-100 mb-2">
										{service.title}
									</h3>
									<p className="text-gray-400 text-sm leading-relaxed mb-4">
										{service.description}
									</p>
									<span className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-400 group-hover:gap-2.5 transition-all duration-300">
										Ver projetos
										<ArrowRight className="w-4 h-4" />
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 md:py-28 border-t border-[#ffffff0f]">
				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-extrabold text-gray-100 mb-4">
							Como trabalhamos<span className="text-rose-500">_</span>
						</h2>
						<p className="text-gray-400 max-w-xl mx-auto">
							Um processo claro do início ao fim, sem surpresas.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{process.map((item) => (
							<div
								key={item.step}
								className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6"
							>
								<span className="text-4xl font-black text-rose-500/20">
									{item.step}
								</span>
								<h3 className="text-lg font-semibold text-gray-100 mt-2 mb-2">
									{item.title}
								</h3>
								<p className="text-gray-400 text-sm leading-relaxed">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="contato-servicos" className="py-20 md:py-28 border-t border-[#ffffff0f]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
					<div className="relative overflow-hidden rounded-3xl border border-rose-500/20 bg-white/[0.02] p-10 md:p-16 text-center">
						<div className="w-[300px] h-[300px] absolute top-0 left-1/2 -translate-x-1/2 bg-rose-500/10 blur-[100px] pointer-events-none" />
						<div className="relative z-10">
							<h2 className="text-3xl md:text-4xl font-extrabold text-gray-100 mb-4">
								Vamos tirar seu projeto do papel
								<span className="text-rose-500">_</span>
							</h2>
							<div className="flex flex-col gap-2 items-center mt-6 mb-8 text-gray-300 text-sm">
								<div className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-rose-400 flex-shrink-0" />
									Consultoria gratuita de 30 minutos
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-rose-400 flex-shrink-0" />
									Orçamento sem compromisso
								</div>
							</div>
							<a
								href="https://wa.me/5549999215720"
								target="_blank"
								rel="noopener noreferrer"
								className="neon-glow inline-block font-semibold py-3 px-8 bg-[#fd356e] text-white rounded-lg transition-all duration-300 hover:brightness-110"
							>
								Falar no WhatsApp
							</a>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
