"use client"
import { useState } from "react"
import { PersonalDetailsStep } from "./steps/personal-details-step"
import { IdentificationDetailsStep } from "./steps/identification-details-step"
import { DocumentUploadsStep } from "./steps/document-uploads-step"
import { AdditionalInfoStep } from "./steps/additional-info-step"
import { ProgressBar } from "@/components/ui/progress-bar"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"

interface MultiStepAccountApplicationProps {
  onSubmit: (data: any) => void
  onBack: () => void // This onBack is for the overall flow, not step-specific
}

export function MultiStepAccountApplication({ onSubmit, onBack }: MultiStepAccountApplicationProps) {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<any>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps = [
    translations.personalDetails[language],
    translations.identificationDetails[language],
    translations.documentUploads[language],
    translations.additionalInformation[language],
  ]

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
    setErrors({}) // Clear errors when moving to next step
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
    setErrors({}) // Clear errors when moving back
  }

  const handleFinalSubmit = () => {
    onSubmit(formData)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalDetailsStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            onNext={handleNext}
            onBack={onBack} // This back button goes to the previous flow step (AccountTypeSelection)
          />
        )
      case 1:
        return (
          <IdentificationDetailsStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <DocumentUploadsStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <AdditionalInfoStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            onSubmit={handleFinalSubmit}
            onBack={handleBack}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <ProgressBar steps={steps} currentStep={currentStep} />
      {renderStepContent()}
    </div>
  )
}
