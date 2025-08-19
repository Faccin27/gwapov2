"use client";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const tools = [
  // Front-end
  {
    name: "React",
    icon: "/techs/react.png",
    color1: "#61DAFB",
    color2: "#20232A",
  },
  {
    name: "Next.js",
    icon: "/techs/next.png",
    color1: "#000000",
    color2: "#FFFFFF",
  },
  {
    name: "JavaScript",
    icon: "/techs/javascript.png",
    color1: "#F7DF1E",
    color2: "#000000",
  },
  {
    name: "TypeScript",
    icon: "/techs/typescript.png",
    color1: "#3178C6",
    color2: "#235A97",
  },
  {
    name: "Tailwind",
    icon: "/techs/tailwind.png",
    color1: "#06B6D4",
    color2: "#0E7490",
  },

  // Back-end
  {
    name: "Node.js",
    icon: "/techs/node.png",
    color1: "#339933",
    color2: "#68CC68",
  },
  {
    name: "PHP",
    icon: "/techs/php.png",
    color1: "#777BB4",
    color2: "#8892BE",
  },
  {
    name: "Laravel",
    icon: "/techs/laravel.png",
    color1: "#FF2D20",
    color2: "#B71C1C",
  },
  {
    name: "NestJS",
    icon: "/techs/nest.png",
    color1: "#E0234E",
    color2: "#C71F3A",
  },
  {
    name: "Python",
    icon: "/techs/python.png",
    color1: "#3776AB",
    color2: "#FFD43B",
  },

  // Banco de dados
  {
    name: "PostgreSQL",
    icon: "/techs/postgree.png",
    color1: "#336791",
    color2: "#336791",
  },

  // DevOps / Infra
  {
    name: "Docker",
    icon: "/techs/docker.png",
    color1: "#2496ED",
    color2: "#0DB7ED",
  },
  {
    name: "AWS",
    icon: "/techs/aws.png",
    color1: "#FF9900",
    color2: "#232F3E",
  },
  {
    name: "Ubuntu",
    icon: "/techs/ubuntu.png",
    color1: "#E95420",
    color2: "#333333",
  },

];

const svgGroups = [
  [
    { name: "Company 1", src: "/american-airlines.svg" },
    { name: "Company 2", src: "/tiktok.svg" },
    { name: "Company 3", src: "/american-airlines.svg" },
    { name: "Company 4", src: "/tiktok.svg" },
  ],
  [
    { name: "Company 5", src: "/tiktok.svg" },
    { name: "Company 6", src: "/american-airlines.svg" },
    { name: "Company 7", src: "/tiktok.svg" },
    { name: "Company 8", src: "/american-airlines.svg" },
  ],
  [
    { name: "Company 9", src: "/tiktok.svg" },
    { name: "Company 10", src: "/american-airlines.svg" },
    { name: "Company 11", src: "/american-airlines.svg" },
    { name: "Company 12", src: "/tiktok.svg" },
  ],
];
interface ToolItemProps {
  tool: { name: string; icon: string; color1: string; color2: string };
  index: number;
}

function ToolItem({ tool, index }: ToolItemProps) {
  return (
    <div
      className={`group relative flex h-16 w-16 max-w-[66px] max-h-[66px] items-center justify-center border-dashed border-[#ffffff0f] md:mt-0 md:w-full lg:border-r ${
        index === 0 ? "lg:border-l" : ""
      }`}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${tool.color1} 0%, ${tool.color2} 50%, transparent 100%)`,
        }}
      />

      {/* Intense noise overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300 noise-bg-intense" />

      <a
        href="#"
        className="flex items-center justify-center w-full h-full p-2 relative z-10"
      >
        <img
          src={tool.icon || "/placeholder.svg"}
          alt={tool.name}
          className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110 md:grayscale md:group-hover:grayscale-0"
        />
      </a>

      {/* Tooltip */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap shadow-xl border border-gray-600">
        {tool.name}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentGroup((prev) => (prev + 1) % svgGroups.length);
        setIsTransitioning(false);
      }, 1000); // Increased delay for slower transition
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 md:py-28 relative overflow-hidden bg-[#19191c] mt-32 border-b border-[#ffffff0f]">
      {/* Lighting Effect */}
      <div className="animate-lighting absolute -top-12 left-0 z-50 h-screen w-[200vw] -translate-x-[25%] translate-y-8 rotate-12 overflow-hidden blur-3xl md:w-full bg-[image:radial-gradient(ellipse_390px_50px_at_10%_30%,_rgba(254,_149,_103,_0.5)_0%,_rgba(254,_149,_103,_0)_70%),_radial-gradient(ellipse_1100px_170px_at_15%_40%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%),_radial-gradient(ellipse_1200px_180px_at_30%_30%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%)] bg-position-[0%_0%]" />

      <div className="hidden md:block absolute right-0 top-0 h-[680px] w-1/2 lg:w-2/3 xl:w-1/2">
        <div className="relative h-full">
          <Image
            src="/image.png"
            fill
            className="object-cover object-left rounded-t-md h-full block"
            alt="Team working on a laptop"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-50% to-[#19191c]" />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:gap-x-12">
          <div className="flex-none space-y-4 sm:space-y-5 max-w-full md:max-w-[50%] lg:max-w-[33.33%] xl:max-w-[50%]">
            <h1 className="text-sm text-rose-400 font-medium">
              Mais de 200 projetos entregues com sucesso
            </h1>{" "}
            <h2 className="text-3xl sm:text-4xl text-gray-100 font-extrabold md:text-5xl max-w-11/12 leading-tight">
              Nós criamos sites que geram resultados
              <span className="text-rose-500">_</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Desenvolvemos sites modernos, rápidos e responsivos, pensados para
              impulsionar sua presença online e atrair mais clientes para o seu
              negócio.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-x-3">
              <a
                href="#"
                className="block py-3 px-6 text-center text-white font-medium bg-rose-600 duration-150 hover:bg-fuchsia-500 active:bg-fuchsia-700 rounded-lg shadow-lg hover:shadow-none text-base"
              >
                {"Vamos começar"}
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-x-2 py-3 px-6 text-gray-200 hover:text-gray-400 font-medium duration-150 active:bg-gray-800 border rounded-lg border-gray-700 text-base"
              >
                Ver Portfólio
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="md:hidden w-full mt-8">
            <div className="relative h-64 sm:h-80 w-full">
              <Image
                src="/image.png"
                fill
                className="object-cover rounded-lg"
                alt="Team working on a laptop"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-50% to-[#19191c] rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[100] mt-12 md:mt-52 ">
        <div className="border-[#ffffff0f] relative z-10 border-dashed border-[1px] overflow-visible">
          <div className="container max-w-6xl mx-auto flex flex-col items-center md:flex-row overflow-visible">
            <span className="-mb-1 block bg-gradient-to-r from-[#f8a1ba] to-white bg-clip-text pb-1 text-transparent ">
              <span className="flex items-center pr-4 text-sm font-medium md:w-full md:max-w-[185px] ">
                Desenvolvido com as melhores tecnologias
              </span>
            </span>
            <div className="flex w-full flex-nowrap overflow-x-hidden md:overflow-visible">
              {/* Mobile: Scrolling animation */}
              <div className="md:hidden flex animate-scroll-infinite overflow-visible">
                {/* First set */}
                <div className="flex flex-nowrap overflow-visible">
                  {tools.map((tool, index) => (
                    <ToolItem
                      key={`mobile-1-${index}`}
                      tool={tool}
                      index={index}
                    />
                  ))}
                </div>
                {/* Duplicate for seamless loop */}
                <div className="flex flex-nowrap overflow-visible">
                  {tools.map((tool, index) => (
                    <ToolItem
                      key={`mobile-2-${index}`}
                      tool={tool}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              {/* Desktop: Static grid */}
              <div className="hidden md:flex w-full flex-nowrap divide-x divide-dashed divide-[#ffffff0f] overflow-visible">
                {tools.slice(0, 14).map((tool, index) => (
                  <ToolItem
                    key={`desktop-${index}`}
                    tool={tool}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[100] mt-12">
        <p className="text-greyscale-100 text-description mx-auto max-w-[312px] text-center text-xl text-pretty mb-20">
          Utilizamos as tecnologias mais inovadoras para criar o seu site
        </p>
        {/* SVG Carousel */}
        <div className="relative h-20 md:h-20 overflow-hidden">
          <div className="flex justify-center items-center max-w-6xl mx-auto px-4">
            {svgGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="absolute inset-0 flex justify-center items-center"
              >
                {/* Desktop: Single row */}
                <div className="hidden md:flex gap-8 w-full justify-center">
                  {group.map((svg, index) => (
                    <div
                      key={index}
                      className={`flex-1 max-w-[200px] h-12 flex items-center justify-center transition-all duration-[1500ms] ease-in-out ${
                        groupIndex === currentGroup
                          ? isTransitioning
                            ? "transform -translate-y-full opacity-0 blur-[8px]"
                            : "transform translate-y-0 opacity-100 blur-0"
                          : groupIndex === (currentGroup + 1) % svgGroups.length
                          ? isTransitioning
                            ? "transform translate-y-0 opacity-100 blur-0"
                            : "transform translate-y-full opacity-0 blur-[8px]"
                          : "transform translate-y-full opacity-0 blur-[8px]"
                      }`}
                      style={{
                        aspectRatio: "8/2",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <img
                        src={svg.src || "/placeholder.svg"}
                        alt={svg.name}
                        className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Mobile: 2x2 Grid */}
                <div className="md:hidden grid grid-cols-2 gap-4 w-full max-w-sm mx-auto">
                  {group.map((svg, index) => (
                    <div
                      key={index}
                      className={`h-8 flex items-center justify-center transition-all duration-[1500ms] ease-in-out ${
                        groupIndex === currentGroup
                          ? isTransitioning
                            ? "transform -translate-y-full opacity-0 blur-[8px]"
                            : "transform translate-y-0 opacity-100 blur-0"
                          : groupIndex === (currentGroup + 1) % svgGroups.length
                          ? isTransitioning
                            ? "transform translate-y-0 opacity-100 blur-0"
                            : "transform translate-y-full opacity-0 blur-[8px]"
                          : "transform translate-y-full opacity-0 blur-[8px]"
                      }`}
                      style={{
                        aspectRatio: "8/2",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <img
                        src={svg.src || "/placeholder.svg"}
                        alt={svg.name}
                        className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 20s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-scroll-infinite:hover {
            animation-play-state: paused;
          }
        }
        @keyframes lighting {
          0%,
          100% {
            opacity: 0.8;
            transform: translateX(-35%) translateY(8px) rotate(12deg) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateX(-30%) translateY(12px) rotate(12deg)
              scale(1.05);
          }
        }
        .animate-lighting {
          animation: lighting 8s ease-in-out infinite;
        }
        .noise-bg-intense {
          background-image: radial-gradient(
              circle at 1px 1px,
              rgba(255, 255, 255, 0.8) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 2px 3px,
              rgba(0, 0, 0, 0.7) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 4px 2px,
              rgba(255, 255, 255, 0.6) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 3px 4px,
              rgba(0, 0, 0, 0.5) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 5px 1px,
              rgba(255, 255, 255, 0.4) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 1px 5px,
              rgba(0, 0, 0, 0.6) 0.5px,
              transparent 0
            );
          background-size: 3px 3px, 4px 4px, 5px 5px, 6px 6px, 7px 7px, 8px 8px;
          background-position: 0 0, 1px 1px, 2px 2px, 3px 3px, 4px 4px, 5px 5px;
        }
        .noise-bg-intense::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              circle at 2px 1px,
              rgba(255, 255, 255, 0.9) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 4px 3px,
              rgba(0, 0, 0, 0.8) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 1px 4px,
              rgba(255, 255, 255, 0.7) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 5px 2px,
              rgba(0, 0, 0, 0.6) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 3px 5px,
              rgba(255, 255, 255, 0.5) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 6px 1px,
              rgba(0, 0, 0, 0.7) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 2px 6px,
              rgba(255, 255, 255, 0.6) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 4px 4px,
              rgba(0, 0, 0, 0.4) 0.5px,
              transparent 0
            );
          background-size: 4px 4px, 5px 5px, 6px 6px, 7px 7px, 8px 8px, 9px 9px,
            10px 10px, 11px 11px;
          background-position: 1px 1px, 2px 2px, 3px 3px, 4px 4px, 5px 5px,
            6px 6px, 7px 7px, 8px 8px;
          opacity: 1;
        }
        .noise-bg-intense::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              circle at 3px 2px,
              rgba(255, 255, 255, 0.8) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 1px 3px,
              rgba(0, 0, 0, 0.9) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 5px 4px,
              rgba(255, 255, 255, 0.6) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 2px 5px,
              rgba(0, 0, 0, 0.7) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 4px 1px,
              rgba(255, 255, 255, 0.5) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 6px 3px,
              rgba(0, 0, 0, 0.8) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 1px 6px,
              rgba(255, 255, 255, 0.4) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 3px 6px,
              rgba(0, 0, 0, 0.5) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 5px 5px,
              rgba(255, 255, 255, 0.7) 0.5px,
              transparent 0
            ),
            radial-gradient(
              circle at 6px 6px,
              rgba(0, 0, 0, 0.6) 0.5px,
              transparent 0
            );
          background-size: 5px 5px, 6px 6px, 7px 7px, 8px 8px, 9px 9px,
            10px 10px, 11px 11px, 12px 12px, 13px 13px, 14px 14px;
          background-position: 2px 2px, 3px 3px, 4px 4px, 5px 5px, 6px 6px,
            7px 7px, 8px 8px, 9px 9px, 10px 10px, 11px 11px;
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
}
