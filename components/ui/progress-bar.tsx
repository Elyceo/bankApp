import React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  steps: string[]
  currentStep: number
}

export function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="w-full flex justify-between items-center mb-6 px-4">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                index <= currentStep ? "bg-primary-600 text-white" : "bg-slate-200 text-slate-500",
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "mt-2 text-xs text-center",
                index <= currentStep ? "text-primary-600 font-medium" : "text-slate-500",
              )}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={cn("flex-1 h-0.5 mx-2", index < currentStep ? "bg-primary-600" : "bg-slate-200")} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
