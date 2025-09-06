"use client"

import type React from "react"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, TrendingUp, TrendingDown, Trash2, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

export default function InvestmentsPage() {
  const { state, dispatch } = useApp()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    amount: "",
  })

  const activeInvestments = state.investments.filter((inv) => inv.status === "active")
  const completedInvestments = state.investments.filter((inv) => inv.status === "completed")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.category || !formData.amount) return

    const newInvestment = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      amount: Number.parseFloat(formData.amount),
      currentValue: Number.parseFloat(formData.amount),
      change: 0,
      changePercent: 0,
      status: "active" as const,
    }

    dispatch({ type: "ADD_INVESTMENT", payload: newInvestment })
    setFormData({ name: "", category: "", amount: "" })
    setIsModalOpen(false)
  }

  const handleRemoveInvestment = (id: string) => {
    dispatch({ type: "REMOVE_INVESTMENT", payload: id })
  }

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
                <h1 className="text-3xl font-bold text-white">Investments</h1>
                <p className="text-slate-400 mt-1">Track and manage your investment portfolio</p>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Investment
              </Button>
            </div>

            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Total Invested</p>
                    <p className="text-2xl font-bold text-white">
                      ₹{state.investments.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Current Value</p>
                    <p className="text-2xl font-bold text-white">
                      ₹{state.investments.reduce((sum, inv) => sum + inv.currentValue, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Total Returns</p>
                    <p className="text-2xl font-bold text-emerald-400">
                      +₹{state.investments.reduce((sum, inv) => sum + inv.change, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Investments */}
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-semibold text-white mb-6">Current Investments</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Category</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">Amount Invested</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">Current Value</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">Returns %</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeInvestments.map((investment, index) => (
                      <motion.tr
                        key={investment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-slate-700/30 hover:bg-slate-700/20"
                      >
                        <td className="py-4 px-4">
                          <p className="font-medium text-white">{investment.name}</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full">
                            {investment.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right text-white">₹{investment.amount.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right text-white">₹{investment.currentValue.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right">
                          <span
                            className={`flex items-center justify-end ${
                              investment.changePercent >= 0 ? "text-emerald-400" : "text-red-400"
                            }`}
                          >
                            {investment.changePercent >= 0 ? (
                              <TrendingUp className="w-4 h-4 mr-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 mr-1" />
                            )}
                            {investment.changePercent >= 0 ? "+" : ""}
                            {investment.changePercent.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveInvestment(investment.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Past Investments */}
            {completedInvestments.length > 0 && (
              <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                <h2 className="text-xl font-semibold text-white mb-6">Past Investments</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Category</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">Amount Invested</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">Final Value</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">Returns %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedInvestments.map((investment) => (
                        <tr key={investment.id} className="border-b border-slate-700/30">
                          <td className="py-4 px-4">
                            <p className="font-medium text-slate-300">{investment.name}</p>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
                              {investment.category}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right text-slate-300">₹{investment.amount.toLocaleString()}</td>
                          <td className="py-4 px-4 text-right text-slate-300">
                            ₹{investment.currentValue.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className={`${investment.changePercent >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                              {investment.changePercent >= 0 ? "+" : ""}
                              {investment.changePercent.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Investment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="glass-card border-border/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">Add New Investment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-foreground">
                Investment Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., NIFTY 50 Index Fund"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 bg-input border-border text-foreground"
                required
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-foreground">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="mt-1 bg-input border-border text-foreground">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="glass-card border-border/20">
                  <SelectItem value="Mutual Fund">Mutual Fund</SelectItem>
                  <SelectItem value="ETF">ETF</SelectItem>
                  <SelectItem value="Stocks">Stocks</SelectItem>
                  <SelectItem value="Bonds">Bonds</SelectItem>
                  <SelectItem value="Crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount" className="text-foreground">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter investment amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="mt-1 bg-input border-border text-foreground"
                required
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 border-border text-muted-foreground hover:bg-card/20 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold"
              >
                Add Investment
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
