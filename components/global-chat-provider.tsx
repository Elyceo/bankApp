"use client"
import { useState, useCallback } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { ChatDialog } from "./chat-dialog"
import { ChatContext } from "./chat-context" // Import the new context

export function GlobalChatProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [initialChatContextMessage, setInitialChatContextMessage] = useState<string | undefined>(undefined)

  const openChat = useCallback((message?: string) => {
    setInitialChatContextMessage(message)
    setIsChatOpen(true)
  }, [])

  const closeChat = useCallback(() => {
    setIsChatOpen(false)
    setInitialChatContextMessage(undefined) // Clear message when chat closes
  }, [])

  const handleInitialMessageConsumed = useCallback(() => {
    setInitialChatContextMessage(undefined) // Clear message after ChatDialog consumes it
  }, [])

  return (
    <ChatContext.Provider value={{ openChat, closeChat }}>
      {children}

      {/* Floating Chat Button / Close Chat Button */}
      {!isChatOpen ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-primary-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-primary-700 border-2 border-white"
            aria-label="Open chat"
            onClick={() => openChat()} // Open chat without specific context initially
          >
            <MessageCircle className="h-8 w-8" />
          </Button>
        </div>
      ) : (
        <>
          {/* Chat Dialog */}
          <ChatDialog
            onClose={closeChat}
            initialMessage={initialChatContextMessage}
            onInitialMessageConsumed={handleInitialMessageConsumed}
          />
          {/* Close Chat Button below the dialog */}
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              variant="ghost"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-transparent text-primary-600 shadow-lg transition-all hover:scale-110 hover:bg-primary-50"
              onClick={closeChat}
              aria-label="Close chat"
            >
              <X className="h-8 w-8" />
            </Button>
          </div>
        </>
      )}
    </ChatContext.Provider>
  )
}
