"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthPage from "@/components/auth-page"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("insureflow_user")
    if (loggedInUser) {
      try {
        const user = JSON.parse(loggedInUser)
        // Only allow customers to access dashboard from home
        if (user.role === "customer") {
          router.push("/dashboard")
          return
        }
      } catch (e) {
        console.error("Error parsing user data", e)
      }
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <AuthPage />
}
