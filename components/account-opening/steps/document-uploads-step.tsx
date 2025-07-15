"use client"
import type React from "react"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"

interface DocumentUploadsStepProps {
  formData: any
  setFormData: (data: any) => void
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
  onNext: () => void
  onBack: () => void
}

export function DocumentUploadsStep({
  formData,
  setFormData,
  errors,
  setErrors,
  onNext,
  onBack,
}: DocumentUploadsStepProps) {
  const { language } = useLanguage()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev: any) => ({
        ...prev,
        [fieldName]: e.target.files[0],
      }))
      setErrors((prev) => ({ ...prev, [fieldName]: "" }))
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [fieldName]: null,
      }))
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.nuitDocument) newErrors.nuitDocument = translations.nuitDocumentRequired[language]
    if (!formData.idCardDocument) newErrors.idCardDocument = translations.idCardRequired[language]
    if (!formData.residentialProofDocument)
      newErrors.residentialProofDocument = translations.residentialProofRequired[language]

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      onNext()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">{translations.documentUploads[language]}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nuitDocument" className="block text-sm font-medium text-slate-700">
              {translations.uploadNuitDocument[language]}
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            </Label>
            <Input id="nuitDocument" type="file" onChange={(e) => handleFileChange(e, "nuitDocument")} required />
            {formData.nuitDocument && <p className="text-sm text-slate-500">Selected: {formData.nuitDocument.name}</p>}
            {errors.nuitDocument && <p className="text-red-500 text-xs mt-1">{errors.nuitDocument}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="idCardDocument" className="block text-sm font-medium text-slate-700">
              {translations.uploadIdCard[language]}
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            </Label>
            <Input id="idCardDocument" type="file" onChange={(e) => handleFileChange(e, "idCardDocument")} required />
            {formData.idCardDocument && (
              <p className="text-sm text-slate-500">Selected: {formData.idCardDocument.name}</p>
            )}
            {errors.idCardDocument && <p className="text-red-500 text-xs mt-1">{errors.idCardDocument}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="residentialProofDocument" className="block text-sm font-medium text-slate-700">
              {translations.uploadResidentialProof[language]}
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            </Label>
            <Input
              id="residentialProofDocument"
              type="file"
              onChange={(e) => handleFileChange(e, "residentialProofDocument")}
              required
            />
            {formData.residentialProofDocument && (
              <p className="text-sm text-slate-500">Selected: {formData.residentialProofDocument.name}</p>
            )}
            {errors.residentialProofDocument && (
              <p className="text-red-500 text-xs mt-1">{errors.residentialProofDocument}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="otherSupportingDocument" className="block text-sm font-medium text-slate-700">
              {translations.otherSupportingDocument[language]}
            </Label>
            <Input
              id="otherSupportingDocument"
              type="file"
              onChange={(e) => handleFileChange(e, "otherSupportingDocument")}
            />
            {formData.otherSupportingDocument && (
              <p className="text-sm text-slate-500">Selected: {formData.otherSupportingDocument.name}</p>
            )}
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
