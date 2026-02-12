"use client"

import { Users, Clock, TrendingUp, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AgentDashboard() {
  const scheduledAppointments = [
    { id: 1, customer: "Jane Smith", time: "10:00 AM", duration: "30 min", type: "Policy Review" },
    { id: 2, customer: "Robert Brown", time: "11:30 AM", duration: "45 min", type: "New Policy" },
    { id: 3, customer: "Emily Davis", time: "2:00 PM", duration: "30 min", type: "Renewal" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Agent Dashboard</h1>
          <p className="text-muted-foreground">Manage your appointments and customers</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:shadow-lg">Add Customer</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Today's Appointments</p>
              <p className="text-3xl font-bold mt-1">3</p>
            </div>
            <Clock className="text-primary" size={24} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Total Customers</p>
              <p className="text-3xl font-bold mt-1">28</p>
            </div>
            <Users className="text-secondary" size={24} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Conversion Rate</p>
              <p className="text-3xl font-bold mt-1">92%</p>
            </div>
            <TrendingUp className="text-accent" size={24} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Completed Today</p>
              <p className="text-3xl font-bold mt-1">2</p>
            </div>
            <CheckCircle className="text-secondary" size={24} />
          </div>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
        <div className="space-y-3">
          {scheduledAppointments.map((apt) => (
            <div
              key={apt.id}
              className="flex justify-between items-center p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <h3 className="font-semibold">{apt.customer}</h3>
                <p className="text-sm text-muted-foreground">{apt.type}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{apt.time}</p>
                <p className="text-sm text-muted-foreground">{apt.duration}</p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
