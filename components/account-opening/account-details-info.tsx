"use client"
import Image from "next/image"
import { ProfessionalButton } from "@/components/ui/professional-button" // Changed to ProfessionalButton
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { AccountType } from "../open-account-flow"
import { useLanguage } from "@/components/language-context" // Import useLanguage hook
import { translations } from "@/lib/translations" // Import translations

interface AccountDetailsInfoProps {
  account: AccountType
  onContinue: () => void
}

export function AccountDetailsInfo({ account, onContinue }: AccountDetailsInfoProps) {
  const { language } = useLanguage() // Use language context
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 space-y-6">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader className="relative pb-0">
          <Image
            src={account.image || "/placeholder.svg"}
            alt={`${account.name} card`}
            width={150}
            height={100}
            className="absolute -top-10 right-4 rotate-6"
          />
          <CardTitle className="text-xl font-semibold">{account.name}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-gray-600">{account.description}</p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">{translations.maintenanceFee[language]}</p>
            <p className="text-lg font-bold text-gray-800">{account.fee}</p>
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full max-w-sm">
        <AccordionItem value="what-you-need">
          <AccordionTrigger className="text-lg font-semibold">{translations.whatYoullNeed[language]}</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {account.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ProfessionalButton className="w-full max-w-sm h-12 text-base" onClick={onContinue}>
        {translations.continueApplication[language]}
      </ProfessionalButton>
    </div>
  )
}
