"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
	Mail,
	Phone,
	Instagram,
	ArrowRight,
	ArrowLeft,
	MessageCircle,
	Copy,
	CheckCheck,
	Sparkles,
	Send,
	AlertCircle,
	ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContactQuestion } from "@/lib/contact-questions";
import Link from "next/link";

const previewChat = [
	{ from: "user" as const, text: "Oi! Preciso de um site pra minha loja 🛍️" },
	{ from: "gwapo" as const, text: "Show! A consultoria de 30min é por nossa conta 🙌" },
	{ from: "user" as const, text: "Perfeito, bora marcar!" },
];

const faqs = [
	{
		question: "Quanto custa um projeto?",
		answer:
			"Varia conforme o escopo. Por isso a consultoria inicial é gratuita — a gente entende sua necessidade e manda um orçamento sob medida, sem letra miúda.",
	},
	{
		question: "Quanto tempo leva pra ficar pronto?",
		answer:
			"Depende do tamanho do projeto, mas a maioria fica pronta entre 2 e 6 semanas. No formulário você já conta seu prazo ideal e a gente se organiza em cima disso.",
	},
	{
		question: "Preciso já ter tudo pronto (textos, logo, imagens)?",
		answer:
			"Não. A gente te ajuda a organizar isso durante o processo — muita gente chega só com a ideia na cabeça.",
	},
	{
		question: "Como funciona o pagamento?",
		answer:
			"Normalmente dividimos em etapas: um sinal pra começar e o restante conforme as entregas. Fechamos os detalhes na conversa inicial, sem surpresas.",
	},
	{
		question: "Depois de pronto, vocês ainda ajudam?",
		answer:
			"Sim. Suporte pós-lançamento incluso pra ajustes e dúvidas — a gente não desaparece depois do deploy.",
	},
];

interface ContactExperienceProps {
	contactEmail?: string;
	contactPhone?: string;
	instagramUrl?: string;
	whatsappNumber?: string;
	questions?: ContactQuestion[];
}

interface Particle {
	tx: number;
	ty: number;
	size: number;
	delay: number;
}

function buildParticles(): Particle[] {
	return Array.from({ length: 14 }).map(() => {
		const angle = Math.random() * Math.PI * 2;
		const distance = 50 + Math.random() * 50;
		return {
			tx: Math.cos(angle) * distance,
			ty: Math.sin(angle) * distance,
			size: 4 + Math.random() * 4,
			delay: Math.random() * 120,
		};
	});
}

export default function ContactExperience({
	contactEmail = "contact@gwapo.com.br",
	contactPhone = "(49) 99921-5720",
	instagramUrl = "https://instagram.com/gui.faccin",
	whatsappNumber = "5549999215720",
	questions = [],
}: ContactExperienceProps) {
	const instagramHandle = instagramUrl.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "");

	const contactChannels = [
		{ icon: Mail, label: "E-mail", value: contactEmail, href: `mailto:${contactEmail}` },
		{ icon: Phone, label: "WhatsApp", value: contactPhone, href: `https://wa.me/${whatsappNumber}` },
		{ icon: Instagram, label: "Instagram", value: instagramHandle, href: instagramUrl },
	];

	// Fixed steps: "Você" (0) and "Negócio" (1) always exist; then one step per
	// admin-defined question; then a final free-text "Detalhes" step.
	const questionStepStart = 2;
	const totalSteps = questionStepStart + questions.length + 1;
	const detailsStep = totalSteps - 1;

	const spotlightRef = useRef<HTMLDivElement>(null);

	const [step, setStep] = useState(0);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [currentSite, setCurrentSite] = useState("");
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const [message, setMessage] = useState("");

	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
	const [openFaq, setOpenFaq] = useState<number | null>(null);
	const [bursting, setBursting] = useState(false);
	const [particles, setParticles] = useState<Particle[]>([]);

	const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		const handleMove = (e: MouseEvent) => {
			spotlightRef.current?.style.setProperty("--x", `${e.clientX}px`);
			spotlightRef.current?.style.setProperty("--y", `${e.clientY}px`);
		};
		window.addEventListener("mousemove", handleMove);
		return () => window.removeEventListener("mousemove", handleMove);
	}, []);

	const currentQuestion =
		step >= questionStepStart && step < questionStepStart + questions.length
			? questions[step - questionStepStart]
			: null;

	const canContinue = (() => {
		if (step === 0) return name.trim().length > 1;
		if (step === 1) return businessName.trim().length > 1;
		if (currentQuestion) {
			if (!currentQuestion.required) return true;
			const value = answers[currentQuestion.id];
			return currentQuestion.type === "choice" ? !!value : !!value?.trim();
		}
		return true;
	})();

	const goNext = () => {
		if (!canContinue) return;
		setStep((s) => Math.min(totalSteps - 1, s + 1));
	};
	const goBack = () => setStep((s) => Math.max(0, s - 1));

	const handleSend = async () => {
		if (!name.trim() || status === "submitting") return;

		setStatus("submitting");
		setErrorMessage(null);

		try {
			const answerPairs = questions
				.map((q) => ({ question: q.question, answer: (answers[q.id] ?? "").trim() }))
				.filter((a) => a.answer);

			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					email,
					phone,
					businessName,
					currentSite,
					answers: answerPairs,
					message,
				}),
			});

			if (!res.ok) {
				const data = await res.json().catch(() => null);
				throw new Error(data?.error ?? "Não deu pra enviar agora.");
			}

			setParticles(buildParticles());
			setBursting(true);
			setStatus("success");
			window.setTimeout(() => setBursting(false), 800);
		} catch (err) {
			setStatus("error");
			setErrorMessage(err instanceof Error ? err.message : "Não deu pra enviar agora.");
		}
	};

	const handleCopy = async (index: number, value: string) => {
		try {
			await navigator.clipboard.writeText(value);
			setCopiedIndex(index);
			window.setTimeout(() => {
				setCopiedIndex((current) => (current === index ? null : current));
			}, 1500);
		} catch {
			// clipboard unavailable — silently ignore
		}
	};

	const stepHeading = (() => {
		if (step === 0) return "Você";
		if (step === 1) return "Negócio";
		if (currentQuestion) return currentQuestion.question;
		return "Detalhes";
	})();

	return (
		<>
			<div
				ref={spotlightRef}
				className="pointer-events-none fixed inset-0 z-0"
				style={{
					background:
						"radial-gradient(600px circle at var(--x, 50%) var(--y, 20%), rgba(253,53,110,0.12), transparent 45%)",
				}}
			/>

			{/* Hero */}
			<section className="relative z-10 overflow-hidden pt-40 pb-16 md:pt-48 md:pb-20 border-b border-[#ffffff0f]">
				<div className="animate-lighting absolute -top-12 left-0 z-0 h-screen w-[200vw] -translate-x-[25%] translate-y-8 rotate-12 overflow-hidden blur-3xl md:w-full bg-[image:radial-gradient(ellipse_390px_50px_at_10%_30%,_rgba(254,_149,_103,_0.5)_0%,_rgba(254,_149,_103,_0)_70%),_radial-gradient(ellipse_1100px_170px_at_15%_40%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%),_radial-gradient(ellipse_1200px_180px_at_30%_30%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%)] bg-position-[0%_0%] pointer-events-none" />

				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-sm text-rose-400 font-medium mb-4">Fale com a gente</h2>
							<h1 className="text-4xl sm:text-5xl md:text-6xl text-gray-100 font-extrabold leading-tight">
								Bora tirar sua ideia
								<br />
								do papel<span className="text-rose-500">_</span>
							</h1>
							<p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mt-6">
								Conte sobre seu projeto em poucos passos. A gente recebe direto e
								retorna rapidinho — sem formulário perdido, sem espera.
							</p>
						</div>

						{/* Decorative chat preview card */}
						<div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 md:p-8 shadow-2xl shadow-black/50">
							<div
								className="absolute inset-0 opacity-[0.15]"
								style={{
									backgroundImage:
										"radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
									backgroundSize: "20px 20px",
								}}
							/>
							<div className="absolute -top-16 -right-16 w-52 h-52 bg-rose-500/20 blur-[100px] rounded-full pointer-events-none" />
							<MessageCircle className="absolute -bottom-10 -right-8 w-56 h-56 text-white/[0.04] pointer-events-none" />

							<div className="relative z-10 flex flex-col gap-3">
								{previewChat.map((bubble, i) => (
									<div
										key={i}
										className={cn(
											"flex items-end gap-2",
											bubble.from === "user" ? "self-end flex-row-reverse" : "self-start"
										)}
									>
										{bubble.from === "gwapo" && (
											<Image
												src="/logos-svg/5-1.svg"
												alt="Mascote Gwapo"
												width={28}
												height={28}
												className="w-7 h-7 rounded-full flex-shrink-0 object-contain bg-white/5 border border-white/10 p-1"
											/>
										)}
										<div
											className={cn(
												"max-w-[220px] rounded-2xl px-4 py-2.5 text-sm leading-snug",
												bubble.from === "user"
													? "bg-[#fd356e] text-white rounded-br-sm"
													: "bg-white/[0.06] border border-white/10 text-gray-200 rounded-bl-sm"
											)}
										>
											{bubble.text}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>


			{/* Contact info + form */}
			<section className="relative z-10 py-16 md:py-24">
				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8">
					<div className="flex flex-col gap-4">
						{contactChannels.map((channel, index) => (
							<div
								key={channel.label}
								className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-rose-500/30 hover:bg-white/[0.04]"
							>
								<div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
									<channel.icon className="w-5 h-5 text-rose-400" />
								</div>
								<a
									href={channel.href}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1 min-w-0"
								>
									<div className="text-xs text-gray-500">{channel.label}</div>
									<div className="text-sm md:text-base text-gray-100 font-medium truncate">
										{channel.value}
									</div>
								</a>
								<button
									type="button"
									onClick={() => handleCopy(index, channel.value)}
									aria-label={`Copiar ${channel.label}`}
									className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-rose-400 hover:bg-white/5 transition-colors duration-300"
								>
									{copiedIndex === index ? (
										<CheckCheck className="w-4 h-4 text-emerald-400" />
									) : (
										<Copy className="w-4 h-4" />
									)}
								</button>
							</div>
						))}

						<a
							href={`https://wa.me/${whatsappNumber}`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 p-5 text-sm font-medium text-gray-300 hover:border-rose-500/40 hover:text-rose-300 hover:bg-white/[0.02] transition-all duration-300"
						>
							<MessageCircle className="w-4 h-4" />
							Prefiro conversar direto no WhatsApp
						</a>

						<div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 mt-2">
							<Image
								src="/logos-svg/5-1.svg"
								alt=""
								width={72}
								height={72}
								className="absolute -bottom-3 -right-3 w-[72px] h-[72px] object-contain opacity-10 pointer-events-none"
							/>
							<div className="relative z-10 flex items-center gap-2 text-sm text-gray-200 mb-3">
								<Sparkles className="w-4 h-4 text-rose-400" />
								Por que falar com a Gwapo
							</div>
							<ul className="relative z-10 flex flex-col gap-2 text-sm text-gray-400">
								<li>Consultoria gratuita de 30 minutos</li>
								<li>Orçamento sem compromisso</li>
								<li>+200 projetos entregues</li>
							</ul>
						</div>
					</div>

					<div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 sm:p-8 md:p-12 shadow-2xl shadow-black/40">
						<div
							className="absolute inset-0 opacity-[0.15]"
							style={{
								backgroundImage:
									"radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
								backgroundSize: "22px 22px",
							}}
						/>
						<div className="absolute -top-24 -right-24 w-[360px] h-[360px] bg-rose-500/20 blur-[110px] rounded-full pointer-events-none" />

						<div className="relative z-10">
							{status === "success" ? (
								<div className="flex flex-col items-center text-center py-12">
									<Image
										src="/logos-svg/5-1.svg"
										alt="Mascote Gwapo"
										width={64}
										height={64}
										className="w-16 h-16 object-contain mb-6"
									/>
									<h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
										Mandado com sucesso!
									</h3>
									<p className="text-gray-400 max-w-sm">
										Recebemos sua mensagem e já vamos te chamar. Enquanto isso, fica
										à vontade pra dar uma olhada nos nossos projetos.
									</p>
									<Link href="/projetos" className="btn-inner-exact flex items-center justify-center gap-x-2 mt-6 py-2 px-5 lg:px-6 text-gray-200 font-medium border border-[#fd356e] rounded-lg text-sm lg:text-base transition-colors duration-150 relative z-30">
										Ver Portfólio
										<ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
									</Link>

								</div>
							) : (
								<>
									<div className="flex items-center justify-between mb-8 gap-4">
										<span className="text-xs font-semibold uppercase tracking-widest text-rose-400 line-clamp-1">
											Passo {step + 1} de {totalSteps} — {stepHeading}
										</span>
										<a
											href={`https://wa.me/${whatsappNumber}`}
											target="_blank"
											rel="noopener noreferrer"
											className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400 hover:border-rose-500/40 hover:text-rose-300 transition-all duration-300"
										>
											Pular pro WhatsApp
											<ArrowRight className="w-3 h-3" />
										</a>
									</div>

									<div key={step} className="animate-in fade-in slide-in-from-right-4 duration-300 min-h-[280px]">
										{step === 0 && (
											<div>
												<h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
													Como você se chama?
												</h3>
												<input
													autoFocus
													value={name}
													onChange={(e) => setName(e.target.value)}
													onKeyDown={(e) => {
														if (e.key === "Enter") goNext();
													}}
													placeholder="Seu nome"
													className="w-full bg-transparent border-b-2 border-white/10 focus:border-rose-500 outline-none text-xl md:text-2xl text-white placeholder:text-gray-600 py-3 transition-colors duration-300"
												/>
												<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
													<input
														value={email}
														onChange={(e) => setEmail(e.target.value)}
														placeholder="E-mail (opcional)"
														type="email"
														className="w-full bg-transparent border-b border-white/10 focus:border-rose-500 outline-none text-sm text-white placeholder:text-gray-600 py-2 transition-colors duration-300"
													/>
													<input
														value={phone}
														onChange={(e) => setPhone(e.target.value)}
														placeholder="Telefone (opcional)"
														type="tel"
														className="w-full bg-transparent border-b border-white/10 focus:border-rose-500 outline-none text-sm text-white placeholder:text-gray-600 py-2 transition-colors duration-300"
													/>
												</div>
											</div>
										)}

										{step === 1 && (
											<div>
												<h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
													Fala um pouco do seu negócio
												</h3>
												<input
													autoFocus
													value={businessName}
													onChange={(e) => setBusinessName(e.target.value)}
													placeholder="Nome da empresa ou marca"
													className="w-full bg-transparent border-b-2 border-white/10 focus:border-rose-500 outline-none text-xl md:text-2xl text-white placeholder:text-gray-600 py-3 transition-colors duration-300"
												/>
												<input
													value={currentSite}
													onChange={(e) => setCurrentSite(e.target.value)}
													placeholder="Já tem site ou rede social? Cole o link aqui (opcional)"
													className="w-full bg-transparent border-b border-white/10 focus:border-rose-500 outline-none text-sm text-white placeholder:text-gray-600 py-2 mt-8 transition-colors duration-300"
												/>
											</div>
										)}

										{currentQuestion && (
											<div>
												<h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
													{currentQuestion.question}
												</h3>
												{currentQuestion.type === "choice" ? (
													<div className="flex flex-wrap gap-2">
														{currentQuestion.options.map((opt) => (
															<button
																type="button"
																key={opt}
																onClick={() =>
																	setAnswers((a) => ({ ...a, [currentQuestion.id]: opt }))
																}
																className={cn(
																	"rounded-full border px-4 py-2 text-sm transition-all duration-300",
																	answers[currentQuestion.id] === opt
																		? "border-rose-500/60 bg-rose-500/10 text-rose-300"
																		: "border-white/10 bg-white/[0.02] text-gray-300 hover:border-white/20 hover:bg-white/[0.05]"
																)}
															>
																{opt}
															</button>
														))}
													</div>
												) : (
													<textarea
														value={answers[currentQuestion.id] ?? ""}
														onChange={(e) =>
															setAnswers((a) => ({ ...a, [currentQuestion.id]: e.target.value }))
														}
														rows={5}
														placeholder="Sua resposta"
														className="w-full rounded-xl border border-white/10 bg-white/[0.02] focus:border-rose-500 outline-none text-sm md:text-base text-white placeholder:text-gray-600 p-4 transition-colors duration-300 resize-none"
													/>
												)}
											</div>
										)}

										{step === detailsStep && (
											<div>
												<h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
													Conte mais sobre seu projeto
												</h3>
												<textarea
													value={message}
													onChange={(e) => setMessage(e.target.value)}
													rows={4}
													placeholder="Opcional: referências, funcionalidades específicas, quem mais decide..."
													className="w-full rounded-xl border border-white/10 bg-white/[0.02] focus:border-rose-500 outline-none text-sm md:text-base text-white placeholder:text-gray-600 p-4 transition-colors duration-300 resize-none"
												/>
												<div className="flex flex-wrap gap-2 mt-5">
													{[businessName, ...Object.values(answers)]
														.filter(Boolean)
														.map((tag) => (
															<span
																key={tag}
																className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-gray-400"
															>
																{tag}
															</span>
														))}
												</div>
												{status === "error" && errorMessage && (
													<div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300 mt-5">
														<AlertCircle className="w-4 h-4 flex-shrink-0" />
														{errorMessage} Tenta de novo ou chama a gente direto no WhatsApp.
													</div>
												)}
											</div>
										)}
									</div>

									<div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
										<button
											type="button"
											onClick={goBack}
											disabled={step === 0}
											className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 disabled:opacity-0 disabled:pointer-events-none"
										>
											<ArrowLeft className="w-4 h-4" />
											Voltar
										</button>

										<div className="flex items-center gap-2">
											{Array.from({ length: totalSteps }).map((_, i) => (
												<span
													key={i}
													className={cn(
														"h-1.5 rounded-full transition-all duration-300",
														i === step ? "w-8 bg-rose-500" : "w-1.5 bg-white/15"
													)}
												/>
											))}
										</div>

										{step < totalSteps - 1 ? (
											<button
												type="button"
												onClick={goNext}
												disabled={!canContinue}
												className="inline-flex items-center gap-1.5 rounded-lg bg-[#fd356e] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 disabled:opacity-30 disabled:pointer-events-none"
											>
												Continuar
												<ArrowRight className="w-4 h-4" />
											</button>
										) : (
											<button
												type="button"
												onClick={handleSend}
												disabled={status === "submitting"}
												className="neon-glow relative inline-flex items-center gap-1.5 rounded-lg bg-[#fd356e] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 disabled:opacity-60"
											>
												{status === "submitting" ? "Enviando..." : "Enviar mensagem"}
												<Send className="w-4 h-4" />
												{bursting &&
													particles.map((p, i) => (
														<span
															key={i}
															className="pointer-events-none absolute left-1/2 top-1/2 rounded-full bg-rose-300"
															style={
																{
																	width: p.size,
																	height: p.size,
																	"--tx": `${p.tx}px`,
																	"--ty": `${p.ty}px`,
																	animation: "contact-particle-burst 700ms ease-out forwards",
																	animationDelay: `${p.delay}ms`,
																} as React.CSSProperties
															}
														/>
													))}
											</button>
										)}
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="relative z-10 py-16 md:py-20 border-b border-[#ffffff0f]">
				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 items-start">
						<div>
							<h2 className="text-sm text-rose-400 font-medium mb-3">Antes de perguntar</h2>
							<h3 className="text-3xl md:text-4xl font-extrabold text-gray-100 leading-tight">
								Dúvidas que sempre
								<br />
								aparecem<span className="text-rose-500">_</span>
							</h3>
							<p className="text-gray-400 text-sm md:text-base leading-relaxed mt-5 max-w-sm">
								Reunimos o que mais perguntam antes de fechar um projeto. Se
								ainda ficar alguma dúvida, é só chamar.
							</p>
						</div>

						<div className="flex flex-col gap-3">
							{faqs.map((faq, index) => {
								const isOpen = openFaq === index;
								return (
									<div
										key={faq.question}
										className={cn(
											"rounded-2xl border bg-white/[0.02] transition-colors duration-300",
											isOpen ? "border-rose-500/30" : "border-white/10"
										)}
									>
										<button
											type="button"
											onClick={() => setOpenFaq(isOpen ? null : index)}
											className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
											aria-expanded={isOpen}
										>
											<span
												className={cn(
													"text-sm md:text-base font-medium transition-colors duration-300",
													isOpen ? "text-rose-300" : "text-gray-200"
												)}
											>
												{faq.question}
											</span>
											<ChevronDown
												className={cn(
													"w-4 h-4 flex-shrink-0 text-gray-500 transition-transform duration-300",
													isOpen && "rotate-180 text-rose-400"
												)}
											/>
										</button>
										<div
											className={cn(
												"grid transition-all duration-300 ease-in-out",
												isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
											)}
										>
											<div className="overflow-hidden">
												<p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
													{faq.answer}
												</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>


			<style jsx>{`
				@keyframes contact-particle-burst {
					0% {
						transform: translate(-50%, -50%) scale(1);
						opacity: 1;
					}
					100% {
						transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
						opacity: 0;
					}
				}
			`}</style>
		</>
	);
}
