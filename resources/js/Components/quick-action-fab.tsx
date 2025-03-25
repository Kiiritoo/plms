"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, X, FileText, GraduationCap, MessageSquare, Users, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActionFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleAction = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-2">
      {isOpen && (
        <>
          <Button
            onClick={() => handleAction("/teacher/materials/upload")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
            size="icon"
            aria-label="Upload Material"
          >
            <BookOpen className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => handleAction("/teacher/students")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
            size="icon"
            aria-label="Manage Students"
          >
            <Users className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => handleAction("/teacher/announcements/new")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
            size="icon"
            aria-label="Send Announcement"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => handleAction("/teacher/assignments/new")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
            size="icon"
            aria-label="Create Assignment"
          >
            <FileText className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => handleAction("/teacher/courses/new")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            size="icon"
            aria-label="Create Course"
          >
            <GraduationCap className="h-5 w-5" />
          </Button>
        </>
      )}
      <Button
        onClick={toggleMenu}
        className={`flex items-center justify-center w-14 h-14 rounded-full ${
          isOpen ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
        } text-white shadow-lg transition-all duration-200`}
        size="icon"
        aria-label={isOpen ? "Close menu" : "Open quick actions"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  )
}

