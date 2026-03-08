"use client"

import { useState, useCallback } from "react"

export interface NotificationItem {
  id: string
  type: "success" | "error" | "info" | "warning"
  title?: string
  message: string
  duration?: number
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const addNotification = useCallback((notification: Omit<NotificationItem, "id">) => {
    const id = Date.now().toString()
    const newNotification: NotificationItem = {
      ...notification,
      id,
      duration: notification.duration ?? 5000,
    }

    setNotifications((prev) => [...prev, newNotification])

    if (newNotification.duration) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const success = useCallback(
    (message: string, title?: string, duration?: number) => {
      return addNotification({ type: "success", message, title, duration })
    },
    [addNotification],
  )

  const error = useCallback(
    (message: string, title?: string, duration?: number) => {
      return addNotification({ type: "error", message, title, duration })
    },
    [addNotification],
  )

  const info = useCallback(
    (message: string, title?: string, duration?: number) => {
      return addNotification({ type: "info", message, title, duration })
    },
    [addNotification],
  )

  const warning = useCallback(
    (message: string, title?: string, duration?: number) => {
      return addNotification({ type: "warning", message, title, duration })
    },
    [addNotification],
  )

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
    warning,
  }
}
