"use client"
import { useState, useEffect } from "react"
import { BarChart3, Database, Shield, Zap, HardDrive, MessageSquare, Globe, ChevronRight } from "lucide-react"
import Image from "next/image"

const sidebarItems = [
  { name: "Overview", icon: BarChart3, active: true },
  { name: "Auth", icon: Shield, active: false },
  { name: "Databases", icon: Database, active: false },
  { name: "Functions", icon: Zap, active: false },
  { name: "Storage", icon: HardDrive, active: false },
  { name: "Messaging", icon: MessageSquare, active: false },
  { name: "Sites", icon: Globe, active: false },
]

const generateBarData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    height: Math.random() * 80 + 20,
    delay: i * 50,
  }))
}

export default function AdminDashboard() {
  const [barData, setBarData] = useState(generateBarData())

  useEffect(() => {
    const interval = setInterval(() => {
      setBarData(generateBarData())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#19191c] rounded-l-2xl overflow-hidden h-full flex border-r border-8 border-[#272729] translate-x-10">
      {/* Sidebar */}
      <div className="w-48 bg-[#19191c] border-r border-zinc-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center justify-center gap-2 text-zinc-400 text-sm mb-1">
            <Image
								src="/logos-svg/6.svg"
								alt="Gwapo Logo"
								width={80}
								height={80}
								className="object-contain"
							/>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.name}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                    item.active
                      ? "bg-zinc-800 text-rose-400 hover:bg-zinc-700"
                      : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
            <span>Build</span>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-1">Gwapo Project</h1>
          <div className="flex items-center gap-2">
            <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs">Project ID</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-2 gap-6 mb-16">
            {/* Bandwidth */}
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">119</span>
                <span className="text-zinc-400 text-sm">GB</span>
                <div className="ml-auto flex items-center gap-1 text-xs text-zinc-400">
                  <span>30d</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
              <p className="text-zinc-400 text-sm mb-4">Bandwidth</p>

              {/* Bar Chart */}
              <div className="h-32 flex items-end gap-1">
                {barData.map((bar, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-t from-rose-500 to-rose-400 rounded-sm transition-all duration-500 ease-out"
                    style={{
                      height: `${bar.height}%`,
                      width: "8px",
                      animationDelay: `${bar.delay}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Requests */}
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">2K</span>
                <div className="ml-auto flex items-center gap-1 text-xs text-zinc-400">
                  <span>30d</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
              <p className="text-zinc-400 text-sm mb-4">Requests</p>

              {/* Line Chart Area */}
              <div className="h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 300 120">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,80 Q50,60 100,70 T200,50 T300,40"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <path d="M0,80 Q50,60 100,70 T200,50 T300,40 L300,120 L0,120 Z" fill="url(#areaGradient)" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-400 uppercase tracking-wide">Databases</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">4</span>
                <span className="text-xs text-zinc-500">Databases</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-400 uppercase tracking-wide">Storage</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">8.0</span>
                <span className="text-xs text-zinc-500">MB</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-400 uppercase tracking-wide">Authentication</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">4K</span>
                <span className="text-xs text-zinc-500">Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
