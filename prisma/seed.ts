import { config } from "dotenv"
config({ path: ".env.local" })

interface SeedProject {
  slug: string
  title: string
  type: string
  description: string
  story?: string
  images: string[]
  technologies: string[]
  url?: string
  forSale: boolean
  year: number
  order: number
}

const projects: SeedProject[] = [
  {
    slug: "myimob-corretora",
    title: "Myimob Corretora",
    type: "Sites Corporativos",
    description: "Presença digital profissional para corretora imobiliária",
    story:
      "O projeto da Myimob surgiu da necessidade de modernizar a presença digital da corretora. O cliente queria um site que transmitisse confiança e profissionalismo, mas que fosse fácil de navegar tanto para compradores quanto vendedores. Desenvolvemos uma interface limpa com foco na experiência do usuário, com busca avançada de imóveis e integração direta com WhatsApp para contato.",
    images: ["/projects/myimob.png"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://myimob.com.br",
    forSale: true,
    year: 2024,
    order: 1,
  },
  {
    slug: "blazim-distribuidora",
    title: "Blazim Distribuidora",
    type: "E-commerce",
    description: "Loja virtual completa com sistema de pagamento integrado",
    images: ["/projects/blazim.jpg"],
    technologies: ["React", "Node.js", "Stripe"],
    forSale: false,
    year: 2024,
    order: 2,
  },
  {
    slug: "startup-de-croche",
    title: "Startup de crochê",
    type: "Landing Pages",
    description: "Página de conversão para startup de produtos artesanais",
    images: ["/projects/croche.png"],
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    forSale: true,
    year: 2023,
    order: 3,
  },
  {
    slug: "nakai-sushi",
    title: "Nakai Sushi",
    type: "Landing Pages",
    description: "Sistema de delivery para restaurante japonês",
    images: ["/projects/nakai.png"],
    technologies: ["React", "Firebase", "Material-UI"],
    forSale: false,
    year: 2023,
    order: 4,
  },
  {
    slug: "capsulas-gamma",
    title: "Capsulas Gamma",
    type: "Identidade Visual",
    description: "Logo e branding completo para empresa de suplementos",
    images: ["/projects/capsule.png"],
    technologies: ["Figma", "Adobe Illustrator", "Photoshop"],
    forSale: true,
    year: 2024,
    order: 5,
  },
  {
    slug: "ux-design-studio-code",
    title: "UX Design Studio & Code",
    type: "UI/UX Design",
    description: "Experiência do usuário para plataforma de design",
    images: ["/projects/forja.png"],
    technologies: ["Figma", "Principle", "After Effects"],
    forSale: false,
    year: 2023,
    order: 6,
  },
  {
    slug: "portfolio-pessoal",
    title: "Portfólio Pessoal",
    type: "Identidade Visual",
    description: "Demonstre seu valor com um portfólio profissional",
    images: ["/projects/faccindev.png"],
    technologies: ["Next.js", "GSAP", "Tailwind CSS"],
    forSale: true,
    year: 2024,
    order: 7,
  },
  {
    slug: "app-financeiro",
    title: "App Financeiro",
    type: "Aplicativos Web",
    description: "Dashboard para controle financeiro pessoal",
    // NOTE: the original static data referenced /financial-app-dashboard.png,
    // which does not exist in /public (pre-existing broken image, not
    // introduced by this migration). Using an existing generic asset as a
    // stand-in until a real screenshot is uploaded via the admin panel.
    images: ["/modern-website-showcase.png"],
    technologies: ["React", "Chart.js", "Node.js"],
    forSale: false,
    year: 2024,
    order: 8,
  },
]

async function main() {
  const { prisma } = await import("../src/lib/prisma")

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        type: p.type,
        description: p.description,
        story: p.story ?? null,
        images: p.images,
        technologies: p.technologies,
        url: p.url ?? null,
        forSale: p.forSale,
        year: p.year,
        order: p.order,
      },
      create: {
        slug: p.slug,
        title: p.title,
        type: p.type,
        description: p.description,
        story: p.story ?? null,
        images: p.images,
        technologies: p.technologies,
        url: p.url ?? null,
        forSale: p.forSale,
        year: p.year,
        order: p.order,
      },
    })
  }
  console.log(`Seeded ${projects.length} projects.`)
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
