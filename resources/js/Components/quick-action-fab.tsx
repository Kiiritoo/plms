"use client"

import { useState } from "react"
import { router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Plus, X, FileText, GraduationCap, MessageSquare, Users, BookOpen } from "lucide-react"

export function QuickActionFAB() {
  const [isOpen, setIsOpen] = useState(false)

  const handleAction = (path: string) => {
    router.visit(path)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`absolute bottom-0 right-0 space-y-2 transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-50"
          onClick={() => handleAction("/teacher/assignments/new")}
        >
          <FileText className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-50"
          onClick={() => handleAction("/teacher/courses/new")}
        >
          <GraduationCap className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-50"
          onClick={() => handleAction("/teacher/announcements/new")}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-50"
          onClick={() => handleAction("/teacher/students")}
        >
          <Users className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-50"
          onClick={() => handleAction("/teacher/materials/upload")}
        >
          <BookOpen className="h-5 w-5" />
        </Button>
      </div>
      <Button
        variant="outline"
        size="icon"
        className={`h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg transition-transform duration-300 hover:bg-blue-700 ${isOpen ? "rotate-45" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  )
}

