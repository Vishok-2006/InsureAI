"use client"

import { Star, Clock, Phone, Mail, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AgentProfilePage() {
  const agentProfile = {
    name: "Sarah Johnson",
    email: "sarah.johnson@insureflow.com",
    phone: "+1 (555) 123-4567",
    specialty: "Auto & Home Insurance",
    joinDate: "Jan 2022",
    rating: 4.8,
    reviews: 125,
    totalAppointments: 341,
    completedAppointments: 328,
    conversionRate: 96,
    avgRating: 4.8,
    bio: "With over 10 years of experience in insurance, I specialize in finding the perfect coverage for auto and home insurance needs.",
  }

  const recentCustomers = [
    { id: 1, name: "John Smith", email: "john@example.com", lastContact: "2 days ago", status: "active" },
    { id: 2, name: "Mary Johnson", email: "mary@example.com", lastContact: "1 week ago", status: "active" },
    { id: 3, name: "Robert Davis", email: "robert@example.com", lastContact: "2 weeks ago", status: "inactive" },
    { id: 4, name: "Patricia Brown", email: "patricia@example.com", lastContact: "3 days ago", status: "active" },
  ]

  const performance = [
    { metric: "Sales Target", current: 45, target: 50, percentage: 90 },
    { metric: "Customer Satisfaction", current: 4.8, target: 4.5, percentage: 100 },
    { metric: "Appointment Completion", current: 328, target: 300, percentage: 109 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header Profile Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                  SJ
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{agentProfile.name}</h1>
                  <p className="text-muted-foreground">{agentProfile.specialty}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold">{agentProfile.rating}</span>
                      <span className="text-sm text-muted-foreground">({agentProfile.reviews} reviews)</span>
                    </div>
                    <Badge variant="outline">Member since {agentProfile.joinDate}</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Edit Profile</Button>
              <Button>Book Appointment</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Email</p>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-primary" />
                <a href={`mailto:${agentProfile.email}`} className="text-primary hover:underline truncate">
                  {agentProfile.email}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Phone</p>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-primary" />
                <a href={`tel:${agentProfile.phone}`} className="text-primary hover:underline">
                  {agentProfile.phone}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Availability</p>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-secondary" />
                <span>Available Today</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performance.map((item) => (
              <div key={item.metric}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{item.metric}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.current} / {item.target} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{agentProfile.bio}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Customers</CardTitle>
              <CardDescription>Your most recent client interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={customer.status === "active" ? "default" : "outline"}>{customer.status}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{customer.lastContact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Total Appointments</p>
                  <p className="text-4xl font-bold mt-2">{agentProfile.totalAppointments}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Completed</p>
                  <p className="text-4xl font-bold mt-2">{agentProfile.completedAppointments}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Conversion Rate</p>
                  <p className="text-4xl font-bold mt-2">{agentProfile.conversionRate}%</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Average Rating</p>
                  <p className="text-4xl font-bold mt-2">{agentProfile.avgRating}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
