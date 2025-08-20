"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ChatBentoContentProps {
  isHovered: boolean
}

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const faqMessages = [
  {
    question: "Quanto tempo leva para criar um site?",
    answer: "Depende do projeto, mas em média entregamos em 2 a 4 semanas.",
  },
  {
    question: "O site será responsivo?",
    answer: "Sim, todos os sites funcionam em celular, tablet e computador.",
  },
   {
    question: "Vocês oferecem suporte?",
    answer: "Sim, damos suporte e manutenção após a entrega.",
  },
  {
    question: "Preciso pagar mensalidade?",
    answer: "Não. Você paga apenas o desenvolvimento. Hospedagem e domínio têm custos separados.",
  },
]

const ChatBentoContent: React.FC<ChatBentoContentProps> = ({ isHovered }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentFaqIndex, setCurrentFaqIndex] = useState(0)

  // Initialize with a FAQ question
  useEffect(() => {
    const initialFaq = faqMessages[0]
    setMessages([
      {
        id: "initial",
        text: initialFaq.question,
        isUser: true,
        timestamp: new Date(),
      },
    ])
  }, [])

  // Handle hover animation
  useEffect(() => {
    if (isHovered && messages.length === 1) {
      // Start typing animation
      setIsTyping(true)

      // After typing animation, show the answer
      const typingTimeout = setTimeout(() => {
        setIsTyping(false)
        const currentFaq = faqMessages[currentFaqIndex]
        setMessages((prev) => [
          ...prev,
          {
            id: `answer-${currentFaqIndex}`,
            text: currentFaq.answer,
            isUser: false,
            timestamp: new Date(),
          },
        ])
      }, 2000) // 2 seconds of typing animation

      return () => clearTimeout(typingTimeout)
    } else if (!isHovered && messages.length > 1) {
      // Reset to just the question when not hovering
      const resetTimeout = setTimeout(() => {
        // Cycle to next FAQ question
        const nextIndex = (currentFaqIndex + 1) % faqMessages.length
        setCurrentFaqIndex(nextIndex)
        const nextFaq = faqMessages[nextIndex]

        setMessages([
          {
            id: `question-${nextIndex}`,
            text: nextFaq.question,
            isUser: true,
            timestamp: new Date(),
          },
        ])
      }, 300)

      return () => clearTimeout(resetTimeout)
    }
  }, [isHovered, messages.length, currentFaqIndex])

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-3 bg-muted/50 rounded-lg max-w-[80%]">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full w-full p-4">
      {/* Chat Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
        <div className="w-8 h-8 rounded-full bg-zinc-800/20 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 14.99 3.01 16.26L2 22L7.74 20.99C9.01 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
              fill="currentColor"
              className={cn("transition-all duration-300", isHovered ? "text-rose-400" : "text-muted-foreground")}
            />
          </svg>
        </div>
        <div>
          <h3
            className={cn(
              "font-semibold text-sm transition-all duration-300",
              isHovered ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Assistente IA
          </h3>
          <p
            className={cn(
              "text-xs transition-all duration-300",
              isHovered ? "text-muted-foreground" : "text-muted-foreground/60",
            )}
          >
            {isTyping ? "Digitando..." : "Online"}
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col gap-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex transition-all duration-300", message.isUser ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] p-3 rounded-lg text-sm transition-all duration-300",
                message.isUser
                  ? isHovered
                    ? "bg-zinc-800/60"
                    : "bg-zinc-800 text-muted-foreground"
                  : isHovered
                    ? "bg-rose-500 text-foreground"
                    : "bg-muted/30 text-muted-foreground",
                !isHovered && "grayscale",
              )}
            >
              {message.text}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
      </div>

      {/* Chat Input (disabled/visual only) */}
      <div className="pt-4 border-t border-border/50">
        <div
          className={cn(
            "flex items-center gap-2 p-2 rounded-lg border transition-all duration-300",
            isHovered ? "border-border bg-background/50" : "border-border/30 bg-muted/20",
          )}
        >
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            disabled
            className={cn(
              "flex-1 bg-transparent text-sm placeholder:text-muted-foreground/50 outline-none transition-all duration-300",
              !isHovered && "grayscale",
            )}
          />
          <button
            disabled
            className={cn(
              "p-1.5 rounded transition-all duration-300",
              isHovered ? "text-zinc-800 hover:bg-zinc-800/10" : "text-muted-foreground/50",
            )}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBentoContent
