"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Trophy, Lightbulb, User, Coins } from "lucide-react"
import { useApp } from "@/contexts/app-context"

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/gamification",
    label: "Rewards",
    icon: Trophy,
  },
  {
    href: "/insights",
    label: "Insights",
    icon: Lightbulb,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
]

export function Navigation() {
  const pathname = usePathname()
  const { state } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:left-0 md:bottom-auto md:w-64 md:h-screen">
      <div className="glass-card border-t md:border-t-0 md:border-r h-16 md:h-full flex md:flex-col items-center md:items-start justify-around md:justify-start md:p-6">
        {/* Logo - Desktop only */}
        <div className="hidden md:block mb-8">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">Credence</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex md:flex-col w-full md:space-y-2 justify-around md:justify-start">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
                  "hover:bg-card/20 hover:text-primary",
                  isActive ? "bg-primary/20 text-primary neon-glow" : "text-muted-foreground",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:block font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Coins Display - Desktop only */}
        <div className="hidden md:flex items-center space-x-2 mt-auto p-3 glass-card rounded-lg">
          <Coins className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">{state.userStats.coins}</span>
        </div>
      </div>
    </nav>
  )
}
