"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, X } from "lucide-react"

export function VoiceChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<{ type: "user" | "bot"; text: string }[]>([
    { type: "bot", text: "Hi! How can I help you today?" },
  ])

  const handleVoiceInput = (transcript: string) => {
    setMessages((prev) => [...prev, { type: "user", text: transcript }])

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Thank you for your question. I can help you with that. What would you like to know?",
        },
      ])
    }, 1000)
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        >
          <Mic size={24} />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 max-h-96 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-semibold">Voice Assistant</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary/80"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t space-y-2">
            <Button
              onClick={() => setIsListening(!isListening)}
              variant={isListening ? "destructive" : "default"}
              className="w-full gap-2"
            >
              <Mic size={18} />
              {isListening ? "Listening..." : "Speak"}
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}
