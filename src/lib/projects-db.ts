import "server-only"
import { prisma } from "@/lib/prisma"

export function getProjects() {
  return prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  })
}

export function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } })
}

export function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } })
}

export async function getRelatedProjects(type: string, excludeId: string, limit = 3) {
  return prisma.project.findMany({
    where: { type, id: { not: excludeId } },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: limit,
  })
}
