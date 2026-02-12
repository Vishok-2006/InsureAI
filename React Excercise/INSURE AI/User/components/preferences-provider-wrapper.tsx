"use client"

import type React from "react"

import { PreferencesProvider } from "@/contexts/preferences-context"

export function PreferencesProviderWrapper({ children }: { children: React.ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>
}
