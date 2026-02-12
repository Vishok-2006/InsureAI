"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Home, Lock, FileText, Settings, Mic, HelpCircle, LogOut } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home, section: "main" },
  { label: "Browse Insurance Plans", href: "/dashboard/insurance-plans", icon: Shield, section: "main" },
  { label: "My Insurance Plans", href: "/dashboard/policies", icon: Lock, section: "main" },
  { label: "My Appointments", href: "/dashboard/appointments", icon: FileText, section: "main" },
  { label: "Voice Support", href: "/dashboard/voice-support", icon: Mic, section: "main" },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, section: "settings" },
]

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => {
            // Close sidebar on mobile when clicking overlay
          }}
        />
      )}

      <aside
        className={`${
          isOpen ? "w-64" : "w-0"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col overflow-hidden fixed lg:static h-screen z-50 lg:z-auto`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-sidebar-primary to-accent rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">InsureFlow</h1>
              <p className="text-xs text-sidebar-foreground/60">Customer</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/20"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors">
            <HelpCircle size={20} />
            <span className="font-medium">Help & Support</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("insureflow_user")
              localStorage.removeItem("insureflow_usertype")
              window.location.href = "/"
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
