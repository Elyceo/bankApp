"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info, Send } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"

interface ChatDialogProps {
  onClose: () => void
  initialMessage?: string
  onInitialMessageConsumed?: () => void
}

export function ChatDialog({ onClose, initialMessage, onInitialMessageConsumed }: ChatDialogProps) {
  const { language } = useLanguage()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      setMessages([{ type: "bot", text: initialMessage }])
      if (onInitialMessageConsumed) {
        onInitialMessageConsumed()
      }
    }
  }, [initialMessage, messages.length, onInitialMessageConsumed])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, { type: "user", text: message }])
      setMessage("")
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { type: "bot", text: translations.chatbotNotLive[language] }])
      }, 500)
    }
  }

  const handleInfoClick = () => {
    setMessages((prevMessages) => [...prevMessages, { type: "bot", text: translations.chatbotNotLive[language] }])
  }

  return (
    <div className="fixed bottom-20 right-6 z-50 flex h-[400px] w-[calc(100vw-48px)] max-w-xs flex-col rounded-lg bg-gray-900 text-white shadow-xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between rounded-t-lg bg-primary-600 p-3">
        <div className="flex items-center gap-2">
          <Image src="/placeholder.svg" alt="Millen icon" width={24} height={24} className="rounded-full" />
          <div>
            <h3 className="text-sm font-semibold">Millen</h3>
            <p className="text-xs text-primary-200">{translations.repliesInUnder3Seconds[language]}</p>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Information"
          className="text-gray-400 hover:bg-blue-700"
          onClick={handleInfoClick}
        >
          <Info className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 text-sm ${
                msg.type === "user" ? "bg-primary-600 text-white" : "bg-gray-700 text-gray-100"
              }`}
            >
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field and Send Button */}
      <div className="flex items-center gap-2 border-t border-gray-700 p-4">
        <Input
          type="text"
          placeholder={translations.typeAMessage[language]}
          className="flex-1 rounded-full border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 focus:border-primary-500 focus:ring-primary-500 text-base" // Added text-base
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }}
        />
        <Button
          size="icon"
          className="rounded-full bg-primary-600 hover:bg-primary-700"
          onClick={handleSendMessage}
          aria-label={translations.sendMessage[language]}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
