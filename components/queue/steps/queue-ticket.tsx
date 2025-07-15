"use client"
import { useState, useEffect } from "react"
import { ProfessionalButton } from "@/components/ui/professional-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"
import { Clock, Users, MapPin, Ticket, AlertCircle, CheckCircle } from "lucide-react"
import type { QueueTicketData } from "../join-queue-flow"

interface QueueTicketProps {
  ticket: QueueTicketData
  onCancel: () => void
  onClose: () => void
  onBack: () => void
}

// Mock data for recent service times
const mockRecentServiceTimes = [
  { customerNumber: "MB123456", serviceTime: 8, completedAt: "14:25" },
  { customerNumber: "MB123457", serviceTime: 12, completedAt: "14:18" },
  { customerNumber: "MB123458", serviceTime: 6, completedAt: "14:10" },
  { customerNumber: "MB123459", serviceTime: 15, completedAt: "14:02" },
  { customerNumber: "MB123460", serviceTime: 9, completedAt: "13:55" },
]

export function QueueTicket({ ticket, onCancel, onClose, onBack }: QueueTicketProps) {
  const { language } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [position, setPosition] = useState(ticket.position)
  const [estimatedWait, setEstimatedWait] = useState(ticket.estimatedWaitTime)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate queue movement
      if (Math.random() > 0.7 && position > 1) {
        setPosition((prev) => prev - 1)
        setEstimatedWait((prev) => Math.max(prev - 5, 5))
      }
    }, 60000)

    return () => clearInterval(timer)
  }, [position])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-MZ", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return translations.active[language]
      case "cancelled":
        return translations.cancelled[language]
      case "completed":
        return translations.completed[language]
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-5 w-5" />
      case "cancelled":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Ticket className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      {/* Main Ticket Card */}
      <Card className="shadow-lg border-primary-200 bg-gradient-to-br from-white to-primary-50">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-2">
            {getStatusIcon(ticket.status)}
            <CardTitle className="text-2xl font-bold text-primary-600 ml-2">{ticket.ticketNumber}</CardTitle>
          </div>
          <Badge className={getStatusColor(ticket.status)}>{getStatusText(ticket.status)}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-800 mb-1">{position}</div>
            <p className="text-sm text-slate-600">{translations.peopleAheadOfYou[language]}</p>
          </div>

          <div className="flex items-center justify-center space-x-4 py-3 bg-white rounded-lg">
            <div className="text-center">
              <div className="text-xl font-semibold text-primary-600">{estimatedWait} min</div>
              <p className="text-xs text-slate-600">{translations.estimatedWait[language]}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center text-slate-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{ticket.branch.name}</span>
            </div>
            <div className="flex items-center text-slate-600">
              <Users className="h-4 w-4 mr-2" />
              <span>
                {translations.service[language]}: {ticket.service.name}
              </span>
            </div>
            <div className="flex items-center text-slate-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>
                {translations.issuedAt[language]}: {formatTime(ticket.issuedAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Queue Information */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            {translations.queueInformation[language]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">{translations.currentTime[language]}:</span>
            <span className="font-medium">{formatTime(currentTime)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">{translations.totalInQueue[language]}:</span>
            <span className="font-medium">{ticket.branch.currentQueue}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">{translations.averageServiceTime[language]}:</span>
            <span className="font-medium">{ticket.service.estimatedTime} min</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Service Times */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">
            {translations.recentServiceTimes[language]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockRecentServiceTimes.map((service, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">{service.customerNumber}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{service.serviceTime} min</div>
                  <div className="text-xs text-slate-500">{service.completedAt}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        {ticket.status === "active" && (
          <ProfessionalButton
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-50"
            onClick={onCancel}
          >
            {translations.cancelTicket[language]}
          </ProfessionalButton>
        )}

        <ProfessionalButton className="w-full" onClick={onClose}>
          {ticket.status === "cancelled" ? translations.close[language] : translations.keepTicketActive[language]}
        </ProfessionalButton>
      </div>

      {/* Important Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">{translations.importantNotice[language]}</p>
              <p>{translations.arriveOnTimeNotice[language]}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
