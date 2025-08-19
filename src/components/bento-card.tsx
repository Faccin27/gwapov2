"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"

interface BentoCardProps {
  icon: string
  title: string
  description: string
  Component: React.ComponentType<{ isHovered: boolean }>
}

export function BentoCard({ icon, title, description, Component }: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/20 flex flex-col justify-start items-start relative group hover:border-white/30 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with blur effect */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-300"
        style={{
          background: "rgba(231, 236, 235, 0.08)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />
      {/* Additional subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl group-hover:from-white/8 transition-all duration-300" />

      <div className="self-stretch p-6 flex flex-col justify-start items-start gap-2 relative z-10">
        <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
          <div className="flex flex-row items-center gap-2">
            <Image src={icon || "/placeholder.svg"} alt="" width={32} height={32} className="w-8 h-8" />
            <p className="text-foreground text-[22px] font-aeonik font-semibold leading-7">{title}</p>
          </div>
          <span className="text-muted-foreground font-aeonik font-normal">{description}</span>
        </div>
      </div>

      <div className="self-stretch h-80 relative -mt-0.5 z-10 bg-zinc-900 backdrop-blur-sm m-2 rounded-lg border border-white/5 group-hover:bg-zinc-900/90 group-hover:border-white/10 transition-all duration-300">
        <Component isHovered={isHovered} />
      </div>
    </div>
  )
}
