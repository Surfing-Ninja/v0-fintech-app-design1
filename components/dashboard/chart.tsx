"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface ChartProps {
  title: string
  data: any[]
  type: "bar" | "pie"
}

export function Chart({ title, data, type }: ChartProps) {
  if (type === "bar") {
    return (
      <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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
              <Bar dataKey="income" fill="#00FFB2" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="#ff4d4d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
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
        {data.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-slate-300">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
