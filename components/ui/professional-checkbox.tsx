"use client"
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProfessionalCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const ProfessionalCheckbox = React.forwardRef<HTMLInputElement, ProfessionalCheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex items-start space-x-3">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={checkboxId}
            className={cn(
              "peer h-4 w-4 shrink-0 rounded border-2 border-slate-300 bg-white",
              "focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-0",
              "checked:bg-primary-600 checked:border-primary-600",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-colors duration-200",
              className,
            )}
            ref={ref}
            {...props}
          />
          <Check className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5 top-0.5" />
        </div>
        <label htmlFor={checkboxId} className="text-base text-slate-700 cursor-pointer select-none leading-5">
          {label}
        </label>
      </div>
    )
  },
)
ProfessionalCheckbox.displayName = "ProfessionalCheckbox"

export { ProfessionalCheckbox }
