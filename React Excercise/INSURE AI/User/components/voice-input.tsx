"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, Square } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VoiceInputProps {
  onTranscript?: (text: string) => void
  onListeningChange?: (isListening: boolean) => void
}

export function VoiceInput({ onTranscript, onListeningChange }: VoiceInputProps) {
  const recognitionRef = useRef<any>(null)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        onListeningChange?.(true)
      }

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript

          if (event.results[i].isFinal) {
            setTranscript(transcript)
            onTranscript?.(transcript)
          } else {
            interimTranscript += transcript
          }
        }
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
        onListeningChange?.(false)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        onListeningChange?.(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [onTranscript, onListeningChange])

  const handleStartListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("")
      recognitionRef.current.start()
    }
  }

  const handleStopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={isListening ? handleStopListening : handleStartListening}
        variant={isListening ? "destructive" : "default"}
        className="w-full gap-2"
      >
        {isListening ? (
          <>
            <Square size={18} className="animate-pulse" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic size={18} />
            Start Recording
          </>
        )}
      </Button>

      {transcript && (
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <p className="text-sm font-medium">You said:</p>
          <p className="text-sm text-muted-foreground mt-1">{transcript}</p>
        </div>
      )}
    </div>
  )
}
