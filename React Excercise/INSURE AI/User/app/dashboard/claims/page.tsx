"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Clock, CheckCircle, AlertCircle, DollarSign, Calendar, Search } from "lucide-react"
import { useNotificationContext } from "@/contexts/notification-context"

interface Claim {
  id: string
  claimNumber: string
  type: string
  amount: number
  status: "submitted" | "under_review" | "approved" | "denied" | "paid"
  submittedDate: string
  lastUpdated: string
  description: string
}

const claimsData: Claim[] = [
  {
    id: "1",
    claimNumber: "CLM-2024-001",
    type: "Medical",
    amount: 2500,
    status: "approved",
    submittedDate: "Dec 1, 2024",
    lastUpdated: "Dec 5, 2024",
    description: "Emergency room visit and treatment",
  },
  {
    id: "2",
    claimNumber: "CLM-2024-002",
    type: "Dental",
    amount: 800,
    status: "under_review",
    submittedDate: "Dec 3, 2024",
    lastUpdated: "Dec 6, 2024",
    description: "Crown replacement procedure",
  },
  {
    id: "3",
    claimNumber: "CLM-2024-003",
    type: "Vision",
    amount: 400,
    status: "paid",
    submittedDate: "Nov 20, 2024",
    lastUpdated: "Dec 4, 2024",
    description: "Eye exam and prescription glasses",
  },
  {
    id: "4",
    claimNumber: "CLM-2024-004",
    type: "Medical",
    amount: 1500,
    status: "submitted",
    submittedDate: "Dec 6, 2024",
    lastUpdated: "Dec 6, 2024",
    description: "Prescription medications",
  },
]

function getStatusIcon(status: string) {
  switch (status) {
    case "approved":
      return <CheckCircle className="text-green-500" size={20} />
    case "paid":
      return <CheckCircle className="text-green-600" size={20} />
    case "under_review":
      return <Clock className="text-blue-500" size={20} />
    case "submitted":
      return <FileText className="text-yellow-500" size={20} />
    case "denied":
      return <AlertCircle className="text-red-500" size={20} />
    default:
      return <FileText size={20} />
  }
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    submitted: "Submitted",
    under_review: "Under Review",
    approved: "Approved",
    denied: "Denied",
    paid: "Paid",
  }
  return labels[status] || status
}

function getStatusVariant(status: string) {
  switch (status) {
    case "approved":
    case "paid":
      return "default"
    case "under_review":
      return "secondary"
    case "submitted":
      return "outline"
    case "denied":
      return "destructive"
    default:
      return "outline"
  }
}

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>(claimsData)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { addNotification } = useNotificationContext()

  const filteredClaims = claims.filter((claim) => {
    const matchesStatus = filterStatus === "all" || claim.status === filterStatus
    const matchesSearch =
      claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.type.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: claims.length,
    pending: claims.filter((c) => c.status === "submitted" || c.status === "under_review").length,
    approved: claims.filter((c) => c.status === "approved" || c.status === "paid").length,
    totalAmount: claims.reduce((sum, c) => sum + c.amount, 0),
  }

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault()
    const newClaim: Claim = {
      id: (claims.length + 1).toString(),
      claimNumber: `CLM-2024-${String(claims.length + 5).padStart(3, "0")}`,
      type: "Medical",
      amount: 1000,
      status: "submitted",
      submittedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      lastUpdated: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      description: "New claim submission",
    }
    setClaims([...claims, newClaim])
    addNotification({
      type: "success",
      title: "Claim Submitted",
      message: `Your claim ${newClaim.claimNumber} has been submitted successfully`,
    })
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText size={32} />
            Claims
          </h1>
          <p className="text-muted-foreground">Track and manage your insurance claims</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:shadow-lg">Submit New Claim</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Submit a Claim</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitClaim} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Claim Type</label>
                <Select defaultValue="medical">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="dental">Dental</SelectItem>
                    <SelectItem value="vision">Vision</SelectItem>
                    <SelectItem value="prescription">Prescription</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <textarea
                  placeholder="Describe your claim..."
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Claim Amount</label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    defaultValue="1000"
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Submit Claim
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Total Claims</p>
                <p className="text-3xl font-bold mt-1">{stats.total}</p>
              </div>
              <FileText className="text-primary" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Pending</p>
                <p className="text-3xl font-bold mt-1">{stats.pending}</p>
              </div>
              <Clock className="text-accent" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Approved</p>
                <p className="text-3xl font-bold mt-1">{stats.approved}</p>
              </div>
              <CheckCircle className="text-secondary" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Total Amount</p>
                <p className="text-3xl font-bold mt-1">${(stats.totalAmount / 1000).toFixed(1)}k</p>
              </div>
              <DollarSign className="text-destructive" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
          <Input
            placeholder="Search by claim number, type, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="denied">Denied</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Claims List */}
      <div className="space-y-3">
        {filteredClaims.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText size={32} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">No claims found</p>
          </Card>
        ) : (
          filteredClaims.map((claim) => (
            <Card key={claim.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className="flex-shrink-0 mt-1">{getStatusIcon(claim.status)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{claim.claimNumber}</h3>
                        <Badge variant={getStatusVariant(claim.status) as any}>{getStatusLabel(claim.status)}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{claim.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Type:</span> {claim.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {claim.submittedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={14} /> ${claim.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
