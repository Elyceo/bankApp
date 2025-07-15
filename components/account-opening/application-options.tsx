"use client"
import { ProfessionalButton } from "@/components/ui/professional-button" // Changed to ProfessionalButton
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context" // Import useLanguage hook
import { translations } from "@/lib/translations" // Import translations

interface ApplicationOptionsProps {
  onNewApplication: () => void
  onContinueApplication: () => void
}

export function ApplicationOptions({ onNewApplication, onContinueApplication }: ApplicationOptionsProps) {
  const { language } = useLanguage() // Use language context
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            {translations.whatWouldYouLikeToDo[language]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfessionalButton className="w-full h-12 text-base" onClick={onNewApplication}>
            {translations.startNewApplication[language]}
          </ProfessionalButton>
          <ProfessionalButton
            variant="outline"
            className="w-full h-12 text-base bg-transparent"
            onClick={onContinueApplication}
          >
            {translations.continueExistingApplication[language]}
          </ProfessionalButton>
        </CardContent>
      </Card>
    </div>
  )
}
