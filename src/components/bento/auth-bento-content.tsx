"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Chrome, Shield, Lock, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthBentoContentProps {
  isHovered: boolean
}

const AuthBentoContent: React.FC<AuthBentoContentProps> = ({ isHovered }) => {
  const [passwordValue, setPasswordValue] = useState("")
  const [isLoginClicked, setIsLoginClicked] = useState(false)
  const [isPasswordFadingOut, setIsPasswordFadingOut] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const typeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isHovered) {
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current)
        fadeOutTimeoutRef.current = null
      }
      setIsPasswordFadingOut(false)

      const passwordText = "polenta123"
      let i = 0
      typeIntervalRef.current = setInterval(() => {
        if (i < passwordText.length) {
          setPasswordValue(passwordText.substring(0, i + 1))
          i++
        } else {
          clearInterval(typeIntervalRef.current!)
          typeIntervalRef.current = null
          setTimeout(() => {
            setIsLoginClicked(true)
            setIsLoading(true)
            setTimeout(() => {
              setIsLoginClicked(false)
              setIsLoading(false)
            }, 1500)
          }, 200)
        }
      }, 100)
    } else {
      if (typeIntervalRef.current) {
        clearInterval(typeIntervalRef.current)
        typeIntervalRef.current = null
      }

      setIsPasswordFadingOut(true)
      fadeOutTimeoutRef.current = setTimeout(() => {
        setPasswordValue("")
        setIsLoginClicked(false)
        setIsLoading(false)
        setIsPasswordFadingOut(false)
      }, 300)
    }

    return () => {
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current)
      if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current)
    }
  }, [isHovered])

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-5 relative">
      {/* Security badges */}
      <div className="absolute top-2 left-2 flex gap-1 z-10">
        <div className="flex items-center gap-0.5 bg-green-500/20 text-green-400 px-1 py-0.5 rounded text-xs">
          <Shield className="w-2 h-2" />
          <span className="text-xs">SSL</span>
        </div>
        <div className="flex items-center gap-0.5 bg-blue-500/20 text-blue-400 px-1 py-0.5 rounded text-xs">
          <Lock className="w-2 h-2" />
          <span className="text-xs">2FA</span>
        </div>
      </div>

      <div className="relative z-10 p-3 rounded-lg bg-zinc-900/90 border border-[#353535d9] shadow-lg backdrop-blur-sm w-full max-w-[250px] h-fit">
        <div className="w-full space-y-2">
          {/* Header */}
          <div className="text-center mb-3">
            <h3 className="text-white text-sm font-semibold mb-0.5">Welcome back</h3>
            <p className="text-gray-400 text-xs">Sign in to your account</p>
          </div>

          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              defaultValue="contact@gwapo.com"
              className="bg-background/50 border-border text-foreground text-xs h-8 "
            />
            <div className="absolute right-1.5 top-1/2 transform -translate-y-1/2">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              className={cn(
                "bg-background/50 border-border text-foreground text-xs h-8 pr-6",
                "transition-opacity duration-300",
                isPasswordFadingOut ? "opacity-0" : "opacity-100",
              )}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1 text-gray-400">
              <input type="checkbox" className="rounded border-gray-600 w-2.5 h-2.5" />
              <span className="text-xs">Remember</span>
            </label>
            <a className="text-rose-400 hover:text-rose-300 transition-colors text-xs cursor-pointer">
              Forgot?
            </a>
          </div>

          <Button
            className={cn(
              "w-full hover:scale-105 bg-rose-500 text-primary-foreground hover:bg-rose-500/90 transition-all duration-300 h-8 font-medium text-xs",
              isLoginClicked ? "scale-95 opacity-70" : "",
              isLoading && "cursor-not-allowed",
            )}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 border border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-xs">Signing in...</span>
              </div>
            ) : (
              <span className="text-xs">Sign in</span>
            )}
          </Button>

          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-border" />
            <span className="flex-shrink mx-2 text-muted-foreground text-xs font-semibold">OR</span>
            <div className="flex-grow border-t border-border" />
          </div>

          <Button
            variant="outline"
            className="w-full bg-background/50 border-border text-foreground transition-all duration-300 hover:bg-muted/50 hover:scale-105 h-8 text-xs"
          >
            <Chrome className="mr-1 h-2.5 w-2.5" />
            <span className="text-xs">Google</span>
          </Button>

          <div className="text-center text-xs text-gray-500 mt-1">Protected by security</div>
        </div>
      </div>
    </div>
  )
}

export default AuthBentoContent
