"use client"
import type React from "react"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { ProfessionalInput } from "@/components/ui/professional-input"
import { ProfessionalSelect } from "@/components/ui/professional-select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"

interface PersonalDetailsStepProps {
  formData: any
  setFormData: (data: any) => void
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
  onNext: () => void
  onBack: () => void
}

export function PersonalDetailsStep({
  formData,
  setFormData,
  errors,
  setErrors,
  onNext,
  onBack,
}: PersonalDetailsStepProps) {
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
    if (!formData.branch) newErrors.branch = translations.branchRequired[language]
    if (!formData.fullName) newErrors.fullName = translations.fullNameRequired[language]
    if (!formData.telephone) newErrors.telephone = translations.phoneNumberRequired[language]
    if (!/^\d{9}$/.test(formData.telephone)) newErrors.telephone = translations.invalidPhoneNumber[language]
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = translations.invalidEmailFormat[language]
    if (!formData.address) newErrors.address = translations.addressRequired[language]
    if (!formData.town) newErrors.town = translations.townRequired[language]
    if (!formData.district) newErrors.district = translations.districtRequired[language]
    if (!formData.province) newErrors.province = translations.provinceRequired[language]
    if (!formData.gender) newErrors.gender = translations.genderRequired[language]

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
        <CardTitle className="text-lg font-semibold text-slate-800">{translations.personalDetails[language]}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Branch Selection */}
          <div>
            <ProfessionalSelect
              label={translations.branch[language]}
              onValueChange={(val) => handleSelectChange("branch", val)}
              value={formData.branch || ""}
              options={[
                { value: "Parque dos Poetas", label: "Parque dos Poetas" },
                { value: "Maputo Centro", label: "Maputo Centro" },
                { value: "Beira", label: "Beira" },
                { value: "Nampula", label: "Nampula" },
              ]}
              placeholder={translations.selectBranch[language]}
              required
              error={errors.branch}
            />
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ProfessionalSelect
                label={translations.title[language]}
                onValueChange={(val) => handleSelectChange("title", val)}
                value={formData.title || ""}
                options={[
                  { value: "Mr", label: "Mr" },
                  { value: "Ms", label: "Ms" },
                  { value: "Mrs", label: "Mrs" },
                  { value: "Dr", label: "Dr" },
                ]}
                placeholder={translations.select[language]}
                error={errors.title}
              />
            </div>
            <div className="col-span-2">
              <ProfessionalInput
                id="fullName"
                label={translations.fullName[language]}
                value={formData.fullName || ""}
                onChange={handleChange}
                required
                error={errors.fullName}
              />
            </div>
            <div className="col-span-2">
              <ProfessionalInput
                id="shortName"
                label={translations.shortName[language]}
                value={formData.shortName || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <ProfessionalSelect
                label={translations.gender[language]}
                onValueChange={(val) => handleSelectChange("gender", val)}
                value={formData.gender || ""}
                options={[
                  { value: "M", label: translations.male[language] },
                  { value: "F", label: translations.female[language] },
                ]}
                placeholder={translations.selectGender[language]}
                required
                error={errors.gender}
              />
            </div>
            <div className="col-span-2">
              <ProfessionalInput
                id="address"
                label={translations.address[language]}
                value={formData.address || ""}
                onChange={handleChange}
                required
                error={errors.address}
              />
            </div>
            <div>
              <ProfessionalInput
                id="town"
                label={translations.town[language]}
                value={formData.town || ""}
                onChange={handleChange}
                required
                error={errors.town}
              />
            </div>
            <div>
              <ProfessionalInput
                id="district"
                label={translations.district[language]}
                value={formData.district || ""}
                onChange={handleChange}
                required
                error={errors.district}
              />
            </div>
            <div>
              <ProfessionalInput
                id="province"
                label={translations.province[language]}
                value={formData.province || ""}
                onChange={handleChange}
                required
                error={errors.province}
              />
            </div>
            <div>
              <ProfessionalInput
                id="country"
                label={translations.country[language]}
                value={formData.country || "Mozambique"}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="col-span-2">
              <ProfessionalInput
                id="telephone"
                label={translations.telephone[language]}
                type="tel"
                value={formData.telephone || ""}
                onChange={handleChange}
                required
                error={errors.telephone}
                infoText={translations.enterMozambicanNumber[language]}
              />
            </div>
            <div className="col-span-2">
              <ProfessionalInput
                id="email"
                label={translations.email[language]}
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
                error={errors.email}
                infoText={translations.checkEmailForCode[language]}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <ProfessionalButton type="submit" className="ml-auto">
              {translations.next[language]}
            </ProfessionalButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
