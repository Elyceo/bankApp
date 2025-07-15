"use client"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"

interface AccountDetailsPageProps {
  onGoToBankServices: () => void // Callback to navigate to the actual Bank Services page
  onClose: () => void // Keep onClose for consistency, though it's handled by parent
}

export function AccountDetailsPage({ onGoToBankServices, onClose }: AccountDetailsPageProps) {
  const { language } = useLanguage()

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
          <ProfessionalButton className="w-full" onClick={onGoToBankServices}>
            {translations.bankServices[language]}
          </ProfessionalButton>
          {/* You can add more service-specific buttons here */}
        </CardContent>
      </Card>
    </div>
  )
}
