import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function MaximizeResultsSection() {
  return (
    <section
      data-section="results"
      className="bg-white max-w-[96%] mx-auto rounded-t-4xl text-gray-900 pt-20  md:pt-28 md:pb-6 border-0 shadow-none"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content Area */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Maximize seus resultados<span className="text-rose-500">_</span>
          </h2>
          <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-700">
            Transforme sua visão em realidade com um site ou projeto que realmente impulsiona seu negócio. Nossa equipe
            está pronta para criar uma solução personalizada, moderna e eficaz que se destaca no mercado.
          </p>
          <Button className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Crie seu projeto conosco
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Right Image Area */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-[533px] h-[570px] md:max-w-full sm:max-w-[75%] max-w-[60%]">
            <Image
              src="/woman.webp"
              alt="Mulher sorrindo"
              fill
              className="object-cover rounded-tr-lg rounded-bl-lg rounded-tl-[100px] rounded-br-[100px] "
            />
          </div>
        </div>
      </div>
    </section>
  )
}
