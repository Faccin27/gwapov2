"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

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

  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const testimonialRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
        setIsAnimating(false)
      }, 300)
    }, 5000)

    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 769)
    }

    checkIsDesktop()
    window.addEventListener("resize", checkIsDesktop)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", checkIsDesktop)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Testimonial animation
      gsap.fromTo(
        testimonialRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      if (metricsRef.current) {
        const metricElements = metricsRef.current.querySelectorAll(".metric-item")
        gsap.fromTo(
          metricElements,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              onEnter: () => {
                // Start counter animation when metrics come into view
                animateCounters()
              },
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const animateCounters = () => {
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
  }

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
    <section
      ref={sectionRef}
      data-section="metrics"
      className="relative w-full overflow-hidden bg-white  mx-auto rounded-b-4xl text-gray-900 border-0 shadow-none"
    >
      {/* Top white/light gray section */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 lg:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10 lg:gap-12">
          {/* Left Content Area */}
          <div className="flex-1 text-center md:text-left max-w-2xl">
            <h2
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6"
            >
              Resultados que impulsionam o seu sucesso
            </h2>
            <div
              ref={testimonialRef}
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
                  <p className="font-semibold text-gray-800 text-sm md:text-base">{currentTestimonial.author}</p>
                  <p className="text-xs md:text-sm text-gray-600">{currentTestimonial.title}</p>
                </div>
              </div>
              <p className="text-base md:text-lg italic text-gray-700">&ldquo;{currentTestimonial.quote}&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom section with metrics */}
      <div className="relative h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-rose-500 to-rose-600"
          style={{
            background: "linear-gradient(to top right, rgba(244, 63, 94, 0.2) 70%, transparent 90%)",
            clipPath: "polygon(0 100%, 100% 25%, 100% 100%, 0 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={metricsRef} className="relative w-full h-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
            {isDesktop ? (
              // Desktop layout - posicionamento absoluto mantido
              <div className="relative w-full h-full">
                {metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="metric-item absolute text-left text-gray-900 flex flex-col items-start"
                    style={{
                      top: metric.position.top,
                      left: metric.position.left,
                      transform: "translateY(-50%)",
                    }}
                  >
                    <p className="font-extrabold text-rose-600 mb-1 text-lg md:text-xl lg:text-2xl">
                      {formatValue(animatedCounts[index], metric.value)}
                    </p>
                    <p className="font-medium text-gray-800 text-base md:text-lg lg:text-xl">{metric.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              // Mobile layout - stack vertical com barrinha rosa
              <div className="flex flex-col justify-center h-full space-y-8 px-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="metric-item flex items-center gap-4">
                    <div className="w-1 h-16 bg-rose-500 rounded-full flex-shrink-0" />
                    <div className="flex flex-col">
                      <p className="font-extrabold text-rose-600 mb-1 text-xl md:text-2xl">
                        {formatValue(animatedCounts[index], metric.value)}
                      </p>
                      <p className="font-medium text-gray-800 text-lg md:text-xl">{metric.description}</p>
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
