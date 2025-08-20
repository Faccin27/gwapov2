"use client"

import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Button } from "@/components/ui/button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isMegaMenuClicked, setIsMegaMenuClicked] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const portfolioButtonRef = useRef<HTMLButtonElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const headerRef = useRef<HTMLElement>(null)
  const [isOverWhiteSection, setIsOverWhiteSection] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMegaMenuClicked &&
        megaMenuRef.current &&
        portfolioButtonRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        !portfolioButtonRef.current.contains(event.target as Node)
      ) {
        setIsMegaMenuOpen(false)
        setIsMegaMenuClicked(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMegaMenuClicked])

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Smooth scroll
      gsap.to("html", {
        scrollBehavior: "smooth",
      })

      // Header entrance animation
      gsap.fromTo(headerRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })

      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const scrollY = self.scroll()
          const headerHeight = 80

          const metricsSection = document.querySelector('[data-section="metrics"]')
          const resultsSection = document.querySelector('[data-section="results"]')

          let isOverWhite = false

          // Check metrics section
          if (metricsSection) {
            const rect = metricsSection.getBoundingClientRect()
            const sectionTop = rect.top + scrollY
            const sectionBottom = rect.bottom + scrollY

            if (scrollY + headerHeight >= sectionTop && scrollY <= sectionBottom) {
              isOverWhite = true
            }
          }

          // Check results section
          if (resultsSection && !isOverWhite) {
            const rect = resultsSection.getBoundingClientRect()
            const sectionTop = rect.top + scrollY
            const sectionBottom = rect.bottom + scrollY

            if (scrollY + headerHeight >= sectionTop && scrollY <= sectionBottom) {
              isOverWhite = true
            }
          }

          setIsOverWhiteSection(isOverWhite)
        },
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const handlePortfolioClick = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }

    if (isMegaMenuClicked) {
      setIsMegaMenuOpen(false)
      setIsMegaMenuClicked(false)
    } else {
      setIsMegaMenuOpen(true)
      setIsMegaMenuClicked(true)
    }
  }

  const handlePortfolioEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }

    if (!isMegaMenuClicked) {
      setIsMegaMenuOpen(true)
    }
  }

  const handlePortfolioLeave = () => {
    if (!isMegaMenuClicked) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsMegaMenuOpen(false)
      }, 500)
    }
  }

  const handleMegaMenuEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }

  const handleMegaMenuLeave = () => {
    if (!isMegaMenuClicked) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsMegaMenuOpen(false)
      }, 500)
    }
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[101] bg-transparent backdrop-blur-lg border-b border-white/10 font-aeonik"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Gwapo" className="w-20 h-20 object-cover rounded" />
              <span
                className={`text-2xl mb-2 -translate-x-4 font-aeonik font-bold transition-colors duration-300 ${
                  isOverWhiteSection ? "text-gray-900" : "text-white"
                }`}
              >
                gwapo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <Link
                href="/servicos"
                className={`inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-rose-50/10 hover:text-rose-400 focus:bg-rose-50/10 focus:text-rose-400 focus:outline-none ${
                  isOverWhiteSection ? "text-gray-900" : "text-white"
                }`}
              >
                Serviços
              </Link>

              <Link
                href="/producoes"
                className={`inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-rose-50/10 hover:text-rose-400 focus:bg-rose-50/10 focus:text-rose-400 focus:outline-none ${
                  isOverWhiteSection ? "text-gray-900" : "text-white"
                }`}
              >
                Produções
              </Link>

              {/* Portfolio with Custom Mega Menu */}
              <div className="relative">
                <button
                  ref={portfolioButtonRef}
                  className={`inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-rose-50/10 hover:text-rose-400 focus:bg-rose-50/10 focus:text-rose-400 focus:outline-none ${
                    isOverWhiteSection ? "text-gray-900" : "text-white"
                  }`}
                  onClick={handlePortfolioClick}
                  onMouseEnter={handlePortfolioEnter}
                  onMouseLeave={handlePortfolioLeave}
                >
                  Portfolio
                  <ChevronDown
                    className={`ml-1 h-3 w-3 transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Custom Mega Menu */}
                {isMegaMenuOpen && (
                  <div
                    ref={megaMenuRef}
                    className="absolute top-full left-0 mt-3 w-[800px] bg-zinc-800 rounded-lg shadow-lg p-6 z-[102]"
                    onMouseEnter={handleMegaMenuEnter}
                    onMouseLeave={handleMegaMenuLeave}
                  >
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-2 space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Websites & E-commerce</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <Link
                              href="/portfolio/websites-corporativos"
                              className="group block space-y-1 rounded-md p-3 hover:bg-zinc-700 transition-colors"
                            >
                              <div className="text-sm font-bold text-white group-hover:text-rose-400">
                                Sites Corporativos
                              </div>
                              <div className="text-xs text-gray-300">Presença digital profissional</div>
                            </Link>
                            <Link
                              href="/portfolio/e-commerce"
                              className="group block space-y-1 rounded-md p-3 hover:bg-zinc-700 transition-colors"
                            >
                              <div className="text-sm font-bold text-white group-hover:text-rose-400">E-commerce</div>
                              <div className="text-xs text-gray-300">Lojas virtuais completas</div>
                            </Link>
                            <Link
                              href="/portfolio/landing-pages"
                              className="group block space-y-1 rounded-md p-3 hover:bg-zinc-700 transition-colors"
                            >
                              <div className="text-sm font-bold text-white group-hover:text-rose-400">
                                Landing Pages
                              </div>
                              <div className="text-xs text-gray-300">Páginas de conversão</div>
                            </Link>
                            <Link
                              href="/portfolio/aplicativos"
                              className="group block space-y-1 rounded-md p-3 hover:bg-zinc-700 transition-colors"
                            >
                              <div className="text-sm font-bold text-white group-hover:text-rose-400">
                                Aplicativos Web
                              </div>
                              <div className="text-xs text-gray-300">Soluções personalizadas</div>
                            </Link>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Design & Branding</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <Link
                              href="/portfolio/identidade-visual"
                              className="group block space-y-1 rounded-md p-3 hover:bg-zinc-700 transition-colors"
                            >
                              <div className="text-sm font-bold text-white group-hover:text-rose-400">
                                Identidade Visual
                              </div>
                              <div className="text-xs text-gray-300">Logos e branding completo</div>
                            </Link>
                            <Link
                              href="/portfolio/ui-ux"
                              className="group block space-y-1 rounded-md p-3 hover:bg-zinc-700 transition-colors"
                            >
                              <div className="text-sm font-bold text-white group-hover:text-rose-400">UI/UX Design</div>
                              <div className="text-xs text-gray-300">Experiência do usuário</div>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="sticky top-0">
                          <img
                            src="/modern-website-showcase.png"
                            alt="Portfolio showcase"
                            className="w-full h-[300px] object-cover rounded-lg shadow-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-rose-600/20 to-transparent rounded-lg" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white text-sm font-bold mb-2">
                              Projetos incríveis que transformam negócios
                            </p>
                            <Button size="sm" className="w-full bg-zinc-700 text-white hover:bg-zinc-600">
                              Ver todos os projetos
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/contato"
                className={`inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-rose-50/10 hover:text-rose-400 focus:bg-rose-50/10 focus:text-rose-400 focus:outline-none ${
                  isOverWhiteSection ? "text-gray-900" : "text-white"
                }`}
              >
                Contato
              </Link>
            </nav>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Button className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold px-6">
              Crie meu projeto
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10 relative z-[102]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-[103] bg-black/90 backdrop-blur-lg h-screen">
            <div className="flex flex-col h-screen">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <img src="/gwapo-logo.png" alt="Gwapo" className="w-8 h-8 object-cover rounded" />
                  <span className="text-xl font-bold text-rose-500">gwapo</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* CTA Buttons */}
              <div className="p-4 flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white py-3 bg-transparent"
                  onClick={() => setIsOpen(false)}
                >
                  Ver Portfolio
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white py-3"
                  onClick={() => setIsOpen(false)}
                >
                  Fazer meu site
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6">
                <div className="space-y-1">
                  <Link
                    href="/servicos"
                    className="block text-white hover:text-rose-400 py-4 text-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Serviços
                  </Link>

                  <Link
                    href="/producoes"
                    className="block text-white hover:text-rose-400 py-4 text-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Produções
                  </Link>

                  <div>
                    <button
                      className="flex items-center justify-between w-full text-white hover:text-rose-400 py-4 text-lg transition-colors"
                      onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                    >
                      <span>Portfolio</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${isPortfolioOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isPortfolioOpen && (
                      <div className="pl-4 py-2 space-y-2 border-l border-gray-800">
                        <Link
                          href="/portfolio/websites-corporativos"
                          className="block text-gray-400 hover:text-white py-2 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Sites Corporativos
                        </Link>
                        <Link
                          href="/portfolio/e-commerce"
                          className="block text-gray-400 hover:text-white py-2 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          E-commerce
                        </Link>
                        <Link
                          href="/portfolio/landing-pages"
                          className="block text-gray-400 hover:text-white py-2 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Landing Pages
                        </Link>
                        <Link
                          href="/portfolio/aplicativos"
                          className="block text-gray-400 hover:text-white py-2 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Aplicativos Web
                        </Link>
                        <Link
                          href="/portfolio/identidade-visual"
                          className="block text-gray-400 hover:text-white py-2 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Identidade Visual
                        </Link>
                        <Link
                          href="/portfolio/ui-ux"
                          className="block text-gray-400 hover:text-white py-2 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          UI/UX Design
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/contato"
                    className="block text-white hover:text-rose-400 py-4 text-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contato
                  </Link>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-gray-800">
                <Button
                  className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white py-3"
                  onClick={() => setIsOpen(false)}
                >
                  💬 Falar no WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
