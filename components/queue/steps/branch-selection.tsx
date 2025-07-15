"use client"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"
import { MapPin, Clock, Users } from "lucide-react"
import type { Branch } from "../join-queue-flow"

interface BranchSelectionProps {
  onSelectBranch: (branch: Branch) => void
}

// Mock data for Mozambican branches
const mockBranches: Branch[] = [
  {
    id: "1",
    name: "Maputo Centro",
    address: "Av. 25 de Setembro, 420",
    city: "Maputo",
    openHours: "08:00 - 16:00",
    currentQueue: 12,
    averageWaitTime: 25,
    status: "open",
  },
  {
    id: "2",
    name: "Parque dos Poetas",
    address: "Av. Vladimir Lenine, 174",
    city: "Maputo",
    openHours: "08:00 - 16:00",
    currentQueue: 8,
    averageWaitTime: 15,
    status: "open",
  },
  {
    id: "3",
    name: "Beira Centro",
    address: "Rua Major Serpa Pinto, 55",
    city: "Beira",
    openHours: "08:00 - 15:30",
    currentQueue: 15,
    averageWaitTime: 35,
    status: "busy",
  },
  {
    id: "4",
    name: "Nampula",
    address: "Av. Eduardo Mondlane, 678",
    city: "Nampula",
    openHours: "08:00 - 15:30",
    currentQueue: 6,
    averageWaitTime: 12,
    status: "open",
  },
  {
    id: "5",
    name: "Matola Shopping",
    address: "Matola Shopping Center",
    city: "Matola",
    openHours: "09:00 - 18:00",
    currentQueue: 20,
    averageWaitTime: 45,
    status: "busy",
  },
]

export function BranchSelection({ onSelectBranch }: BranchSelectionProps) {
  const { language } = useLanguage()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return translations.open[language]
      case "busy":
        return translations.busy[language]
      case "closed":
        return translations.closed[language]
      default:
        return status
    }
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-2">{translations.selectBranchToVisit[language]}</h2>
        <p className="text-base text-slate-600">{translations.chooseNearestBranch[language]}</p>
      </div>

      {mockBranches.map((branch) => (
        <Card key={branch.id} className="shadow-md border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-slate-800 mb-1">{branch.name}</CardTitle>
                <div className="flex items-center text-sm text-slate-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {branch.address}, {branch.city}
                  </span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{branch.openHours}</span>
                </div>
              </div>
              <Badge className={getStatusColor(branch.status)}>{getStatusText(branch.status)}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-sm text-slate-600">
                <Users className="h-4 w-4 mr-1" />
                <span>
                  {branch.currentQueue} {translations.inQueue[language]}
                </span>
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-medium">{branch.averageWaitTime} min</span>
                <span className="ml-1">{translations.avgWait[language]}</span>
              </div>
            </div>
            <ProfessionalButton
              className="w-full"
              onClick={() => onSelectBranch(branch)}
              disabled={branch.status === "closed"}
            >
              {branch.status === "closed" ? translations.closed[language] : translations.selectBranch[language]}
            </ProfessionalButton>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
