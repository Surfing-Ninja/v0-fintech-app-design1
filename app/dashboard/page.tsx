"use client"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Chart } from "@/components/dashboard/chart"
import { TransactionModal } from "@/components/modals/transaction-modal"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, TrendingDown, PiggyBank, Coins, Target, Zap } from "lucide-react"

export default function DashboardPage() {
  const { state } = useApp()
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income")

  const handleAddTransaction = (type: "income" | "expense") => {
    setTransactionType(type)
    setIsTransactionModalOpen(true)
  }

  // Calculate recent transactions for chart
  const recentTransactions = state.transactions.slice(-7)
  const chartData = recentTransactions.map((transaction, index) => ({
    day: `Day ${index + 1}`,
    income: transaction.type === "income" ? transaction.amount : 0,
    expense: transaction.type === "expense" ? transaction.amount : 0,
  }))

  const totalBalance = state.userStats.totalIncome - state.userStats.totalExpenses

  return (
    <>
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="p-6 space-y-6">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-teal-600/10 border border-slate-700/50 p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5 backdrop-blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Welcome back, John!</h1>
                    <p className="text-slate-400 text-lg">Here's your financial overview</p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-2">
                        <Coins className="w-8 h-8 text-yellow-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">{state.userStats.coins}</p>
                      <p className="text-xs text-slate-400">Coins</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-2">
                        <Zap className="w-8 h-8 text-purple-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">Level {state.userStats.level}</p>
                      <p className="text-sm text-cyan-400">Current</p>
                    </div>
                  </div>
                </div>

                {/* Net Worth Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                      <h3 className="text-slate-400 text-sm font-medium mb-2">Net Worth</h3>
                      <p className="text-3xl font-bold text-white mb-1">
                        ₹{(totalBalance + state.userStats.totalInvestments).toLocaleString()}
                      </p>
                      <p className="text-sm text-emerald-400">+12.5% from last month</p>
                    </div>
                  </div>
                  <div>
                    <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                      <h3 className="text-slate-400 text-sm font-medium mb-2">Streak</h3>
                      <p className="text-3xl font-bold text-white mb-1">{state.userStats.currentStreak}</p>
                      <p className="text-sm text-cyan-400">days active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Cash Balance"
                value={totalBalance}
                change={totalBalance > 0 ? 12.5 : -5.2}
                icon={PiggyBank}
                color="primary"
              />
              <StatsCard
                title="Total Income"
                value={state.userStats.totalIncome}
                change={8.2}
                icon={TrendingUp}
                color="success"
              />
              <StatsCard
                title="Total Expenses"
                value={state.userStats.totalExpenses}
                change={-3.1}
                icon={TrendingDown}
                color="destructive"
              />
              <StatsCard
                title="Investments"
                value={state.userStats.totalInvestments}
                change={5.7}
                icon={Target}
                color="secondary"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => handleAddTransaction("income")}
                className="h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Income
              </Button>
              <Button
                onClick={() => handleAddTransaction("expense")}
                className="h-14 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold rounded-xl border border-slate-600/50"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Expense
              </Button>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Chart title="Recent Activity" data={chartData} type="bar" />
              <Chart
                title="Expense Categories"
                data={[
                  { name: "Food", value: 2400, color: "#10b981" },
                  { name: "Transport", value: 1200, color: "#06b6d4" },
                  { name: "Entertainment", value: 800, color: "#f59e0b" },
                  { name: "Shopping", value: 1600, color: "#ef4444" },
                ]}
                type="pie"
              />
            </div>

            {/* Recent Transactions */}
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Transactions</h3>
              {state.transactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-400 mb-4">No transactions yet</p>
                  <Button
                    onClick={() => handleAddTransaction("income")}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    Add Your First Transaction
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {state.transactions
                    .slice(-5)
                    .reverse()
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              transaction.type === "income"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {transaction.type === "income" ? (
                              <TrendingUp className="w-6 h-6" />
                            ) : (
                              <TrendingDown className="w-6 h-6" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white">{transaction.description}</p>
                            <p className="text-sm text-slate-400">{transaction.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold text-lg ${
                              transaction.type === "income" ? "text-emerald-400" : "text-red-400"
                            }`}
                          >
                            {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-400">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        type={transactionType}
      />
    </>
  )
}
