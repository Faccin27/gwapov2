"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Testimonial {
  quote: string
  author: string
  title: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    quote: "A mudança para a Gwapo trouxe um valor infinito que ainda estou descobrindo hoje.",
    author: "Ryan O'Connor",
    title: "Fundador na K-Collect",
    avatar: "/avatar.png",
  },
  {
    quote:
      "Nosso tráfego no site dobrou depois que a Gwapo redesenhou nossa plataforma. Resultados realmente incríveis!",
    author: "Sarah Chen",
    title: "CEO da InnovateX",
    avatar: "/avatar.png",
  },
  {
    quote: "A equipe da Gwapo superou as expectativas. A atenção aos detalhes e a abordagem moderna são inigualáveis.",
    author: "David Lee",
    title: "Diretor de Marketing na Global Solutions",
    avatar: "/avatar.png",
  },
]

interface Metric {
  value: string
  numericValue: number
  description: string
  position: {
    top: string
    left: string
  }
}

const metrics: Metric[] = [
  {
    value: "50K+",
    numericValue: 50000,
    description: "linhas de código otimizadas",
    position: { top: "60%", left: "0%" },
  },
  {
    value: "300+",
    numericValue: 300,
    description: "projetos entregues",
    position: { top: "45%", left: "25%" },
  },
  {
    value: "100+",
    numericValue: 100,
    description: "clientes satisfeitos",
    position: { top: "30%", left: "50%" },
  },
  {
    value: "20M+",
    numericValue: 20000000,
    description: "usuários impactados",
    position: { top: "15%", left: "75%" },
  },
]

export default function MetricsSection() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [animatedCounts, setAnimatedCounts] = useState(metrics.map(() => 0))

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
        setIsAnimating(false)
      }, 300)
    }, 5000)

    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    // Check on mount
    checkIsDesktop()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsDesktop)

    // Cleanup
    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", checkIsDesktop)
    }
  }, [])

  useEffect(() => {
    const duration = 2000
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setAnimatedCounts(metrics.map((metric) => Math.floor(metric.numericValue * easeOutQuart)))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const formatValue = (value: number, originalValue: string) => {
    if (originalValue.includes("K")) {
      return `${Math.floor(value / 1000)}K+`
    } else if (originalValue.includes("M")) {
      return `${Math.floor(value / 1000000)}M+`
    } else {
      return `${value}+`
    }
  }

  const currentTestimonial = testimonials[currentTestimonialIndex]

  return (
    <section className="relative w-full overflow-hidden bg-white max-w-[96%] mx-auto rounded-b-4xl text-gray-900">
      {/* Top white/light gray section */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-20 md:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          {/* Left Content Area */}
          <div className="flex-1 text-center md:text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Resultados que impulsionam o seu sucesso
            </h2>
            <div
              key={currentTestimonialIndex}
              className={cn(
                "mt-8 flex flex-col items-center md:items-start text-center md:text-left",
                "transition-all duration-500 ease-in-out",
                isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0",
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={currentTestimonial.avatar || "/placeholder.svg"}
                  alt={currentTestimonial.author}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-base">{currentTestimonial.author}</p>
                  <p className="text-sm text-gray-600">{currentTestimonial.title}</p>
                </div>
              </div>
              <p className="text-lg italic text-gray-700">&ldquo;{currentTestimonial.quote}&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom section with metrics */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-rose-500 to-rose-600"
          style={{
            background: "linear-gradient(to top right, rgba(244, 63, 94, 0.2) 70%, transparent 90%)",
            clipPath: "polygon(0 100%, 100% 25%, 100% 100%, 0 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
            {isDesktop ? (
              // Desktop layout - posicionamento absoluto mantido
              <div className="relative w-full h-full">
                {metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="absolute text-left text-gray-900 flex flex-col items-start"
                    style={{
                      top: metric.position.top,
                      left: metric.position.left,
                      transform: "translateY(-50%)",
                    }}
                  >
                    <p className="font-extrabold text-rose-600 mb-1 text-xl md:text-2xl">
                      {formatValue(animatedCounts[index], metric.value)}
                    </p>
                    <p className="font-medium text-gray-800 text-lg md:text-xl">{metric.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              // Mobile layout - stack vertical com barrinha rosa
              <div className="flex flex-col justify-center h-full space-y-8 px-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {/* Barrinha rosa à esquerda */}
                    <div className="w-1 h-16 bg-rose-500 rounded-full flex-shrink-0" />
                    <div className="flex flex-col">
                      <p className="font-extrabold text-rose-600 text-2xl mb-1">
                        {formatValue(animatedCounts[index], metric.value)}
                      </p>
                      <p className="font-medium text-gray-800 text-lg">{metric.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
