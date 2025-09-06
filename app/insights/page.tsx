"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/contexts/app-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, RefreshCw, TrendingUp, AlertTriangle, DollarSign, PieChart } from "lucide-react"

interface Insight {
  id: string
  title: string
  description: string
  type: "warning" | "tip" | "achievement" | "suggestion"
  priority: "high" | "medium" | "low"
}

export default function InsightsPage() {
  const { state } = useApp()
  const [insights, setInsights] = useState<Insight[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const mockInsights: Insight[] = [
    {
      id: "1",
      title: "Food spending increased by 20%",
      description: "Your food expenses have increased compared to last month. Consider meal planning to reduce costs.",
      type: "warning",
      priority: "high",
    },
    {
      id: "2",
      title: "Great job on entertainment savings!",
      description: "You've reduced entertainment spending by 15% this month. Keep up the good work!",
      type: "achievement",
      priority: "medium",
    },
    {
      id: "3",
      title: "Consider increasing your emergency fund",
      description: "Based on your expenses, aim for 6 months of emergency savings. You're currently at 3 months.",
      type: "suggestion",
      priority: "high",
    },
    {
      id: "4",
      title: "Optimal time to invest",
      description: "You have surplus funds this month. Consider investing in mutual funds for long-term growth.",
      type: "tip",
      priority: "medium",
    },
    {
      id: "5",
      title: "Transportation costs are stable",
      description: "Your transportation expenses are consistent with your budget. Well managed!",
      type: "achievement",
      priority: "low",
    },
    {
      id: "6",
      title: "Review subscription services",
      description: "You have multiple subscription services. Cancel unused ones to save ₹2,000/month.",
      type: "suggestion",
      priority: "high",
    },
  ]

  useEffect(() => {
    setInsights(mockInsights.slice(0, 4))
  }, [])

  const handleRefreshInsights = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Shuffle and get random insights
    const shuffled = [...mockInsights].sort(() => 0.5 - Math.random())
    setInsights(shuffled.slice(0, 4))
    setIsRefreshing(false)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return AlertTriangle
      case "tip":
        return Lightbulb
      case "achievement":
        return TrendingUp
      case "suggestion":
        return DollarSign
      default:
        return Lightbulb
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "tip":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30"
      case "achievement":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "suggestion":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      default:
        return "text-blue-400 bg-blue-500/20 border-blue-500/30"
    }
  }

  const totalBalance = state.userStats.totalIncome - state.userStats.totalExpenses
  const savingsRate =
    state.userStats.totalIncome > 0 ? ((totalBalance / state.userStats.totalIncome) * 100).toFixed(1) : "0"

  return (
    <>
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Insights
                  </h1>
                  <p className="text-slate-400">Personalized financial recommendations</p>
                </div>
              </div>
              <Button
                onClick={handleRefreshInsights}
                disabled={isRefreshing}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Analyzing..." : "Refresh"}
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-8 h-8 text-emerald-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">₹{totalBalance.toLocaleString()}</p>
                      <p className="text-sm text-slate-400">Net Worth</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <PieChart className="w-8 h-8 text-yellow-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{savingsRate}%</p>
                      <p className="text-sm text-slate-400">Savings Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {insights.filter((i) => i.priority === "high").length}
                      </p>
                      <p className="text-sm text-slate-400">High Priority</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insights.map((insight) => {
                const IconComponent = getInsightIcon(insight.type)
                const colorClasses = getInsightColor(insight.type)

                return (
                  <Card
                    key={insight.id}
                    className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${colorClasses}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{insight.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                insight.priority === "high"
                                  ? "bg-red-500/20 text-red-400"
                                  : insight.priority === "medium"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-green-500/20 text-green-400"
                              }`}
                            >
                              {insight.priority} priority
                            </span>
                            <span className="text-xs text-slate-500 capitalize">{insight.type}</span>
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 leading-relaxed">{insight.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
