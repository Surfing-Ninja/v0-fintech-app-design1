"use client"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, Target, Calendar, TrendingUp, Trophy, Flame, Star } from "lucide-react"

interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  priority: "high" | "medium" | "low"
}

export default function GoalsPage() {
  const { state } = useApp()
  const [goals] = useState<Goal[]>([
    {
      id: "1",
      title: "Emergency Fund",
      targetAmount: 100000,
      currentAmount: 45000,
      deadline: "2024-12-31",
      category: "Safety",
      priority: "high",
    },
    {
      id: "2",
      title: "Vacation to Japan",
      targetAmount: 150000,
      currentAmount: 32000,
      deadline: "2024-08-15",
      category: "Travel",
      priority: "medium",
    },
    {
      id: "3",
      title: "New Laptop",
      targetAmount: 80000,
      currentAmount: 65000,
      deadline: "2024-06-30",
      category: "Tech",
      priority: "low",
    },
  ])

  const achievements = [
    { name: "Goal Setter", description: "Created your first goal", icon: Target, unlocked: true },
    { name: "Consistent Saver", description: "7-day saving streak", icon: Flame, unlocked: true },
    { name: "Milestone Master", description: "Reached 50% of a goal", icon: Star, unlocked: true },
    { name: "Goal Crusher", description: "Completed your first goal", icon: Trophy, unlocked: false },
  ]

  return (
    <>
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Smart Goals
                </h1>
                <p className="text-slate-400 mt-1">Track your financial milestones and achievements</p>
              </div>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Goal
              </Button>
            </div>

            {/* Gamification Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{state.userStats.level}</p>
                    <p className="text-sm text-slate-400">Current Level</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{state.userStats.currentStreak}</p>
                    <p className="text-sm text-slate-400">Day Streak</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{goals.length}</p>
                    <p className="text-sm text-slate-400">Active Goals</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">67%</p>
                    <p className="text-sm text-slate-400">Avg Progress</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {goals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100
                const daysLeft = Math.ceil(
                  (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <div
                    key={goal.id}
                    className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{goal.title}</h3>
                        <p className="text-sm text-slate-400">{goal.category}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          goal.priority === "high"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : goal.priority === "medium"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                              : "bg-green-500/20 text-green-400 border border-green-500/30"
                        }`}
                      >
                        {goal.priority} priority
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-white font-medium">{progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-slate-400">Current / Target</p>
                          <p className="text-white font-semibold">
                            ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-400">Days left</p>
                          <p className="text-white font-semibold flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {daysLeft}
                          </p>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                        Add Money
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Achievements */}
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30"
                        : "bg-slate-700/30 border-slate-600/50"
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                          achievement.unlocked
                            ? "bg-gradient-to-r from-yellow-500/30 to-orange-500/30"
                            : "bg-slate-600/30"
                        }`}
                      >
                        <achievement.icon
                          className={`w-8 h-8 ${achievement.unlocked ? "text-yellow-400" : "text-slate-500"}`}
                        />
                      </div>
                      <h3 className={`font-semibold mb-1 ${achievement.unlocked ? "text-white" : "text-slate-400"}`}>
                        {achievement.name}
                      </h3>
                      <p className="text-xs text-slate-400">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
