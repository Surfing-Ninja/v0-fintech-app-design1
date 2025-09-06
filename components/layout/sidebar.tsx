"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { LayoutDashboard, TrendingUp, Trophy, Lightbulb, User, Settings, LogOut } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Mutual Funds", href: "/mutual-funds", icon: TrendingUp },
  { name: "Rewards", href: "/rewards", icon: Trophy },
  { name: "Insights", href: "/insights", icon: Lightbulb },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-700/50">
        <Logo size="md" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }
              `}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-white"}`}
              />
              {item.name}
              {isActive && <div className="ml-auto h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" />}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-700/50 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-sm font-semibold text-white">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-slate-400">Premium User</p>
          </div>
        </div>
        <button className="flex w-full items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
