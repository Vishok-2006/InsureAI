"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, Settings, LogOut } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { NotificationCenter } from "@/components/notification-center"
import { GlobalSearch } from "@/components/global-search"
import { VoiceChatWidget } from "@/components/voice-chat-widget"
import { useNotificationContext } from "@/contexts/notification-context"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const { notifications, markAsRead, deleteNotification } = useNotificationContext()

  const userInfo = (() => {
    try {
      const user = localStorage.getItem("insureflow_user")
      return user ? JSON.parse(user) : { fullName: "User", email: "user@example.com" }
    } catch {
      return { fullName: "User", email: "user@example.com" }
    }
  })()

  const handleLogout = () => {
    localStorage.removeItem("insureflow_user")
    localStorage.removeItem("insureflow_usertype")
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 overflow-hidden flex flex-col">
        <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:block flex-1 max-w-sm">
              <GlobalSearch />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onDismiss={deleteNotification}
            />
            <a href="/dashboard/settings" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Settings size={20} />
            </a>
            <div className="w-1 h-8 bg-border"></div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                    {userInfo.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:inline text-sm font-medium">{userInfo.fullName || "User"}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{userInfo.fullName || "User"}</p>
                  <p className="text-xs text-muted-foreground">{userInfo.email || "user@example.com"}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>

        <VoiceChatWidget />
      </div>
    </div>
  )
}
