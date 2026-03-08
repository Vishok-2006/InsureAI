"use client"

import { Star, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AgentsPage() {
  const agents = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Auto Insurance",
      rating: 4.8,
      reviews: 125,
      appointments: 24,
      availability: "Available Today",
      bio: "Expert in auto and home insurance with 10+ years experience",
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "Life Insurance",
      rating: 4.6,
      reviews: 98,
      appointments: 19,
      availability: "Available Tomorrow",
      bio: "Specializes in life and health insurance products",
    },
    {
      id: 3,
      name: "Jennifer Lee",
      specialty: "Commercial Insurance",
      rating: 4.9,
      reviews: 156,
      appointments: 31,
      availability: "Available Today",
      bio: "Leading expert in commercial insurance solutions",
    },
    {
      id: 4,
      name: "David Wilson",
      specialty: "General Insurance",
      rating: 4.4,
      reviews: 72,
      appointments: 15,
      availability: "Available in 2 Days",
      bio: "Comprehensive insurance coverage specialist",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Our Agents</h1>
        <p className="text-muted-foreground">Find and book with our expert insurance agents</p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{agent.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold">{agent.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{agent.reviews} reviews</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{agent.bio}</p>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users size={16} />
                  <span>{agent.appointments} appointments</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={16} />
                  <span>{agent.availability}</span>
                </div>
              </div>

              <Button className="w-full">Book Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
