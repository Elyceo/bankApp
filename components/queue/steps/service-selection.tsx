"use client"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"
import { Clock, FileText, CreditCard, Users, Banknote, Building } from "lucide-react"
import type { Branch, Service } from "../join-queue-flow"

interface ServiceSelectionProps {
  branch: Branch
  onSelectService: (service: Service) => void
  onBack: () => void
}

// Mock services available in Mozambican banks
const mockServices: Service[] = [
  {
    id: "1",
    name: "Account Opening",
    category: "accounts",
    estimatedTime: 20,
    requiresDocuments: true,
    description: "Open new savings or current account",
  },
  {
    id: "2",
    name: "Cash Deposit",
    category: "transactions",
    estimatedTime: 5,
    requiresDocuments: false,
    description: "Deposit cash into your account",
  },
  {
    id: "3",
    name: "Cash Withdrawal",
    category: "transactions",
    estimatedTime: 5,
    requiresDocuments: true,
    description: "Withdraw cash from your account",
  },
  {
    id: "4",
    name: "Money Transfer",
    category: "transfers",
    estimatedTime: 10,
    requiresDocuments: true,
    description: "Send money to another account",
  },
  {
    id: "5",
    name: "Card Services",
    category: "cards",
    estimatedTime: 15,
    requiresDocuments: true,
    description: "Apply for or manage debit/credit cards",
  },
  {
    id: "6",
    name: "Loan Application",
    category: "loans",
    estimatedTime: 30,
    requiresDocuments: true,
    description: "Apply for personal or business loan",
  },
  {
    id: "7",
    name: "Account Statement",
    category: "statements",
    estimatedTime: 8,
    requiresDocuments: true,
    description: "Request account statements",
  },
  {
    id: "8",
    name: "Foreign Exchange",
    category: "forex",
    estimatedTime: 12,
    requiresDocuments: true,
    description: "Currency exchange services",
  },
]

export function ServiceSelection({ branch, onSelectService, onBack }: ServiceSelectionProps) {
  const { language } = useLanguage()

  const getServiceIcon = (category: string) => {
    switch (category) {
      case "accounts":
        return <Building className="h-5 w-5" />
      case "transactions":
        return <Banknote className="h-5 w-5" />
      case "transfers":
        return <Users className="h-5 w-5" />
      case "cards":
        return <CreditCard className="h-5 w-5" />
      case "loans":
        return <FileText className="h-5 w-5" />
      case "statements":
        return <FileText className="h-5 w-5" />
      case "forex":
        return <Banknote className="h-5 w-5" />
      default:
        return <Building className="h-5 w-5" />
    }
  }

  const getTranslatedServiceName = (service: Service) => {
    const serviceTranslations: { [key: string]: { en: string; pt: string } } = {
      "Account Opening": { en: "Account Opening", pt: "Abertura de Conta" },
      "Cash Deposit": { en: "Cash Deposit", pt: "Depósito em Dinheiro" },
      "Cash Withdrawal": { en: "Cash Withdrawal", pt: "Levantamento de Dinheiro" },
      "Money Transfer": { en: "Money Transfer", pt: "Transferência de Dinheiro" },
      "Card Services": { en: "Card Services", pt: "Serviços de Cartão" },
      "Loan Application": { en: "Loan Application", pt: "Pedido de Empréstimo" },
      "Account Statement": { en: "Account Statement", pt: "Extrato de Conta" },
      "Foreign Exchange": { en: "Foreign Exchange", pt: "Câmbio de Moeda" },
    }
    return serviceTranslations[service.name]?.[language] || service.name
  }

  const getTranslatedDescription = (service: Service) => {
    const descriptionTranslations: { [key: string]: { en: string; pt: string } } = {
      "Open new savings or current account": {
        en: "Open new savings or current account",
        pt: "Abrir nova conta poupança ou corrente",
      },
      "Deposit cash into your account": { en: "Deposit cash into your account", pt: "Depositar dinheiro na sua conta" },
      "Withdraw cash from your account": {
        en: "Withdraw cash from your account",
        pt: "Levantar dinheiro da sua conta",
      },
      "Send money to another account": { en: "Send money to another account", pt: "Enviar dinheiro para outra conta" },
      "Apply for or manage debit/credit cards": {
        en: "Apply for or manage debit/credit cards",
        pt: "Solicitar ou gerir cartões de débito/crédito",
      },
      "Apply for personal or business loan": {
        en: "Apply for personal or business loan",
        pt: "Solicitar empréstimo pessoal ou empresarial",
      },
      "Request account statements": { en: "Request account statements", pt: "Solicitar extratos de conta" },
      "Currency exchange services": { en: "Currency exchange services", pt: "Serviços de câmbio de moeda" },
    }
    return descriptionTranslations[service.description]?.[language] || service.description
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-2">{translations.selectServiceNeeded[language]}</h2>
        <p className="text-base text-slate-600">
          {translations.selectedBranch[language]}: <span className="font-medium">{branch.name}</span>
        </p>
      </div>

      <div className="grid gap-3">
        {mockServices.map((service) => (
          <Card key={service.id} className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-2 bg-primary-50 rounded-lg text-primary-600">
                  {getServiceIcon(service.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-800 text-sm">{getTranslatedServiceName(service)}</h3>
                    <div className="flex items-center text-xs text-slate-500 ml-2">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{service.estimatedTime} min</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">{getTranslatedDescription(service)}</p>
                  <div className="flex items-center justify-between">
                    {service.requiresDocuments && (
                      <Badge variant="outline" className="text-xs">
                        {translations.documentsRequired[language]}
                      </Badge>
                    )}
                    <ProfessionalButton size="sm" className="ml-auto" onClick={() => onSelectService(service)}>
                      {translations.select[language]}
                    </ProfessionalButton>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
