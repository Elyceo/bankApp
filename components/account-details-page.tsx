"use client"
import { useState } from "react"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"
import { Bell, Settings, ArrowUpRight, Eye, EyeOff, Send, AlertTriangle, Upload } from "lucide-react"

interface AccountDetailsPageProps {
  onGoToBankServices: () => void
  onClose: () => void
}

type TabType = "overview" | "documents" // Removed "requests"

// Mock data
const mockUser = {
  name: "João Silva",
  accountNumber: "1234567890",
  balance: 125750.5,
  profilePicture: "/placeholder.svg?height=40&width=40",
}

const mockTransactions = [
  { id: 1, type: "transfer", merchant: "Maria Santos", amount: -2500, date: "2024-01-15", category: "transfer" },
  { id: 2, type: "payment", merchant: "EDM", amount: -850, date: "2024-01-14", category: "utilities" },
  { id: 3, type: "deposit", merchant: "Salary", amount: 45000, date: "2024-01-13", category: "income" },
  { id: 4, type: "payment", merchant: "Shoprite", amount: -1200, date: "2024-01-12", category: "shopping" },
  { id: 5, type: "transfer", merchant: "Pedro Costa", amount: -500, date: "2024-01-11", category: "transfer" },
]

const mockDocuments = {
  identity: [
    { name: "Identity Card", status: "valid", expiryDate: "2025-06-15" },
    { name: "NUIT Certificate", status: "expired", expiryDate: "2024-01-10" },
  ],
  financial: [
    { name: "Income Statement", status: "valid", expiryDate: "2024-12-31" },
    { name: "Tax Records", status: "expiring", expiryDate: "2024-02-28" },
  ],
  bank: [
    { name: "Account Agreement", status: "valid", expiryDate: "2025-12-31" },
    { name: "Monthly Statement", status: "valid", expiryDate: "2024-03-31" },
  ],
}

// Removed mockRequests data

export function AccountDetailsPage({ onGoToBankServices, onClose }: AccountDetailsPageProps) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [showBalance, setShowBalance] = useState(true)
  const [notificationCount] = useState(3)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return translations.goodMorning[language]
    if (hour < 18) return translations.goodAfternoon[language]
    return translations.goodEvening[language]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(amount)
  }

  const maskAccountNumber = (accountNumber: string) => {
    return `****${accountNumber.slice(-4)}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
      case "active":
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800"
      case "expiring":
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
      case "blocked":
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderOverviewTab = () => (
    <div className="space-y-4">
      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{translations.quickActions[language]}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <ProfessionalButton variant="outline" className="h-16" onClick={onGoToBankServices}>
              <span className="text-sm">{translations.bankServices[language]}</span>
            </ProfessionalButton>
            <ProfessionalButton variant="outline" className="h-16" onClick={() => {}}>
              <span className="text-sm">{translations.cardControls[language]}</span>
            </ProfessionalButton>
            <ProfessionalButton variant="outline" className="h-16 col-span-2" onClick={() => {}}>
              <span className="text-sm">{translations.upgradeAccount[language]}</span>
            </ProfessionalButton>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">{translations.recentTransactions[language]}</CardTitle>
          <ProfessionalButton variant="link" size="sm">
            {translations.viewAll[language]}
          </ProfessionalButton>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTransactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${transaction.amount > 0 ? "bg-green-100" : "bg-red-100"}`}>
                    {transaction.amount > 0 ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <Send className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.merchant}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Management Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{translations.accountManagement[language]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">{translations.myCards[language]}</span>
            <Badge className={getStatusColor("active")}>{translations.active[language]}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">{translations.standardAccount[language]}</span>
            <ProfessionalButton variant="link" size="sm">
              {translations.upgradeNow[language]}
            </ProfessionalButton>
          </div>
          <ProfessionalButton variant="outline" size="md" className="w-full" onClick={() => {}}>
            {translations.accountSettings[language]}
          </ProfessionalButton>
        </CardContent>
      </Card>
    </div>
  )

  const getStatusTranslation = (status: string) => {
    return translations[status]?.[language] || status
  }

  const renderDocumentsTab = () => (
    <div className="space-y-4">
      {/* Document Status Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="text-sm">2 {translations.documentsExpiringSoon[language]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{translations.identityDocuments[language]}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDocuments.identity.map((doc, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{doc.name}</span>
                <Badge className={getStatusColor(doc.status)}>{getStatusTranslation(doc.status)}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{translations.financialDocuments[language]}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDocuments.financial.map((doc, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{doc.name}</span>
                <Badge className={getStatusColor(doc.status)}>{getStatusTranslation(doc.status)}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{translations.bankDocuments[language]}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDocuments.bank.map((doc, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{doc.name}</span>
                <Badge className={getStatusColor(doc.status)}>{getStatusTranslation(doc.status)}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardContent className="pt-6">
          <ProfessionalButton size="md" className="w-full" onClick={() => {}}>
            <Upload className="h-4 w-4 mr-2" />
            {translations.uploadNewDocument[language]}
          </ProfessionalButton>
        </CardContent>
      </Card>
    </div>
  )

  // Removed renderRequestsTab function

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Fixed Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <img
              src={mockUser.profilePicture || "/placeholder.svg"}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">{getGreeting()}</p>
              <p className="text-lg font-semibold text-slate-800">{mockUser.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <ProfessionalButton variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </ProfessionalButton>
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {notificationCount}
                </Badge>
              )}
            </div>
            <ProfessionalButton variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </ProfessionalButton>
          </div>
        </div>
      </div>

      {/* Balance Display Card */}
      <div className="px-4 py-4">
        <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">{translations.currentBalance[language]}</span>
              <ProfessionalButton
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </ProfessionalButton>
            </div>
            <p className="text-3xl font-bold mb-2">{showBalance ? formatCurrency(mockUser.balance) : "••••••"}</p>
            <p className="text-sm opacity-90">
              {translations.accountNumber[language]}: {maskAccountNumber(mockUser.accountNumber)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-[73px] z-20">
        <div className="flex px-4">
          {(["overview", "documents"] as TabType[]).map((tab) => (
            <ProfessionalButton
              key={tab}
              variant="ghost"
              className={`flex-1 rounded-none border-b-2 ${
                activeTab === tab ? "border-primary-600 text-primary-600" : "border-transparent text-slate-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {translations[tab][language]}
            </ProfessionalButton>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        {activeTab === "overview" && renderOverviewTab()}
        {activeTab === "documents" && renderDocumentsTab()}
        {/* Removed requests tab content */}
      </div>
    </div>
  )
}
