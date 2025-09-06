"use client"

import type React from "react"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Settings,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Save,
  X,
  Bell,
  Globe,
  Camera,
} from "lucide-react"

export default function ProfilePage() {
  const { state, dispatch } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: state.userProfile.name,
    email: state.userProfile.email,
    phone: state.userProfile.phone,
  })

  const handleSaveProfile = () => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: editForm,
    })
    setIsEditing(false)
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        dispatch({
          type: "UPDATE_PROFILE",
          payload: { avatar: result },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCurrencyChange = (currency: string) => {
    dispatch({
      type: "UPDATE_PREFERENCES",
      payload: { currency },
    })
  }

  const totalBalance = state.userStats.totalIncome - state.userStats.totalExpenses
  const savingsRate =
    state.userStats.totalIncome > 0 ? ((totalBalance / state.userStats.totalIncome) * 100).toFixed(1) : "0"

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <div className="md:ml-64 pb-20 md:pb-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Profile & Settings</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="border-border hover:bg-card/20"
            >
              {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile & Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Photo Card */}
              <Card className="glass-card border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <User className="w-5 h-5" />
                    <span>Profile Photo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center overflow-hidden">
                      {state.userProfile.avatar ? (
                        <img
                          src={state.userProfile.avatar || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                      <Camera className="w-3 h-3 text-primary-foreground" />
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{state.userProfile.name}</h3>
                    <p className="text-sm text-muted-foreground">{state.userProfile.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">Member since {state.userProfile.memberSince}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card className="glass-card border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <User className="w-5 h-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-foreground">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="mt-1 bg-input border-border text-foreground"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-foreground">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="mt-1 bg-input border-border text-foreground"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-foreground">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="mt-1 bg-input border-border text-foreground"
                        />
                      </div>
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="text-foreground font-medium">{state.userProfile.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="text-foreground font-medium">{state.userProfile.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="text-foreground font-medium">{state.userProfile.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Member Since:</span>
                        <span className="text-foreground font-medium">{state.userProfile.memberSince}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Financial Summary */}
              <Card className="glass-card border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <CreditCard className="w-5 h-5" />
                    <span>Financial Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 glass-card rounded-lg">
                      <p className="text-2xl font-bold text-primary">₹{totalBalance.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Net Worth</p>
                    </div>
                    <div className="text-center p-4 glass-card rounded-lg">
                      <p className="text-2xl font-bold text-secondary">
                        ₹{state.userStats.totalIncome.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Income</p>
                    </div>
                    <div className="text-center p-4 glass-card rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{savingsRate}%</p>
                      <p className="text-sm text-muted-foreground">Savings Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Settings */}
            <div className="space-y-6">
              {/* App Settings */}
              <Card className="glass-card border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <Settings className="w-5 h-5" />
                    <span>App Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>{/* Placeholder for App Settings content */}</CardContent>
              </Card>

              {/* Preferences */}
              <Card className="glass-card border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <Globe className="w-5 h-5" />
                    <span>Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currency" className="text-foreground mb-2 block">
                      Currency
                    </Label>
                    <Select value={state.userPrefs.currency} onValueChange={handleCurrencyChange}>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-border/20">
                        <SelectItem value="INR" className="text-foreground hover:bg-card/20">
                          INR (₹)
                        </SelectItem>
                        <SelectItem value="USD" className="text-foreground hover:bg-card/20">
                          USD ($)
                        </SelectItem>
                        <SelectItem value="EUR" className="text-foreground hover:bg-card/20">
                          EUR (€)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card border-border/20">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-card/20 bg-transparent"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy & Security
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-card/20 bg-transparent"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Notification Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-card/20 bg-transparent"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                  </Button>
                  <Separator className="my-4 bg-border" />
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive border-destructive/30 hover:bg-destructive/10 bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
