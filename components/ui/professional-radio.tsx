"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProfessionalRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const ProfessionalRadio = React.forwardRef<HTMLInputElement, ProfessionalRadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex items-center space-x-3">
        <input
          type="radio"
          id={radioId}
          className={cn(
            "h-4 w-4 border-2 border-slate-300 text-primary-600",
            "focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors duration-200",
            className,
          )}
          ref={ref}
          {...props}
        />
        <label htmlFor={radioId} className="text-base font-medium text-slate-700 cursor-pointer select-none">
          {label}
        </label>
      </div>
    )
  },
)
ProfessionalRadio.displayName = "ProfessionalRadio"

export { ProfessionalRadio }
