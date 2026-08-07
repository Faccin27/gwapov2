import type { Metadata } from "next";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import ServicesGrid from "@/components/services-grid";
import CTASection from "@/components/cta-section";

export const metadata: Metadata = {
	title: "Serviços | Gwapo",
	description:
		"Sites corporativos, e-commerce, landing pages, aplicativos web, identidade visual e UI/UX. Conheça os serviços da Gwapo.",
};

export default function ServicosPage() {
	return (
		<div className="bg-[#19191c] text-gray-200 min-h-screen font-aeonik">
			<Header />

			<section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28 border-b border-[#ffffff0f]">
				<div className="animate-lighting absolute -top-12 left-0 z-0 h-screen w-[200vw] -translate-x-[25%] translate-y-8 rotate-12 overflow-hidden blur-3xl md:w-full bg-[image:radial-gradient(ellipse_390px_50px_at_10%_30%,_rgba(254,_149,_103,_0.5)_0%,_rgba(254,_149,_103,_0)_70%),_radial-gradient(ellipse_1100px_170px_at_15%_40%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%),_radial-gradient(ellipse_1200px_180px_at_30%_30%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%)] bg-position-[0%_0%] pointer-events-none" />

				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
					<h1 className="text-sm text-rose-400 font-medium mb-4">
						Nós fazemos
					</h1>
					<h2 className="text-4xl sm:text-5xl md:text-6xl text-gray-100 font-extrabold max-w-6xl mx-auto leading-tight">
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
					<ServicesGrid />
				</div>
			</section>

			<CTASection
				id="contato-servicos"
				titleLine1="Vamos tirar seu"
				titleHighlight="projeto do papel"
				items={["Consultoria gratuita de 30 minutos", "Orçamento sem compromisso"]}
				buttonText="Falar no WhatsApp"
				subtext={undefined}
			/>

			<Footer />
		</div>
	);
}
