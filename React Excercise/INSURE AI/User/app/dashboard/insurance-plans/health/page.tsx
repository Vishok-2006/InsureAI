"use client"

import { useState } from "react"
import { Heart, Check, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import PlanComparisonTable from "@/components/plan-comparison-table"

const healthPlans = [
  {
    id: 1,
    name: "BasicCare Plus",
    coverage: "₹5 Lakhs",
    premium: "₹199/month",
    features: ["Hospitalization", "Doctor Consultations", "Basic Surgeries", "No Waiting Period"],
    rating: 4.2,
    reviews: 2341,
    popular: false,
  },
  {
    id: 2,
    name: "FamilyShield Prime",
    coverage: "₹10 Lakhs",
    premium: "₹399/month",
    features: ["Family Coverage (4)", "Hospitalization", "Pre & Post Care", "Dental Benefits", "Wellness Programs"],
    rating: 4.6,
    reviews: 5823,
    popular: true,
  },
  {
    id: 3,
    name: "ComprehensiveCare Max",
    coverage: "₹25 Lakhs",
    premium: "₹649/month",
    features: ["Unlimited Coverage", "Pre-existing Conditions", "Mental Health", "Maternity", "Critical Illness"],
    rating: 4.8,
    reviews: 3456,
    popular: false,
  },
  {
    id: 4,
    name: "SeniorSecure Gold",
    coverage: "₹15 Lakhs",
    premium: "₹549/month",
    features: ["Senior Citizens (60+)", "Pre-existing Coverage", "Ambulance", "Home Care", "24/7 Support"],
    rating: 4.5,
    reviews: 1876,
    popular: false,
  },
  {
    id: 5,
    name: "StudentSafe Starter",
    coverage: "₹3 Lakhs",
    premium: "₹99/month",
    features: ["Students Only", "Affordable Premium", "Hospital Covers", "Medicine Reimbursement"],
    rating: 4.3,
    reviews: 912,
    popular: false,
  },
]

export default function HealthInsurancePage() {
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

  const selectedPlansArray = healthPlans.filter((plan) => selectedPlans.has(plan.id))

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Health Insurance Plans</h1>
            <p className="text-muted-foreground">Choose the perfect health coverage for you and your family</p>
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
          {healthPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative transition-all hover:shadow-lg ${
                selectedPlan === plan.id ? "ring-2 ring-primary" : ""
              } ${plan.popular ? "md:col-span-1 lg:col-span-1 border-primary" : ""}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}

              <CardHeader className={plan.popular ? "pt-8" : ""}>
                {/* Checkbox for comparison selection */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>Comprehensive health coverage</CardDescription>
                  </div>
                  <Checkbox
                    checked={selectedPlans.has(plan.id)}
                    onCheckedChange={() => togglePlanSelection(plan.id)}
                    aria-label={`Compare ${plan.name}`}
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Coverage & Premium */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Coverage Limit</span>
                    <span className="text-xl font-bold text-primary">{plan.coverage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monthly Premium</span>
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
                  <span className="text-sm text-muted-foreground">({plan.reviews} reviews)</span>
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

                {/* CTA Button */}
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

        {/* Back Button */}
        <div className="pt-4">
          <Link href="/dashboard/insurance-plans">
            <Button variant="outline">Back to All Plans</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
