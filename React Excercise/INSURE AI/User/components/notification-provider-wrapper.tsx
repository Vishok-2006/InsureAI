"use client"

import type React from "react"

import { NotificationProvider } from "@/contexts/notification-context"

export function NotificationProviderWrapper({ children }: { children: React.ReactNode }) {
  return <NotificationProvider>{children}</NotificationProvider>
}
