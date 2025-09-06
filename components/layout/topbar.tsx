"use client"
import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Bell, Search, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function Topbar() {
  const { state, dispatch } = useApp()
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = state?.notifications || []
  const unreadCount = notifications.filter((n) => !n.read).length
  const userProfile = state?.userProfile || { name: "John Doe", avatar: "" }

  const handleNotificationClick = (notificationId: string) => {
    dispatch({ type: "MARK_NOTIFICATION_READ", payload: notificationId })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return "⚠️"
      case "error":
        return "🚨"
      case "success":
        return "✅"
      default:
        return "ℹ️"
    }
  }

  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50 flex items-center justify-between px-6 relative">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions, goals..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5 text-slate-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center font-semibold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50"
              >
                <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4 text-slate-400" />
                  </Button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-700/50 flex items-center justify-center">
                        <Bell className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-slate-400">No notifications yet</p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {notifications.slice(0, 10).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                            notification.read
                              ? "bg-slate-700/30 hover:bg-slate-700/50"
                              : "bg-slate-600/30 hover:bg-slate-600/50 border-l-4 border-cyan-500"
                          }`}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">{notification.title}</p>
                              <p className="text-xs text-slate-300 mt-1">{notification.message}</p>
                              <p className="text-xs text-slate-400 mt-1">
                                {new Date(notification.date).toLocaleString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 mt-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-px bg-slate-700/50" />

        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center overflow-hidden">
            {userProfile.avatar ? (
              <img
                src={userProfile.avatar || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-4 w-4 text-white" />
            )}
          </div>
          <span className="text-sm text-slate-300">{userProfile.name}</span>
        </Button>
      </div>
    </header>
  )
}
