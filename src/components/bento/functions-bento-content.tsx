"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Zap, Server } from "lucide-react"
import { cn } from "@/lib/utils"

interface FunctionsBentoContentProps {
  isHovered: boolean
}

const functionsList = [
  "Send Email",
  "Delete Account",
  "Create Payment",
  "Upload File",
  "Process Order",
  "Generate Report",
  "Update User Profile",
  "Fetch Data",
  "Log Event",
  "Notify Admin",
  "Validate Input",
  "Encrypt Data",
  "Resize Image",
  "Schedule Task",
  "Backup Database",
  "Optimize Query",
  "Compress Assets",
  "Monitor Performance",
  "Handle Webhook",
  "Generate PDF",
  "Translate Text",
  "Analyze Sentiment",
  "Convert Currency",
  "Process Payments",
  "Manage Inventory",
  "Send SMS",
  "Create Invoice",
  "Verify User",
  "Generate Thumbnail",
  "Parse CSV",
]

const FunctionsBentoContent: React.FC<FunctionsBentoContentProps> = ({ isHovered }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const currentScrollPosition = useRef<number>(0) // Persist scroll position

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const scrollSpeed = 0.5
    const itemHeight = 56 // Approximate height of each item including gap

    const animateScroll = () => {
      if (!scrollContainer) return

      currentScrollPosition.current += scrollSpeed

      // Reset position when we've scrolled past the first set of items
      const totalHeight = functionsList.length * itemHeight
      if (currentScrollPosition.current >= totalHeight) {
        currentScrollPosition.current = 0
      }

      scrollContainer.scrollTop = currentScrollPosition.current
      animationFrameId.current = requestAnimationFrame(animateScroll)
    }

    if (isHovered) {
      // Start animation from current position
      animationFrameId.current = requestAnimationFrame(animateScroll)
    } else {
      // Stop animation and keep current position
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isHovered]) // Re-run effect only when isHovered changes

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      {/* Function stats */}
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
          <Zap className="w-3 h-3" />
          <span>Serverless</span>
        </div>
        <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
          <Server className="w-3 h-3" />
          <span>Active</span>
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 p-4 rounded-lg border border-border shadow-lg w-full h-full flex flex-col overflow-hidden",
          "transition-all duration-300",
          isHovered ? "bg-background/90" : "bg-background/70",
        )}
      >
        <div className="relative flex-grow w-full overflow-hidden">
          {/* Top gradient mask */}
          <div
            className="absolute top-0 left-0 right-0 h-8 z-20 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--background) / 0.9) 0%, transparent 100%)",
            }}
          />

          {/* Scrollable content */}
          <div
            ref={scrollContainerRef}
            className="h-full overflow-hidden relative z-10"
            style={{ scrollBehavior: "auto" }}
          >
            <div className="flex flex-col gap-3 py-4">
              {/* Render items twice for seamless loop */}
              {[...functionsList, ...functionsList].map((funcName, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-zinc-800/40 text-foreground px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap border border-[#ffffff08] transition-all duration-300",
                    "hover:bg-zinc-700/50 ",
                    isHovered && "shadow-sm",
                  )}
                  style={{
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
                    minHeight: "48px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {funcName}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom gradient mask */}
          <div
            className="absolute bottom-0 left-0 right-0 h-8 z-20 pointer-events-none"
            style={{
              background: "linear-gradient(to top, hsl(var(--background) / 0.9) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Function stats */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            30 functions running
          </div>
          <div className="text-xs text-muted-foreground">Avg response: 120ms</div>
        </div>
      </div>
    </div>
  )
}

export default FunctionsBentoContent
