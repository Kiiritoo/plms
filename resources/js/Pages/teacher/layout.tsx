import type React from "react"
import type { Metadata } from "next"
import { Link } from "@inertiajs/react"
import {
  Bell,
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LineChart,
  LogOut,
  Settings,
  Users,
  FileText,
  HelpCircle,
  Sparkles,
  X
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Card, CardContent } from "@/Components/ui/card"
import { ThemeProvider } from "@/Components/theme-provider"
import { KeyboardShortcutHandler } from "@/Components/keyboard-shortcut-handler"
import { QuickActionFAB } from "@/Components/quick-action-fab"
import { QuickActionTooltip } from "@/Components/quick-action-tooltip"

export const metadata: Metadata = {
  title: "Teacher Dashboard | LMS Tels",
  description: "Manage your courses and students with ease",
}

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <KeyboardShortcutHandler />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white dark:bg-slate-950 px-6 shadow-sm">
          <Link href="/teacher" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              LMS Tels
            </span>
            <span className="rounded-md bg-blue-100 dark:bg-blue-900 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
              Teacher
            </span>
          </Link>
          <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
            <Link
              href="/teacher"
              className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Dashboard
            </Link>
            <Link
              href="/teacher/courses"
              className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Courses
            </Link>
            <Link
              href="/teacher/students"
              className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Students
            </Link>
            <Link
              href="/teacher/analytics"
              className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Analytics
            </Link>
            <Link
              href="/teacher/assignments"
              className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Assignments
            </Link>
          </nav>
          <div className="flex items-center gap-4 md:ml-auto">
            <Button
              variant="outline"
              size="icon"
              className="relative rounded-full border-blue-200 dark:border-blue-800"
            >
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 rounded-full">
                  <Avatar className="h-8 w-8 border-2 border-blue-100 dark:border-blue-800">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Teacher" />
                    <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      TC
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-flex font-medium">Dr. Smith</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                <DropdownMenuItem className="rounded-lg cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="hidden lg:flex h-[calc(100vh-4rem)] w-64 flex-col border-r bg-white dark:bg-slate-950 shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Teacher Portal
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Manage your courses and students</p>
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
              <Link href="/teacher/assignments">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  <span>Assignments</span>
                </Button>
              </Link>
            </nav>
            <div className="mt-auto p-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 rounded-xl shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Need help?</p>
                    </div>
                    <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
                      Check our teacher resources or contact support
                    </p>
                    <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      View Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
          <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950 p-6">{children}</main>
        </div>
      </div>
      <QuickActionFAB />
      <QuickActionTooltip />
    </ThemeProvider>
  )
}

