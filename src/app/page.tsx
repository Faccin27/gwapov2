import Header from "@/components/header";
import Hero from "@/components/hero";
import Cardsection from "@/components/card-section";
import { BentoSection } from "@/components/bento-section";

export default function Home() {
  return (
    <div className="bg-[#19191c] text-gray-200 min-h-screen font-aeonik">
      <Header />
      <Hero />
      <Cardsection />
      <BentoSection />
    </div>
  );
}
