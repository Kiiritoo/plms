import type React from "react"
import type { Metadata } from "next"
import { Link } from "@inertiajs/react"
import { 
  LayoutDashboard, 
  Book, 
  FileText, 
  GraduationCap,
  Sparkles,
  X 
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { ThemeProvider } from "@/Components/theme-provider"

export const metadata: Metadata = {
  title: "LMS Tels - Student Dashboard",
  description: "Access your courses, assignments, and academic progress",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}

