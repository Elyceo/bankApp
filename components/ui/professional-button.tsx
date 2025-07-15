"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg",
        secondary: "bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50 active:bg-primary-100",
        outline: "border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100",
        ghost: "text-slate-700 hover:bg-slate-100 active:bg-slate-200",
        link: "text-blue-600 underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-10 px-4 py-2",
        md: "h-12 px-6 py-3",
        lg: "h-14 px-8 py-4",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

export interface ProfessionalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const ProfessionalButton = React.forwardRef<HTMLButtonElement, ProfessionalButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
ProfessionalButton.displayName = "ProfessionalButton"

export { ProfessionalButton, buttonVariants }
