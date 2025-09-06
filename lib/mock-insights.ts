export interface Insight {
  id: string
  type: "tip" | "warning" | "opportunity" | "achievement"
  title: string
  description: string
  action?: string
  priority: "high" | "medium" | "low"
  category: "spending" | "saving" | "investing" | "budgeting"
}

export const mockInsights: Insight[] = [
  {
    id: "1",
    type: "tip",
    title: "Optimize Your Food Spending",
    description:
      "You spent 23% more on food this month compared to last month. Consider meal planning to reduce expenses by up to ₹3,000.",
    action: "Set a food budget",
    priority: "medium",
    category: "spending",
  },
  {
    id: "2",
    type: "opportunity",
    title: "Investment Opportunity",
    description:
      "Based on your income pattern, you could invest an additional ₹5,000 monthly in SIP without affecting your lifestyle.",
    action: "Start new SIP",
    priority: "high",
    category: "investing",
  },
  {
    id: "3",
    type: "warning",
    title: "High Entertainment Expenses",
    description:
      "Your entertainment spending is 40% above the recommended 10% of income. Consider setting limits to improve savings.",
    action: "Set entertainment budget",
    priority: "high",
    category: "budgeting",
  },
  {
    id: "4",
    type: "achievement",
    title: "Great Savings Streak!",
    description: "You've successfully saved money for 3 consecutive months. Keep up the excellent work!",
    priority: "low",
    category: "saving",
  },
  {
    id: "5",
    type: "tip",
    title: "Emergency Fund Goal",
    description:
      "You're 60% towards your emergency fund goal. Consider automating ₹2,000 monthly transfers to reach it faster.",
    action: "Set up auto-transfer",
    priority: "medium",
    category: "saving",
  },
  {
    id: "6",
    type: "opportunity",
    title: "Tax Saving Opportunity",
    description: "You can save up to ₹46,800 in taxes by investing ₹1.5L in ELSS funds before March 31st.",
    action: "Explore ELSS funds",
    priority: "high",
    category: "investing",
  },
  {
    id: "7",
    type: "tip",
    title: "Subscription Audit",
    description: "You have 8 active subscriptions totaling ₹2,400/month. Cancel unused ones to save ₹800 monthly.",
    action: "Review subscriptions",
    priority: "medium",
    category: "spending",
  },
  {
    id: "8",
    type: "warning",
    title: "Credit Card Usage Alert",
    description: "Your credit utilization is at 78%. Keep it below 30% to maintain a healthy credit score.",
    action: "Pay down balance",
    priority: "high",
    category: "budgeting",
  },
  {
    id: "9",
    type: "opportunity",
    title: "Cashback Optimization",
    description: "Switch to a cashback credit card for your grocery spending to earn ₹500+ monthly rewards.",
    action: "Compare credit cards",
    priority: "low",
    category: "spending",
  },
  {
    id: "10",
    type: "tip",
    title: "Retirement Planning",
    description:
      "Starting a ₹3,000 monthly SIP now could grow to ₹2.5 crores by retirement. Time is your biggest asset.",
    action: "Start retirement SIP",
    priority: "medium",
    category: "investing",
  },
  {
    id: "11",
    type: "achievement",
    title: "Budget Champion",
    description: "You've stayed within budget for 2 months straight. Your financial discipline is paying off!",
    priority: "low",
    category: "budgeting",
  },
  {
    id: "12",
    type: "warning",
    title: "Irregular Income Pattern",
    description: "Your income varies by 30% month-to-month. Consider building a larger emergency fund for stability.",
    action: "Increase emergency fund",
    priority: "medium",
    category: "saving",
  },
]

export function getRandomInsights(count = 6): Insight[] {
  const shuffled = [...mockInsights].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function getInsightsByPriority(priority: "high" | "medium" | "low"): Insight[] {
  return mockInsights.filter((insight) => insight.priority === priority)
}

export function getInsightsByCategory(category: string): Insight[] {
  return mockInsights.filter((insight) => insight.category === category)
}
