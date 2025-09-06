"use client"

import { useApp } from "@/contexts/app-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface SettingsToggleProps {
  id: string
  label: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function SettingsToggle({ id, label, description, checked, onCheckedChange }: SettingsToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 glass-card rounded-lg">
      <div className="space-y-1">
        <Label htmlFor={id} className="text-base font-medium text-foreground cursor-pointer">
          {label}
        </Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

export function SettingsSection() {
  const { state, dispatch } = useApp()

  const handleDarkModeToggle = (checked: boolean) => {
    dispatch({
      type: "UPDATE_PREFERENCES",
      payload: { darkMode: checked },
    })
    // Apply theme change to document
    if (checked) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleNotificationsToggle = (checked: boolean) => {
    dispatch({
      type: "UPDATE_PREFERENCES",
      payload: { notifications: checked },
    })
  }

  return (
    <div className="space-y-4">
      <SettingsToggle
        id="dark-mode"
        label="Dark Mode"
        description="Use dark theme for better viewing in low light"
        checked={state.userPrefs.darkMode}
        onCheckedChange={handleDarkModeToggle}
      />

      <SettingsToggle
        id="notifications"
        label="Push Notifications"
        description="Receive notifications about insights and achievements"
        checked={state.userPrefs.notifications}
        onCheckedChange={handleNotificationsToggle}
      />
    </div>
  )
}
