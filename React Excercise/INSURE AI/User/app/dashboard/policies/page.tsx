"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Shield, DollarSign, AlertTriangle, CheckCircle, Search, RefreshCw } from "lucide-react"

interface Policy {
  id: string
  policyNumber: string
  type: string
  coverage: string
  premium: number
  status: "active" | "pending" | "expired" | "cancelled"
  startDate: string
  renewalDate: string
  coverageAmount: number
}

const policiesData: Policy[] = [
  {
    id: "1",
    policyNumber: "POL-2024-001",
    type: "Health Insurance",
    coverage: "Comprehensive",
    premium: 450,
    status: "active",
    startDate: "Jan 1, 2024",
    renewalDate: "Dec 31, 2024",
    coverageAmount: 500000,
  },
  {
    id: "2",
    policyNumber: "POL-2024-002",
    type: "Dental Insurance",
    coverage: "Standard",
    premium: 35,
    status: "active",
    startDate: "Mar 15, 2024",
    renewalDate: "Mar 14, 2025",
    coverageAmount: 50000,
  },
  {
    id: "3",
    policyNumber: "POL-2024-003",
    type: "Vision Insurance",
    coverage: "Basic",
    premium: 20,
    status: "pending",
    startDate: "Jan 15, 2025",
    renewalDate: "Jan 14, 2026",
    coverageAmount: 25000,
  },
  {
    id: "4",
    policyNumber: "POL-2023-001",
    type: "Life Insurance",
    coverage: "Term Life",
    premium: 75,
    status: "active",
    startDate: "Jun 1, 2023",
    renewalDate: "May 31, 2025",
    coverageAmount: 250000,
  },
]

function getStatusIcon(status: string) {
  switch (status) {
    case "active":
      return <CheckCircle className="text-green-500" size={20} />
    case "pending":
      return <AlertTriangle className="text-yellow-500" size={20} />
    case "expired":
      return <AlertTriangle className="text-red-500" size={20} />
    case "cancelled":
      return <AlertTriangle className="text-gray-500" size={20} />
    default:
      return <Shield size={20} />
  }
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    active: "Active",
    pending: "Pending",
    expired: "Expired",
    cancelled: "Cancelled",
  }
  return labels[status] || status
}

function getStatusVariant(status: string) {
  switch (status) {
    case "active":
      return "default"
    case "pending":
      return "secondary"
    case "expired":
    case "cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>(policiesData)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPolicies = policies.filter((policy) => {
    const matchesStatus = filterStatus === "all" || policy.status === filterStatus
    const matchesType = filterType === "all" || policy.type === filterType
    const matchesSearch =
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.coverage.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesType && matchesSearch
  })

  const stats = {
    total: policies.length,
    active: policies.filter((p) => p.status === "active").length,
    monthlyPremium: policies.filter((p) => p.status === "active").reduce((sum, p) => sum + p.premium, 0),
    totalCoverage: policies.filter((p) => p.status === "active").reduce((sum, p) => sum + p.coverageAmount, 0),
  }

  const types = ["Health Insurance", "Dental Insurance", "Vision Insurance", "Life Insurance"]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield size={32} />
            Policies
          </h1>
          <p className="text-muted-foreground">Manage and review your insurance policies</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:shadow-lg">Add Policy</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Policy</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Policy Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Coverage Level</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Monthly Premium</label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <Button className="w-full">Add Policy</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Total Policies</p>
                <p className="text-3xl font-bold mt-1">{stats.total}</p>
              </div>
              <Shield className="text-primary" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Active Policies</p>
                <p className="text-3xl font-bold mt-1">{stats.active}</p>
              </div>
              <CheckCircle className="text-secondary" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Monthly Premium</p>
                <p className="text-3xl font-bold mt-1">${stats.monthlyPremium}</p>
              </div>
              <DollarSign className="text-accent" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Total Coverage</p>
                <p className="text-3xl font-bold mt-1">${(stats.totalCoverage / 1000000).toFixed(1)}M</p>
              </div>
              <RefreshCw className="text-destructive" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-3 flex-col md:flex-row flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
          <Input
            placeholder="Search by policy number or coverage..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPolicies.length === 0 ? (
          <Card className="col-span-full p-8 text-center">
            <Shield size={32} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">No policies found</p>
          </Card>
        ) : (
          filteredPolicies.map((policy) => (
            <Card key={policy.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{policy.type}</CardTitle>
                    <CardDescription className="text-sm">{policy.policyNumber}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(policy.status)}
                    <Badge variant={getStatusVariant(policy.status) as any}>{getStatusLabel(policy.status)}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Coverage</p>
                    <p className="font-semibold">{policy.coverage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Monthly Premium</p>
                    <p className="font-semibold">${policy.premium}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Coverage Amount</p>
                    <p className="font-semibold">${policy.coverageAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Renewal Date</p>
                    <p className="font-semibold text-sm">{policy.renewalDate}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Renew
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
