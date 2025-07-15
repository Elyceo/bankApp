"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import type React from "react"

import { ProfessionalButton } from "@/components/ui/professional-button"
import { ProfessionalInput } from "@/components/ui/professional-input"
import { ProfessionalSelect } from "@/components/ui/professional-select"
import { ProfessionalRadio } from "@/components/ui/professional-radio"
import { ProfessionalCheckbox } from "@/components/ui/professional-checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context" // Import useLanguage hook
import { translations } from "@/lib/translations" // Import translations

interface AccountApplicationFormProps {
  onSubmit: (data: any) => void
  onBack: () => void
}

export function AccountApplicationForm({ onSubmit, onBack }: AccountApplicationFormProps) {
  const { language } = useLanguage() // Use language context
  const [formData, setFormData] = useState({
    branch: "", // New field
    title: "",
    fullName: "",
    shortName: "",
    gender: "",
    address: "",
    town: "",
    district: "",
    province: "",
    country: "Mozambique",
    telephone: "",
    email: "",
    idType: "",
    idNumber: "",
    idIssueDate: "",
    idExpiryDate: "",
    idPlaceOfIssue: "",
    nuit: "",
    dob: "",
    pob: "",
    nationality: "Mozambican",
    maritalStatus: "",
    secondAccountHolder: "", // New field
    acceptConditions: false, // New field
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // State for uploaded documents
  const [nuitDocument, setNuitDocument] = useState<File | null>(null)
  const [idCardDocument, setIdCardDocument] = useState<File | null>(null)
  const [residentialProofDocument, setResidentialProofDocument] = useState<File | null>(null)
  const [otherSupportingDocument, setOtherSupportingDocument] = useState<File | null>(null) // Assuming one "other" document for now

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
    setErrors((prev) => ({ ...prev, [id]: "" })) // Clear error on change
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: "" })) // Clear error on change
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0])
      setErrors((prev) => ({ ...prev, [e.target.id]: "" })) // Clear error on change
    } else {
      setter(null)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Branch
    if (!formData.branch) newErrors.branch = translations.branchRequired[language]

    // Personal Details validation
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

    // Identification Details validation
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

    // Document Uploads validation
    if (!nuitDocument) newErrors.nuitDocument = translations.nuitDocumentRequired[language]
    if (!idCardDocument) newErrors.idCardDocument = translations.idCardRequired[language]
    if (!residentialProofDocument) newErrors.residentialProofDocument = translations.residentialProofRequired[language]

    // General Conditions
    if (!formData.acceptConditions) newErrors.acceptConditions = translations.acceptConditionsRequired[language]

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const fullFormData = {
        ...formData,
        nuitDocument: nuitDocument?.name, // In a real app, you'd send the File object
        idCardDocument: idCardDocument?.name,
        residentialProofDocument: residentialProofDocument?.name,
        otherSupportingDocument: otherSupportingDocument?.name,
      }
      onSubmit(fullFormData)
    }
  }

  // Define marital status options with their corresponding translation keys
  const maritalStatusOptions = [
    { value: "Single", translationKey: "single" },
    { value: "Common-law Marriage", translationKey: "commonLawMarriage" },
    { value: "Married", translationKey: "married" },
    { value: "Divorced", translationKey: "divorced" },
    { value: "Widowed", translationKey: "widowed" },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            {translations.accountOpening[language]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Branch Selection */}
            <div>
              <ProfessionalSelect
                label={translations.branch[language]}
                onValueChange={(val) => handleSelectChange("branch", val)}
                value={formData.branch}
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">{translations.personalDetails[language]}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ProfessionalSelect
                    label={translations.title[language]}
                    onValueChange={(val) => handleSelectChange("title", val)}
                    value={formData.title}
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
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    error={errors.fullName}
                  />
                </div>
                <div className="col-span-2">
                  <ProfessionalInput
                    id="shortName"
                    label={translations.shortName[language]}
                    value={formData.shortName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <Label className="block text-sm font-medium text-slate-700 mb-2">
                    {translations.gender[language]}
                  </Label>
                  <div className="flex gap-4">
                    <ProfessionalRadio
                      id="gender-m"
                      name="gender"
                      label="M"
                      value="M"
                      checked={formData.gender === "M"}
                      onChange={handleChange}
                    />
                    <ProfessionalRadio
                      id="gender-f"
                      name="gender"
                      label="F"
                      value="F"
                      checked={formData.gender === "F"}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
                <div className="col-span-2">
                  <ProfessionalInput
                    id="address"
                    label={translations.address[language]}
                    value={formData.address}
                    onChange={handleChange}
                    required
                    error={errors.address}
                  />
                </div>
                <div>
                  <ProfessionalInput
                    id="town"
                    label={translations.town[language]}
                    value={formData.town}
                    onChange={handleChange}
                    required
                    error={errors.town}
                  />
                </div>
                <div>
                  <ProfessionalInput
                    id="district"
                    label={translations.district[language]}
                    value={formData.district}
                    onChange={handleChange}
                    required
                    error={errors.district}
                  />
                </div>
                <div>
                  <ProfessionalInput
                    id="province"
                    label={translations.province[language]}
                    value={formData.province}
                    onChange={handleChange}
                    required
                    error={errors.province}
                  />
                </div>
                <div>
                  <ProfessionalInput
                    id="country"
                    label={translations.country[language]}
                    value={formData.country}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="col-span-2">
                  <ProfessionalInput
                    id="telephone"
                    label={translations.telephone[language]}
                    type="tel"
                    value={formData.telephone}
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
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    infoText={translations.checkEmailForCode[language]}
                  />
                </div>
              </div>
            </div>

            {/* Identification Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">{translations.identificationDetails[language]}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <ProfessionalSelect
                    label={translations.idType[language]}
                    onValueChange={(val) => handleSelectChange("idType", val)}
                    value={formData.idType}
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
                    value={formData.idNumber}
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
                    value={formData.idIssueDate}
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
                    value={formData.idExpiryDate}
                    onChange={handleChange}
                    required
                    error={errors.idExpiryDate}
                  />
                </div>
                <div className="col-span-2">
                  <ProfessionalInput
                    id="idPlaceOfIssue"
                    label={translations.placeOfIssue[language]}
                    value={formData.idPlaceOfIssue}
                    onChange={handleChange}
                    required
                    error={errors.idPlaceOfIssue}
                  />
                </div>
                <div className="col-span-2">
                  <ProfessionalInput
                    id="nuit"
                    label={translations.nuit[language]}
                    value={formData.nuit}
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
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    error={errors.dob}
                  />
                </div>
                <div>
                  <ProfessionalInput
                    id="pob"
                    label={translations.placeOfBirth[language]}
                    value={formData.pob}
                    onChange={handleChange}
                    required
                    error={errors.pob}
                  />
                </div>
                <div className="col-span-2">
                  <ProfessionalInput
                    id="nationality"
                    label={translations.nationality[language]}
                    value={formData.nationality}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="col-span-2">
                  <Label className="block text-sm font-medium text-slate-700 mb-2">
                    {translations.maritalStatus[language]}
                  </Label>
                  <div className="flex flex-wrap gap-4">
                    {maritalStatusOptions.map((option) => (
                      <ProfessionalRadio
                        key={option.value}
                        id={`marital-${option.value.toLowerCase().replace(/\s/g, "-")}`}
                        name="maritalStatus"
                        label={translations[option.translationKey][language]}
                        value={option.value}
                        checked={formData.maritalStatus === option.value}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                  {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
                </div>
              </div>
            </div>

            {/* Document Uploads */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">{translations.documentUploads[language]}</h3>
              <div className="space-y-2">
                <Label htmlFor="nuitDocument" className="block text-sm font-medium text-slate-700">
                  {translations.uploadNuitDocument[language]}
                  <span className="text-red-500 ml-1" aria-label="required">
                    *
                  </span>
                </Label>
                <Input id="nuitDocument" type="file" onChange={(e) => handleFileChange(e, setNuitDocument)} required />
                {nuitDocument && <p className="text-sm text-slate-500">Selected: {nuitDocument.name}</p>}
                {errors.nuitDocument && <p className="text-red-500 text-xs mt-1">{errors.nuitDocument}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="idCardDocument" className="block text-sm font-medium text-slate-700">
                  {translations.uploadIdCard[language]}
                  <span className="text-red-500 ml-1" aria-label="required">
                    *
                  </span>
                </Label>
                <Input
                  id="idCardDocument"
                  type="file"
                  onChange={(e) => handleFileChange(e, setIdCardDocument)}
                  required
                />
                {idCardDocument && <p className="text-sm text-slate-500">Selected: {idCardDocument.name}</p>}
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
                  onChange={(e) => handleFileChange(e, setResidentialProofDocument)}
                  required
                />
                {residentialProofDocument && (
                  <p className="text-sm text-slate-500">Selected: {residentialProofDocument.name}</p>
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
                  onChange={(e) => handleFileChange(e, setOtherSupportingDocument)}
                />
                {otherSupportingDocument && (
                  <p className="text-sm text-slate-500">Selected: {otherSupportingDocument.name}</p>
                )}
              </div>
            </div>

            {/* 2nd Account Holder */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800">{translations.secondAccountHolder[language]}</h3>
              <div className="flex gap-4">
                <ProfessionalRadio
                  id="second-account-yes"
                  name="secondAccountHolder"
                  label={translations.yes[language]}
                  value="Yes"
                  checked={formData.secondAccountHolder === "Yes"}
                  onChange={handleChange}
                />
                <ProfessionalRadio
                  id="second-account-no"
                  name="secondAccountHolder"
                  label={translations.no[language]}
                  value="No"
                  checked={formData.secondAccountHolder === "No"}
                  onChange={handleChange}
                />
              </div>
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
                checked={formData.acceptConditions}
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
    </div>
  )
}
