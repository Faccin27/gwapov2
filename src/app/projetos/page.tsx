"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  image: string;
  type:
  | "Sites Corporativos"
  | "E-commerce"
  | "Landing Pages"
  | "Aplicativos Web"
  | "Identidade Visual"
  | "UI/UX Design";
  description: string;
  forSale?: boolean;
  year: number;
  technologies: string[];
}

const allProjects: Project[] = [
  {
    id: "1",
    name: "Myimob Corretora",
    image: "/projects/myimob.png",
    type: "Sites Corporativos",
    description: "Presença digital profissional para corretora imobiliária",
    forSale: true,
    year: 2024,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "2",
    name: "Blazim Distribuidora",
    image: "/projects/blazim.jpg",
    type: "E-commerce",
    description: "Loja virtual completa com sistema de pagamento integrado",
    year: 2024,
    technologies: ["React", "Node.js", "Stripe"],
  },
  {
    id: "3",
    name: "Startup de crochê",
    image: "/projects/croche.png",
    type: "Landing Pages",
    description: "Página de conversão para startup de produtos artesanais",
    forSale: true,
    year: 2023,
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
  },
  {
    id: "4",
    name: "Nakai Sushi",
    image: "/projects/nakai.png",
    type: "Landing Pages",
    description: "Sistema de delivery para restaurante japonês",
    year: 2023,
    technologies: ["React", "Firebase", "Material-UI"],
  },
  {
    id: "5",
    name: "Capsulas Gamma",
    image: "/projects/capsule.png",
    type: "Identidade Visual",
    description: "Logo e branding completo para empresa de suplementos",
    forSale: true,
    year: 2024,
    technologies: ["Figma", "Adobe Illustrator", "Photoshop"],
  },
  {
    id: "6",
    name: "UX Design Studio & Code",
    image: "/projects/forja.png",
    type: "UI/UX Design",
    description: "Experiência do usuário para plataforma de design",
    year: 2023,
    technologies: ["Figma", "Principle", "After Effects"],
  },
  {
    id: "7",
    name: "Portfólio Pessoal",
    image: "/projects/faccindev.png",
    type: "Identidade Visual",
    description: "Demonstre seu valor com um portfólio profissional",
    year: 2024,
    technologies: ["Next.js", "GSAP", "Tailwind CSS"],
  },
  {
    id: "8",
    name: "App Financeiro",
    image: "/financial-app-dashboard.png",
    type: "Aplicativos Web",
    description: "Dashboard para controle financeiro pessoal",
    year: 2024,
    technologies: ["React", "Chart.js", "Node.js"],
  },
];

const projectTypes = [
  "Todos",
  "Sites Corporativos",
  "E-commerce",
  "Landing Pages",
  "Aplicativos Web",
  "Identidade Visual",
  "UI/UX Design",
];

const typeColors = {
  "Sites Corporativos": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "E-commerce": "bg-green-500/20 text-green-400 border-green-500/30",
  "Landing Pages": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Aplicativos Web": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Identidade Visual": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "UI/UX Design": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

export default function ProjectsPage() {
  const [selectedType, setSelectedType] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [showOnlyForSale, setShowOnlyForSale] = useState(false);

  const filteredProjects = allProjects.filter((project) => {
    const matchesType =
      selectedType === "Todos" ||
      (selectedType === "À Venda" && project.forSale) ||
      project.type === selectedType;
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesForSale = !showOnlyForSale || project.forSale;
    return matchesType && matchesSearch && matchesForSale;
  });

  return (
    <div className="min-h-screen bg-[#19191c] text-gray-200">
      {/* Header */}
      <div className="border-b border-white/10 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </Link>
              <div className="h-6 w-px bg-white/20" />
              <h1 className="text-2xl font-bold text-foreground">
                Todos os Projetos<span className="text-rose-500">_</span>
              </h1>
            </div>
            <div className="flex hover:scale-105 transition-all duration-300">
              <Link
                href={'/'}>
                <Image
                  src="/logos-svg/5.svg"
                  alt="Gwapo Logo"
                  width={130}
                  height={130}
                  className="object-contain rounded-lg"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="animate-lighting absolute -top-12 left-0 z-0 h-screen w-[200vw] -translate-x-[25%] translate-y-8 rotate-12 overflow-hidden blur-3xl md:w-full bg-[image:radial-gradient(ellipse_390px_50px_at_10%_30%,_rgba(254,_149,_103,_0.5)_0%,_rgba(254,_149,_103,_0)_70%),_radial-gradient(ellipse_1100px_170px_at_15%_40%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%),_radial-gradient(ellipse_1200px_180px_at_30%_30%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%)] bg-position-[0%_0%] pointer-events-none" />

      <div className="w-[300px] h-[400px] absolute bottom-[-40dvh] right-[1%] bg-rose-500/20 blur-[80px] z-0" />

      {/* Bottom glow effect */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters and Search */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background/50 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/20 transition-all"
              />
            </div>

            {/* Checkbox for filtering only for sale projects */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                Somente projetos a venda
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showOnlyForSale}
                    onChange={(e) => setShowOnlyForSale(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                      showOnlyForSale
                        ? "bg-rose-500 border-rose-500"
                        : "border-white/30 hover:border-white/50"
                    )}
                  >
                    {showOnlyForSale && (
                      <div className="w-2 h-2 bg-zinc-200 rounded-full" />
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filtrar por:
            </div>
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200",
                  selectedType === type
                    ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                    : "bg-background/30 text-muted-foreground border-white/10 hover:border-white/20 hover:text-foreground"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-background/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:scale-[1.02]">
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-black/70 flex items-center justify-center transition-all duration-300",
                      hoveredProject === project.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform transition-all duration-300 hover:scale-110">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                      {project.name}
                      {project.forSale && (
                        <span className="px-2 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm bg-red-500 border-red-500/70 animate-pulse">
                          À Venda
                        </span>
                      )}
                    </h3>

                    <span className="text-sm text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-white/5 text-muted-foreground rounded border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
