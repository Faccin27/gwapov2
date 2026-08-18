import "server-only"
import { prisma } from "@/lib/prisma"
import type { SiteContent } from "@prisma/client"

const DEFAULT_SITE_CONTENT: Omit<SiteContent, "id" | "updatedAt"> = {
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
}

export async function getSiteContent(): Promise<SiteContent> {
  const content = await prisma.siteContent.findUnique({ where: { id: "main" } })
  if (content) return content

  return {
    id: "main",
    updatedAt: new Date(),
    ...DEFAULT_SITE_CONTENT,
  }
}
