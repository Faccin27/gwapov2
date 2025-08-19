"use client"

import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const CTASection = () => {
  return (
    <section className="flex flex-col items-center justify-center relative w-full max-w-6xl mx-auto py-16 lg:py-24 overflow-hidden px-4 sm:px-6">
      {/* Background blur effect - similar to other sections */}
      <div className="w-[300px] h-[400px] absolute top-[50px] right-[30%] bg-rose-500/8 blur-[80px] z-0" />

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 lg:bottom-0 inset-x-0 mx-auto bg-rose-500/30 lg:bg-rose-500/50 rounded-full w-1/3 h-1/16 blur-[4rem]"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full py-8 relative z-10">
        <div className="flex flex-col items-start justify-center w-full">
          <div className="w-max mx-auto lg:mx-0">
            <h2 className="text-3xl lg:text-5xl leading-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-400 font-semibold font-aeonik">
              Transforme sua <br />
              <span className="text-rose-500">ideia em realidade</span>
            </h2>
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-muted-foreground">Consultoria gratuita de 30 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-muted-foreground">Orçamento sem compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-muted-foreground">
                  Suporte completo durante todo o projeto
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full mt-8 lg:mt-0">
          <div className="w-max mx-auto lg:mx-0">
            <div className="flex size-20 mb-6">
              <Image
                src="/icons/heart.svg"
                alt="Gwapo Logo"
                width={80}
                height={80}
                className="object-cover size-full rounded-lg"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <Button className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Começar meu projeto
              </Button>
              <span className="text-sm text-zinc-300">
                4.9/5 estrelas <br />
                Baseado em +200 projetos entregues
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
