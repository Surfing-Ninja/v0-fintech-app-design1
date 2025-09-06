"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { useApp } from "@/contexts/app-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Moon, Sun, Bell, DollarSign, Shield, Globe, Palette } from "lucide-react"

export default function SettingsPage() {
  const { state, dispatch } = useApp()
  const { theme, setTheme } = useTheme()
  const [dailyLimit, setDailyLimit] = useState("5000")
  const [notifications, setNotifications] = useState(true)
  const isDarkMode = theme === "dark"

  const handleThemeToggle = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  const handleNotificationToggle = () => {
    setNotifications(!notifications)
  }

  const handleDailyLimitChange = (value: string) => {
    setDailyLimit(value)
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
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-slate-400">Customize your Credence experience</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Appearance */}
              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Palette className="w-5 h-5" />
                    <span>Appearance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {isDarkMode ? (
                        <Moon className="w-5 h-5 text-slate-400" />
                      ) : (
                        <Sun className="w-5 h-5 text-yellow-500" />
                      )}
                      <div>
                        <Label className="text-white">Dark Mode</Label>
                        <p className="text-sm text-slate-400">Toggle between light and dark themes</p>
                      </div>
                    </div>
                    <Switch checked={isDarkMode} onCheckedChange={handleThemeToggle} />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Push Notifications</Label>
                      <p className="text-sm text-slate-400">Receive alerts for transactions and goals</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={handleNotificationToggle} />
                  </div>
                </CardContent>
              </Card>

              {/* Daily Spending Limit */}
              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <DollarSign className="w-5 h-5" />
                    <span>Daily Spending Limit</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Daily Limit (₹)</Label>
                    <Input
                      type="number"
                      value={dailyLimit}
                      onChange={(e) => handleDailyLimitChange(e.target.value)}
                      className="mt-2 bg-slate-700/50 border-slate-600 text-white"
                      placeholder="Enter daily spending limit"
                    />
                    <p className="text-sm text-slate-400 mt-1">Set a daily spending limit to control expenses</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                    Update Limit
                  </Button>
                </CardContent>
              </Card>

              {/* Currency & Region */}
              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Globe className="w-5 h-5" />
                    <span>Currency & Region</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Currency</Label>
                    <Select value={state.userPrefs.currency}>
                      <SelectTrigger className="mt-2 bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy & Security */}
              <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Shield className="w-5 h-5" />
                    <span>Privacy & Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="justify-start border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50 bg-transparent"
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50 bg-transparent"
                    >
                      Two-Factor Authentication
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50 bg-transparent"
                    >
                      Privacy Settings
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50 bg-transparent"
                    >
                      Data Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
