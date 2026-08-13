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
import CTASection from "@/components/cta-section";

export const metadata: Metadata = {
	title: "Produções | Gwapo",
	description:
		"Conheça o passo a passo por trás de cada produção da Gwapo — do briefing ao lançamento, com suporte em todas as etapas.",
	alternates: {
		canonical: "/producoes",
	},
};

const breadcrumbJsonLd = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{ "@type": "ListItem", position: 1, name: "Início", item: "https://www.gwapo.com.br" },
		{ "@type": "ListItem", position: 2, name: "Produções", item: "https://www.gwapo.com.br/producoes" },
	],
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
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<Header />

			<section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28 border-b border-[#ffffff0f]">
				<div className="animate-lighting absolute -top-12 left-0 z-0 h-screen w-[200vw] -translate-x-[25%] translate-y-8 rotate-12 overflow-hidden blur-3xl md:w-full bg-[image:radial-gradient(ellipse_390px_50px_at_10%_30%,_rgba(254,_149,_103,_0.5)_0%,_rgba(254,_149,_103,_0)_70%),_radial-gradient(ellipse_1100px_170px_at_15%_40%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%),_radial-gradient(ellipse_1200px_180px_at_30%_30%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%)] bg-position-[0%_0%] pointer-events-none" />

				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
					<h2 className="text-sm text-rose-400 font-medium mb-4">
						Nosso trabalho
					</h2>
					<h1 className="text-4xl sm:text-5xl md:text-6xl text-gray-100 font-extrabold max-w-3xl mx-auto leading-tight">
						Produções que geram resultado
						<span className="text-rose-500">_</span>
					</h1>
					<p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-6">
						Do briefing ao lançamento: veja o passo a passo por trás de cada
						site que colocamos no ar.
					</p>
				</div>
			</section>

			<section className="border-t border-[#ffffff0f]">
				<StackedScrollGallery items={productionSteps}  />

				<div className="text-center py-16">
					<Link href="/projetos">
						<button className="btn-inner-exact cursor-pointer gap-x-2 py-3 px-5 lg:px-12 text-gray-200 font-medium border border-[#fd356e] rounded-lg text-sm lg:text-base transition-colors duration-150 inline-flex items-center">
							Ver projetos que já produzimos
							<ArrowRight className="w-4 h-4 ml-2" />
						</button>
					</Link>
				</div>

			</section>

			<CTASection
				id="contato-producoes"
				titleLine1="Sua próxima"
				titleHighlight="produção começa aqui"
				items={[
					"Acompanhamento em todas as etapas",
					"Prazos claros e sem enrolação",
					"Suporte pós-lançamento incluso",
				]}
				buttonText="Falar no WhatsApp"
				subtext={
					<>
						4.9/5 estrelas <br />
						Baseado em +200 projetos entregues
					</>
				}
			/>

			<Footer />
		</div>
	);
}
