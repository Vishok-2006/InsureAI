"use client"

import { useEffect, useState } from "react"
import { X, AlertCircle, CheckCircle, Info } from "lucide-react"

interface ToastNotificationProps {
  type?: "success" | "error" | "info" | "warning"
  title?: string
  message: string
  duration?: number
  onClose?: () => void
}

export function ToastNotification({ type = "info", title, message, duration = 5000, onClose }: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  if (!isVisible) return null

  const typeStyles = {
    success: "bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700",
    error: "bg-red-50 border-red-200 dark:bg-red-900 dark:border-red-700",
    info: "bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-700",
    warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900 dark:border-yellow-700",
  }

  const iconStyles = {
    success: { icon: CheckCircle, color: "text-green-600 dark:text-green-400" },
    error: { icon: AlertCircle, color: "text-red-600 dark:text-red-400" },
    info: { icon: Info, color: "text-blue-600 dark:text-blue-400" },
    warning: { icon: AlertCircle, color: "text-yellow-600 dark:text-yellow-400" },
  }

  const { icon: Icon, color } = iconStyles[type]

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm p-4 rounded-lg border shadow-lg flex gap-3 items-start ${typeStyles[type]} z-50 animate-in fade-in slide-in-from-bottom-4`}
    >
      <Icon size={20} className={`flex-shrink-0 mt-0.5 ${color}`} />

      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-sm">{title}</p>}
        <p className={`text-sm ${title ? "mt-0.5" : ""}`}>{message}</p>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  )
}
