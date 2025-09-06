"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

// Types
export interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  category: string
  description: string
  date: string
}

export interface Investment {
  id: string
  name: string
  category: string
  amount: number
  currentValue: number
  change: number
  changePercent: number
  status: "active" | "completed"
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  date: string
  read: boolean
}

export interface Reminder {
  id: string
  title: string
  date: string
  category: string
  completed: boolean
}

export interface UserStats {
  totalIncome: number
  totalExpenses: number
  totalInvestments: number
  currentStreak: number
  longestStreak: number
  coins: number
  level: number
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  avatar: string
  memberSince: string
}

export interface AppState {
  transactions: Transaction[]
  investments: Investment[]
  badges: Badge[]
  notifications: Notification[]
  reminders: Reminder[]
  userStats: UserStats
  userProfile: UserProfile
  userPrefs: {
    darkMode: boolean
    notifications: boolean
    currency: string
  }
}

// Initial state
const initialState: AppState = {
  transactions: [],
  investments: [
    {
      id: "1",
      name: "NIFTY 50 Index Fund",
      category: "Mutual Fund",
      amount: 50000,
      currentValue: 52500,
      change: 2500,
      changePercent: 5.0,
      status: "active",
    },
    {
      id: "2",
      name: "Tech Stocks ETF",
      category: "ETF",
      amount: 30000,
      currentValue: 28500,
      change: -1500,
      changePercent: -5.0,
      status: "active",
    },
    {
      id: "3",
      name: "Gold ETF",
      category: "ETF",
      amount: 25000,
      currentValue: 26800,
      change: 1800,
      changePercent: 7.2,
      status: "completed",
    },
  ],
  notifications: [
    {
      id: "1",
      title: "Bill Due Tomorrow",
      message: "Your electricity bill of ₹2,500 is due tomorrow",
      type: "warning",
      date: new Date().toISOString(),
      read: false,
    },
    {
      id: "2",
      title: "Daily Spending Limit",
      message: "You've crossed your daily spending limit of ₹1,000",
      type: "error",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: "3",
      title: "Goal Progress Updated",
      message: "You're 75% closer to your savings goal!",
      type: "success",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ],
  reminders: [
    {
      id: "1",
      title: "Electricity Bill",
      date: "2024-01-07",
      category: "Bills",
      completed: false,
    },
    {
      id: "2",
      title: "Credit Card Payment",
      date: "2024-01-12",
      category: "Bills",
      completed: false,
    },
    {
      id: "3",
      title: "Investment Review",
      date: "2024-01-15",
      category: "Investment",
      completed: false,
    },
  ],
  badges: [
    {
      id: "1",
      name: "First Steps",
      description: "Added your first transaction",
      icon: "🎯",
      unlocked: false,
    },
    {
      id: "2",
      name: "Tracker",
      description: "Added 5+ expenses",
      icon: "📊",
      unlocked: false,
    },
    {
      id: "3",
      name: "Investor",
      description: "Added your first investment",
      icon: "💎",
      unlocked: true,
      unlockedAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Saver",
      description: "Maintained positive balance for 7 days",
      icon: "💰",
      unlocked: false,
    },
    {
      id: "5",
      name: "Streak Master",
      description: "Achieved 10-day transaction streak",
      icon: "🔥",
      unlocked: false,
    },
    {
      id: "6",
      name: "Budget Boss",
      description: "Stayed under budget for a month",
      icon: "👑",
      unlocked: false,
    },
  ],
  userStats: {
    totalIncome: 0,
    totalExpenses: 0,
    totalInvestments: 82500,
    currentStreak: 3,
    longestStreak: 7,
    coins: 150,
    level: 2,
  },
  userProfile: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    avatar: "/professional-avatar.png",
    memberSince: "January 2024",
  },
  userPrefs: {
    darkMode: true,
    notifications: true,
    currency: "INR",
  },
}

// Action types
type AppAction =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "ADD_INVESTMENT"; payload: Investment }
  | { type: "REMOVE_INVESTMENT"; payload: string }
  | { type: "ADD_REMINDER"; payload: Reminder }
  | { type: "REMOVE_REMINDER"; payload: string }
  | { type: "TOGGLE_REMINDER"; payload: string }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "UPDATE_STATS"; payload: Partial<UserStats> }
  | { type: "UNLOCK_BADGE"; payload: string }
  | { type: "UPDATE_PREFERENCES"; payload: Partial<AppState["userPrefs"]> }
  | { type: "UPDATE_PROFILE"; payload: Partial<UserProfile> }
  | { type: "LOAD_STATE"; payload: AppState }

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_TRANSACTION":
      const newTransactions = [...state.transactions, action.payload]
      const updatedStats = {
        ...state.userStats,
        totalIncome: newTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0),
        totalExpenses: newTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0),
        coins: state.userStats.coins + 10,
        currentStreak: state.userStats.currentStreak + 1,
        longestStreak: Math.max(state.userStats.longestStreak, state.userStats.currentStreak + 1),
      }

      // Level up logic
      const newLevel = Math.floor(updatedStats.coins / 500) + 1
      if (newLevel > state.userStats.level) {
        updatedStats.level = newLevel
      }

      const newNotification: Notification = {
        id: Date.now().toString(),
        title: `${action.payload.type === "income" ? "Income" : "Expense"} Added`,
        message: `₹${action.payload.amount} ${action.payload.type === "income" ? "received" : "spent"} on ${action.payload.category}`,
        type: "success",
        date: new Date().toISOString(),
        read: false,
      }

      return {
        ...state,
        transactions: newTransactions,
        userStats: updatedStats,
        notifications: [newNotification, ...state.notifications],
      }

    case "ADD_INVESTMENT":
      const investmentNotification: Notification = {
        id: Date.now().toString(),
        title: "Investment Added",
        message: `New investment in ${action.payload.name} for ₹${action.payload.amount.toLocaleString()}`,
        type: "success",
        date: new Date().toISOString(),
        read: false,
      }

      return {
        ...state,
        investments: [...state.investments, action.payload],
        notifications: [investmentNotification, ...state.notifications],
      }

    case "REMOVE_INVESTMENT":
      return {
        ...state,
        investments: state.investments.filter((inv) => inv.id !== action.payload),
      }

    case "ADD_REMINDER":
      const reminderNotification: Notification = {
        id: Date.now().toString(),
        title: "Reminder Added",
        message: `New reminder: ${action.payload.title} on ${new Date(action.payload.date).toLocaleDateString()}`,
        type: "info",
        date: new Date().toISOString(),
        read: false,
      }

      return {
        ...state,
        reminders: [...state.reminders, action.payload],
        notifications: [reminderNotification, ...state.notifications],
      }

    case "REMOVE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.filter((reminder) => reminder.id !== action.payload),
      }

    case "TOGGLE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.map((reminder) =>
          reminder.id === action.payload ? { ...reminder, completed: !reminder.completed } : reminder,
        ),
      }

    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload ? { ...notification, read: true } : notification,
        ),
      }

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      }

    case "UPDATE_STATS":
      const newStats = { ...state.userStats, ...action.payload }
      // Update level based on coins
      const levelFromCoins = Math.floor(newStats.coins / 500) + 1
      if (levelFromCoins > newStats.level) {
        newStats.level = levelFromCoins
      }

      return {
        ...state,
        userStats: newStats,
      }

    case "UNLOCK_BADGE":
      return {
        ...state,
        badges: state.badges.map((badge) =>
          badge.id === action.payload ? { ...badge, unlocked: true, unlockedAt: new Date().toISOString() } : badge,
        ),
      }

    case "UPDATE_PREFERENCES":
      return {
        ...state,
        userPrefs: { ...state.userPrefs, ...action.payload },
      }

    case "UPDATE_PROFILE":
      return {
        ...state,
        userProfile: { ...state.userProfile, ...action.payload },
      }

    case "LOAD_STATE":
      return action.payload

    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("credence-app-state")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        dispatch({ type: "LOAD_STATE", payload: parsedState })
      } catch (error) {
        console.error("Failed to load saved state:", error)
      }
    }
  }, [])

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem("credence-app-state", JSON.stringify(state))
  }, [state])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// Hook
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
