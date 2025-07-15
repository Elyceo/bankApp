"use client"
import type React from "react"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { ProfessionalCheckbox } from "@/components/ui/professional-checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"
import { ProfessionalSelect } from "@/components/ui/professional-select"

interface AdditionalInfoStepProps {
  formData: any
  setFormData: (data: any) => void
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
  onSubmit: () => void
  onBack: () => void
}

export function AdditionalInfoStep({
  formData,
  setFormData,
  errors,
  setErrors,
  onSubmit,
  onBack,
}: AdditionalInfoStepProps) {
  const { language } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
    setErrors((prev) => ({ ...prev, [id]: "" }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }))
    setErrors((prev) => ({ ...prev, [id]: "" }))
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.acceptConditions) newErrors.acceptConditions = translations.acceptConditionsRequired[language]

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      onSubmit()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          {translations.additionalInformation[language]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 2nd Account Holder */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-800">{translations.secondAccountHolder[language]}</h3>
            <ProfessionalSelect
              label="" // No label needed as the heading serves this purpose
              onValueChange={(val) => handleSelectChange("secondAccountHolder", val)}
              value={formData.secondAccountHolder || ""}
              options={[
                { value: "Yes", label: translations.yes[language] },
                { value: "No", label: translations.no[language] },
              ]}
              placeholder={translations.selectOption[language]}
              error={errors.secondAccountHolder}
            />
          </div>

          {/* General Conditions */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-800">{translations.generalConditions[language]}</h3>
            <p className="text-base text-primary-600 hover:underline">
              <a href="#" target="_blank" rel="noopener noreferrer">
                {translations.clickHereForConditions[language]}
              </a>
            </p>
            <ProfessionalCheckbox
              id="acceptConditions"
              label={translations.acceptConditions[language]}
              checked={formData.acceptConditions || false}
              onChange={handleChange}
              required
            />
            {errors.acceptConditions && <p className="text-red-500 text-xs mt-1">{errors.acceptConditions}</p>}
          </div>

          <div className="flex justify-between mt-6">
            <ProfessionalButton type="button" variant="outline" onClick={onBack}>
              {translations.back[language]}
            </ProfessionalButton>
            <ProfessionalButton type="submit" className="ml-auto">
              {translations.submitApplication[language]}
            </ProfessionalButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
