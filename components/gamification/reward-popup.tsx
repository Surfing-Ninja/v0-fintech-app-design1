"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RewardPopupProps {
  isVisible: boolean
  message: string
  onClose: () => void
}

export function RewardPopup({ isVisible, message, onClose }: RewardPopupProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        onClose()
      }, 4000)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Popup */}
      <div
        className={cn(
          "relative glass-card rounded-2xl p-8 max-w-sm w-full text-center transition-all duration-500 transform",
          isAnimating ? "scale-100 opacity-100 animate-bounce" : "scale-95 opacity-0",
        )}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Sparkles Animation */}
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center neon-glow">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-2 h-2 bg-primary rounded-full animate-ping",
                  i === 0 && "top-2 left-8 animation-delay-100",
                  i === 1 && "top-4 right-6 animation-delay-200",
                  i === 2 && "bottom-6 left-4 animation-delay-300",
                  i === 3 && "bottom-2 right-8 animation-delay-400",
                  i === 4 && "top-8 left-12 animation-delay-500",
                  i === 5 && "bottom-8 right-4 animation-delay-600",
                )}
              />
            ))}
          </div>
        </div>

        {/* Message */}
        <h3 className="text-xl font-bold text-foreground mb-2">Congratulations!</h3>
        <p className="text-muted-foreground mb-6">{message}</p>

        {/* Action Button */}
        <Button
          onClick={onClose}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold neon-glow"
        >
          Awesome!
        </Button>
      </div>
    </div>
  )
}
