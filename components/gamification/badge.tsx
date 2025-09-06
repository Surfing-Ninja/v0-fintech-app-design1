"use client"

import { cn } from "@/lib/utils"

interface BadgeProps {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

export function Badge({ id, name, description, icon, unlocked, unlockedAt }: BadgeProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-lg p-6 transition-all duration-300",
        unlocked ? "glass-card-hover border-primary/30 neon-glow" : "opacity-60 grayscale",
      )}
    >
      <div className="text-center">
        <div
          className={cn(
            "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl transition-all duration-300",
            unlocked
              ? "bg-gradient-to-r from-primary to-secondary shadow-lg"
              : "bg-muted/20 border-2 border-dashed border-muted",
          )}
        >
          {unlocked ? icon : "🔒"}
        </div>

        <h3 className={cn("text-lg font-semibold mb-2", unlocked ? "text-foreground" : "text-muted-foreground")}>
          {name}
        </h3>

        <p className="text-sm text-muted-foreground mb-3">{description}</p>

        {unlocked && unlockedAt && (
          <div className="text-xs text-primary font-medium">Unlocked {new Date(unlockedAt).toLocaleDateString()}</div>
        )}

        {!unlocked && <div className="text-xs text-muted-foreground">Keep going to unlock!</div>}
      </div>
    </div>
  )
}
