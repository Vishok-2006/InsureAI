"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Lock } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Configure system-wide preferences and policies</p>
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" placeholder="Your Insurance Company" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="support-email">Support Email</Label>
            <Input id="support-email" type="email" placeholder="support@example.com" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select defaultValue="utc">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern Standard Time</SelectItem>
                <SelectItem value="cst">Central Standard Time</SelectItem>
                <SelectItem value="pst">Pacific Standard Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
            <div className="flex items-center gap-3 mt-2">
              <Switch id="maintenance-mode" />
              <span className="text-sm text-muted-foreground">
                Enable maintenance mode (users will see a maintenance message)
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Appointment Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Appointment Settings</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min-duration">Minimum Appointment Duration (minutes)</Label>
              <Input id="min-duration" type="number" defaultValue="30" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="max-duration">Maximum Appointment Duration (minutes)</Label>
              <Input id="max-duration" type="number" defaultValue="120" className="mt-2" />
            </div>
          </div>

          <div>
            <Label htmlFor="buffer-time">Buffer Time Between Appointments (minutes)</Label>
            <Input id="buffer-time" type="number" defaultValue="15" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="cancellation-policy">Cancellation Policy (hours before appointment)</Label>
            <Input id="cancellation-policy" type="number" defaultValue="24" className="mt-2" />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Bell size={20} />
          Notification Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Appointment Reminders</p>
              <p className="text-sm text-muted-foreground">Send email reminders to customers</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">New Booking Alerts</p>
              <p className="text-sm text-muted-foreground">Notify agents of new bookings</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">System Status Updates</p>
              <p className="text-sm text-muted-foreground">Send admin alerts on system issues</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lock size={20} />
          Security Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Session Timeout</p>
              <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div>
            <Label htmlFor="session-duration">Session Duration (minutes)</Label>
            <Input id="session-duration" type="number" defaultValue="60" className="mt-2" />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">IP Whitelist</p>
              <p className="text-sm text-muted-foreground">Restrict admin access to specific IPs</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* System Policies */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">System Policies</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="privacy-policy">Privacy Policy</Label>
            <Textarea id="privacy-policy" placeholder="Enter your privacy policy here..." className="mt-2 min-h-32" />
          </div>

          <div>
            <Label htmlFor="terms">Terms of Service</Label>
            <Textarea id="terms" placeholder="Enter your terms of service here..." className="mt-2 min-h-32" />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex gap-3 pt-4 border-t">
        <Button className="bg-primary">Save Changes</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  )
}
