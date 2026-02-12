"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Users, Calendar } from "lucide-react"

export default function AgentAnalyticsPage() {
  const performanceData = [
    { month: "Jan", appointments: 28, completed: 27, revenue: 3200 },
    { month: "Feb", appointments: 32, completed: 31, revenue: 3800 },
    { month: "Mar", appointments: 35, completed: 33, revenue: 4200 },
    { month: "Apr", appointments: 38, completed: 37, revenue: 4600 },
    { month: "May", appointments: 42, completed: 40, revenue: 5100 },
    { month: "Jun", appointments: 45, completed: 43, revenue: 5500 },
  ]

  const appointmentTypeData = [
    { name: "Insurance Review", value: 35, color: "#3B82F6" },
    { name: "Policy Update", value: 25, color: "#10B981" },
    { name: "Claim Review", value: 20, color: "#F59E0B" },
    { name: "New Policy", value: 20, color: "#8B5CF6" },
  ]

  const metrics = [
    {
      label: "Total Revenue",
      value: "$26,400",
      change: "+12.5%",
      icon: DollarSign,
      positive: true,
    },
    {
      label: "Customers This Month",
      value: "45",
      change: "+5.2%",
      icon: Users,
      positive: true,
    },
    {
      label: "Completed Appointments",
      value: "43",
      change: "+8.1%",
      icon: Calendar,
      positive: true,
    },
    {
      label: "Growth Rate",
      value: "14.2%",
      change: "+2.3%",
      icon: TrendingUp,
      positive: true,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Your performance metrics and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground text-sm">{metric.label}</p>
                    <p className="text-2xl font-bold mt-2">{metric.value}</p>
                    <p className={`text-xs mt-1 ${metric.positive ? "text-secondary" : "text-destructive"}`}>
                      {metric.change}
                    </p>
                  </div>
                  <Icon className="text-primary" size={24} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments & Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="appointments" stroke="#3B82F6" strokeWidth={2} name="Appointments" />
                <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="Completed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointment Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {appointmentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
