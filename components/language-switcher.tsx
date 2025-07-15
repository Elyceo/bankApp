"use client"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/components/language-context"
import { cn } from "@/lib/utils" // Import cn for conditional class names

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const handleToggle = (checked: boolean) => {
    setLanguage(checked ? "pt" : "en")
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-2">
      <span className={cn("text-sm font-medium", language === "en" ? "text-primary-600" : "text-slate-500")}>EN</span>
      <Switch
        id="language-switch"
        checked={language === "pt"}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-primary-600 data-[state=unchecked]:bg-slate-300"
      />
      <span className={cn("text-sm font-medium", language === "pt" ? "text-primary-600" : "text-slate-500")}>PT</span>
    </div>
  )
}
