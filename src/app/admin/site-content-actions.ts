"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { DEFAULT_SITE_CONTENT } from "@/lib/site-content"
import { parseContactQuestions } from "@/lib/contact-questions"
import type { Prisma } from "@prisma/client"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Não autorizado.")
  }
}

async function saveSiteContent(data: Partial<Omit<Prisma.SiteContentCreateInput, "id">>) {
  await requireAdmin()

  await prisma.siteContent.upsert({
    where: { id: "main" },
    create: { id: "main", ...DEFAULT_SITE_CONTENT, ...data } as Prisma.SiteContentCreateInput,
    update: data,
  })

  revalidatePath("/admin/conteudo", "layout")
  revalidatePath("/")
  revalidatePath("/projetos", "layout")
  revalidatePath("/contato")

  return "Conteúdo atualizado com sucesso."
}

export async function updateHeroContent(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const field = (name: string) => String(formData.get(name) ?? "").trim()

  const data = {
    heroBadge: field("heroBadge"),
    heroTitle: field("heroTitle"),
    heroDescription: field("heroDescription"),
    heroPrimaryButtonText: field("heroPrimaryButtonText"),
    heroPrimaryButtonLink: field("heroPrimaryButtonLink"),
    heroSecondaryButtonText: field("heroSecondaryButtonText"),
    ctaTitleLine1: field("ctaTitleLine1"),
    ctaTitleHighlight: field("ctaTitleHighlight"),
    ctaButtonText: field("ctaButtonText"),
    functionsHeading: field("functionsHeading"),
  }

  for (const [key, value] of Object.entries(data)) {
    if (!value) return `O campo "${key}" não pode ficar vazio.`
  }

  return saveSiteContent(data)
}

export async function updateProjectsContent(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const field = (name: string) => String(formData.get(name) ?? "").trim()

  const data = {
    projectsBadge: field("projectsBadge"),
    projectsTitle: field("projectsTitle"),
    projectsDescription: field("projectsDescription"),
  }

  for (const [key, value] of Object.entries(data)) {
    if (!value) return `O campo "${key}" não pode ficar vazio.`
  }

  return saveSiteContent(data)
}

export async function updateFooterContent(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const field = (name: string) => String(formData.get(name) ?? "").trim()

  const data = {
    footerTeamText: field("footerTeamText"),
    footerSocialText: field("footerSocialText"),
    footerCopyright: field("footerCopyright"),
  }

  for (const [key, value] of Object.entries(data)) {
    if (!value) return `O campo "${key}" não pode ficar vazio.`
  }

  return saveSiteContent(data)
}

export async function updateContactContent(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const field = (name: string) => String(formData.get(name) ?? "").trim()

  const footerEmail = field("footerEmail")
  const footerPhone = field("footerPhone")
  const footerInstagramUrl = field("footerInstagramUrl")
  const contactWhatsappNumber = field("contactWhatsappNumber").replace(/\D/g, "")

  if (!footerEmail || !footerPhone || !footerInstagramUrl) {
    return "E-mail, telefone e Instagram não podem ficar vazios."
  }
  if (!contactWhatsappNumber) {
    return "Informe o número de WhatsApp (com DDI e DDD, só números)."
  }

  let parsedQuestions: unknown
  try {
    parsedQuestions = JSON.parse(String(formData.get("contactQuestions") ?? "[]"))
  } catch {
    return "Não foi possível salvar as perguntas do formulário (JSON inválido)."
  }

  const contactQuestions = parseContactQuestions(parsedQuestions)
  for (const q of contactQuestions) {
    if (q.type === "choice" && q.options.length === 0) {
      return `A pergunta "${q.question}" é de múltipla escolha mas não tem nenhuma opção.`
    }
  }

  return saveSiteContent({
    footerEmail,
    footerPhone,
    footerInstagramUrl,
    contactWhatsappNumber,
    contactWebhookUrl: field("contactWebhookUrl"),
    contactQuestions: contactQuestions as unknown as Prisma.InputJsonValue,
  })
}

export async function updateSeoContent(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const field = (name: string) => String(formData.get(name) ?? "").trim()

  const seoTitle = field("seoTitle")
  const seoDescription = field("seoDescription")
  const organizationName = field("organizationName")
  const organizationDescription = field("organizationDescription")
  const organizationLogoUrl = field("organizationLogoUrl")

  if (!seoTitle || !seoDescription || !organizationName || !organizationDescription || !organizationLogoUrl) {
    return "Título, descrição e informações da organização não podem ficar vazios."
  }

  return saveSiteContent({
    seoTitle,
    seoDescription,
    seoKeywords: field("seoKeywords"),
    ogImageUrl: field("ogImageUrl"),
    twitterHandle: field("twitterHandle"),
    googleSiteVerification: field("googleSiteVerification"),
    organizationName,
    organizationDescription,
    organizationLogoUrl,
    robotsIndexingEnabled: formData.get("robotsIndexingEnabled") === "on",
  })
}
