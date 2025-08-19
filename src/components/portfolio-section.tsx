"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
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
}

const projects: Project[] = [
  {
    id: "1",
    name: "Myimob Corretora",
    image: "/projects/myimob.png",
    type: "Sites Corporativos",
    description: "Presença digital profissional",
  },
  {
    id: "2",
    name: "Blazim Distribuidora",
    image: "/projects/blazim.jpg",
    type: "E-commerce",
    description: "Loja virtual completa",
  },
  {
    id: "3",
    name: "Startup de crochê",
    image: "/projects/croche.png",
    type: "Landing Pages",
    description: "Página de conversão",
  },
  {
    id: "4",
    name: "Nakai Sushi",
    image: "/projects/nakai.png",
    type: "Landing Pages",
    description: "Delivery de comida",
  },
  {
    id: "5",
    name: "Capsulas Gamma",
    image: "/projects/capsule.png",
    type: "Identidade Visual",
    description: "Logo e branding completo",
  },
  {
    id: "6",
    name: "UX Design Studio & Code",
    image: "/projects/forja.png",
    type: "UI/UX Design",
    description: "Experiência do usuário",
  },
  {
    id: "7",
    name: "Portfólio Pessoal",
    image: "/projects/faccindev.png",
    type: "Identidade Visual",
    description: "Demonstre seu valor",
  },
];

const typeColors = {
  "Sites Corporativos": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "E-commerce": "bg-green-500/20 text-green-400 border-green-500/30",
  "Landing Pages": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Aplicativos Web": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Identidade Visual": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "UI/UX Design": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

export default function PortfolioSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section className="w-full py-20 bg-transparent">
      <div className="relative">
        {/* Background blur effect */}
        <div className="w-[400px] h-[600px] absolute top-[100px] left-[50%] transform -translate-x-1/2 bg-rose-500/5 blur-[100px] z-0" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Nosso Portfolio<span className="text-rose-500">_</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça alguns dos projetos que desenvolvemos para nossos
              clientes, cada um com sua identidade única e objetivos
              específicos.
            </p>
          </div>

          {/* Carousel Container - 80% width with padding for scale effect */}
          <div className="w-[80%] mx-auto relative overflow-hidden py-4">
            {/* Left Gradient Mask */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#19191c] to-transparent z-10" />

            {/* Right Gradient Mask */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#19191c] to-transparent z-10" />

            <div className="portfolio-carousel">
              {/* Primeiro grupo - visível */}
              <div className="portfolio-group">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex-shrink-0 w-80 group cursor-pointer"
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

                        {/* Type Badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
                              typeColors[project.type]
                            )}
                          >
                            {project.type}
                          </span>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Segundo grupo - duplicado para loop infinito */}
              <div className="portfolio-group">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex-shrink-0 w-80 group cursor-pointer"
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

                        {/* Type Badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
                              typeColors[project.type]
                            )}
                          >
                            {project.type}
                          </span>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Ver todos os projetos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
