"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
          <CardHeader className="text-center space-y-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <h1 className="text-3xl font-bold text-white">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  CREDENCE Premium
                </span>
              </h1>
              <p className="text-sm text-slate-300 mt-2">Finance Simplified. Discipline Gamified.</p>
            </motion.div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-700/50 border border-slate-600/50">
                <TabsTrigger
                  value="login"
                  className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-slate-600/50"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-slate-600/50"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white font-medium">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white font-medium">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      className="bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
