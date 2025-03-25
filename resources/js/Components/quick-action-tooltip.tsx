"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function QuickActionTooltip() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if the user has already seen the tooltip
    const hasSeenTooltip = localStorage.getItem("hasSeenQuickActionTooltip")

    if (!hasSeenTooltip && !isDismissed) {
      // Show tooltip after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isDismissed])

  const dismissTooltip = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem("hasSeenQuickActionTooltip", "true")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 right-6 z-50 max-w-xs bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 border border-blue-200 dark:border-blue-800 animate-fade-in">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1 h-6 w-6 text-slate-500"
        onClick={dismissTooltip}
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <span className="text-blue-600 dark:text-blue-400 text-lg font-bold">💡</span>
        </div>
        <div>
          <h3 className="font-medium text-sm">Quick Actions Available!</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Use this floating button for quick access to common actions from anywhere in the dashboard.
          </p>
          <div className="mt-2 flex justify-end">
            <Button size="sm" variant="outline" className="text-xs h-7 rounded-full" onClick={dismissTooltip}>
              Got it
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

