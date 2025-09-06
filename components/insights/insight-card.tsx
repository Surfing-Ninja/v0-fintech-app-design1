"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AlertTriangle, Lightbulb, TrendingUp, Trophy } from "lucide-react"
import type { Insight } from "@/lib/mock-insights"

interface InsightCardProps {
  insight: Insight
}

const typeConfig = {
  tip: {
    icon: Lightbulb,
    bgColor: "bg-blue-500/20",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-red-500/20",
    textColor: "text-red-400",
    borderColor: "border-red-500/30",
  },
  opportunity: {
    icon: TrendingUp,
    bgColor: "bg-primary/20",
    textColor: "text-primary",
    borderColor: "border-primary/30",
  },
  achievement: {
    icon: Trophy,
    bgColor: "bg-yellow-500/20",
    textColor: "text-yellow-400",
    borderColor: "border-yellow-500/30",
  },
}

const priorityConfig = {
  high: "border-l-4 border-l-red-500",
  medium: "border-l-4 border-l-yellow-500",
  low: "border-l-4 border-l-green-500",
}

export function InsightCard({ insight }: InsightCardProps) {
  const config = typeConfig[insight.type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "glass-card glass-card-hover rounded-lg p-6 transition-all duration-300",
        priorityConfig[insight.priority],
        config.borderColor,
      )}
    >
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0", config.bgColor)}>
          <Icon className={cn("w-6 h-6", config.textColor)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground truncate">{insight.title}</h3>
            <span
              className={cn(
                "text-xs px-2 py-1 rounded-full font-medium",
                insight.priority === "high" && "bg-red-500/20 text-red-400",
                insight.priority === "medium" && "bg-yellow-500/20 text-yellow-400",
                insight.priority === "low" && "bg-green-500/20 text-green-400",
              )}
            >
              {insight.priority}
            </span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs text-muted-foreground capitalize">{insight.category}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className={cn("text-xs capitalize", config.textColor)}>{insight.type}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-muted-foreground mb-4 leading-relaxed">{insight.description}</p>

      {/* Action Button */}
      {insight.action && (
        <Button
          variant="outline"
          size="sm"
          className={cn("w-full border-border/50 hover:bg-card/20 transition-colors", config.textColor)}
        >
          {insight.action}
        </Button>
      )}
    </div>
  )
}
