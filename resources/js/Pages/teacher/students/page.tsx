"use client"

import { useState } from "react"
import { Link } from "@inertiajs/react"
import { ChevronLeft, Download, Filter, MoreHorizontal, Search, UserPlus, FileText } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import TeacherLayout from "../layout"

// Mock student data
const students = [
  {
    id: "1",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    course: "Computer Science",
    status: "active",
    progress: 92,
    lastActive: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    submissionStatus: "early",
    submissionRate: 95,
    lastSubmission: "Yesterday, 2:30 PM",
    submissionStats: {
      early: 12,
      onTime: 8,
      late: 1,
      missing: 0,
    },
  },
  {
    id: "2",
    name: "Ryan Lee",
    email: "ryan.lee@example.com",
    course: "Web Development",
    status: "active",
    progress: 88,
    lastActive: "1 day ago",
    avatar: "/placeholder.svg?height=40&width=40",
    submissionStatus: "early",
    submissionRate: 100,
    lastSubmission: "Today, 9:15 AM",
    submissionStats: {
      early: 15,
      onTime: 6,
      late: 0,
      missing: 0,
    },
  },
  {
    id: "3",
    name: "Sarah Parker",
    email: "sarah.parker@example.com",
    course: "Data Structures",
    status: "active",
    progress: 95,
    lastActive: "3 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    submissionStatus: "on-time",
    submissionRate: 98,
    lastSubmission: "Today, 10:45 AM",
    submissionStats: {
      early: 5,
      onTime: 16,
      late: 0,
      missing: 0,
    },
  },
  {
    id: "4",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    course: "Computer Science",
    status: "at-risk",
    progress: 45,
    lastActive: "5 days ago",
    avatar: "/placeholder.svg?height=40&width=40",
    submissionStatus: "late",
    submissionRate: 65,
    lastSubmission: "Last week, Friday",
    submissionStats: {
      early: 2,
      onTime: 8,
      late: 6,
      missing: 5,
    },
  },
  {
    id: "5",
    name: "Jessica Brown",
    email: "jessica.b@example.com",
    course: "Web Development",
    status: "inactive",
    progress: 20,
    lastActive: "2 weeks ago",
    avatar: "/placeholder.svg?height=40&width=40",
    submissionStatus: "missing",
    submissionRate: 30,
    lastSubmission: "3 weeks ago",
    submissionStats: {
      early: 1,
      onTime: 5,
      late: 2,
      missing: 13,
    },
  },
  {
    id: "6",
    name: "David Kim",
    email: "david.kim@example.com",
    course: "Data Structures",
    status: "at-risk",
    progress: 52,
    lastActive: "4 days ago",
    avatar: "/placeholder.svg?height=40&width=40",
    submissionStatus: "late",
    submissionRate: 72,
    lastSubmission: "Yesterday, 11:59 PM",
    submissionStats: {
      early: 3,
      onTime: 10,
      late: 5,
      missing: 3,
    },
  },
  {
    id: "7",
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    course: "Computer Science",
    status: "active",
    progress: 78,
    lastActive: "1 day ago",
    avatar: "/placeholder.svg?height=40&width=40",
    submissionStatus: "on-time",
    submissionRate: 85,
    lastSubmission: "Yesterday, 4:30 PM",
    submissionStats: {
      early: 7,
      onTime: 12,
      late: 2,
      missing: 0,
    },
  },
  {
    id: "8",
    name: "James Wilson",
    email: "james.w@example.com",
    course: "Web Development",
    status: "inactive",
    progress: 10,
    lastActive: "3 weeks ago",
    avatar: "/placeholder.svg?height=40&width=40",
    submissionStatus: "missing",
    submissionRate: 15,
    lastSubmission: "1 month ago",
    submissionStats: {
      early: 0,
      onTime: 3,
      late: 1,
      missing: 17,
    },
  },
]

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedSubmissionStatus, setSelectedSubmissionStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  // Filter students based on search query, tab, course, and submission status
  const filteredStudents = students.filter((student) => {
    // Filter by search query
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "active" && student.status === "active") ||
      (selectedTab === "at-risk" && student.status === "at-risk") ||
      (selectedTab === "inactive" && student.status === "inactive")

    // Filter by course
    const matchesCourse = selectedCourse === "all" || student.course === selectedCourse

    // Filter by submission status
    const matchesSubmissionStatus =
      selectedSubmissionStatus === "all" || student.submissionStatus === selectedSubmissionStatus

    return matchesSearch && matchesTab && matchesCourse && matchesSubmissionStatus
  })

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "progress":
        comparison = a.progress - b.progress
        break
      case "submissionRate":
        comparison = a.submissionRate - b.submissionRate
        break
      case "lastSubmission":
        // Simple string comparison for demo purposes
        comparison = a.lastSubmission.localeCompare(b.lastSubmission)
        break
      case "early":
        comparison = a.submissionStats.early - b.submissionStats.early
        break
      case "onTime":
        comparison = a.submissionStats.onTime - b.submissionStats.onTime
        break
      case "late":
        comparison = a.submissionStats.late - b.submissionStats.late
        break
      case "missing":
        comparison = a.submissionStats.missing - b.submissionStats.missing
        break
      default:
        comparison = 0
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  // Toggle sort order
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  // Get sort indicator
  const getSortIndicator = (column: string) => {
    if (sortBy !== column) return null
    return sortOrder === "asc" ? "↑" : "↓"
  }

  return (
    <TeacherLayout>
      <div className="space-y-8">
        <div className="container py-6 space-y-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/teacher">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
              Student Management
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 ml-10">View and manage all students enrolled in your courses.</p>

          <Card className="border-0 shadow-md rounded-xl">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Students</CardTitle>
                  <CardDescription>Manage your students and track their progress and submissions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="h-9">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button asChild className="h-9 bg-green-600 hover:bg-green-700">
                    <Link href="/teacher/students/submissions">
                      <FileText className="mr-2 h-4 w-4" />
                      View Submissions
                    </Link>
                  </Button>
                  <Button className="h-9 bg-green-600 hover:bg-green-700">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      type="search"
                      placeholder="Search students..."
                      className="w-full pl-9 rounded-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger className="w-[180px] h-9 rounded-lg">
                        <SelectValue placeholder="Filter by course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Web Development">Web Development</SelectItem>
                        <SelectItem value="Data Structures">Data Structures</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedSubmissionStatus} onValueChange={setSelectedSubmissionStatus}>
                      <SelectTrigger className="w-[180px] h-9 rounded-lg">
                        <SelectValue placeholder="Submission status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Submissions</SelectItem>
                        <SelectItem value="early">Early</SelectItem>
                        <SelectItem value="on-time">On Time</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="missing">Missing</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Students</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="at-risk">At Risk</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-4">
                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                          <tr className="text-left">
                            <th className="px-4 py-3 font-medium cursor-pointer" onClick={() => handleSort("name")}>
                              Student {getSortIndicator("name")}
                            </th>
                            <th className="px-4 py-3 font-medium">Course</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium cursor-pointer" onClick={() => handleSort("progress")}>
                              Progress {getSortIndicator("progress")}
                            </th>
                            <th
                              className="px-4 py-3 font-medium cursor-pointer"
                              onClick={() => handleSort("submissionRate")}
                            >
                              Submission Rate {getSortIndicator("submissionRate")}
                            </th>
                            <th className="px-4 py-3 font-medium">Submission Status</th>
                            <th
                              className="px-4 py-3 font-medium cursor-pointer"
                              onClick={() => handleSort("lastSubmission")}
                            >
                              Last Submission {getSortIndicator("lastSubmission")}
                            </th>
                            <th className="px-4 py-3 font-medium sr-only">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedStudents.length > 0 ? (
                            sortedStudents.map((student) => (
                              <tr key={student.id} className="border-t hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={student.avatar} alt={student.name} />
                                      <AvatarFallback>
                                        {student.name.charAt(0)}
                                        {student.name.split(" ")[1]?.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{student.name}</div>
                                      <div className="text-xs text-slate-500">{student.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">{student.course}</td>
                                <td className="px-4 py-3">
                                  <Badge
                                    variant={
                                      student.status === "active"
                                        ? "default"
                                        : student.status === "at-risk"
                                          ? "destructive"
                                          : "secondary"
                                    }
                                    className="rounded-full"
                                  >
                                    {student.status === "active"
                                      ? "Active"
                                      : student.status === "at-risk"
                                        ? "At Risk"
                                        : "Inactive"}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full max-w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                                      <div
                                        className={`h-full rounded-full ${
                                          student.progress >= 70
                                            ? "bg-green-500"
                                            : student.progress >= 40
                                              ? "bg-amber-500"
                                              : "bg-red-500"
                                        }`}
                                        style={{ width: `${student.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs">{student.progress}%</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full max-w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                                      <div
                                        className={`h-full rounded-full ${
                                          student.submissionRate >= 90
                                            ? "bg-green-500"
                                            : student.submissionRate >= 70
                                              ? "bg-blue-500"
                                              : student.submissionRate >= 50
                                                ? "bg-amber-500"
                                                : "bg-red-500"
                                        }`}
                                        style={{ width: `${student.submissionRate}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs">{student.submissionRate}%</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <Badge
                                    variant="outline"
                                    className={`rounded-full ${
                                      student.submissionStatus === "early"
                                        ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50"
                                        : student.submissionStatus === "on-time"
                                          ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50"
                                          : student.submissionStatus === "late"
                                            ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50"
                                            : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50"
                                    }`}
                                  >
                                    {student.submissionStatus === "early"
                                      ? "Early"
                                      : student.submissionStatus === "on-time"
                                        ? "On Time"
                                        : student.submissionStatus === "late"
                                          ? "Late"
                                          : "Missing"}
                                  </Badge>
                                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                    <span className="text-green-600">{student.submissionStats.early} early</span>
                                    <span>•</span>
                                    <span className="text-blue-600">{student.submissionStats.onTime} on time</span>
                                    <span>•</span>
                                    <span className="text-amber-600">{student.submissionStats.late} late</span>
                                    <span>•</span>
                                    <span className="text-red-600">{student.submissionStats.missing} missing</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-slate-500">{student.lastSubmission}</td>
                                <td className="px-4 py-3 text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                                      <DropdownMenuItem>View Submissions</DropdownMenuItem>
                                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                                      <DropdownMenuItem>View Progress</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                                No students found matching your filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  {/* Other tab contents would be updated similarly */}
                  <TabsContent value="active" className="mt-4">
                    {/* Same table structure as "all" tab but filtered for active students */}
                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                          <tr className="text-left">
                            <th className="px-4 py-3 font-medium cursor-pointer" onClick={() => handleSort("name")}>
                              Student {getSortIndicator("name")}
                            </th>
                            <th className="px-4 py-3 font-medium">Course</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium cursor-pointer" onClick={() => handleSort("progress")}>
                              Progress {getSortIndicator("progress")}
                            </th>
                            <th
                              className="px-4 py-3 font-medium cursor-pointer"
                              onClick={() => handleSort("submissionRate")}
                            >
                              Submission Rate {getSortIndicator("submissionRate")}
                            </th>
                            <th className="px-4 py-3 font-medium">Submission Status</th>
                            <th
                              className="px-4 py-3 font-medium cursor-pointer"
                              onClick={() => handleSort("lastSubmission")}
                            >
                              Last Submission {getSortIndicator("lastSubmission")}
                            </th>
                            <th className="px-4 py-3 font-medium sr-only">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedStudents.length > 0 ? (
                            sortedStudents.map((student) => (
                              <tr key={student.id} className="border-t hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={student.avatar} alt={student.name} />
                                      <AvatarFallback>
                                        {student.name.charAt(0)}
                                        {student.name.split(" ")[1]?.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{student.name}</div>
                                      <div className="text-xs text-slate-500">{student.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">{student.course}</td>
                                <td className="px-4 py-3">
                                  <Badge variant="default" className="rounded-full">
                                    Active
                                  </Badge>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full max-w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                                      <div
                                        className={`h-full rounded-full ${
                                          student.progress >= 70
                                            ? "bg-green-500"
                                            : student.progress >= 40
                                              ? "bg-amber-500"
                                              : "bg-red-500"
                                        }`}
                                        style={{ width: `${student.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs">{student.progress}%</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full max-w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                                      <div
                                        className={`h-full rounded-full ${
                                          student.submissionRate >= 90
                                            ? "bg-green-500"
                                            : student.submissionRate >= 70
                                              ? "bg-blue-500"
                                              : student.submissionRate >= 50
                                                ? "bg-amber-500"
                                                : "bg-red-500"
                                        }`}
                                        style={{ width: `${student.submissionRate}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs">{student.submissionRate}%</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <Badge
                                    variant="outline"
                                    className={`rounded-full ${
                                      student.submissionStatus === "early"
                                        ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50"
                                        : student.submissionStatus === "on-time"
                                          ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50"
                                          : student.submissionStatus === "late"
                                            ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50"
                                            : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50"
                                    }`}
                                  >
                                    {student.submissionStatus === "early"
                                      ? "Early"
                                      : student.submissionStatus === "on-time"
                                        ? "On Time"
                                        : student.submissionStatus === "late"
                                          ? "Late"
                                          : "Missing"}
                                  </Badge>
                                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                    <span className="text-green-600">{student.submissionStats.early} early</span>
                                    <span>•</span>
                                    <span className="text-blue-600">{student.submissionStats.onTime} on time</span>
                                    <span>•</span>
                                    <span className="text-amber-600">{student.submissionStats.late} late</span>
                                    <span>•</span>
                                    <span className="text-red-600">{student.submissionStats.missing} missing</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-slate-500">{student.lastSubmission}</td>
                                <td className="px-4 py-3 text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                                      <DropdownMenuItem>View Submissions</DropdownMenuItem>
                                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                                      <DropdownMenuItem>View Progress</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                                No active students found matching your filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  {/* Update the at-risk and inactive tabs similarly */}
                  <TabsContent value="at-risk" className="mt-4">
                    {/* Same table structure but filtered for at-risk students */}
                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                          <tr className="text-left">
                            <th className="px-4 py-3 font-medium cursor-pointer" onClick={() => handleSort("name")}>
                              Student {getSortIndicator("name")}
                            </th>
                            <th className="px-4 py-3 font-medium">Course</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium cursor-pointer" onClick={() => handleSort("progress")}>
                              Progress {getSortIndicator("progress")}
                            </th>
                            <th
                              className="px-4 py-3 font-medium cursor-pointer"
                              onClick={() => handleSort("submissionRate")}
                            >
                              Submission Rate {getSortIndicator("submissionRate")}
                            </th>
                            <th className="px-4 py-3 font-medium">Submission Status</th>
                            <th
                              className="px-4 py-3 font-medium cursor-pointer"
                              onClick={() => handleSort("lastSubmission")}
                            >
                              Last Submission {getSortIndicator("lastSubmission")}
                            </th>
                            <th className="px-4 py-3 font-medium sr-only">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedStudents.length > 0 ? (
                            sortedStudents.map((student) => (
                              <tr key={student.id} className="border-t hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={student.avatar} alt={student.name} />
                                      <AvatarFallback>
                                        {student.name.charAt(0)}
                                        {student.name.split(" ")[1]?.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{student.name}</div>
                                      <div className="text-xs text-slate-500">{student.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">{student.course}</td>
                                <td className="px-4 py-3">
                                  <Badge variant="destructive" className="rounded-full">
                                    At Risk
                                  </Badge>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full max-w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                                      <div
                                        className="h-full rounded-full bg-amber-500"
                                        style={{ width: `${student.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs">{student.progress}%</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full max-w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                                      <div
                                        className={`h-full rounded-full ${
                                          student.submissionRate >= 90
                                            ? "bg-green-500"
                                            : student.submissionRate >= 70
                                              ? "bg-blue-500"
                                              : student.submissionRate >= 50
                                                ? "bg-amber-500"
                                                : "bg-red-500"
                                        }`}
                                        style={{ width: `${student.submissionRate}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs">{student.submissionRate}%</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <Badge
                                    variant="outline"
                                    className={`rounded-full ${
                                      student.submissionStatus === "early"
                                        ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50"
                                        : student.submissionStatus === "on-time"
                                          ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50"
                                          : student.submissionStatus === "late"
                                            ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50"
                                            : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50"
                                    }`}
                                  >
                                    {student.submissionStatus === "early"
                                      ? "Early"
                                      : student.submissionStatus === "on-time"
                                        ? "On Time"
                                        : student.submissionStatus === "late"
                                          ? "Late"
                                          : "Missing"}
                                  </Badge>
                                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                    <span className="text-green-600">{student.submissionStats.early} early</span>
                                    <span>•</span>
                                    <span className="text-blue-600">{student.submissionStats.onTime} on time</span>
                                    <span>•</span>
                                    <span className="text-amber-600">{student.submissionStats.late} late</span>
                                    <span>•</span>
                                    <span className="text-red-600">{student.submissionStats.missing} missing</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-slate-500">{student.lastSubmission}</td>
                                <td className="px-4 py-3 text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                                      <DropdownMenuItem>View Submissions</DropdownMenuItem>
                                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                                      <DropdownMenuItem>View Progress</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                                No at-risk students found matching your filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="inactive" className="mt-4">
                    {/* Same table structure but filtered for inactive students */}
                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                          <tr className="text-left">
                            <th className="px-4 py-3 font-medium cursor-pointer" onClick={() => handleSort("name")}>
                              Student {getSortIndicator("name")}
                            </th>
                            <th className="px-4 py-3 font-medium">Course</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium cursor-pointer" onClick={() => handleSort("progress")}>
                              Progress {getSortIndicator("progress")}
                            </th>
                            <th
                              className="px-4 py-3 font-medium cursor-pointer"
                              onClick={() => handleSort("submissionRate")}
                            >
                              Submission Rate {getSortIndicator("submissionRate")}
                            </th>
                            <th className="px-4 py-3 font-medium">Submission Status</th>
                            <th
                              className="px-4 py-3 font-medium cursor-pointer"
                              onClick={() => handleSort("lastSubmission")}
                            >
                              Last Submission {getSortIndicator("lastSubmission")}
                            </th>
                            <th className="px-4 py-3 font-medium sr-only">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedStudents.length > 0 ? (
                            sortedStudents.map((student) => (
                              <tr key={student.id} className="border-t hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={student.avatar} alt={student.name} />
                                      <AvatarFallback>
                                        {student.name.charAt(0)}
                                        {student.name.split(" ")[1]?.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{student.name}</div>
                                      <div className="text-xs text-slate-500">{student.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">{student.course}</td>
                                <td className="px-4 py-3">
                                  <Badge variant="secondary" className="rounded-full">
                                    Inactive
                                  </Badge>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full max-w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                                      <div
                                        className="h-full rounded-full bg-red-500"
                                        style={{ width: `${student.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs">{student.progress}%</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full max-w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                                      <div
                                        className={`h-full rounded-full ${
                                          student.submissionRate >= 90
                                            ? "bg-green-500"
                                            : student.submissionRate >= 70
                                              ? "bg-blue-500"
                                              : student.submissionRate >= 50
                                                ? "bg-amber-500"
                                                : "bg-red-500"
                                        }`}
                                        style={{ width: `${student.submissionRate}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs">{student.submissionRate}%</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <Badge
                                    variant="outline"
                                    className={`rounded-full ${
                                      student.submissionStatus === "early"
                                        ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50"
                                        : student.submissionStatus === "on-time"
                                          ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50"
                                          : student.submissionStatus === "late"
                                            ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50"
                                            : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50"
                                    }`}
                                  >
                                    {student.submissionStatus === "early"
                                      ? "Early"
                                      : student.submissionStatus === "on-time"
                                        ? "On Time"
                                        : student.submissionStatus === "late"
                                          ? "Late"
                                          : "Missing"}
                                  </Badge>
                                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                    <span className="text-green-600">{student.submissionStats.early} early</span>
                                    <span>•</span>
                                    <span className="text-blue-600">{student.submissionStats.onTime} on time</span>
                                    <span>•</span>
                                    <span className="text-amber-600">{student.submissionStats.late} late</span>
                                    <span>•</span>
                                    <span className="text-red-600">{student.submissionStats.missing} missing</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-slate-500">{student.lastSubmission}</td>
                                <td className="px-4 py-3 text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                                      <DropdownMenuItem>View Submissions</DropdownMenuItem>
                                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                                      <DropdownMenuItem>View Progress</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                                No inactive students found matching your filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeacherLayout>
  )
}

