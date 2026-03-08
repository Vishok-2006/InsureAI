"use client"

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Users, Calendar, DollarSign, CheckCircle } from "lucide-react"

const appointmentData = [
  { month: "Jan", completed: 180, pending: 40, cancelled: 20 },
  { month: "Feb", completed: 210, pending: 35, cancelled: 15 },
  { month: "Mar", completed: 245, pending: 50, cancelled: 18 },
  { month: "Apr", completed: 220, pending: 45, cancelled: 22 },
  { month: "May", completed: 280, pending: 55, cancelled: 20 },
  { month: "Jun", completed: 310, pending: 60, cancelled: 25 },
]

const agentPerformance = [
  { name: "Sarah Johnson", value: 28 },
  { name: "Mike Chen", value: 22 },
  { name: "Jennifer Lee", value: 35 },
  { name: "David Wilson", value: 15 },
]

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"]

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Overview</h1>
          <p className="text-muted-foreground">System-wide metrics and performance analytics</p>
        </div>
        <Button className="bg-primary">Generate Report</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Appointments</p>
              <p className="text-4xl font-bold mt-2">1,245</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 12% from last month</p>
            </div>
            <Calendar className="text-blue-600 dark:text-blue-400" size={28} />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-slate-800 dark:to-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Revenue</p>
              <p className="text-4xl font-bold mt-2">$84,500</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 8% from last month</p>
            </div>
            <DollarSign className="text-purple-600 dark:text-purple-400" size={28} />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-800 dark:to-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Agents</p>
              <p className="text-4xl font-bold mt-2">24</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 2 new agents</p>
            </div>
            <Users className="text-green-600 dark:text-green-400" size={28} />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-slate-800 dark:to-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">System Health</p>
              <p className="text-4xl font-bold mt-2">99.8%</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">↓ 0.1% downtime</p>
            </div>
            <CheckCircle className="text-orange-600 dark:text-orange-400" size={28} />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointment Trends */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-bold mb-4">Appointment Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              <Bar dataKey="cancelled" fill="#ef4444" name="Cancelled" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Agent Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Agent Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={agentPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* System Health Section */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <AlertCircle size={20} />
          System Status & Alerts
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-slate-700 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">All API endpoints operational</span>
            </div>
            <span className="text-xs text-green-600 dark:text-green-400">Healthy</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-slate-700 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Database connection stable</span>
            </div>
            <span className="text-xs text-green-600 dark:text-green-400">Healthy</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-slate-700 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Email service response time elevated</span>
            </div>
            <span className="text-xs text-yellow-600 dark:text-yellow-400">Warning</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
