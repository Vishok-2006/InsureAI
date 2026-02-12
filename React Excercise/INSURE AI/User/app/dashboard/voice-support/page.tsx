"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, Send, Volume2, Copy, ThumbsUp, ThumbsDown } from "lucide-react"

interface VoiceMessage {
  id: string
  type: "user" | "bot"
  text: string
  timestamp: Date
  helpful?: boolean
}

export default function VoiceSupportPage() {
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: "1",
      type: "bot",
      text: "Hello! I'm your voice assistant. How can I help you today? You can ask about your policy, make appointments, or get answers to common insurance questions.",
      timestamp: new Date(),
    },
  ])
  const [transcript, setTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const startListening = () => {
    setIsListening(true)
    setTranscript("")

    // Simulated speech recognition - in production, use Web Speech API
    setTimeout(() => {
      setTranscript("I want to know about my health insurance policy coverage")
      setIsListening(false)
    }, 2000)
  }

  const sendMessage = async () => {
    if (!transcript.trim()) return

    // Add user message
    const userMessage: VoiceMessage = {
      id: Date.now().toString(),
      type: "user",
      text: transcript,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setTranscript("")
    setIsProcessing(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "Your health insurance policy provides comprehensive coverage for preventive care, hospital stays, and prescription medications. You have a $500 annual deductible and 80% coverage after that. Would you like to know more about specific coverage details?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsProcessing(false)
    }, 1500)
  }

  const handleVoteHelpful = (messageId: string, helpful: boolean) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, helpful } : msg)))
  }

  const speakResponse = (text: string) => {
    // In production, use Web Speech API Text-to-Speech
    const utterance = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Voice Support Assistant</h1>
        <p className="text-muted-foreground">Resolve queries using voice commands and AI assistance</p>
      </div>

      {/* Chat Container */}
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${message.type === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-white dark:bg-slate-700 text-foreground rounded-bl-none"}`}
              >
                <p className="text-sm">{message.text}</p>

                {message.type === "bot" && (
                  <div className="flex gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-600">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => speakResponse(message.text)}
                    >
                      <Volume2 size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        navigator.clipboard.writeText(message.text)
                      }}
                    >
                      <Copy size={16} />
                    </Button>
                    {!message.helpful && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 w-8 p-0 ${message.helpful === true ? "text-green-600" : ""}`}
                          onClick={() => handleVoteHelpful(message.id, true)}
                        >
                          <ThumbsUp size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 w-8 p-0 ${message.helpful === false ? "text-red-600" : ""}`}
                          onClick={() => handleVoteHelpful(message.id, false)}
                        >
                          <ThumbsDown size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="space-y-3 pt-4 border-t">
          {/* Transcript Display */}
          {(transcript || isListening) && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                {isListening ? (
                  <span className="animate-pulse">Listening...</span>
                ) : (
                  <>
                    <span className="font-semibold">Transcript:</span> {transcript}
                  </>
                )}
              </p>
            </div>
          )}

          {/* Voice Controls */}
          <div className="flex gap-2">
            <Button
              onClick={startListening}
              disabled={isListening || isProcessing}
              className={`flex-1 gap-2 ${isListening ? "bg-red-500 hover:bg-red-600" : "bg-primary"}`}
            >
              <Mic size={18} />
              {isListening ? "Listening..." : "Start Recording"}
            </Button>

            {transcript && (
              <Button onClick={sendMessage} disabled={isProcessing} className="gap-2">
                <Send size={18} />
                {isProcessing ? "Processing..." : "Send"}
              </Button>
            )}
          </div>

          {/* Helper Text */}
          <p className="text-xs text-muted-foreground text-center">
            Try asking: "What's my policy coverage?" or "Schedule an appointment"
          </p>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="font-bold mb-4">Common Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "What's covered in my policy?",
            "How do I file a claim?",
            "What's my deductible?",
            "Can I change my plan?",
          ].map((question, i) => (
            <Button
              key={i}
              variant="outline"
              className="justify-start h-auto py-2 bg-transparent"
              onClick={() => {
                setTranscript(question)
              }}
            >
              {question}
            </Button>
          ))}
        </div>
      </Card>

      {/* Statistics */}
      <Card className="p-6">
        <h2 className="font-bold mb-4">Voice Assistant Statistics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">156</p>
            <p className="text-xs text-muted-foreground">Queries Resolved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">94%</p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">2.3m</p>
            <p className="text-xs text-muted-foreground">Avg. Response Time</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
