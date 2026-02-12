"use client"

import { Calendar, Clock, MapPin, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AppointmentsPage() {
  const appointments = [
    {
      id: 1,
      agent: "Sarah Johnson",
      agentPhone: "+1 (555) 123-4567",
      type: "Insurance Review",
      date: "Dec 15, 2024",
      time: "2:00 PM",
      location: "Virtual",
      status: "confirmed",
      description: "Quarterly review of your insurance coverage",
    },
    {
      id: 2,
      agent: "Mike Chen",
      agentPhone: "+1 (555) 234-5678",
      type: "Policy Update",
      date: "Dec 22, 2024",
      time: "3:30 PM",
      location: "Office - Downtown",
      status: "pending",
      description: "Update your policy details and coverage",
    },
    {
      id: 3,
      agent: "Jennifer Lee",
      agentPhone: "+1 (555) 345-6789",
      type: "Claim Review",
      date: "Dec 25, 2024",
      time: "10:00 AM",
      location: "Virtual",
      status: "confirmed",
      description: "Discussion about your recent claim",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Your Appointments</h1>
        <p className="text-muted-foreground">Appointments scheduled by your agents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Total Appointments</p>
                <p className="text-3xl font-bold mt-1">{appointments.length}</p>
              </div>
              <Calendar className="text-primary" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Confirmed</p>
                <p className="text-3xl font-bold mt-1">{appointments.filter((a) => a.status === "confirmed").length}</p>
              </div>
              <CheckCircle className="text-secondary" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Pending</p>
                <p className="text-3xl font-bold mt-1">{appointments.filter((a) => a.status === "pending").length}</p>
              </div>
              <AlertCircle className="text-accent" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No appointments scheduled yet. Agents will send you appointments here.
                </p>
              </div>
            ) : (
              appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex flex-col p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{apt.agent}</h3>
                      <p className="text-sm text-muted-foreground">{apt.agentPhone}</p>
                    </div>
                    <Badge variant={apt.status === "confirmed" ? "default" : "secondary"}>{apt.status}</Badge>
                  </div>

                  <p className="text-sm font-medium mb-3 text-primary">{apt.type}</p>
                  <p className="text-sm text-muted-foreground mb-4">{apt.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span>{apt.date}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <span>{apt.time}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      <span>{apt.location}</span>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="bg-primary">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline">
                      Decline
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
