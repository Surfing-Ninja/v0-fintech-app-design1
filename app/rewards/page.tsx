"use client"

import { useApp } from "@/contexts/app-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Flame, Star, Target, Coins, Award, Calendar, TrendingUp } from "lucide-react"

export default function RewardsPage() {
  const { state } = useApp()

  const badges = [
    { name: "First Steps", description: "Added your first transaction", icon: Star, unlocked: true, rarity: "common" },
    { name: "Tracker", description: "Added 5+ expenses", icon: Target, unlocked: true, rarity: "common" },
    { name: "Saver", description: "Saved ₹10,000", icon: Coins, unlocked: true, rarity: "rare" },
    { name: "Streak Master", description: "7-day tracking streak", icon: Flame, unlocked: true, rarity: "rare" },
    {
      name: "Investment Pro",
      description: "Added first investment",
      icon: TrendingUp,
      unlocked: false,
      rarity: "epic",
    },
    {
      name: "Goal Crusher",
      description: "Completed a financial goal",
      icon: Trophy,
      unlocked: false,
      rarity: "legendary",
    },
  ]

  const weeklyChallenge = {
    name: "Expense Tracker",
    description: "Track expenses for 7 consecutive days",
    progress: 5,
    target: 7,
    reward: 50,
  }

  return (
    <>
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Rewards
                </h1>
                <p className="text-slate-400">Earn coins, unlock badges, and maintain streaks</p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{state.userStats.level}</p>
                      <p className="text-sm text-slate-400">Level</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                      <Coins className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{state.userStats.coins}</p>
                      <p className="text-sm text-slate-400">Coins</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center">
                      <Flame className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{state.userStats.currentStreak}</p>
                      <p className="text-sm text-slate-400">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{badges.filter((b) => b.unlocked).length}</p>
                      <p className="text-sm text-slate-400">Badges</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Challenge */}
            <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Calendar className="w-5 h-5" />
                  <span>Weekly Challenge</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-white">{weeklyChallenge.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">{weeklyChallenge.reward} coins</span>
                    </div>
                  </div>
                  <p className="text-slate-400 mb-4">{weeklyChallenge.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-white">
                        {weeklyChallenge.progress}/{weeklyChallenge.target}
                      </span>
                    </div>
                    <Progress value={(weeklyChallenge.progress / weeklyChallenge.target) * 100} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges Collection */}
            <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Badge Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        badge.unlocked
                          ? badge.rarity === "legendary"
                            ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50 shadow-lg shadow-yellow-500/20"
                            : badge.rarity === "epic"
                              ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20"
                              : badge.rarity === "rare"
                                ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/50"
                                : "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/50"
                          : "bg-slate-700/30 border-slate-600/50"
                      }`}
                    >
                      <div className="text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                            badge.unlocked
                              ? badge.rarity === "legendary"
                                ? "bg-gradient-to-r from-yellow-500/30 to-orange-500/30"
                                : badge.rarity === "epic"
                                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30"
                                  : badge.rarity === "rare"
                                    ? "bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
                                    : "bg-gradient-to-r from-green-500/30 to-emerald-500/30"
                              : "bg-slate-600/30"
                          }`}
                        >
                          <badge.icon
                            className={`w-8 h-8 ${
                              badge.unlocked
                                ? badge.rarity === "legendary"
                                  ? "text-yellow-400"
                                  : badge.rarity === "epic"
                                    ? "text-purple-400"
                                    : badge.rarity === "rare"
                                      ? "text-blue-400"
                                      : "text-green-400"
                                : "text-slate-500"
                            }`}
                          />
                        </div>
                        <h3 className={`font-semibold mb-1 ${badge.unlocked ? "text-white" : "text-slate-400"}`}>
                          {badge.name}
                        </h3>
                        <p className="text-xs text-slate-400 mb-2">{badge.description}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            badge.rarity === "legendary"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : badge.rarity === "epic"
                                ? "bg-purple-500/20 text-purple-400"
                                : badge.rarity === "rare"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {badge.rarity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}
