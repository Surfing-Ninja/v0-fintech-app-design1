"use client"

import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: number
  change: number
  icon: LucideIcon
  color: "primary" | "secondary" | "success" | "destructive"
}

export function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 100)
    return () => clearTimeout(timer)
  }, [value])

  const colorClasses = {
    primary: "text-blue-400 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    secondary: "text-purple-400 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30",
    success: "text-emerald-400 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
    destructive: "text-red-400 bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/30",
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border", colorClasses[color])}>
            <Icon className="w-6 h-6" />
          </div>
          <div
            className={cn(
              "text-xs font-semibold px-3 py-1 rounded-full border",
              change >= 0
                ? "text-white bg-emerald-600/80 border-emerald-500/50"
                : "text-white bg-red-600/80 border-red-500/50",
            )}
          >
            {change >= 0 ? "+" : ""}
            {change}%
          </div>
        </div>

        <div>
          <p className="text-2xl font-bold text-white mb-1">₹{animatedValue.toLocaleString()}</p>
          <p className="text-sm text-slate-400">{title}</p>
        </div>
      </div>
    </div>
  )
}
