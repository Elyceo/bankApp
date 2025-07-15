import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GlobalChatProvider } from "@/components/global-chat-provider"
import { LanguageProvider } from "@/components/language-context" // Import LanguageProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mobile First Bank App",
  description: "A mobile-first web application for banking services.",
  // Added viewport meta tag to prevent zooming on input focus
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {" "}
          {/* Wrap with LanguageProvider */}
          <GlobalChatProvider>{children}</GlobalChatProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
