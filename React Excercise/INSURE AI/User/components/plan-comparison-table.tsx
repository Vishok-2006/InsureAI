"use client"

import { X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Plan {
  id: number
  name: string
  coverage?: string
  premium: string
  features: string[]
  rating: number
  reviews: number
  popular?: boolean
  [key: string]: any
}

interface PlanComparisonTableProps {
  plans: Plan[]
  onRemovePlan?: (planId: number) => void
  onClose?: () => void
}

export default function PlanComparisonTable({ plans, onRemovePlan, onClose }: PlanComparisonTableProps) {
  if (plans.length === 0) {
    return null
  }

  // Get all unique features across all selected plans
  const allFeatures = Array.from(new Set(plans.flatMap((plan) => plan.features)))

  return (
    <Card className="w-full border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Plan Comparison</CardTitle>
            <CardDescription>Compare {plans.length} insurance plans side-by-side</CardDescription>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row with Plan Names */}
          <div className="grid gap-0 border-b">
            <div className="bg-muted p-4 font-semibold text-sm sticky left-0 z-10">Comparison</div>
            {plans.map((plan) => (
              <div key={plan.id} className="bg-primary/5 p-4 border-l flex flex-col gap-2 min-w-[250px]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    {plan.popular && <Badge className="mt-1 bg-primary">Most Popular</Badge>}
                  </div>
                  {onRemovePlan && (
                    <button
                      onClick={() => onRemovePlan(plan.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`Remove ${plan.name} from comparison`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Coverage Row */}
          <div className="grid gap-0 border-b hover:bg-muted/30">
            <div className="bg-muted/50 p-4 font-semibold text-sm sticky left-0 z-10">Coverage</div>
            {plans.map((plan) => (
              <div key={`coverage-${plan.id}`} className="p-4 border-l flex items-center min-w-[250px]">
                <span className="font-semibold text-primary">{plan.coverage || "N/A"}</span>
              </div>
            ))}
          </div>

          {/* Premium Row */}
          <div className="grid gap-0 border-b hover:bg-muted/30">
            <div className="bg-muted/50 p-4 font-semibold text-sm sticky left-0 z-10">Premium</div>
            {plans.map((plan) => (
              <div key={`premium-${plan.id}`} className="p-4 border-l flex items-center min-w-[250px]">
                <span className="text-xl font-bold">{plan.premium}</span>
              </div>
            ))}
          </div>

          {/* Rating Row */}
          <div className="grid gap-0 border-b hover:bg-muted/30">
            <div className="bg-muted/50 p-4 font-semibold text-sm sticky left-0 z-10">Rating</div>
            {plans.map((plan) => (
              <div key={`rating-${plan.id}`} className="p-4 border-l flex flex-col gap-1 min-w-[250px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{plan.rating}/5</span>
                  <span className="text-sm text-muted-foreground">({plan.reviews} reviews)</span>
                </div>
              </div>
            ))}
          </div>

          {/* Features Row */}
          {allFeatures.map((feature, idx) => (
            <div key={`feature-${idx}`} className="grid gap-0 border-b hover:bg-muted/30">
              <div className="bg-muted/50 p-4 font-semibold text-sm sticky left-0 z-10 break-words max-w-[150px]">
                {feature}
              </div>
              {plans.map((plan) => (
                <div
                  key={`feature-${plan.id}-${idx}`}
                  className="p-4 border-l flex items-center justify-center min-w-[250px]"
                >
                  {plan.features.includes(feature) ? (
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
