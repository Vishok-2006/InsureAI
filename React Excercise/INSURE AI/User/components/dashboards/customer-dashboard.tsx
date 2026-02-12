"use client"

import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, ShoppingCart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CustomerDashboard() {
  const upcomingAppointments = [
    {
      id: 1,
      agent: "Sarah Johnson",
      type: "Insurance Review",
      date: "Dec 15, 2024",
      time: "2:00 PM",
      location: "Virtual",
      status: "confirmed",
    },
    {
      id: 2,
      agent: "Mike Chen",
      type: "Policy Update",
      date: "Dec 22, 2024",
      time: "3:30 PM",
      location: "Office",
      status: "pending",
    },
  ]

  const activePolicies = [
    { id: 1, name: "Auto Insurance", premium: "$89/month", status: "active", type: "Vehicle Coverage" },
    { id: 2, name: "Home Insurance", premium: "$145/month", status: "active", type: "Property Protection" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">View your insurance policies and upcoming appointments</p>
        </div>
        <Link href="/dashboard/policies">
          <Button className="bg-primary text-primary-foreground hover:shadow-lg flex items-center gap-2">
            <ShoppingCart size={18} />
            Browse Insurance Plans
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Active Policies</p>
              <p className="text-3xl font-bold mt-1">{activePolicies.length}</p>
            </div>
            <CheckCircle className="text-secondary" size={24} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Upcoming Appointments</p>
              <p className="text-3xl font-bold mt-1">{upcomingAppointments.length}</p>
            </div>
            <Calendar className="text-primary" size={24} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Monthly Premium</p>
              <p className="text-3xl font-bold mt-1">$234</p>
            </div>
            <AlertCircle className="text-accent" size={24} />
          </div>
        </Card>
      </div>

      {/* Appointments Section */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upcoming Appointments</h2>
          <Link href="/dashboard/appointments">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {upcomingAppointments.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No upcoming appointments</p>
          ) : (
            upcomingAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 mb-4 md:mb-0">
                  <h3 className="font-semibold">{apt.agent}</h3>
                  <p className="text-sm text-muted-foreground">{apt.type}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {apt.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {apt.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {apt.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === "confirmed" ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent"
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Policies Section */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Insurance Policies</h2>
          <Link href="/dashboard/policies">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activePolicies.length === 0 ? (
            <div className="md:col-span-2 text-center py-8">
              <p className="text-muted-foreground mb-4">No active policies yet</p>
              <Link href="/dashboard/policies">
                <Button>Browse Insurance Plans</Button>
              </Link>
            </div>
          ) : (
            activePolicies.map((policy) => (
              <div key={policy.id} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{policy.name}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-secondary/20 text-secondary">{policy.status}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{policy.type}</p>
                <p className="text-sm text-primary font-bold mb-4">{policy.premium}</p>
                <Link href={`/dashboard/policies/${policy.id}`}>
                  <Button variant="ghost" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
