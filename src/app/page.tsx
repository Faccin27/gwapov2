"use client";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Cardsection from "@/components/card-section";
import { BentoSection } from "@/components/bento-section";
import Image from "next/image";
import MaximizeResultsSection from "@/components/results";
import MetricsSection from "@/components/metrics-section";
import PortfolioSection from "@/components/portfolio-section";
import CTA from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useRef } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollSmoother);
}

export default function Home() {
  const smootherRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize ScrollSmoother
      ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: smootherRef.current,
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="bg-[#19191c] text-gray-200 min-h-screen font-aeonik"
    >
      {/* <div
        className="animate-lighting absolute top-0 left-0 z-50 h-screen w-[200vw] -translate-x-[25%] translate-y-8 rotate-12 overflow-hidden blur-3xl md:w-full 
  bg-[image:radial-gradient(ellipse_390px_50px_at_10%_30%,_rgba(254,_149,_103,_0.5)_0%,_rgba(254,_149,_103,_0)_70%),_radial-gradient(ellipse_1100px_170px_at_15%_40%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%),_radial-gradient(ellipse_1200px_180px_at_30%_30%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%)] 
  bg-position-[0%_0%]"
      /> */}
      <Header />
      <div ref={smootherRef}>
        <Hero />
        <Cardsection />
        <BentoSection />
        <div className="bg-white max-w-[96%] mx-auto rounded-4xl">
        <MaximizeResultsSection />
        <MetricsSection />
        </div>
        <PortfolioSection />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
