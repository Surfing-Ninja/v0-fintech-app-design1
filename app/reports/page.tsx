"use client"

import { useApp } from "@/contexts/app-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Download, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export default function ReportsPage() {
  const { state } = useApp()

  // Generate dummy monthly data
  const monthlyData = [
    { month: "Jan", income: 45000, expenses: 32000, savings: 13000 },
    { month: "Feb", income: 48000, expenses: 35000, savings: 13000 },
    { month: "Mar", income: 52000, expenses: 38000, savings: 14000 },
    { month: "Apr", income: 47000, expenses: 33000, savings: 14000 },
    { month: "May", income: 51000, expenses: 36000, savings: 15000 },
    { month: "Jun", income: 49000, expenses: 34000, savings: 15000 },
  ]

  // Category breakdown
  const categoryData = [
    { name: "Food & Dining", value: 12000, color: "#00d4ff" },
    { name: "Transportation", value: 8000, color: "#06b6d4" },
    { name: "Shopping", value: 6000, color: "#0891b2" },
    { name: "Bills & Utilities", value: 5000, color: "#0e7490" },
    { name: "Entertainment", value: 3000, color: "#155e75" },
  ]

  // Expense heatmap data (simplified)
  const heatmapData = [
    { day: "Mon", week1: 800, week2: 1200, week3: 900, week4: 1100 },
    { day: "Tue", week1: 600, week2: 800, week3: 700, week4: 900 },
    { day: "Wed", week1: 1000, week2: 1400, week3: 1100, week4: 1300 },
    { day: "Thu", week1: 700, week2: 900, week3: 800, week4: 1000 },
    { day: "Fri", week1: 1200, week2: 1600, week3: 1300, week4: 1500 },
    { day: "Sat", week1: 1500, week2: 1800, week3: 1600, week4: 1900 },
    { day: "Sun", week1: 900, week2: 1100, week3: 1000, week4: 1200 },
  ]

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const link = document.createElement("a")
    link.href =
      "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCA0NAo+PgpzdHJlYW0KQlQKL0YxIDEyIFRmCjcyIDcyMCBUZAooQ3JlZGVuY2UgRmluYW5jaWFsIFJlcG9ydCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNTggMDAwMDAgbiAKMDAwMDAwMDExNSAwMDAwMCBuIAowMDAwMDAwMjA3IDAwMDAwIG4gCjAwMDAwMDAzMDEgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgozNzAKJSVFT0Y="
    link.download = "credence-financial-report.pdf"
    link.click()
  }

  const handleDownloadExcel = () => {
    // Simulate Excel download
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Month,Income,Expenses,Savings\n" +
      monthlyData.map((row) => `${row.month},${row.income},${row.expenses},${row.savings}`).join("\n")

    const link = document.createElement("a")
    link.href = encodeURI(csvContent)
    link.download = "credence-financial-data.csv"
    link.click()
  }

  const currentMonth = new Date().toLocaleString("default", { month: "long" })
  const totalSpendThisMonth = categoryData.reduce((sum, cat) => sum + cat.value, 0)
  const highestCategory = categoryData.reduce((prev, current) => (prev.value > current.value ? prev : current))
  const savingsPercent = (
    (monthlyData[monthlyData.length - 1].savings / monthlyData[monthlyData.length - 1].income) *
    100
  ).toFixed(1)

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
                <h1 className="text-3xl font-bold text-white">Financial Reports</h1>
                <p className="text-slate-400 mt-1">Comprehensive analysis of your financial data</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleDownloadPDF}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  onClick={handleDownloadExcel}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Excel
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Total Spend This Month</p>
                        <p className="text-2xl font-bold text-white">₹{totalSpendThisMonth.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Highest Category</p>
                        <p className="text-lg font-bold text-white">{highestCategory.name}</p>
                        <p className="text-sm text-slate-400">₹{highestCategory.value.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Savings %</p>
                        <p className="text-2xl font-bold text-emerald-400">{savingsPercent}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Report Period</p>
                        <p className="text-lg font-bold text-white">{currentMonth} 2024</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Expense Chart */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Monthly Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                          <YAxis stroke="#6b7280" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                              backdropFilter: "blur(10px)",
                            }}
                          />
                          <Bar dataKey="income" fill="#00d4ff" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="savings" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Category Breakdown */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Expense Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                              backdropFilter: "blur(10px)",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {categoryData.map((entry, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-sm text-slate-300">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Expense Heatmap */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Daily Spending Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={heatmapData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            backdropFilter: "blur(10px)",
                          }}
                        />
                        <Line type="monotone" dataKey="week1" stroke="#00d4ff" strokeWidth={2} />
                        <Line type="monotone" dataKey="week2" stroke="#06b6d4" strokeWidth={2} />
                        <Line type="monotone" dataKey="week3" stroke="#0891b2" strokeWidth={2} />
                        <Line type="monotone" dataKey="week4" stroke="#0e7490" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  )
}
