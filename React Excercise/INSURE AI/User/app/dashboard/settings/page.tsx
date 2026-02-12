"use client"

import { Bell, Lock, User, Eye, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { usePreferences } from "@/contexts/preferences-context"
import { useState } from "react"

export default function SettingsPage() {
  const { preferences, updatePreferences, resetPreferences } = usePreferences()
  const [saveMessage, setSaveMessage] = useState("")

  const handleSave = () => {
    setSaveMessage("✓ Preferences saved successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const handleReset = () => {
    resetPreferences()
    setSaveMessage("✓ Preferences reset to defaults!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security</p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-center gap-2 text-green-700 dark:text-green-300">
          <CheckCircle size={18} />
          <span className="text-sm">{saveMessage}</span>
        </div>
      )}

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User size={20} />
            <div>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-2">Full Name</Label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <Label className="mb-2">Email Address</Label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <Label className="mb-2">Phone Number</Label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell size={20} />
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage notification preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications - Appointments</p>
              <p className="text-sm text-muted-foreground">Receive emails about appointments and schedules</p>
            </div>
            <Switch
              checked={preferences.emailAppointments}
              onCheckedChange={(checked) => {
                updatePreferences({ emailAppointments: checked })
                handleSave()
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications - Alerts</p>
              <p className="text-sm text-muted-foreground">Receive important alerts and policy updates</p>
            </div>
            <Switch
              checked={preferences.emailAlerts}
              onCheckedChange={(checked) => {
                updatePreferences({ emailAlerts: checked })
                handleSave()
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">Receive text messages for reminders</p>
            </div>
            <Switch
              checked={preferences.smsNotifications}
              onCheckedChange={(checked) => {
                updatePreferences({ smsNotifications: checked })
                handleSave()
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">Receive promotional content and special offers</p>
            </div>
            <Switch
              checked={preferences.emailMarketing}
              onCheckedChange={(checked) => {
                updatePreferences({ emailMarketing: checked })
                handleSave()
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye size={20} />
            <div>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>Control your privacy settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Profile Visibility</p>
              <p className="text-sm text-muted-foreground">Allow agents to see your profile</p>
            </div>
            <Switch
              checked={preferences.profileVisibility}
              onCheckedChange={(checked) => {
                updatePreferences({ profileVisibility: checked })
                handleSave()
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Sharing</p>
              <p className="text-sm text-muted-foreground">Share data with partners for better service</p>
            </div>
            <Switch
              checked={preferences.dataSharing}
              onCheckedChange={(checked) => {
                updatePreferences({ dataSharing: checked })
                handleSave()
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock size={20} />
            <div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full bg-transparent">
            Change Password
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Active Sessions
          </Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={handleReset} variant="outline">
          Reset to Defaults
        </Button>
      </div>
    </div>
  )
}
