"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Star, Calendar, Users, TrendingUp } from "lucide-react"

const agentData = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 4.8,
    appointments: 124,
    customers: 42,
    revenue: 12400,
    status: "Top Performer",
    monthlyTrend: [
      { week: "W1", appointments: 28, customers: 8 },
      { week: "W2", appointments: 31, customers: 10 },
      { week: "W3", appointments: 32, customers: 11 },
      { week: "W4", appointments: 33, customers: 13 },
    ],
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4.6,
    appointments: 98,
    customers: 35,
    revenue: 9800,
    status: "Good Performer",
    monthlyTrend: [
      { week: "W1", appointments: 22, customers: 7 },
      { week: "W2", appointments: 24, customers: 8 },
      { week: "W3", appointments: 26, customers: 9 },
      { week: "W4", appointments: 26, customers: 11 },
    ],
  },
  {
    id: 3,
    name: "Jennifer Lee",
    rating: 4.9,
    appointments: 156,
    customers: 58,
    revenue: 15600,
    status: "Exceptional",
    monthlyTrend: [
      { week: "W1", appointments: 35, customers: 12 },
      { week: "W2", appointments: 38, customers: 14 },
      { week: "W3", appointments: 41, customers: 16 },
      { week: "W4", appointments: 42, customers: 16 },
    ],
  },
]

export default function AgentsManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agent Management</h1>
          <p className="text-muted-foreground">Monitor agent performance and manage schedules</p>
        </div>
        <Button className="bg-primary">Export Report</Button>
      </div>

      {/* Agent Cards */}
      {agentData.map((agent) => (
        <Card key={agent.id} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
            <div>
              <h3 className="text-xl font-bold">{agent.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(agent.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">{agent.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-slate-700 rounded-lg">
              <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-muted-foreground">Total Appointments</p>
                <p className="text-2xl font-bold">{agent.appointments}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-slate-700 rounded-lg">
              <Users size={20} className="text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-xs text-muted-foreground">Customers</p>
                <p className="text-2xl font-bold">{agent.customers}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-slate-700 rounded-lg">
              <TrendingUp size={20} className="text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">${agent.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Agent Performance Chart */}
          <div>
            <h4 className="font-semibold mb-3">Monthly Performance Trend</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={agent.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" fill="#3b82f6" name="Appointments" />
                <Bar dataKey="customers" fill="#8b5cf6" name="New Customers" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <Button variant="outline">View Details</Button>
            <Button variant="outline">Manage Schedule</Button>
            <Button variant="ghost">Settings</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
