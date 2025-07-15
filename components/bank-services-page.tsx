"use client"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"
import { ArrowLeft, X } from "lucide-react"

interface BankServicesPageProps {
  onClose: () => void
  onBack: () => void
}

export function BankServicesPage({ onClose, onBack }: BankServicesPageProps) {
  const { language } = useLanguage()

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white text-gray-900">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <ProfessionalButton size="icon" variant="ghost" onClick={onBack} aria-label="Go back">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </ProfessionalButton>
        <h2 className="flex-grow text-center text-lg font-semibold">{translations.bankServicesPageTitle[language]}</h2>
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
