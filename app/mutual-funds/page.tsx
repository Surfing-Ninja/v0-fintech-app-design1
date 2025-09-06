"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Plus, Eye, BarChart3, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface MutualFund {
  id: string
  name: string
  category: string
  currentValue: number
  invested: number
  returns: number
  returnsPercentage: number
  sipAmount: number
  sipDate: number
}

export default function MutualFundsPage() {
  const [funds] = useState<MutualFund[]>([
    {
      id: "1",
      name: "Axis Bluechip Fund",
      category: "Large Cap",
      currentValue: 125000,
      invested: 100000,
      returns: 25000,
      returnsPercentage: 25.0,
      sipAmount: 5000,
      sipDate: 10,
    },
    {
      id: "2",
      name: "Mirae Asset Emerging Bluechip",
      category: "Large & Mid Cap",
      currentValue: 87500,
      invested: 75000,
      returns: 12500,
      returnsPercentage: 16.67,
      sipAmount: 3000,
      sipDate: 15,
    },
    {
      id: "3",
      name: "Parag Parikh Flexi Cap",
      category: "Flexi Cap",
      currentValue: 156000,
      invested: 120000,
      returns: 36000,
      returnsPercentage: 30.0,
      sipAmount: 8000,
      sipDate: 5,
    },
  ])

  const totalInvested = funds.reduce((sum, fund) => sum + fund.invested, 0)
  const totalCurrentValue = funds.reduce((sum, fund) => sum + fund.currentValue, 0)
  const totalReturns = totalCurrentValue - totalInvested
  const totalReturnsPercentage = ((totalReturns / totalInvested) * 100).toFixed(2)

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
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Mutual Funds
                  </h1>
                  <p className="text-slate-400">Track your SIP investments and portfolio performance</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add SIP
              </Button>
            </div>

            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <PieChart className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">₹{totalCurrentValue.toLocaleString()}</p>
                      <p className="text-sm text-slate-400">Current Value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">₹{totalInvested.toLocaleString()}</p>
                      <p className="text-sm text-slate-400">Total Invested</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <ArrowUpRight className="w-8 h-8 text-emerald-400" />
                    <div>
                      <p className="text-2xl font-bold text-emerald-400">₹{totalReturns.toLocaleString()}</p>
                      <p className="text-sm text-slate-400">Total Returns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-8 h-8 text-yellow-400" />
                    <div>
                      <p className="text-2xl font-bold text-yellow-400">{totalReturnsPercentage}%</p>
                      <p className="text-sm text-slate-400">Overall Returns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mutual Funds List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Your SIP Investments</h2>

              {funds.map((fund) => (
                <Card
                  key={fund.id}
                  className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{fund.name}</h3>
                        <p className="text-sm text-slate-400">{fund.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">₹{fund.currentValue.toLocaleString()}</p>
                        <p
                          className={`text-sm flex items-center ${fund.returns >= 0 ? "text-emerald-400" : "text-red-400"}`}
                        >
                          {fund.returns >= 0 ? (
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          )}
                          {fund.returnsPercentage.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-400">Invested Amount</p>
                        <p className="text-white font-semibold">₹{fund.invested.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Returns</p>
                        <p className={`font-semibold ${fund.returns >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          ₹{fund.returns.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">SIP Amount</p>
                        <p className="text-white font-semibold">₹{fund.sipAmount.toLocaleString()}/month</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Progress to next SIP</span>
                        <span className="text-white">Next: {fund.sipDate}th</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50 bg-transparent"
                      >
                        Modify SIP
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
