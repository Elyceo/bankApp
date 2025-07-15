"use client"
import { useState } from "react"
import { BranchSelection } from "./steps/branch-selection"
import { ServiceSelection } from "./steps/service-selection"
import { QueueTicket } from "./steps/queue-ticket"
import { ProgressBar } from "@/components/ui/progress-bar"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { ArrowLeft, X } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"

interface JoinQueueFlowProps {
  onClose: () => void
}

export type Branch = {
  id: string
  name: string
  address: string
  city: string
  openHours: string
  currentQueue: number
  averageWaitTime: number
  status: "open" | "closed" | "busy"
}

export type Service = {
  id: string
  name: string
  category: string
  estimatedTime: number
  requiresDocuments: boolean
  description: string
}

export type QueueTicketData = {
  ticketNumber: string
  branch: Branch
  service: Service
  position: number
  estimatedWaitTime: number
  issuedAt: Date
  status: "active" | "cancelled" | "completed"
}

export function JoinQueueFlow({ onClose }: JoinQueueFlowProps) {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [queueTicket, setQueueTicket] = useState<QueueTicketData | null>(null)

  const steps = [
    translations.selectBranch[language],
    translations.selectService[language],
    translations.queueTicket[language],
  ]

  const handleNext = () => setCurrentStep((prev) => prev + 1)
  const handleBack = () => setCurrentStep((prev) => prev - 1)

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch)
    handleNext()
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    // Generate queue ticket
    const ticket: QueueTicketData = {
      ticketNumber: `MB${Date.now().toString().slice(-6)}`,
      branch: selectedBranch!,
      service: service,
      position: Math.floor(Math.random() * 15) + 1, // Mock position
      estimatedWaitTime: (Math.floor(Math.random() * 15) + 1) * 5, // Mock wait time
      issuedAt: new Date(),
      status: "active",
    }
    setQueueTicket(ticket)
    handleNext()
  }

  const handleCancelTicket = () => {
    if (queueTicket) {
      setQueueTicket({ ...queueTicket, status: "cancelled" })
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BranchSelection onSelectBranch={handleBranchSelect} />
      case 1:
        return <ServiceSelection branch={selectedBranch!} onSelectService={handleServiceSelect} onBack={handleBack} />
      case 2:
        return <QueueTicket ticket={queueTicket!} onCancel={handleCancelTicket} onClose={onClose} onBack={handleBack} />
      default:
        return null
    }
  }

  const getHeaderTitle = () => {
    switch (currentStep) {
      case 0:
        return translations.selectBranch[language]
      case 1:
        return translations.selectService[language]
      case 2:
        return translations.yourQueueTicket[language]
      default:
        return translations.joinQueue[language]
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white text-gray-900">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        {currentStep > 0 && currentStep < 2 && (
          <ProfessionalButton size="icon" variant="ghost" onClick={handleBack} aria-label="Go back">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </ProfessionalButton>
        )}
        <h2 className="flex-grow text-center text-lg font-semibold">{getHeaderTitle()}</h2>
        <ProfessionalButton size="icon" variant="ghost" onClick={onClose} aria-label="Close">
          <X className="h-6 w-6 text-gray-600" />
        </ProfessionalButton>
      </header>

      {currentStep < 2 && (
        <div className="px-4 py-2">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">{renderStep()}</div>
    </div>
  )
}
