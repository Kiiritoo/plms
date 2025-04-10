"use client"

import { useState } from "react"
import {
  BookOpen,
  Search,
  MoreHorizontal,
  Download,
  Trash2,
  Edit,
  Plus,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Clock,
  Calendar,
  Users,
  GraduationCap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Badge } from "@/Components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import AdminPageLayout from "../layout"

interface Course {
  id: string;
  title: string;
  department: string;
  instructor: string;
  instructorAvatar: string;
  students: number;
  status: 'active' | 'draft' | 'archived';
  lastUpdated: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

// Sample course data
const courses: Course[] = [
  {
    id: "1",
    title: "Introduction to Programming",
    department: "Computer Science",
    instructor: "John Doe",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=JD",
    students: 120,
    status: "active",
    lastUpdated: "Today, 10:30 AM",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
    createdAt: "Jan 15, 2025",
  },
  {
    id: "2",
    title: "Web Development Basics",
    department: "Computer Science",
    instructor: "Jane Smith",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=JS",
    students: 85,
    status: "active",
    lastUpdated: "Yesterday, 3:45 PM",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
    createdAt: "Jan 15, 2025",
  },
  {
    id: "3",
    title: "Data Science Fundamentals",
    department: "Computer Science",
    instructor: "Mike Johnson",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=MJ",
    students: 0,
    status: "draft",
    lastUpdated: "2 days ago",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
    createdAt: "Jan 15, 2025",
  },
  {
    id: "4",
    title: "Business Ethics",
    department: "Business",
    instructor: "Prof. Davis",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=PD",
    students: 75,
    status: "draft",
    lastUpdated: "1 week ago",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
    createdAt: "Jan 15, 2025",
  },
  {
    id: "5",
    title: "Organic Chemistry",
    department: "Chemistry",
    instructor: "Dr. Miller",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=DM",
    students: 60,
    status: "archived",
    lastUpdated: "3 months ago",
    startDate: "Aug 15, 2024",
    endDate: "Dec 20, 2024",
    createdAt: "Aug 15, 2024",
  },
  {
    id: "6",
    title: "World History",
    department: "History",
    instructor: "Prof. Wilson",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=PW",
    students: 95,
    status: "active",
    lastUpdated: "Today, 9:15 AM",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
    createdAt: "Jan 15, 2025",
  },
  {
    id: "7",
    title: "Introduction to Artificial Intelligence",
    department: "Computer Science",
    instructor: "Dr. Lee",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=DL",
    students: 110,
    status: "active",
    lastUpdated: "Yesterday, 11:20 AM",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
    createdAt: "Jan 15, 2025",
  },
]

// Helper function to get status badge
const getStatusBadge = (status: 'active' | 'draft' | 'archived') => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-600 hover:bg-green-700">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Active
        </Badge>
      )
    case "draft":
      return (
        <Badge className="bg-amber-600 hover:bg-amber-700">
          <AlertCircle className="mr-1 h-3 w-3" />
          Draft
        </Badge>
      )
    case "archived":
      return (
        <Badge className="bg-slate-600 hover:bg-slate-700">
          <XCircle className="mr-1 h-3 w-3" />
          Archived
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Filter courses based on search query and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment =
      departmentFilter === "all" || course.department.toLowerCase() === departmentFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || course.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourse(course)
    setIsDeleteDialogOpen(true)
  }

  return (
    <AdminPageLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent">
              Course Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Manage all courses and their content</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md shadow-red-200 dark:shadow-red-900/20">
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-xl shadow-sm border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <CardDescription>All available courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">24</div>
                <BookOpen className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-xs text-green-600 mt-2">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-sm border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <CardDescription>Currently running courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">18</div>
                <BookOpen className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-xs text-green-600 mt-2">+8% from last month</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-sm border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Students</CardTitle>
              <CardDescription>Total student enrollments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">1,234</div>
                <Users className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-xs text-green-600 mt-2">+15% from last month</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-sm border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Course Completion Rate</CardTitle>
              <CardDescription>Average completion rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">85%</div>
                <GraduationCap className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-xs text-green-600 mt-2">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-xl shadow-sm border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Courses</CardTitle>
                <CardDescription>Manage and monitor all courses</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search courses..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>
                      <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>{course.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  )
}

