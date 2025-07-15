"use client"
import Image from "next/image"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Menu, Users, FileText, CreditCard, LogIn } from "lucide-react"
import { useState } from "react"
import { OpenAccountFlow } from "./open-account-flow"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"
import { LanguageSwitcher } from "@/components/language-switcher"

export function BankHomePage() {
  const carouselImages = ["/images/millennium-bim-carousel.jpeg"]
  const [activeFlow, setActiveFlow] = useState<"none" | "account-opening" | "login">("none") // New state for active flow
  const { language } = useLanguage()

  const handleOpenAccountClick = () => {
    setActiveFlow("account-opening")
  }

  const handleLoginAccountClick = () => {
    setActiveFlow("login")
  }

  const handleCloseFlow = () => {
    setActiveFlow("none")
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50">
      {/* Professional Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-primary-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">MB</span>
            </div>
            <span className="text-lg font-semibold text-slate-800">Millennium BIM</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ProfessionalButton variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </ProfessionalButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <LanguageSwitcher />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 px-4 py-6 space-y-8 max-w-md mx-auto w-full">
        {/* Welcome Section */}
        <section className="text-center space-y-2">
          <h1 className="text-xl font-bold text-slate-800">{translations.welcomeToDigitalBanking[language]}</h1>
          <p className="text-base text-slate-600">{translations.yourFinancialPartner[language]}</p>
        </section>

        {/* Carousel Section */}
        <section className="w-full">
          <Carousel className="w-full">
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden rounded-lg shadow-md border-0">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Bank promotion ${index + 1}`}
                        width={600}
                        height={300}
                        className="h-full w-full object-cover"
                        priority={index === 0}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Hide Carousel Navigation Arrows */}
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 hidden" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 hidden" />
          </Carousel>
        </section>

        {/* Log In Account Button */}
        <section>
          <ProfessionalButton
            className="w-full h-16 text-left justify-start space-x-4"
            onClick={handleLoginAccountClick} // Enabled and linked to new handler
            aria-label={translations.logInAccount[language]}
          >
            <LogIn className="h-6 w-6" />
            <div>
              <div className="font-semibold">{translations.logInAccount[language]}</div>
              <div className="text-sm opacity-90">{translations.accessYourExistingAccount[language]}</div>
            </div>
          </ProfessionalButton>
        </section>

        {/* Action Buttons Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">{translations.quickActions[language]}</h2>

          <ProfessionalButton
            className="w-full h-16 text-left justify-start space-x-4"
            onClick={handleOpenAccountClick} // Linked to new handler
            aria-label={translations.openAccount[language]}
          >
            <CreditCard className="h-6 w-6" />
            <div>
              <div className="font-semibold">{translations.openAccount[language]}</div>
              <div className="text-sm opacity-90">{translations.startYourBankingJourney[language]}</div>
            </div>
          </ProfessionalButton>

          <ProfessionalButton
            variant="secondary"
            className="w-full h-16 text-left justify-start space-x-4"
            aria-label={translations.joinQueue[language]}
          >
            <Users className="h-6 w-6" />
            <div>
              <div className="font-semibold">{translations.joinQueue[language]}</div>
              <div className="text-sm opacity-90">{translations.skipTheWait[language]}</div>
            </div>
          </ProfessionalButton>

          <ProfessionalButton
            variant="outline"
            className="w-full h-16 text-left justify-start space-x-4"
            aria-label={translations.digitalDocuments[language]}
          >
            <FileText className="h-6 w-6" />
            <div>
              <div className="font-semibold">{translations.digitalDocuments[language]}</div>
              <div className="text-sm opacity-90">{translations.accessYourStatements[language]}</div>
            </div>
          </ProfessionalButton>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-4 py-6 text-center">
        <p className="text-sm text-slate-500">© 2024 Millennium BIM. {translations.allRightsReserved[language]}</p>
      </footer>

      {/* Open Account Flow */}
      {activeFlow !== "none" && <OpenAccountFlow onClose={handleCloseFlow} flowType={activeFlow} />}
    </div>
  )
}
