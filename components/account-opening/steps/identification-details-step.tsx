"use client"
import type React from "react"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { ProfessionalInput } from "@/components/ui/professional-input"
import { ProfessionalSelect } from "@/components/ui/professional-select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"

interface IdentificationDetailsStepProps {
  formData: any
  setFormData: (data: any) => void
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
  onNext: () => void
  onBack: () => void
}

export function IdentificationDetailsStep({
  formData,
  setFormData,
  errors,
  setErrors,
  onNext,
  onBack,
}: IdentificationDetailsStepProps) {
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
    setFormData((prev: any) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: "" }))
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.idType) newErrors.idType = translations.idTypeRequired[language]
    if (!formData.idNumber) newErrors.idNumber = translations.idNumberRequired[language]
    if (!formData.idIssueDate) newErrors.idIssueDate = translations.issueDateRequired[language]
    if (!formData.idExpiryDate) newErrors.idExpiryDate = translations.expiryDateRequired[language]
    if (!formData.idPlaceOfIssue) newErrors.idPlaceOfIssue = translations.placeOfIssueRequired[language]
    if (!formData.nuit) newErrors.nuit = translations.nuitRequired[language]
    if (!formData.dob) newErrors.dob = translations.dobRequired[language]
    if (!formData.pob) newErrors.pob = translations.pobRequired[language]
    if (!formData.nationality) newErrors.nationality = translations.nationalityRequired[language]
    if (!formData.maritalStatus) newErrors.maritalStatus = translations.maritalStatusRequired[language]

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      onNext()
    }
  }

  const maritalStatusOptions = [
    { value: "Single", translationKey: "single" },
    { value: "Common-law Marriage", translationKey: "commonLawMarriage" },
    { value: "Married", translationKey: "married" },
    { value: "Divorced", translationKey: "divorced" },
    { value: "Widowed", translationKey: "widowed" },
  ]

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          {translations.identificationDetails[language]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <ProfessionalSelect
                label={translations.idType[language]}
                onValueChange={(val) => handleSelectChange("idType", val)}
                value={formData.idType || ""}
                options={[
                  { value: "ID", label: translations.id[language] },
                  { value: "Passport", label: translations.passport[language] },
                  { value: "Other", label: translations.other[language] },
                ]}
                placeholder={translations.selectIdType[language]}
                required
                error={errors.idType}
              />
            </div>
            <div className="col-span-2">
              <ProfessionalInput
                id="idNumber"
                label={translations.idNumber[language]}
                value={formData.idNumber || ""}
                onChange={handleChange}
                required
                error={errors.idNumber}
              />
            </div>
            <div>
              <ProfessionalInput
                id="idIssueDate"
                label={translations.dateOfIssue[language]}
                type="date"
                value={formData.idIssueDate || ""}
                onChange={handleChange}
                required
                error={errors.idIssueDate}
              />
            </div>
            <div>
              <ProfessionalInput
                id="idExpiryDate"
                label={translations.expiryDate[language]}
                type="date"
                value={formData.idExpiryDate || ""}
                onChange={handleChange}
                required
                error={errors.idExpiryDate}
              />
            </div>
            <div className="col-span-2">
              <ProfessionalInput
                id="idPlaceOfIssue"
                label={translations.placeOfIssue[language]}
                value={formData.idPlaceOfIssue || ""}
                onChange={handleChange}
                required
                error={errors.idPlaceOfIssue}
              />
            </div>
            <div className="col-span-2">
              <ProfessionalInput
                id="nuit"
                label={translations.nuit[language]}
                value={formData.nuit || ""}
                onChange={handleChange}
                required
                error={errors.nuit}
              />
            </div>
            <div>
              <ProfessionalInput
                id="dob"
                label={translations.dateOfBirth[language]}
                type="date"
                value={formData.dob || ""}
                onChange={handleChange}
                required
                error={errors.dob}
              />
            </div>
            <div>
              <ProfessionalInput
                id="pob"
                label={translations.placeOfBirth[language]}
                value={formData.pob || ""}
                onChange={handleChange}
                required
                error={errors.pob}
              />
            </div>
            <div className="col-span-2">
              <ProfessionalInput
                id="nationality"
                label={translations.nationality[language]}
                value={formData.nationality || "Mozambican"}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="col-span-2">
              <ProfessionalSelect
                label={translations.maritalStatus[language]}
                onValueChange={(val) => handleSelectChange("maritalStatus", val)}
                value={formData.maritalStatus || ""}
                options={maritalStatusOptions.map((option) => ({
                  value: option.value,
                  label: translations[option.translationKey][language],
                }))}
                placeholder={translations.selectMaritalStatus[language]}
                required
                error={errors.maritalStatus}
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <ProfessionalButton type="button" variant="outline" onClick={onBack}>
              {translations.back[language]}
            </ProfessionalButton>
            <ProfessionalButton type="submit" className="ml-auto">
              {translations.next[language]}
            </ProfessionalButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
