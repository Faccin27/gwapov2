"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { put, del } from "@vercel/blob"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { slugify, isValidProjectType } from "@/lib/projects"

const MAX_IMAGE_SIZE = 5 * 1024 * 1024

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Não autorizado.")
  }
}

function parseTechnologies(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

async function uploadImages(files: File[]): Promise<string[]> {
  const urls: string[] = []
  for (const file of files) {
    if (file.size === 0) continue
    if (!file.type.startsWith("image/")) {
      throw new Error(`Arquivo "${file.name}" não é uma imagem válida.`)
    }
    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error(`Imagem "${file.name}" excede o limite de 5MB.`)
    }
    const ext =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase()
        .replace(/[^a-z0-9]/g, "") || "jpg"
    const key = `projetos/${crypto.randomUUID()}.${ext}`
    const blob = await put(key, file, {
      access: "public",
      addRandomSuffix: false,
    })
    urls.push(blob.url)
  }
  return urls
}

async function deleteBlobImages(urls: string[]) {
  for (const url of urls) {
    if (url.includes("blob.vercel-storage.com")) {
      await del(url).catch(() => {})
    }
  }
}

function readCommonFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim()
  const type = String(formData.get("type") ?? "")
  const description = String(formData.get("description") ?? "").trim()
  const story = String(formData.get("story") ?? "").trim()
  const technologiesRaw = String(formData.get("technologies") ?? "")
  const url = String(formData.get("url") ?? "").trim()
  const yearRaw = String(formData.get("year") ?? "")
  const forSale = formData.get("forSale") === "on"

  return {
    title,
    type,
    description,
    story: story || null,
    technologies: parseTechnologies(technologiesRaw),
    url: url || null,
    year: Number.parseInt(yearRaw, 10),
    forSale,
  }
}

export async function createProject(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireAdmin()

  const { title, type, description, story, technologies, url, year, forSale } = readCommonFields(formData)

  if (!title || !description) return "Título e descrição são obrigatórios."
  if (!isValidProjectType(type)) return "Categoria inválida."
  if (!Number.isFinite(year)) return "Ano inválido."

  const files = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0)
  if (files.length === 0) return "Selecione ao menos uma imagem para o projeto."

  let images: string[]
  try {
    images = await uploadImages(files)
  } catch (e) {
    return e instanceof Error ? e.message : "Falha no upload das imagens."
  }

  const slug = slugify(title)
  const existing = await prisma.project.findUnique({ where: { slug } })
  if (existing) {
    await deleteBlobImages(images)
    return "Já existe um projeto com esse título (slug duplicado)."
  }

  await prisma.project.create({
    data: { slug, title, type, description, story, images, technologies, url, year, forSale },
  })

  revalidatePath("/admin")
  revalidatePath("/projetos")
  revalidatePath("/")
  redirect("/admin")
}

export async function updateProject(
  id: string,
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireAdmin()

  const { title, type, description, story, technologies, url, year, forSale } = readCommonFields(formData)

  if (!title || !description) return "Título e descrição são obrigatórios."
  if (!isValidProjectType(type)) return "Categoria inválida."
  if (!Number.isFinite(year)) return "Ano inválido."

  const current = await prisma.project.findUnique({ where: { id } })
  if (!current) return "Projeto não encontrado."

  const keepImages = formData.getAll("keepImages").map(String)
  const newFiles = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0)

  let uploadedImages: string[]
  try {
    uploadedImages = await uploadImages(newFiles)
  } catch (e) {
    return e instanceof Error ? e.message : "Falha no upload das imagens."
  }

  const finalImages = [...keepImages, ...uploadedImages]
  if (finalImages.length === 0) {
    await deleteBlobImages(uploadedImages)
    return "O projeto precisa de ao menos uma imagem."
  }

  const removedImages = current.images.filter((imgUrl) => !keepImages.includes(imgUrl))

  await prisma.project.update({
    where: { id },
    data: { title, type, description, story, images: finalImages, technologies, url, year, forSale },
  })

  await deleteBlobImages(removedImages)

  revalidatePath("/admin")
  revalidatePath("/projetos")
  revalidatePath(`/projetos/${current.slug}`)
  revalidatePath("/")
  redirect("/admin")
}

export async function updateSiteContent(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireAdmin()

  const field = (name: string) => String(formData.get(name) ?? "").trim()

  const data = {
    heroBadge: field("heroBadge"),
    heroTitle: field("heroTitle"),
    heroDescription: field("heroDescription"),
    heroPrimaryButtonText: field("heroPrimaryButtonText"),
    heroPrimaryButtonLink: field("heroPrimaryButtonLink"),
    heroSecondaryButtonText: field("heroSecondaryButtonText"),
    projectsBadge: field("projectsBadge"),
    projectsTitle: field("projectsTitle"),
    projectsDescription: field("projectsDescription"),
    footerEmail: field("footerEmail"),
    footerPhone: field("footerPhone"),
    footerTeamText: field("footerTeamText"),
    footerSocialText: field("footerSocialText"),
    footerInstagramUrl: field("footerInstagramUrl"),
    footerCopyright: field("footerCopyright"),
  }

  for (const [key, value] of Object.entries(data)) {
    if (!value) return `O campo "${key}" não pode ficar vazio.`
  }

  await prisma.siteContent.upsert({
    where: { id: "main" },
    create: { id: "main", ...data },
    update: data,
  })

  revalidatePath("/admin/conteudo")
  revalidatePath("/")
  revalidatePath("/projetos")

  return "Conteúdo atualizado com sucesso."
}

export async function deleteProject(id: string): Promise<void> {
  await requireAdmin()

  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) return

  await deleteBlobImages(project.images)
  await prisma.project.delete({ where: { id } })

  revalidatePath("/admin")
  revalidatePath("/projetos")
  revalidatePath("/")
}
