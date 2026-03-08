"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Clock, FileText, Lock, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchResult {
  id: string
  title: string
  type: "appointment" | "claim" | "policy" | "agent"
  description: string
  href: string
  icon: React.ReactNode
}

const mockSearchData: SearchResult[] = [
  {
    id: "1",
    title: "Schedule Appointment",
    type: "appointment",
    description: "Book a new appointment with an agent",
    href: "/dashboard/appointments",
    icon: <Clock size={16} />,
  },
  {
    id: "2",
    title: "View Claims",
    type: "claim",
    description: "Track and manage your insurance claims",
    href: "/dashboard/claims",
    icon: <FileText size={16} />,
  },
  {
    id: "3",
    title: "Manage Policies",
    type: "policy",
    description: "Review and manage your insurance policies",
    href: "/dashboard/policies",
    icon: <Lock size={16} />,
  },
  {
    id: "4",
    title: "Find Agents",
    type: "agent",
    description: "Browse and connect with insurance agents",
    href: "/dashboard/agents",
    icon: <Zap size={16} />,
  },
]

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setResults([])
      return
    }

    const filtered = mockSearchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase()),
    )
    setResults(filtered)
  }, [])

  const handleSelectResult = (href: string) => {
    router.push(href)
    setIsOpen(false)
    setSearchQuery("")
    setResults([])
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={searchRef} className="relative w-full max-w-sm">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search appointments, claims, policies..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (searchQuery || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="divide-y divide-border">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelectResult(result.href)}
                  className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-0.5 text-muted-foreground">{result.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{result.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
