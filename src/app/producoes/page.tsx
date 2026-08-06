import type { Metadata } from "next";
import Link from "next/link";
import {
	ArrowRight,
	Star,
	Trophy,
	Layers,
	Headset,
	Search,
	PenTool,
	Code2,
	Bug,
	Rocket,
} from "lucide-react";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { StackedScrollGallery, type StackedGalleryItem } from "@/components/stacked-scroll-gallery";

export const metadata: Metadata = {
	title: "Produções | Gwapo",
	description:
		"Conheça o passo a passo por trás de cada produção da Gwapo — do briefing ao lançamento, com suporte em todas as etapas.",
};

const stats = [
	{ icon: Trophy, value: "+200", label: "Projetos entregues" },
	{ icon: Star, value: "4.9/5", label: "Avaliação média" },
	{ icon: Layers, value: "6", label: "Categorias de produção" },
	{ icon: Headset, value: "100%", label: "Suporte dedicado" },
];

const iconClass = "w-8 h-8 md:w-9 md:h-9 text-rose-400";

const productionSteps: StackedGalleryItem[] = [
	{
		icon: <Search className={iconClass} />,
		step: "01",
		title: "Descoberta & Briefing",
		description:
			"Antes de qualquer tela ou linha de código, mergulhamos no seu negócio. Entendemos objetivos, público-alvo, referências visuais e o que já funcionou (ou não) até aqui, pra desenhar um escopo que faz sentido pra sua realidade.",
		highlights: [
			"Reunião de alinhamento com o time",
			"Mapeamento de objetivos e métricas de sucesso",
			"Análise de concorrentes e referências",
			"Definição de escopo e cronograma",
		],
		tags: ["Discovery", "Google Meet", "Notion"],
	},
	{
		icon: <PenTool className={iconClass} />,
		step: "02",
		title: "Design & Prototipação",
		description:
			"Transformamos o briefing em wireframes e depois em telas navegáveis. Você acompanha e valida cada decisão de layout, hierarquia visual e identidade antes de qualquer linha de código ser escrita — sem surpresas no fim.",
		highlights: [
			"Wireframes de baixa fidelidade",
			"Identidade visual e paleta de cores",
			"Protótipo navegável no Figma",
			"Rodada de ajustes com seu feedback",
		],
		tags: ["Figma", "UI Design", "Design System"],
	},
	{
		icon: <Code2 className={iconClass} />,
		step: "03",
		title: "Desenvolvimento",
		description:
			"Com o design aprovado, o time de desenvolvimento entra em ação. Construímos com tecnologia moderna, priorizando performance, responsividade e um código limpo que aguenta crescer junto com o seu negócio.",
		highlights: [
			"Componentização e código versionado",
			"Integrações e funcionalidades sob medida",
			"Otimização de performance e SEO técnico",
			"Checkpoints de acompanhamento semanais",
		],
		tags: ["Next.js", "TypeScript", "Tailwind CSS"],
	},
	{
		icon: <Bug className={iconClass} />,
		step: "04",
		title: "Testes & Ajustes",
		description:
			"Antes de ir ao ar, testamos tudo — em diferentes dispositivos, navegadores e cenários de uso. Revisamos textos, fluxos e detalhes visuais com você, garantindo que o produto final está redondo.",
		highlights: [
			"Testes de responsividade e compatibilidade",
			"Revisão de conteúdo e fluxos de navegação",
			"Checklist de qualidade e acessibilidade",
			"Ajustes finos com base no seu feedback",
		],
		tags: ["QA", "Cross-browser", "Acessibilidade"],
	},
	{
		icon: <Rocket className={iconClass} />,
		step: "05",
		title: "Lançamento & Suporte",
		description:
			"Publicamos, acompanhamos os primeiros acessos reais e garantimos que tudo funciona em produção. E não paramos por aí: seguimos disponíveis pra ajustes, dúvidas e evoluções depois do site no ar.",
		highlights: [
			"Deploy monitorado em produção",
			"Configuração de domínio e analytics",
			"Acompanhamento pós-lançamento",
			"Suporte contínuo pra ajustes e melhorias",
		],
		tags: ["Deploy", "Monitoramento", "Suporte"],
	},
];

export default function ProducoesPage() {
	return (
		<div className="bg-[#19191c] text-gray-200 min-h-screen font-aeonik">
			<Header />

			<section className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-20 border-b border-[#ffffff0f]">
				<div className="animate-lighting absolute -top-12 left-0 z-0 h-screen w-[200vw] -translate-x-[25%] translate-y-8 rotate-12 overflow-hidden blur-3xl md:w-full bg-[image:radial-gradient(ellipse_390px_50px_at_10%_30%,_rgba(254,_149,_103,_0.5)_0%,_rgba(254,_149,_103,_0)_70%),_radial-gradient(ellipse_1100px_170px_at_15%_40%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%),_radial-gradient(ellipse_1200px_180px_at_30%_30%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%)] bg-position-[0%_0%] pointer-events-none" />

				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
					<h1 className="text-sm text-rose-400 font-medium mb-4">
						Nosso trabalho
					</h1>
					<h2 className="text-4xl sm:text-5xl md:text-6xl text-gray-100 font-extrabold max-w-3xl mx-auto leading-tight">
						Produções que geram resultado
						<span className="text-rose-500">_</span>
					</h2>
					<p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-6">
						Do briefing ao lançamento: veja o passo a passo por trás de cada
						site que colocamos no ar.
					</p>
				</div>

				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 mt-16">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center"
							>
								<stat.icon className="w-5 h-5 text-rose-400 mx-auto mb-3" />
								<div className="text-2xl md:text-3xl font-extrabold text-gray-100">
									{stat.value}
								</div>
								<div className="text-xs md:text-sm text-gray-400 mt-1">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="pt-20 md:pt-28">
				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-extrabold text-gray-100 mb-4">
						Como produzimos<span className="text-rose-500">_</span>
					</h2>
					<p className="text-gray-400 max-w-xl mx-auto">
						Role pra acompanhar as cinco etapas de cada produção, do briefing
						ao suporte pós-lançamento.
					</p>
				</div>

				<StackedScrollGallery items={productionSteps} />

				<div className="text-center py-16">
					<Link href="/projetos">
						<button className="btn-inner-exact cursor-pointer gap-x-2 py-3 px-5 lg:px-12 text-gray-200 font-medium border border-[#fd356e] rounded-lg text-sm lg:text-base transition-colors duration-150 inline-flex items-center">
							Ver projetos que já produzimos
							<ArrowRight className="w-4 h-4 ml-2" />
						</button>
					</Link>
				</div>
			</section>

			<section className="py-20 md:py-28 border-t border-[#ffffff0f]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
					<div className="relative overflow-hidden rounded-3xl border border-rose-500/20 bg-white/[0.02] p-10 md:p-16 text-center">
						<div className="w-[300px] h-[300px] absolute top-0 left-1/2 -translate-x-1/2 bg-rose-500/10 blur-[100px] pointer-events-none" />
						<div className="relative z-10">
							<h2 className="text-3xl md:text-4xl font-extrabold text-gray-100 mb-4">
								Sua próxima produção começa aqui
								<span className="text-rose-500">_</span>
							</h2>
							<p className="text-gray-300 text-sm mb-8">
								4.9/5 estrelas — baseado em +200 projetos entregues
							</p>
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
