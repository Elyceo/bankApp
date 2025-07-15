"use client"
import { createContext, useContext } from "react"

interface ChatContextType {
  openChat: (message?: string) => void
  closeChat: () => void
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a GlobalChatProvider")
  }
  return context
}
