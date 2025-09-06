"use client"

import { useApp } from "@/contexts/app-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Coins, Flame, Star } from "lucide-react"

export function ProfileCard() {
  const { state } = useApp()

  const unlockedBadges = state.badges.filter((badge) => badge.unlocked)
  const completionRate = Math.round((unlockedBadges.length / state.badges.length) * 100)

  return (
    <div className="glass-card rounded-lg p-6">
      <div className="flex items-center space-x-6 mb-6">
        {/* Avatar */}
        <Avatar className="w-20 h-20 border-2 border-primary/30">
          <AvatarImage src="/professional-avatar.png" alt="Profile" />
          <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-2xl font-bold">
            JD
          </AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground mb-1">John Doe</h2>
          <p className="text-muted-foreground mb-2">john.doe@example.com</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Level {state.userStats.level}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">{unlockedBadges.length} badges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 glass-card rounded-lg">
          <Coins className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-lg font-bold text-foreground">{state.userStats.coins}</p>
          <p className="text-xs text-muted-foreground">Coins</p>
        </div>

        <div className="text-center p-3 glass-card rounded-lg">
          <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <p className="text-lg font-bold text-foreground">{state.userStats.currentStreak}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>

        <div className="text-center p-3 glass-card rounded-lg">
          <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-lg font-bold text-foreground">{completionRate}%</p>
          <p className="text-xs text-muted-foreground">Completion</p>
        </div>

        <div className="text-center p-3 glass-card rounded-lg">
          <Star className="w-6 h-6 text-secondary mx-auto mb-2" />
          <p className="text-lg font-bold text-foreground">{state.transactions.length}</p>
          <p className="text-xs text-muted-foreground">Transactions</p>
        </div>
      </div>

      {/* Recent Badges */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Recent Achievements</h3>
        <div className="flex flex-wrap gap-2">
          {unlockedBadges.slice(-3).map((badge) => (
            <Badge
              key={badge.id}
              variant="secondary"
              className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
            >
              {badge.icon} {badge.name}
            </Badge>
          ))}
          {unlockedBadges.length === 0 && (
            <p className="text-sm text-muted-foreground">No achievements yet. Keep using the app to unlock badges!</p>
          )}
        </div>
      </div>
    </div>
  )
}
