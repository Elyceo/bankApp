"use client"
import { useState, useEffect } from "react"
import type React from "react"
import Image from "next/image"

import { ProfessionalButton } from "@/components/ui/professional-button"
import { ProfessionalInput } from "@/components/ui/professional-input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useChat } from "@/components/chat-context"
import { useLanguage } from "@/components/language-context" // Import useLanguage hook
import { translations } from "@/lib/translations" // Import translations

interface OtpVerificationProps {
  identifierHint: string | null // New prop for the hint
  onVerifySuccess: () => void
}

export function OtpVerification({ identifierHint, onVerifySuccess }: OtpVerificationProps) {
  const { language } = useLanguage() // Use language context
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [maskedIdentifier, setMaskedIdentifier] = useState("")
  const { openChat } = useChat() // Use the chat context

  useEffect(() => {
    if (identifierHint) {
      setMaskedIdentifier(maskIdentifier(identifierHint))
    }
  }, [identifierHint])

  const maskIdentifier = (identifier: string): string => {
    if (!identifier) return ""

    // Check if it's likely an email
    if (identifier.includes("@")) {
      const [localPart, domainPart] = identifier.split("@")
      // Mask most of the local part, keep first and last char
      const maskedLocal =
        localPart.length > 2 ? `${localPart.charAt(0)}****${localPart.slice(-1)}` : `${localPart.charAt(0)}**` // For very short local parts
      return `${maskedLocal}@${domainPart}`
    }

    // Assume it's a phone number or username
    // For phone numbers (9 digits), this will correctly mask: 841234567 -> 84****567
    // For usernames, if length is 5 or more, mask it. Otherwise, show full.
    if (identifier.length >= 5) {
      return `${identifier.substring(0, 2)}****${identifier.substring(identifier.length - 2)}`
    }
    // For very short identifiers (e.g., username "abc"), just show it
    return identifier
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    // For now, any 4-digit number is considered valid
    if (/^\d{4}$/.test(otp)) {
      onVerifySuccess()
    } else {
      setError(translations.enterValid4DigitOtp[language])
    }
  }

  const handleContactSupport = () => {
    openChat("I need help with OTP verification on the 'Verify Your Identity' page.")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 bg-slate-50">
      <Card className="w-full max-w-sm shadow-md border-slate-200">
        <CardHeader className="text-center">
          <Image
            src="/images/millennium-bim-m-logo.jpeg"
            alt="Millennium BIM M Logo"
            width={96} // Adjusted for circular display
            height={96} // Adjusted for circular display
            className="mx-auto mb-4 rounded-full object-cover" // Added rounded-full and object-cover
          />
          <CardTitle className="text-lg font-semibold text-slate-800">
            {translations.verifyYourIdentity[language]}
          </CardTitle>
          <p className="text-base text-slate-600">{translations.enter4DigitCode[language]}</p>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <Label htmlFor="otp" className="block text-sm font-medium text-slate-700">
                {translations.oneTimePassword[language]}
              </Label>
              <ProfessionalInput
                id="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                placeholder="e.g., 1234"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value)
                  setError("")
                }}
                required
              />
            </div>
            <ProfessionalButton type="submit" className="w-full">
              {translations.verify[language]}
            </ProfessionalButton>
            <ProfessionalButton type="button" variant="link" className="w-full">
              {translations.resendOtp[language]}
            </ProfessionalButton>
          </form>
          <div className="mt-6 text-center text-sm space-y-2">
            <p className="text-slate-600">{translations.havingTrouble[language]}</p>
            <ProfessionalButton type="button" variant="link" className="w-full">
              {translations.tryAnotherMethod[language]}
            </ProfessionalButton>
            <ProfessionalButton type="button" variant="link" className="w-full" onClick={handleContactSupport}>
              {translations.contactSupport[language]}
            </ProfessionalButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
