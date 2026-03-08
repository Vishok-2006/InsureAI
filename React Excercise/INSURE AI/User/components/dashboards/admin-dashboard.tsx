"use client"

import { BarChart3, Users, AlertCircle, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const agentStats = [
    { name: "Sarah Johnson", appointments: 24, rating: 4.8, customers: 42 },
    { name: "Mike Chen", appointments: 19, rating: 4.6, customers: 35 },
    { name: "Jennifer Lee", appointments: 31, rating: 4.9, customers: 58 },
    { name: "David Wilson", appointments: 15, rating: 4.4, customers: 28 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and team performance</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:shadow-lg">View Reports</Button>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Total Appointments</p>
              <p className="text-3xl font-bold mt-1">425</p>
            </div>
            <BarChart3 className="text-primary" size={24} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Total Agents</p>
              <p className="text-3xl font-bold mt-1">12</p>
            </div>
            <Users className="text-secondary" size={24} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">System Health</p>
              <p className="text-3xl font-bold mt-1">99.8%</p>
            </div>
            <TrendingUp className="text-accent" size={24} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Active Issues</p>
              <p className="text-3xl font-bold mt-1">2</p>
            </div>
            <AlertCircle className="text-destructive" size={24} />
          </div>
        </Card>
      </div>

      {/* Agent Performance */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Agent Performance</h2>
        <div className="space-y-4">
          {agentStats.map((agent, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 border border-border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold">{agent.name}</h3>
                <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                  <span>{agent.appointments} appointments</span>
                  <span>Rating: {agent.rating}</span>
                  <span>{agent.customers} customers</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
