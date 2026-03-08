"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface NotificationPreferences {
  emailAppointments: boolean
  emailAlerts: boolean
  emailMarketing: boolean
  smsNotifications: boolean
  profileVisibility: boolean
  dataSharing: boolean
}

const defaultPreferences: NotificationPreferences = {
  emailAppointments: true,
  emailAlerts: true,
  emailMarketing: false,
  smsNotifications: true,
  profileVisibility: true,
  dataSharing: false,
}

interface PreferencesContextType {
  preferences: NotificationPreferences
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void
  resetPreferences: () => void
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("notification_preferences")
    if (stored) {
      try {
        setPreferences(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to load preferences:", error)
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("notification_preferences", JSON.stringify(preferences))
    }
  }, [preferences, mounted])

  const updatePreferences = (updates: Partial<NotificationPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }))
  }

  const resetPreferences = () => {
    setPreferences(defaultPreferences)
  }

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        resetPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error("usePreferences must be used within PreferencesProvider")
  }
  return context
}
