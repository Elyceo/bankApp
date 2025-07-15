"use client"
import { useState } from "react"
import type React from "react"
import Image from "next/image"

import { ProfessionalButton } from "@/components/ui/professional-button"
import { ProfessionalInput } from "@/components/ui/professional-input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react" // Import eye icons
import { useLanguage } from "@/components/language-context" // Import useLanguage hook
import { translations } from "@/lib/translations" // Import translations

interface SignInRegisterProps {
  onAuthSuccess: (identifier: string) => void // Modified to pass identifier
  onClose: () => void
}

export function SignInRegister({ onAuthSuccess, onClose }: SignInRegisterProps) {
  const { language } = useLanguage() // Use language context
  const [isRegistering, setIsRegistering] = useState(false)
  const [loginUsername, setLoginUsername] = useState("") // Changed to username
  const [loginPassword, setLoginPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerPhone, setRegisterPhone] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  // State for password visibility
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validation functions (kept for registration, not login username)
  const validateMozambiquePhoneNumber = (phone: string) => {
    return /^(82|83|84|85|86|87)\d{7}$/.test(phone)
  }

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!loginUsername || !loginPassword) {
      setError(translations.usernameAndPasswordRequired[language])
      return
    }

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would check credentials and then send OTP
      // For now, just proceed to OTP page, using username as identifier hint
      onAuthSuccess(loginUsername)
    }, 500)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    let phoneEmailError = ""
    if (!registerPhone && !registerEmail) {
      phoneEmailError = translations.phoneEmailRequired[language]
    } else if (registerPhone && !validateMozambiquePhoneNumber(registerPhone)) {
      phoneEmailError = translations.invalidMozambicanPhoneNumber[language]
    } else if (registerEmail && !validateEmail(registerEmail)) {
      phoneEmailError = translations.invalidEmailFormat[language]
    }

    if (
      !registerName ||
      phoneEmailError ||
      !registerPassword ||
      registerPassword !== confirmPassword ||
      registerPassword.length < 6 // Basic password length check
    ) {
      if (registerPassword !== confirmPassword) {
        setError(translations.passwordsDoNotMatch[language])
      } else if (registerPassword.length < 6) {
        setError(translations.passwordLengthError[language])
      } else {
        setError(phoneEmailError || translations.fillAllRequiredFields[language])
      }
      return
    }

    // Simulate API call
    setTimeout(() => {
      // In a real app, send verification code to phone/email
      alert(`${translations.verificationCodeSent[language]} ${registerPhone || registerEmail}.`)
      onAuthSuccess(registerPhone || registerEmail) // Pass phone or email as identifier hint
    }, 500)
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
          {isRegistering && (
            <>
              <CardTitle className="text-lg font-semibold text-slate-800">
                {translations.createYourProfile[language]}
              </CardTitle>
              <p className="text-base text-slate-600">{translations.createUsernamePassword[language]}</p>
            </>
          )}
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-red-600 mb-4 text-center">{error}</p>}
          {isRegistering ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <ProfessionalInput
                  id="register-name"
                  label={translations.preferredName[language]}
                  type="text"
                  placeholder={translations.yourName[language]}
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
              </div>
              <div>
                <ProfessionalInput
                  id="register-phone"
                  label={translations.phoneNumberRecommended[language]}
                  type="tel"
                  placeholder="e.g., 841234567"
                  value={registerPhone}
                  onChange={(e) => {
                    setRegisterPhone(e.target.value)
                    setError("") // Clear error on change
                  }}
                  infoText={translations.enterMozambicanNumber[language]}
                />
              </div>
              <div>
                <ProfessionalInput
                  id="register-email"
                  label={translations.emailAddressOptional[language]}
                  type="email"
                  placeholder="your@example.com"
                  value={registerEmail}
                  onChange={(e) => {
                    setRegisterEmail(e.target.value)
                    setError("") // Clear error on change
                  }}
                  infoText={translations.checkEmailForCode[language]}
                />
              </div>
              <div className="relative">
                <ProfessionalInput
                  id="register-password"
                  label={translations.createPassword[language]}
                  type={showRegisterPassword ? "text" : "password"}
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
                <ProfessionalButton
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-7 h-8 w-8 p-0"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                >
                  {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </ProfessionalButton>
              </div>
              <div className="relative">
                <ProfessionalInput
                  id="confirm-password"
                  label={translations.confirmPassword[language]}
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <ProfessionalButton
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-7 h-8 w-8 p-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </ProfessionalButton>
              </div>
              <ProfessionalButton type="submit" className="w-full">
                {translations.next[language]}
              </ProfessionalButton>
              <ProfessionalButton
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsRegistering(false)
                  setError("")
                }}
              >
                {translations.cancel[language]}
              </ProfessionalButton>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <ProfessionalInput
                  id="login-username"
                  label={translations.username[language]}
                  type="text"
                  placeholder={translations.yourUsername[language]}
                  value={loginUsername}
                  onChange={(e) => {
                    setLoginUsername(e.target.value)
                    setError("") // Clear error on change
                  }}
                  required
                />
              </div>
              <div className="relative">
                <ProfessionalInput
                  id="login-password"
                  label={translations.password[language]}
                  type={showLoginPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <ProfessionalButton
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-7 h-8 w-8 p-0"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  aria-label={showLoginPassword ? "Hide password" : "Show password"}
                >
                  {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </ProfessionalButton>
              </div>
              <ProfessionalButton type="submit" className="w-full">
                {translations.signIn[language]}
              </ProfessionalButton>
              <ProfessionalButton
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsRegistering(true)
                  setError("")
                }}
              >
                {translations.register[language]}
              </ProfessionalButton>
              <ProfessionalButton type="button" variant="link" className="w-full">
                {translations.forgotUsername[language]}
              </ProfessionalButton>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
