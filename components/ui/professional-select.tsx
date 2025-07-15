"use client"
import * as React from "react"
import { ChevronDown, Info } from "lucide-react" // Import Info icon
import { cn } from "@/lib/utils"

export interface ProfessionalSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  infoText?: string // Changed from helperText to infoText
  options: { value: string; label: string }[]
  placeholder?: string
  onValueChange?: (value: string) => void // Explicitly define for custom handling
}

const ProfessionalSelect = React.forwardRef<HTMLSelectElement, ProfessionalSelectProps>(
  ({ className, label, error, infoText, options, placeholder, id, onValueChange, onChange, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    const infoTextId = `${selectId}-info`
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

    const handleNativeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      // Call the custom onValueChange prop
      if (onValueChange) {
        onValueChange(event.target.value)
      }
      // Also call the original onChange prop if it was provided (e.g., for form libraries)
      if (onChange) {
        onChange(event)
      }
    }

    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={selectId} className="block text-sm font-medium text-slate-700">
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
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              "flex h-12 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 !text-base", // Added !text-base
              "focus:border-primary-500 focus:outline-none focus:ring-primary-500/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-colors duration-200",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className,
            )}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${selectId}-error` : showInfo ? infoTextId : undefined}
            onChange={handleNativeChange} // Use the new handler
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        {error && (
          <p id={`${selectId}-error`} className="text-sm text-red-600" role="alert">
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
ProfessionalSelect.displayName = "ProfessionalSelect"

export { ProfessionalSelect }
