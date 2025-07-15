"use client"
import { useState } from "react"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"
import { ArrowLeft, X } from "lucide-react" // Import icons

interface BankServicesPageProps {
  onClose: () => void
}

export function BankServicesPage({ onClose }: BankServicesPageProps) {
  const { language } = useLanguage()
  const [showBlankPage, setShowBlankPage] = useState(false) // New state for internal navigation

  if (showBlankPage) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-white text-gray-900">
        <header className="flex items-center justify-between border-b border-gray-200 p-4">
          <ProfessionalButton size="icon" variant="ghost" onClick={() => setShowBlankPage(false)} aria-label="Go back">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </ProfessionalButton>
          <h2 className="flex-grow text-center text-lg font-semibold">{translations.blankPageTitle[language]}</h2>
          <ProfessionalButton size="icon" variant="ghost" onClick={onClose} aria-label="Close">
            <X className="h-6 w-6 text-gray-600" />
          </ProfessionalButton>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-50">
          <Card className="w-full max-w-sm shadow-md border-slate-200 text-center">
            <CardContent className="p-6">
              <p className="text-lg text-slate-600">{translations.blankPageContent[language]}</p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 bg-slate-50">
      <Card className="w-full max-w-sm shadow-md border-slate-200 text-center">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            {translations.welcomeToBankServices[language]}
          </CardTitle>
          <p className="text-base text-slate-600">{translations.exploreOurServices[language]}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfessionalButton className="w-full" onClick={() => setShowBlankPage(true)}>
            {translations.bankServices[language]}
          </ProfessionalButton>
          {/* You can add more service-specific buttons here */}
        </CardContent>
      </Card>
    </div>
  )
}
