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
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample course data
const courses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    department: "Computer Science",
    instructor: "Dr. Smith",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=DS",
    students: 120,
    status: "active",
    lastUpdated: "Today, 10:30 AM",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
  },
  {
    id: 2,
    title: "Calculus I",
    department: "Mathematics",
    instructor: "Prof. Johnson",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=PJ",
    students: 85,
    status: "active",
    lastUpdated: "Yesterday, 3:45 PM",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
  },
  {
    id: 3,
    title: "Introduction to Psychology",
    department: "Psychology",
    instructor: "Dr. Williams",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=DW",
    students: 150,
    status: "active",
    lastUpdated: "2 days ago",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
  },
  {
    id: 4,
    title: "Business Ethics",
    department: "Business",
    instructor: "Prof. Davis",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=PD",
    students: 75,
    status: "draft",
    lastUpdated: "1 week ago",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
  },
  {
    id: 5,
    title: "Organic Chemistry",
    department: "Chemistry",
    instructor: "Dr. Miller",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=DM",
    students: 60,
    status: "archived",
    lastUpdated: "3 months ago",
    startDate: "Aug 15, 2024",
    endDate: "Dec 20, 2024",
  },
  {
    id: 6,
    title: "World History",
    department: "History",
    instructor: "Prof. Wilson",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=PW",
    students: 95,
    status: "active",
    lastUpdated: "Today, 9:15 AM",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
  },
  {
    id: 7,
    title: "Introduction to Artificial Intelligence",
    department: "Computer Science",
    instructor: "Dr. Lee",
    instructorAvatar: "/placeholder.svg?height=40&width=40&text=DL",
    students: 110,
    status: "active",
    lastUpdated: "Yesterday, 11:20 AM",
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
  },
]

// Helper function to get status badge
const getStatusBadge = (status) => {
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
  const [selectedCourse, setSelectedCourse] = useState(null)
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

  const handleDeleteCourse = (course) => {
    setSelectedCourse(course)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Course Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Manage all courses and their content</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200 dark:shadow-blue-900/20"
            onClick={() => (window.location.href = "/admin/courses/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        </div>
      </div>

      <Card className="rounded-xl shadow-md border-0">
        <CardHeader className="pb-2">
          <CardTitle>Courses</CardTitle>
          <CardDescription>Manage course content and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-blue-300/70" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-8 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px] rounded-lg">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="computer science">Computer Science</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="psychology">Psychology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] rounded-lg">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="rounded-lg">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-lg">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
                    <div className="flex items-center gap-1">
                      Course
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Instructor
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No courses found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="font-medium">{course.title}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {course.startDate} - {course.endDate}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-800">
                            <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                            <AvatarFallback>
                              {course.instructor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{course.instructor}</span>
                        </div>
                      </TableCell>
                      <TableCell>{course.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-slate-500" />
                          <span>{course.students}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(course.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-500" />
                          <span>{course.lastUpdated}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl">
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              View Course
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Course
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600 dark:text-red-400"
                              onClick={() => handleDeleteCourse(course)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Course
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-slate-50 dark:bg-slate-900">
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium">{selectedCourse.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedCourse.department} • {selectedCourse.students} students enrolled
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Deleting this course will remove all associated content, assignments, and student data.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsDeleteDialogOpen(false)}>
              Delete Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

