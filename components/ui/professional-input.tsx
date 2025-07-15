"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react" // Import Info icon

export interface ProfessionalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  infoText?: string // Changed from helperText to infoText
}

const ProfessionalInput = React.forwardRef<HTMLInputElement, ProfessionalInputProps>(
  ({ className, type, label, error, infoText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const infoTextId = `${inputId}-info`
    const [showInfo, setShowInfo] = React.useState(false)
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const toggleInfo = () => {
      setShowInfo((prev) => !prev)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    React.useEffect(() => {
      if (showInfo) {
        timeoutRef.current = setTimeout(() => {
          setShowInfo(false)
        }, 8000) // Hide after 8 seconds
      }
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [showInfo])

    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
              {label}
              {props.required && (
                <span className="text-red-500 ml-1" aria-label="required">
                  *
                </span>
              )}
            </label>
          )}
          {infoText && (
            <button
              type="button"
              onClick={toggleInfo}
              className="text-slate-500 hover:text-primary-600 transition-colors duration-200"
              aria-expanded={showInfo}
              aria-controls={infoTextId}
              aria-label="Show information"
            >
              <Info className="h-4 w-4" />
            </button>
          )}
        </div>
        <input
          type={type}
          id={inputId}
          className={cn(
            "flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 !text-base", // Added !text-base
            "placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors duration-200",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : showInfo ? infoTextId : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {showInfo && infoText && (
          <p id={infoTextId} className="text-sm text-slate-500 animate-fade-in-out" role="status">
            {infoText}
          </p>
        )}
      </div>
    )
  },
)
ProfessionalInput.displayName = "ProfessionalInput"

export { ProfessionalInput }
