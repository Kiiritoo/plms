import type React from "react"
import { useState } from "react"
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
  Menu,
  X
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Card, CardContent } from "@/Components/ui/card"
import AdminLayout from "@/Layouts/AdminLayout"

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}

