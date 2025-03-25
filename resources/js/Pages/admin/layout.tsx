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
  Shield,
  ScrollText,
  Sparkles,
  X
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Card, CardContent } from "@/Components/ui/card"
import { ThemeProvider } from "@/Components/theme-provider"

export const metadata: Metadata = {
  title: "Admin Dashboard | LMS Tels",
  description: "System administration and management for LMS Tels",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white dark:bg-slate-950 px-6 shadow-sm">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              LMS Tels
            </span>
            <span className="rounded-md bg-red-100 dark:bg-red-900 px-2 py-0.5 text-xs font-medium text-red-600 dark:text-red-400">
              Admin
            </span>
          </Link>
          <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
            <Link href="/admin" className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400">
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Users
            </Link>
            <Link
              href="/admin/courses"
              className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Courses
            </Link>
            <Link
              href="/admin/analytics"
              className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Analytics
            </Link>
            <Link
              href="/admin/settings"
              className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-4 md:ml-auto">
            <Button
              variant="outline"
              size="icon"
              className="relative rounded-full border-blue-200 dark:border-blue-800"
            >
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                5
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 rounded-full">
                  <Avatar className="h-8 w-8 border-2 border-blue-100 dark:border-blue-800">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-flex font-medium">Admin</span>
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
                Admin Portal
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">System management & control</p>
            </div>
            <nav className="grid gap-1 px-2">
              <Link href="/admin">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <LayoutDashboard className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  <span>User Management</span>
                </Button>
              </Link>
              <Link href="/admin/courses">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  <span>Course Management</span>
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  <span>Analytics & Reports</span>
                </Button>
              </Link>
              <Link href="/admin/logs">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <ScrollText className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  <span>System Logs</span>
                </Button>
              </Link>
              <Link href="/admin/content">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  <span>Content Moderation</span>
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 h-12 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <Settings className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  <span>System Settings</span>
                </Button>
              </Link>
            </nav>
            <div className="mt-auto p-4">
              <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800 rounded-xl shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <p className="text-sm font-medium text-red-700 dark:text-red-300">Admin Access</p>
                    </div>
                    <p className="text-xs text-red-600/80 dark:text-red-400/80">
                      You have full system privileges. Use with caution.
                    </p>
                    <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                      Security Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
          <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950 p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}

