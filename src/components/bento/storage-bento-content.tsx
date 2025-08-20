"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Cloud, Upload, HardDrive } from "lucide-react"
import { cn } from "@/lib/utils"

interface StorageBentoContentProps {
  isHovered: boolean
}

const StorageBentoContent: React.FC<StorageBentoContentProps> = ({ isHovered }) => {
  const [storageValue, setStorageValue] = useState(2.4)
  const [isTextTransitioning, setIsTextTransitioning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    let textTransitionTimeout: NodeJS.Timeout | undefined

    if (isHovered) {
      // Animação gradual do número
      const startValue = 2.4
      const endValue = 7.8
      const duration = 1500
      const steps = 20
      const increment = (endValue - startValue) / steps
      let currentStep = 0

      interval = setInterval(() => {
        currentStep++
        const newValue = startValue + increment * currentStep
        setStorageValue(Math.min(newValue, endValue))

        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, duration / steps)

      // Transição do texto com opacidade suave
      setIsTextTransitioning(true)
      textTransitionTimeout = setTimeout(() => setIsTextTransitioning(false), 150) // Short duration for subtle effect
    } else {
      // Volta gradualmente para o valor original
      const startValue = storageValue
      const endValue = 2.4
      const duration = 600
      const steps = 15
      const decrement = (startValue - endValue) / steps
      let currentStep = 0

      interval = setInterval(() => {
        currentStep++
        const newValue = startValue - decrement * currentStep
        setStorageValue(Math.max(newValue, endValue))

        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, duration / steps)

      // Transição do texto com opacidade suave
      setIsTextTransitioning(true)
      textTransitionTimeout = setTimeout(() => setIsTextTransitioning(false), 150) // Short duration for subtle effect
    }

    return () => {
      if (interval) clearInterval(interval)
      if (textTransitionTimeout) clearTimeout(textTransitionTimeout)
    }
  }, [isHovered])

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      {/* Storage stats */}
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="flex items-center gap-1 bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">
          <Cloud className="w-3 h-3" />
          <span>Cloud</span>
        </div>
        <div className="flex items-center gap-1 bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs">
          <HardDrive className="w-3 h-3" />
          <span>2.4GB</span>
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 p-4 rounded-lg border border-border shadow-lg w-full h-full flex flex-col items-center justify-center",
          "transition-all duration-300",
          isHovered ? "bg-background/90" : "bg-background/70",
        )}
      >
        {/* Upload area - quadrada */}
        <div
          className={cn(
            "w-48 h-48 border-2 border-dashed flex flex-col items-center justify-center rounded-xl transition-all duration-300 mt-4 cursor-pointer",
            isHovered ? "border-primary/50 bg-primary/5" : "border-zinc-600",
          )}
        >
          <div className="relative mb-3">
            <Image
              src="/upload.png"
              alt="Cloud Storage"
              width={80}
              height={80}
              className={cn(
                "object-contain transition-all duration-300",
                isHovered ? "grayscale-0 scale-110" : "grayscale scale-100",
              )}
            />
          </div>

          <div className="text-center space-y-1">
            <h4
              className={cn(
                "text-foreground font-semibold text-sm transition-opacity duration-150", // Changed to opacity transition
                isTextTransitioning ? "opacity-0" : "opacity-100",
              )}
            >
              {isHovered ? "Ready to upload!" : "Drag & drop files"}
            </h4>
            <p
              className={cn(
                "text-muted-foreground text-xs transition-opacity duration-150", // Changed to opacity transition
                isTextTransitioning ? "opacity-0" : "opacity-100",
              )}
            >
              {isHovered ? "Files will be stored securely" : "or click to browse"}
            </p>
          </div>

          <div
            className={cn(
              "mt-3 flex items-center gap-2 text-primary transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            )}
          >
            <Upload className="w-3 h-3" />
            <span className="text-xs font-medium">Upload files</span>
          </div>
        </div>

        {/* Storage info */}
        <div className="mt-4 w-full max-w-48">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Storage used</span>
            <span className="text-sm text-foreground font-medium">{storageValue.toFixed(1)}GB / 10GB</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-rose-500/70 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(storageValue / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StorageBentoContent
