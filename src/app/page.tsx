import Header from "@/components/header";
import Hero from "@/components/hero";
import Cardsection from "@/components/card-section";

export default function Home() {
  return (
    <div className="bg-[#19191c] text-gray-200 min-h-screen font-aeonik">
      <Header />
      <Hero />
      <Cardsection />
    </div>
  );
}
