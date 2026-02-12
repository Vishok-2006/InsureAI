"use client"

import { useState } from "react"
import { Plane, Check, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import PlanComparisonTable from "@/components/plan-comparison-table"

const travelPlans = [
  {
    id: 1,
    name: "Domestic TravelEase",
    region: "India Only",
    duration: "1-90 Days",
    premium: "₹149/trip",
    features: ["Flight Delays", "Lost Luggage", "Medical Emergency", "24/7 Support"],
    rating: 4.3,
    reviews: 1567,
    popular: false,
  },
  {
    id: 2,
    name: "GlobalProtect Complete",
    region: "Worldwide",
    duration: "1-365 Days",
    premium: "₹599/trip",
    features: ["Visa Rejection", "Trip Cancellation", "Travel Delay", "Emergency Evacuation", "Accidental Death"],
    rating: 4.8,
    reviews: 6234,
    popular: true,
  },
  {
    id: 3,
    name: "VisitFamily Visa",
    region: "Specific Countries",
    duration: "30-180 Days",
    premium: "₹349/trip",
    features: ["Visa Requirement", "Medical Coverage", "Family Visit", "Lower Premium"],
    rating: 4.4,
    reviews: 1234,
    popular: false,
  },
  {
    id: 4,
    name: "BusinessTravel Pro",
    region: "Worldwide",
    duration: "Annual",
    premium: "₹2,999/year",
    features: ["Multiple Trips", "Business Liability", "Personal Baggage", "Annual Coverage"],
    rating: 4.6,
    reviews: 876,
    popular: false,
  },
]

export default function TravelInsurancePage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [selectedPlans, setSelectedPlans] = useState<Set<number>>(new Set())
  const [showComparison, setShowComparison] = useState(false)

  const togglePlanSelection = (planId: number) => {
    const newSelected = new Set(selectedPlans)
    if (newSelected.has(planId)) {
      newSelected.delete(planId)
    } else {
      newSelected.add(planId)
    }
    setSelectedPlans(newSelected)
  }

  const removePlanFromComparison = (planId: number) => {
    const newSelected = new Set(selectedPlans)
    newSelected.delete(planId)
    setSelectedPlans(newSelected)
  }

  const selectedPlansArray = travelPlans.filter((plan) => selectedPlans.has(plan.id))

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Travel Insurance Plans</h1>
            <p className="text-muted-foreground">Travel with confidence with our comprehensive coverage</p>
          </div>
        </div>

        {/* Comparison UI section */}
        {selectedPlans.size > 0 && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{selectedPlans.size} plan(s) selected for comparison</p>
              <p className="text-sm text-muted-foreground">Compare features, premiums, and coverage</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowComparison(!showComparison)}>
                {showComparison ? "Hide Comparison" : "Show Comparison"}
              </Button>
              <Button variant="ghost" onClick={() => setSelectedPlans(new Set())}>
                Clear
              </Button>
            </div>
          </div>
        )}

        {showComparison && selectedPlans.size > 0 && (
          <div className="py-4">
            <PlanComparisonTable plans={selectedPlansArray} onRemovePlan={removePlanFromComparison} />
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative transition-all hover:shadow-lg ${
                selectedPlan === plan.id ? "ring-2 ring-primary" : ""
              } ${plan.popular ? "md:col-span-1 lg:col-span-1 border-primary" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}

              <CardHeader className={plan.popular ? "pt-8" : ""}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.region}</CardDescription>
                  </div>
                  <Checkbox
                    checked={selectedPlans.has(plan.id)}
                    onCheckedChange={() => togglePlanSelection(plan.id)}
                    aria-label={`Compare ${plan.name}`}
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Duration</span>
                    <Badge variant="secondary">{plan.duration}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Price</span>
                    <span className="text-2xl font-bold">{plan.premium}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(plan.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{plan.rating}</span>
                  <span className="text-sm text-muted-foreground">({plan.reviews})</span>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full ${
                    selectedPlan === plan.id ? "bg-primary text-primary-foreground" : "variant-outline"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Buy Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="pt-4">
          <Link href="/dashboard/insurance-plans">
            <Button variant="outline">Back to All Plans</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
