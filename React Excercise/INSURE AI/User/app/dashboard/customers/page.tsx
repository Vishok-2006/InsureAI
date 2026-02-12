"use client"

import { useState } from "react"
import { Search, Plus, Mail, Phone, Calendar, Trash2, Edit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2024-01-15",
      policies: 3,
      status: "active",
      lastAppointment: "2024-12-01",
    },
    {
      id: 2,
      name: "Mary Johnson",
      email: "mary@example.com",
      phone: "+1 (555) 234-5678",
      joinDate: "2024-02-20",
      policies: 2,
      status: "active",
      lastAppointment: "2024-12-08",
    },
    {
      id: 3,
      name: "Robert Davis",
      email: "robert@example.com",
      phone: "+1 (555) 345-6789",
      joinDate: "2024-03-10",
      policies: 1,
      status: "inactive",
      lastAppointment: "2024-10-15",
    },
    {
      id: 4,
      name: "Patricia Brown",
      email: "patricia@example.com",
      phone: "+1 (555) 456-7890",
      joinDate: "2024-04-05",
      policies: 4,
      status: "active",
      lastAppointment: "2024-12-10",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage and track your customers</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:shadow-lg">
              <Plus size={18} className="mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input placeholder="Customer name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input placeholder="+1 (555) 000-0000" />
              </div>
              <Button className="w-full">Add Customer</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">Total Customers</p>
            <p className="text-3xl font-bold mt-1">{customers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">Active</p>
            <p className="text-3xl font-bold mt-1">{customers.filter((c) => c.status === "active").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">Total Policies</p>
            <p className="text-3xl font-bold mt-1">{customers.reduce((sum, c) => sum + c.policies, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">Avg Policies/Customer</p>
            <p className="text-3xl font-bold mt-1">
              {(customers.reduce((sum, c) => sum + c.policies, 0) / customers.length).toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No customers found</div>
            ) : (
              filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="font-semibold">{customer.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail size={14} /> {customer.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={14} /> {customer.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {customer.joinDate}
                      </span>
                      <span>Policies: {customer.policies}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Badge variant={customer.status === "active" ? "default" : "outline"}>{customer.status}</Badge>
                    <Button variant="outline" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 size={16} className="text-destructive" />
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
