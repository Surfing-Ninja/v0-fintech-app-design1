"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/contexts/app-context"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/gamification/badge"
import { RewardPopup } from "@/components/gamification/reward-popup"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Coins, Flame, Star, Target, Gift } from "lucide-react"

export default function GamificationPage() {
  const { state, dispatch } = useApp()
  const [showRewardPopup, setShowRewardPopup] = useState(false)
  const [rewardMessage, setRewardMessage] = useState("")

  // Check for badge unlocks
  useEffect(() => {
    const expenseCount = state.transactions.filter((t) => t.type === "expense").length
    const incomeCount = state.transactions.filter((t) => t.type === "income").length

    // Unlock "First Steps" badge
    if (state.transactions.length >= 1) {
      const firstStepsBadge = state.badges.find((b) => b.id === "1")
      if (firstStepsBadge && !firstStepsBadge.unlocked) {
        dispatch({ type: "UNLOCK_BADGE", payload: "1" })
        setRewardMessage("🎯 First Steps badge unlocked! +50 coins")
        setShowRewardPopup(true)
        dispatch({ type: "UPDATE_STATS", payload: { coins: state.userStats.coins + 50 } })
      }
    }

    // Unlock "Tracker" badge
    if (expenseCount >= 5) {
      const trackerBadge = state.badges.find((b) => b.id === "2")
      if (trackerBadge && !trackerBadge.unlocked) {
        dispatch({ type: "UNLOCK_BADGE", payload: "2" })
        setRewardMessage("📊 Tracker badge unlocked! +100 coins")
        setShowRewardPopup(true)
        dispatch({ type: "UPDATE_STATS", payload: { coins: state.userStats.coins + 100 } })
      }
    }
  }, [state.transactions, state.badges, state.userStats.coins, dispatch])

  const currentLevel = state.userStats.level
  const nextLevelCoins = currentLevel * 500
  const progressToNextLevel = ((state.userStats.coins % nextLevelCoins) / nextLevelCoins) * 100

  const handleClaimDailyReward = () => {
    const dailyReward = 25
    dispatch({ type: "UPDATE_STATS", payload: { coins: state.userStats.coins + dailyReward } })
    setRewardMessage(`🎁 Daily reward claimed! +${dailyReward} coins`)
    setShowRewardPopup(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <div className="md:ml-64 pb-20 md:pb-0">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Rewards & Achievements</h1>
            <p className="text-muted-foreground">Track your progress and earn rewards for good financial habits</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Level & Progress */}
            <div className="glass-card rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Level {currentLevel}</h3>
                  <p className="text-sm text-muted-foreground">Financial Warrior</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress to Level {currentLevel + 1}</span>
                  <span className="text-foreground">{Math.round(progressToNextLevel)}%</span>
                </div>
                <Progress value={progressToNextLevel} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {nextLevelCoins - (state.userStats.coins % nextLevelCoins)} coins to next level
                </p>
              </div>
            </div>

            {/* Coins */}
            <div className="glass-card rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{state.userStats.coins}</h3>
                  <p className="text-sm text-muted-foreground">Total Coins</p>
                </div>
              </div>
              <Button
                onClick={handleClaimDailyReward}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-glow"
              >
                <Gift className="w-4 h-4 mr-2" />
                Claim Daily Reward
              </Button>
            </div>

            {/* Streak */}
            <div className="glass-card rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{state.userStats.currentStreak}</h3>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Longest streak: {state.userStats.longestStreak} days</p>
                <p className="mt-1">Keep adding transactions to maintain your streak!</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Trophy className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.badges.map((badge) => (
                <Badge
                  key={badge.id}
                  id={badge.id}
                  name={badge.name}
                  description={badge.description}
                  icon={badge.icon}
                  unlocked={badge.unlocked}
                  unlockedAt={badge.unlockedAt}
                />
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Target className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold text-foreground">Weekly Challenges</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Expense Tracker</h3>
                  <div className="text-sm text-primary font-medium">+200 coins</div>
                </div>
                <p className="text-muted-foreground mb-4">Add 10 expense transactions this week</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">
                      {Math.min(state.transactions.filter((t) => t.type === "expense").length, 10)}/10
                    </span>
                  </div>
                  <Progress
                    value={Math.min((state.transactions.filter((t) => t.type === "expense").length / 10) * 100, 100)}
                    className="h-2"
                  />
                </div>
              </div>

              <div className="glass-card rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Income Booster</h3>
                  <div className="text-sm text-secondary font-medium">+300 coins</div>
                </div>
                <p className="text-muted-foreground mb-4">Record 5 income sources this week</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">
                      {Math.min(state.transactions.filter((t) => t.type === "income").length, 5)}/5
                    </span>
                  </div>
                  <Progress
                    value={Math.min((state.transactions.filter((t) => t.type === "income").length / 5) * 100, 100)}
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reward Popup */}
      <RewardPopup isVisible={showRewardPopup} message={rewardMessage} onClose={() => setShowRewardPopup(false)} />
    </div>
  )
}
