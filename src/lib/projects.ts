export const PROJECT_TYPES = [
  "Sites Corporativos",
  "E-commerce",
  "Landing Pages",
  "Aplicativos Web",
  "Identidade Visual",
  "UI/UX Design",
] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]

export function isValidProjectType(value: string): value is ProjectType {
  return (PROJECT_TYPES as readonly string[]).includes(value)
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
