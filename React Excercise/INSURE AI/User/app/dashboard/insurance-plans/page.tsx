"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Heart, Car, Home, Plane, ChevronRight, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/dashboard-layout"
import { Input } from "@/components/ui/input"

const insuranceCategories = [
  {
    id: "health",
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    count: 5,
    href: "/dashboard/insurance-plans/health",
  },
  {
    id: "vehicle",
    title: "Vehicle Insurance",
    description: "Protect your car, bike, or motorcycle with comprehensive coverage",
    icon: Car,
    color: "from-blue-500 to-cyan-500",
    count: 6,
    href: "/dashboard/insurance-plans/vehicle",
  },
  {
    id: "home",
    title: "Home Insurance",
    description: "Secure your home and belongings against unforeseen events",
    icon: Home,
    color: "from-orange-500 to-yellow-500",
    count: 4,
    href: "/dashboard/insurance-plans/home",
  },
  {
    id: "life",
    title: "Life Insurance",
    description: "Financial security for your loved ones",
    icon: Shield,
    color: "from-green-500 to-emerald-500",
    count: 5,
    href: "/dashboard/insurance-plans/life",
  },
  {
    id: "travel",
    title: "Travel Insurance",
    description: "Coverage for domestic and international travel",
    icon: Plane,
    color: "from-purple-500 to-indigo-500",
    count: 4,
    href: "/dashboard/insurance-plans/travel",
  },
]

export default function InsurancePlansPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = insuranceCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Browse Insurance Plans</h1>
          <p className="text-muted-foreground mt-2">
            Explore our comprehensive insurance solutions tailored to your needs
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search insurance plans..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.id} href={category.href}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                  {/* Gradient Background */}
                  <div
                    className={`h-24 bg-gradient-to-r ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`}
                  />

                  <CardHeader className="relative -mt-12 pb-3">
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-16 rounded-lg bg-background border-4 border-card shadow-md flex items-center justify-center">
                        <Icon
                          className={`w-8 h-8 text-background bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                        />
                      </div>
                      <span className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {category.count} Plans
                      </span>
                    </div>
                    <CardTitle className="mt-4">{category.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{category.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    >
                      Explore Plans
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {filteredCategories.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Shield className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-semibold text-foreground">No insurance plans found</p>
              <p className="text-muted-foreground text-center mt-2">Try adjusting your search terms</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
