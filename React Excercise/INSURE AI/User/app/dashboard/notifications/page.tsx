"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Check, Trash2, AlertCircle, Info, CheckCircle } from "lucide-react"
import { useNotificationContext } from "@/contexts/notification-context"

interface Notification {
  id: string
  type: "appointment" | "alert" | "info" | "success"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "appointment":
      return <Bell className="text-blue-500" size={20} />
    case "alert":
      return <AlertCircle className="text-red-500" size={20} />
    case "success":
      return <CheckCircle className="text-green-500" size={20} />
    case "info":
      return <Info className="text-purple-500" size={20} />
    default:
      return <Bell size={20} />
  }
}

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotificationContext()
  const [filterType, setFilterType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((n) => {
    const matchesType = filterType === "all" || n.type === filterType
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start md:items-center gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell size={32} />
            Notifications
          </h1>
          <p className="text-muted-foreground">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="flex-1 relative">
          <Input
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="appointment">Appointments</SelectItem>
            <SelectItem value="alert">Alerts</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="info">Information</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="p-8 text-center">
            <Bell size={32} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">No notifications</p>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 transition-colors ${!notification.read ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800" : ""}`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {notification.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>}
                  </div>

                  <div className="flex items-center justify-between mt-3 gap-2">
                    <span className="text-xs text-muted-foreground">
                      {notification.timestamp.toLocaleDateString()} {notification.timestamp.toLocaleTimeString()}
                    </span>

                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs"
                        >
                          <Check size={14} className="mr-1" />
                          Mark as read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-destructive hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
