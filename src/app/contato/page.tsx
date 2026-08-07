import type { Metadata } from "next";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import ContactExperience from "@/components/contact-experience";

export const metadata: Metadata = {
	title: "Contato | Gwapo",
	description:
		"Fale com a Gwapo. Conte sobre seu projeto em poucos passos e receba um retorno direto no WhatsApp.",
};

export default function ContatoPage() {
	return (
		<div className="bg-[#19191c] text-gray-200 min-h-screen font-aeonik">
			<Header />
			<ContactExperience />
			<Footer />
		</div>
	);
}
