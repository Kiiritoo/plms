"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function KeyboardShortcutHandler() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger shortcuts when Command/Ctrl key is pressed
      if (!(e.metaKey || e.ctrlKey)) return

      // Don't trigger shortcuts when typing in input fields
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) return

      switch (e.key) {
        case "n":
          e.preventDefault()
          router.push("/teacher/courses/new")
          break
        case "a":
          e.preventDefault()
          router.push("/teacher/assignments/new")
          break
        case "m":
          e.preventDefault()
          router.push("/teacher/announcements/new")
          break
        case "s":
          e.preventDefault()
          router.push("/teacher/students")
          break
        case "u":
          e.preventDefault()
          router.push("/teacher/materials/upload")
          break
        case "d":
          e.preventDefault()
          router.push("/teacher")
          break
        case "g":
          e.preventDefault()
          router.push("/teacher/gradebook")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return null
}

