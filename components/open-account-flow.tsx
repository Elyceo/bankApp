"use client"
import { useState } from "react"
import { SignInRegister } from "./auth/sign-in-register"
import { OtpVerification } from "./auth/otp-verification"
import { AccountApplicationForm } from "./account-opening/account-application-form"
import { ProfessionalButton } from "@/components/ui/professional-button" // Changed to ProfessionalButton
import { ArrowLeft } from "lucide-react"
import { X } from "lucide-react"
import { useLanguage } from "@/components/language-context" // Import useLanguage hook
import { translations } from "@/lib/translations" // Import translations

export type AccountType = {
  id: string
  name: string
  description: string
  fee: string
  image?: string
  requirements: string[]
}

export function OpenAccountFlow({ onClose }: { onClose: () => void }) {
  const { language } = useLanguage() // Use language context
  const [step, setStep] = useState(0)
  const [selectedAccount, setSelectedAccount] = useState<AccountType | null>(null)
  const [formData, setFormData] = useState({}) // To store form data across steps
  const [authIdentifier, setAuthIdentifier] = useState<string | null>(null) // To store the phone/email for OTP hint

  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)

  const handleAuthSuccess = (identifier: string) => {
    setAuthIdentifier(identifier)
    handleNext()
  }

  const handleSelectAccount = (account: AccountType) => {
    setSelectedAccount(account)
    handleNext()
  }

  const handleFormSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
    // In a real application, you would send this data to a backend
    alert("Application submitted successfully! (Check console for data)")
    console.log("Final Application Data:", { ...formData, ...data })
    onClose() // Close the flow after submission
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return <SignInRegister onAuthSuccess={handleAuthSuccess} onClose={onClose} />
      case 1:
        return <OtpVerification identifierHint={authIdentifier} onVerifySuccess={handleNext} />
      case 2: // Directly go to the application form
        return <AccountApplicationForm onSubmit={handleFormSubmit} onBack={handleBack} />
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <p className="text-lg text-slate-700">{translations.somethingWentWrong[language]}</p>
            <ProfessionalButton onClick={onClose} className="mt-4">
              {translations.close[language]}
            </ProfessionalButton>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white text-gray-900">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        {step === 1 && ( // Show back button ONLY on OTP verification step (step 1)
          <ProfessionalButton size="icon" variant="ghost" onClick={handleBack} aria-label="Go back">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </ProfessionalButton>
        )}
        <h2 className="flex-grow text-center text-lg font-semibold">
          {step === 0 && translations.signInRegister[language]}
          {step === 1 && translations.verifyYourIdentity[language]}
          {step === 2 && translations.accountOpening[language]}
        </h2>
        <ProfessionalButton size="icon" variant="ghost" onClick={onClose} aria-label="Close">
          <X className="h-6 w-6 text-gray-600" />
        </ProfessionalButton>
      </header>
      <div className="flex-1 overflow-y-auto p-4">{renderStep()}</div>
    </div>
  )
}
