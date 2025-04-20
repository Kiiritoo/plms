import type React from "react"
import { useState } from "react"
import { Link } from "@inertiajs/react"
import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LineChart,
  LogOut,
  Settings,
  Users,
  FileText,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white dark:bg-slate-950 shadow-sm transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="flex h-16 items-center justify-between border-b px-6 lg:hidden">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Teacher Portal
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent hidden lg:block">
            Teacher Portal
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 hidden lg:block">Manage your courses and students</p>
        </div>
        <nav className="grid gap-1 px-2">
          <Link href="/teacher">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              <LayoutDashboard className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              <span>Dashboard</span>
            </Button>
          </Link>
          <Link href="/teacher/courses">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              <span>Courses</span>
            </Button>
          </Link>
          <Link href="/teacher/students">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              <span>Students</span>
            </Button>
          </Link>
          <Link href="/teacher/analytics">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              <span>Analytics</span>
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1">
        <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-white px-4 dark:border-slate-800 dark:bg-slate-950 lg:px-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/teacher" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Teacher Portal
            </span>
          </Link>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

