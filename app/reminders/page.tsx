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
import { Calendar, Plus, Trash2, Check, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function RemindersPage() {
  const { state, dispatch } = useApp()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "",
  })

  const upcomingReminders = state.reminders.filter((r) => !r.completed && new Date(r.date) >= new Date())
  const completedReminders = state.reminders.filter((r) => r.completed)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.date || !formData.category) return

    const newReminder = {
      id: Date.now().toString(),
      title: formData.title,
      date: formData.date,
      category: formData.category,
      completed: false,
    }

    dispatch({ type: "ADD_REMINDER", payload: newReminder })
    setFormData({ title: "", date: "", category: "" })
    setIsModalOpen(false)
  }

  const handleToggleReminder = (id: string) => {
    dispatch({ type: "TOGGLE_REMINDER", payload: id })
  }

  const handleRemoveReminder = (id: string) => {
    dispatch({ type: "REMOVE_REMINDER", payload: id })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Bills":
        return "💳"
      case "Investment":
        return "📈"
      case "Health":
        return "🏥"
      case "Personal":
        return "👤"
      default:
        return "📝"
    }
  }

  const getDaysUntil = (date: string) => {
    const today = new Date()
    const reminderDate = new Date(date)
    const diffTime = reminderDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
                <h1 className="text-3xl font-bold text-white">Reminders</h1>
                <p className="text-slate-400 mt-1">Stay on top of your financial commitments</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex bg-slate-800/50 rounded-lg p-1">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-slate-700 text-white" : "text-slate-400"}
                  >
                    List
                  </Button>
                  <Button
                    variant={viewMode === "calendar" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("calendar")}
                    className={viewMode === "calendar" ? "bg-slate-700 text-white" : "text-slate-400"}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    Calendar
                  </Button>
                </div>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reminder
                </Button>
              </div>
            </div>

            {viewMode === "list" ? (
              <>
                {/* Upcoming Reminders */}
                <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-400" />
                    Upcoming Reminders
                  </h2>
                  {upcomingReminders.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                        <Clock className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-400 mb-4">No upcoming reminders</p>
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                      >
                        Add Your First Reminder
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {upcomingReminders
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .map((reminder, index) => {
                          const daysUntil = getDaysUntil(reminder.date)
                          return (
                            <motion.div
                              key={reminder.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors"
                            >
                              <div className="flex items-center space-x-4">
                                <div className="text-2xl">{getCategoryIcon(reminder.category)}</div>
                                <div>
                                  <p className="font-medium text-white">{reminder.title}</p>
                                  <div className="flex items-center space-x-4 mt-1">
                                    <p className="text-sm text-slate-400">
                                      {new Date(reminder.date).toLocaleDateString()}
                                    </p>
                                    <span className="px-2 py-1 bg-slate-600/50 text-slate-300 text-xs rounded-full">
                                      {reminder.category}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    daysUntil === 0
                                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                      : daysUntil === 1
                                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  }`}
                                >
                                  {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleToggleReminder(reminder.id)}
                                  className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveReminder(reminder.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </motion.div>
                          )
                        })}
                    </div>
                  )}
                </div>

                {/* Completed Reminders */}
                {completedReminders.length > 0 && (
                  <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <Check className="w-5 h-5 mr-2 text-emerald-400" />
                      Completed Reminders
                    </h2>
                    <div className="space-y-3">
                      {completedReminders.map((reminder) => (
                        <div
                          key={reminder.id}
                          className="flex items-center justify-between p-4 bg-slate-700/20 rounded-lg opacity-75"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl opacity-50">{getCategoryIcon(reminder.category)}</div>
                            <div>
                              <p className="font-medium text-slate-300 line-through">{reminder.title}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <p className="text-sm text-slate-500">{new Date(reminder.date).toLocaleDateString()}</p>
                                <span className="px-2 py-1 bg-slate-600/30 text-slate-400 text-xs rounded-full">
                                  {reminder.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold">
                              Completed
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveReminder(reminder.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Calendar View */
              <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                <h2 className="text-xl font-semibold text-white mb-6">Calendar View</h2>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-400 mb-4">Calendar view coming soon!</p>
                  <p className="text-sm text-slate-500">
                    This feature will show your reminders in a visual calendar format
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Reminder Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="glass-card border-border/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">Add New Reminder</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-foreground">
                Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Electricity Bill Payment"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 bg-input border-border text-foreground"
                required
              />
            </div>
            <div>
              <Label htmlFor="date" className="text-foreground">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                  <SelectItem value="Bills">Bills</SelectItem>
                  <SelectItem value="Investment">Investment</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                </SelectContent>
              </Select>
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
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
              >
                Add Reminder
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
