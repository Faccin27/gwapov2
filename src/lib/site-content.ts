import "server-only"
import { cache } from "react"
import { prisma } from "@/lib/prisma"
import type { SiteContent, Prisma } from "@prisma/client"
import { DEFAULT_CONTACT_QUESTIONS } from "@/lib/contact-questions"

export const DEFAULT_SITE_CONTENT: Omit<SiteContent, "id" | "updatedAt"> = {
  heroBadge: "Mais de 200 projetos entregues com sucesso",
  heroTitle: "Nós criamos sites que geram resultados",
  heroDescription:
    "Desenvolvemos sites modernos, rápidos e responsivos, pensados para impulsionar sua presença online e atrair mais clientes para o seu negócio.",
  heroPrimaryButtonText: "Vamos começar",
  heroPrimaryButtonLink: "https://wa.me/5549999215720",
  heroSecondaryButtonText: "Ver Portfólio",
  projectsBadge: "Nosso trabalho",
  projectsTitle: "Todos os Projetos",
  projectsDescription: "Conheça os projetos que já desenvolvemos para nossos clientes.",
  footerEmail: "contact@gwapo.com.br",
  footerPhone: "(49) 99921-5720",
  footerTeamText: "Guilherme && Willian",
  footerSocialText: "Siga-nos nas redes sociais para acompanhar bastidores e novidades.",
  footerInstagramUrl: "https://instagram.com/gui.faccin",
  footerCopyright: "© 2026 Gwapo. Todos os direitos reservados.",
  seoTitle: "Gwapo | Criação de sites que geram resultados",
  seoDescription:
    "Criação de sites profissionais, rápidos e responsivos para gerar mais clientes. +200 projetos entregues com a Gwapo. Peça seu orçamento sem compromisso.",
  ctaTitleLine1: "Transforme sua",
  ctaTitleHighlight: "ideia em realidade",
  ctaButtonText: "Começar meu projeto",
  functionsHeading: "Todas as funções que você precisa, em um só lugar",
  seoKeywords: "",
  ogImageUrl: "",
  twitterHandle: "",
  googleSiteVerification: "",
  organizationName: "Gwapo",
  organizationDescription:
    "Agência de desenvolvimento web que cria sites modernos, rápidos e responsivos para impulsionar a presença online e atrair mais clientes.",
  organizationLogoUrl: "/logo.png",
  robotsIndexingEnabled: true,
  contactWhatsappNumber: "5549999215720",
  contactWebhookUrl: "",
  contactQuestions: DEFAULT_CONTACT_QUESTIONS as unknown as Prisma.JsonValue,
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const content = await prisma.siteContent.findUnique({ where: { id: "main" } })
  if (content) return content

  return {
    id: "main",
    updatedAt: new Date(),
    ...DEFAULT_SITE_CONTENT,
  }
})
