"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, Code, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const projectsData = [
  {
    id: 1,
    title: "Myimob Corretora",
    type: "Website Corporativo",
    image: "/projects/myimob.png",
    date: "15 de Janeiro, 2024",
    url: "https://myimob.com.br",
    duration: "3 semanas",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    forSale: true,
    description:
      "Website moderno e responsivo para corretora imobiliária, com sistema de busca avançada, galeria de imóveis e integração com WhatsApp para contato direto.",
    story:
      "O projeto da Myimob surgiu da necessidade de modernizar a presença digital da corretora. O cliente queria um site que transmitisse confiança e profissionalismo, mas que fosse fácil de navegar tanto para compradores quanto vendedores. Desenvolvemos uma interface limpa com foco na experiência do usuário.",
    challenges: [
      "Integração com múltiplas APIs de imóveis",
      "Otimização de performance para carregamento rápido de imagens",
      "Sistema de filtros avançados para busca de imóveis",
      "Responsividade perfeita em todos os dispositivos",
    ],
    process: [
      "Análise de requisitos e pesquisa de mercado",
      "Criação de wireframes e protótipos",
      "Desenvolvimento da interface com Next.js",
      "Integração com APIs e testes de performance",
      "Deploy e otimização SEO",
    ],
    gallery: [
      "/real-estate-homepage.png",
      "/property-search-interface.png",
      "/property-details-page.png",
      "/modern-contact-form.png",
      "/mobile-responsive-design.png",
      "/modern-admin-dashboard.png",
    ],
    related: [2, 3, 4],
  },
  {
    id: 2,
    title: "E-commerce Fashion",
    type: "Loja Virtual",
    image: "/modern-fashion-ecommerce.png",
    date: "22 de Fevereiro, 2024",
    url: "https://fashionstore.com.br",
    duration: "4 semanas",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    forSale: false,
    description:
      "Plataforma completa de e-commerce para moda feminina com carrinho de compras, sistema de pagamento integrado e painel administrativo.",
    story:
      "Este projeto foi um desafio técnico interessante, pois precisávamos criar uma experiência de compra fluida e segura. A cliente queria um design elegante que destacasse seus produtos de forma sofisticada.",
    challenges: [
      "Integração segura com gateway de pagamento",
      "Gestão de estoque em tempo real",
      "Sistema de cupons e promoções",
      "Otimização para conversão de vendas",
    ],
    process: [
      "Definição da arquitetura do sistema",
      "Desenvolvimento do frontend e backend",
      "Integração com Stripe para pagamentos",
      "Testes de segurança e performance",
      "Treinamento da equipe e go-live",
    ],
    gallery: [
      "/fashion-ecommerce-homepage.png",
      "/product-catalog-page.png",
      "/shopping-cart-interface.png",
      "/checkout-process.png",
      "/user-account-dashboard.png",
      "/admin-panel.png",
    ],
    related: [1, 3, 5],
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    type: "Aplicação Web",
    image: "/modern-analytics-dashboard.png",
    date: "10 de Março, 2024",
    url: "https://analytics-app.com",
    duration: "5 semanas",
    technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
    forSale: true,
    description:
      "Dashboard interativo para análise de dados empresariais com gráficos dinâmicos, relatórios personalizáveis e integração com múltiplas fontes de dados.",
    story:
      "O cliente precisava de uma ferramenta para visualizar dados complexos de forma simples e intuitiva. Criamos um dashboard que transforma dados brutos em insights acionáveis através de visualizações interativas.",
    challenges: [
      "Processamento de grandes volumes de dados",
      "Criação de gráficos interativos performantes",
      "Sincronização em tempo real",
      "Interface intuitiva para usuários não-técnicos",
    ],
    process: [
      "Análise dos requisitos de dados",
      "Prototipagem das visualizações",
      "Desenvolvimento da API de dados",
      "Criação da interface com Vue.js",
      "Otimização e testes de carga",
    ],
    gallery: [
      "/analytics-dashboard-overview.png",
      "/data-visualization-charts.png",
      "/report-generation-interface.png",
      "/real-time-monitoring-dashboard.png",
      "/placeholder-k61fa.png",
      "/settings-configuration.png",
    ],
    related: [2, 4, 1],
  },
]

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <ProjectDetailClient id={id} />
}

function ProjectDetailClient({ id }: { id: string }) {
  const [project, setProject] = useState<any>(null)
  const [relatedProjects, setRelatedProjects] = useState<any[]>([])
  const [selectedImage, setSelectedImage] = useState<string>("")

  const heroRef = useRef(null)
  const detailsRef = useRef(null)
  const processRef = useRef(null)
  const galleryRef = useRef(null)
  const relatedRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Find the project based on the ID
    const projectId = Number.parseInt(id)
    const foundProject = projectsData.find((p) => p.id === projectId)

    if (foundProject) {
      setProject(foundProject)
      setSelectedImage(foundProject.image)

      // Get related projects
      const related = foundProject.related.map((id) => projectsData.find((p) => p.id === id)).filter(Boolean)

      setRelatedProjects(related as any[])
    }

    if (heroRef.current && detailsRef.current) {
      gsap.to(detailsRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }

    // Animations
    const timeline = gsap.timeline()

    timeline.fromTo(".hero-content", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

    if (detailsRef.current) {
      gsap.fromTo(
        ".detail-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: detailsRef.current,
            start: "top 80%",
          },
        },
      )
    }

    if (processRef.current) {
      gsap.fromTo(
        ".process-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 80%",
          },
        },
      )
    }

    if (galleryRef.current) {
      gsap.fromTo(
        ".gallery-thumbnail",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        },
      )
    }

    if (relatedRef.current) {
      gsap.fromTo(
        ".related-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: relatedRef.current,
            start: "top 80%",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [id])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#19191c]">
        <div className="text-white text-center">
          <h1 className="text-3xl font-bold mb-4">Projeto não encontrado</h1>
          <p className="mb-6">O projeto que você está procurando não existe ou foi removido.</p>
          <Link href="/projetos" className="text-rose-400 hover:text-rose-300 transition-colors">
            Voltar para projetos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#19191c] text-white">
      {/* Hero Section - Site em tela cheia */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
            }}
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#19191c]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
            }}
          ></div>
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
          <div className="hero-content">
            {project.forSale && (
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full">
                  À VENDA
                </span>
              </div>
            )}

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
              {project.title}
            </h1>

            <p className="text-2xl text-white/90 font-semibold mb-8 max-w-2xl drop-shadow-lg">
              Criamos e desenvolvemos o website da Myimob, traduzindo sua proposta como startup de tecnologia em uma
              presença digital clara, moderna e escalável.
            </p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section ref={detailsRef} className="py-20 bg-[#19191c] relative z-20 rounded-t-3xl">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 detail-item">
              {project.title}
              {project.forSale && <span className="text-red-500"> - À Venda</span>}
            </h2>
            <p className="text-white/70 text-lg detail-item">{project.type}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="text-3xl font-bold mb-6 detail-item">Sobre este projeto</h3>
              <p className="text-white/80 mb-8 detail-item text-lg leading-relaxed">{project.story}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="detail-item">
                  <h4 className="text-lg font-semibold mb-4 text-rose-400">Informações do Projeto</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-white/70">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{project.date}</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <Globe className="w-4 h-4 mr-2" />
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        Ver site
                      </a>
                    </div>
                  </div>
                </div>

                <div className="detail-item">
                  <h4 className="text-lg font-semibold mb-4 text-rose-400">Tecnologias Utilizadas</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-rose-800 text-white text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="detail-item">
                <h4 className="text-lg font-semibold mb-4 text-rose-400">Principais Desafios</h4>
                <ul className="space-y-3">
                  {project.challenges.map((challenge: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Code className="w-4 h-4 mr-2 mt-1 text-rose-400 flex-shrink-0" />
                      <span className="text-white/80">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="detail-item">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={800}
                className="rounded-xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 bg-rose-900/10 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Processo de Desenvolvimento</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Conheça as etapas que seguimos para entregar um projeto de qualidade
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {project.process.map((step: string, index: number) => (
              <div key={index} className="process-item flex items-start mb-8">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                  {index + 1}
                </div>
                <div>
                  <p className="text-lg text-white/90">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={galleryRef} className="py-20 bg-gradient-to-b from-rose-900/10 to-[#19191c] relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Galeria do Projeto</h2>
            <p className="text-white/70">Explore as diferentes telas e funcionalidades</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {project.gallery.map((image: string, index: number) => (
              <div
                key={index}
                className="gallery-thumbnail relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Tela ${index + 1}`}
                  fill
                  className={`object-cover transition-all duration-300 ${
                    selectedImage === image ? "scale-105 border-2 border-rose-500" : "hover:scale-105"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section ref={relatedRef} className="py-20 bg-[#19191c] relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Projetos Relacionados</h2>
            <p className="text-white/70">Confira outros trabalhos semelhantes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((related, index) => (
              <Link
                href={`/projeto/${related.id}`}
                key={related.id}
                className="related-item group relative overflow-hidden rounded-xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={related.image || "/placeholder.svg"}
                    alt={related.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-[#19191c]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="transform translate-y-0 group-hover:translate-y-[-10px] transition-transform duration-300">
                      <span className="inline-block px-3 py-1 bg-rose-500/80 text-white text-xs font-medium rounded-full mb-2">
                        {related.type}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {related.title}
                        {related.forSale && <span className="text-red-400"> - À Venda</span>}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button asChild variant="outline">
              <Link href="/projetos">Ver Todos os Projetos</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
