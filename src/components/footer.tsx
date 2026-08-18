import Link from "next/link"
import localFont from "next/font/local"
import { Mail, Phone, Instagram, Users } from "lucide-react"
import { getSiteContent } from "@/lib/site-content"

const gwapoDisplayFont = localFont({
  src: "../../public/fonts/GWAPO-THEMIRU-Smooth.ttf",
  display: "swap",
})

export async function Footer() {
  const content = await getSiteContent()

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/servicos", label: "Serviços" },
    { href: "/producoes", label: "Produções" },
    { href: "/projetos", label: "Portfolio" },
    { href: "/#depoimentos", label: "Depoimentos" },
    { href: "/contato", label: "Contato" },
  ]

  const socialLinks = [
    {
      icon: Instagram,
      href: content.footerInstagramUrl,
      label: "Instagram",
    },
  ]

  return (
    <footer className="text-white relative overflow-hidden">
      <div className="px-6 md:px-12 lg:px-36 py-12 md:py-14 lg:py-16 border-b border-white/10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Entre em Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3 text-[#a0a0a0] hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{content.footerEmail}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-[#a0a0a0] hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{content.footerPhone}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-[#a0a0a0] hover:text-white transition-colors">
                <Users className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{content.footerTeamText}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Navegação</h3>
            <nav className="grid grid-cols-2 gap-3 justify-items-center md:justify-items-start">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#a0a0a0] hover:text-white transition-all hover:translate-x-1 duration-300 text-sm md:text-sm lg:text-base truncate w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6 text-center md:text-left md:col-span-2 lg:col-span-1">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Redes Sociais</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[#a0a0a0] hover:text-white hover:bg-rose-400 hover:border-rose-600 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-[#a0a0a0] text-sm leading-relaxed">{content.footerSocialText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-16 md:py-20 lg:py-36 lg:pt-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-rose-400/5 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-rose-400/5 rounded-full blur-3xl" />
        </div>

        {/* Large Text */}
        <div className="relative z-10 px-6 md:px-12 lg:px-36">
          <div className="text-center">
            <p
              aria-hidden="true"
              className={`${gwapoDisplayFont.className} text-[5rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] xl:text-[20rem] leading-none tracking-tighter text-white/10 animate-pulse select-none break-all`}
            >
              GWAPO
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
      </div>
    </footer>
  )
}
