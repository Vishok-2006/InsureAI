"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bell, X, Check } from "lucide-react"

interface Notification {
  id: string
  type: "appointment" | "alert" | "info" | "success"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface NotificationCenterProps {
  notifications?: Notification[]
  onMarkAsRead?: (id: string) => void
  onDismiss?: (id: string) => void
}

export function NotificationCenter({ notifications = [], onMarkAsRead, onDismiss }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const getIconColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "text-blue-500"
      case "alert":
        return "text-red-500"
      case "success":
        return "text-green-500"
      case "info":
        return "text-purple-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-96 max-h-96 flex flex-col shadow-2xl z-50">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-1 h-auto w-auto">
              <X size={18} />
            </Button>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Bell size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 hover:bg-muted transition-colors ${!notification.read ? "bg-blue-50 dark:bg-blue-950" : ""}`}
                  >
                    <div className="flex gap-2">
                      <Bell size={16} className={`flex-shrink-0 mt-0.5 ${getIconColor(notification.type)}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${!notification.read ? "font-bold" : ""}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{notification.message}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto w-auto"
                            onClick={() => onMarkAsRead?.(notification.id)}
                          >
                            <Check size={14} />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-auto w-auto"
                          onClick={() => onDismiss?.(notification.id)}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t text-center">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View All Notifications
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
