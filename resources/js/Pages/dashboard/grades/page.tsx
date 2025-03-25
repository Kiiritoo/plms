"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Book,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  User,
  X,
  LucideBarChart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Award,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for grades
const courseGrades = [
  {
    id: 1,
    course: "Mathematics",
    courseCode: "MATH101",
    courseColor: "blue",
    instructor: "Dr. Robert Chen",
    currentGrade: "A-",
    percentage: 91,
    letterGrade: "A-",
    credits: 4,
    gradePoints: 3.7,
    assignments: [
      { name: "Quiz 1", score: 85, maxScore: 100, weight: 10, category: "Quizzes" },
      { name: "Homework 1-3", score: 95, maxScore: 100, weight: 15, category: "Homework" },
      { name: "Midterm Exam", score: 88, maxScore: 100, weight: 25, category: "Exams" },
      { name: "Quiz 2", score: 92, maxScore: 100, weight: 10, category: "Quizzes" },
      { name: "Homework 4-6", score: 97, maxScore: 100, weight: 15, category: "Homework" },
    ],
    remaining: [{ name: "Final Exam", weight: 25, category: "Exams" }],
    trend: "stable",
    lastUpdated: "Oct 10, 2023",
  },
  {
    id: 2,
    course: "Science",
    courseCode: "SCI102",
    courseColor: "green",
    instructor: "Ms. Sarah Johnson",
    currentGrade: "A",
    percentage: 94,
    letterGrade: "A",
    credits: 4,
    gradePoints: 4.0,
    assignments: [
      { name: "Lab Report 1", score: 92, maxScore: 100, weight: 15, category: "Labs" },
      { name: "Quiz 1", score: 88, maxScore: 100, weight: 10, category: "Quizzes" },
      { name: "Midterm Exam", score: 95, maxScore: 100, weight: 25, category: "Exams" },
      { name: "Lab Report 2", score: 94, maxScore: 100, weight: 15, category: "Labs" },
      { name: "Quiz 2", score: 96, maxScore: 100, weight: 10, category: "Quizzes" },
    ],
    remaining: [{ name: "Final Exam", weight: 25, category: "Exams" }],
    trend: "up",
    lastUpdated: "Oct 12, 2023",
  },
  {
    id: 3,
    course: "Literature",
    courseCode: "LIT201",
    courseColor: "purple",
    instructor: "Mr. James Wilson",
    currentGrade: "B+",
    percentage: 87,
    letterGrade: "B+",
    credits: 3,
    gradePoints: 3.3,
    assignments: [
      { name: "Essay 1", score: 85, maxScore: 100, weight: 15, category: "Essays" },
      { name: "Reading Responses", score: 92, maxScore: 100, weight: 10, category: "Participation" },
      { name: "Midterm Paper", score: 84, maxScore: 100, weight: 25, category: "Papers" },
      { name: "Essay 2", score: 88, maxScore: 100, weight: 15, category: "Essays" },
      { name: "Class Discussion", score: 90, maxScore: 100, weight: 10, category: "Participation" },
    ],
    remaining: [{ name: "Final Paper", weight: 25, category: "Papers" }],
    trend: "up",
    lastUpdated: "Oct 8, 2023",
  },
  {
    id: 4,
    course: "History",
    courseCode: "HIST101",
    courseColor: "amber",
    instructor: "Dr. Maria Garcia",
    currentGrade: "A-",
    percentage: 90,
    letterGrade: "A-",
    credits: 3,
    gradePoints: 3.7,
    assignments: [
      { name: "Research Outline", score: 95, maxScore: 100, weight: 10, category: "Research" },
      { name: "Quiz 1", score: 88, maxScore: 100, weight: 10, category: "Quizzes" },
      { name: "Midterm Exam", score: 87, maxScore: 100, weight: 25, category: "Exams" },
      { name: "Research Paper", score: 92, maxScore: 100, weight: 20, category: "Research" },
      { name: "Quiz 2", score: 90, maxScore: 100, weight: 10, category: "Quizzes" },
    ],
    remaining: [{ name: "Final Exam", weight: 25, category: "Exams" }],
    trend: "stable",
    lastUpdated: "Oct 9, 2023",
  },
  {
    id: 5,
    course: "Computer Science",
    courseCode: "CS101",
    courseColor: "indigo",
    instructor: "Mr. David Park",
    currentGrade: "A",
    percentage: 95,
    letterGrade: "A",
    credits: 4,
    gradePoints: 4.0,
    assignments: [
      { name: "Coding Assignment 1", score: 98, maxScore: 100, weight: 15, category: "Coding" },
      { name: "Quiz 1", score: 92, maxScore: 100, weight: 10, category: "Quizzes" },
      { name: "Midterm Project", score: 94, maxScore: 100, weight: 25, category: "Projects" },
      { name: "Coding Assignment 2", score: 96, maxScore: 100, weight: 15, category: "Coding" },
      { name: "Quiz 2", score: 95, maxScore: 100, weight: 10, category: "Quizzes" },
    ],
    remaining: [{ name: "Final Project", weight: 25, category: "Projects" }],
    trend: "up",
    lastUpdated: "Oct 11, 2023",
  },
  {
    id: 6,
    course: "Art",
    courseCode: "ART101",
    courseColor: "pink",
    instructor: "Ms. Emily Chen",
    currentGrade: "B",
    percentage: 83,
    letterGrade: "B",
    credits: 3,
    gradePoints: 3.0,
    assignments: [
      { name: "Sketch Portfolio", score: 80, maxScore: 100, weight: 15, category: "Portfolio" },
      { name: "Art History Quiz", score: 78, maxScore: 100, weight: 10, category: "Quizzes" },
      { name: "Midterm Project", score: 85, maxScore: 100, weight: 25, category: "Projects" },
      { name: "Digital Art Assignment", score: 88, maxScore: 100, weight: 15, category: "Assignments" },
      { name: "Technique Demonstration", score: 82, maxScore: 100, weight: 10, category: "Demonstrations" },
    ],
    remaining: [{ name: "Final Portfolio", weight: 25, category: "Portfolio" }],
    trend: "down",
    lastUpdated: "Oct 7, 2023",
  },
  {
    id: 7,
    course: "Physical Education",
    courseCode: "PE101",
    courseColor: "red",
    instructor: "Coach Thomas Brown",
    currentGrade: "A",
    percentage: 96,
    letterGrade: "A",
    credits: 1,
    gradePoints: 4.0,
    assignments: [
      { name: "Fitness Assessment 1", score: 95, maxScore: 100, weight: 20, category: "Assessments" },
      { name: "Participation", score: 98, maxScore: 100, weight: 30, category: "Participation" },
      { name: "Skill Test 1", score: 92, maxScore: 100, weight: 15, category: "Tests" },
      { name: "Fitness Assessment 2", score: 97, maxScore: 100, weight: 20, category: "Assessments" },
    ],
    remaining: [{ name: "Final Skill Test", weight: 15, category: "Tests" }],
    trend: "stable",
    lastUpdated: "Oct 10, 2023",
  },
  {
    id: 8,
    course: "Foreign Language",
    courseCode: "SPAN101",
    courseColor: "yellow",
    instructor: "Sra. Isabella Rodriguez",
    currentGrade: "B+",
    percentage: 88,
    letterGrade: "B+",
    credits: 3,
    gradePoints: 3.3,
    assignments: [
      { name: "Vocabulary Quiz 1", score: 85, maxScore: 100, weight: 10, category: "Quizzes" },
      { name: "Oral Presentation 1", score: 82, maxScore: 100, weight: 15, category: "Speaking" },
      { name: "Midterm Exam", score: 90, maxScore: 100, weight: 25, category: "Exams" },
      { name: "Written Assignment", score: 88, maxScore: 100, weight: 15, category: "Writing" },
      { name: "Vocabulary Quiz 2", score: 92, maxScore: 100, weight: 10, category: "Quizzes" },
    ],
    remaining: [{ name: "Final Exam", weight: 25, category: "Exams" }],
    trend: "up",
    lastUpdated: "Oct 9, 2023",
  },
]

// Calculate GPA
const calculateGPA = (courses) => {
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
  const totalGradePoints = courses.reduce((sum, course) => sum + course.gradePoints * course.credits, 0)
  return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00"
}

// Grade distribution data for pie chart
const gradeDistribution = [
  { name: "A", value: 3 },
  { name: "B", value: 3 },
  { name: "C", value: 1 },
  { name: "D", value: 0 },
  { name: "F", value: 0 },
]

// Grade trend data for line chart
const gradeTrendData = [
  { name: "Aug", GPA: 3.5 },
  { name: "Sep", GPA: 3.6 },
  { name: "Oct", GPA: 3.7 },
  { name: "Nov", GPA: 3.7 },
  { name: "Dec", GPA: 3.8 },
]

// Colors for pie chart
const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#FF9800", "#F44336"]

export default function GradesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<string>("course")
  const [filterGrade, setFilterGrade] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedTab, setSelectedTab] = useState<string>("current")

  // Calculate current GPA
  const currentGPA = calculateGPA(courseGrades)

  // Filter and sort courses
  const filteredCourses = courseGrades
    .filter((course) => {
      // Filter by grade
      if (filterGrade !== "all") {
        const firstLetter = course.letterGrade.charAt(0)
        if (filterGrade !== firstLetter) return false
      }

      // Filter by search query
      if (
        searchQuery &&
        !course.course.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false

      return true
    })
    .sort((a, b) => {
      if (sortBy === "course") return a.course.localeCompare(b.course)
      if (sortBy === "grade-high") return b.percentage - a.percentage
      if (sortBy === "grade-low") return a.percentage - b.percentage
      if (sortBy === "recent") {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      }
      return 0
    })

  // Helper function to get grade color
  const getGradeColor = (grade: string) => {
    const firstLetter = grade.charAt(0)
    switch (firstLetter) {
      case "A":
        return "text-green-600 dark:text-green-400"
      case "B":
        return "text-blue-600 dark:text-blue-400"
      case "C":
        return "text-yellow-600 dark:text-yellow-400"
      case "D":
        return "text-orange-600 dark:text-orange-400"
      case "F":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  // Helper function to get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "down":
        return <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
      case "stable":
        return <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      default:
        return null
    }
  }

  // Helper function to get course badge color
  const getCourseBadgeClass = (color: string) => {
    const baseClasses = "border bg-opacity-15 text-opacity-90"
    switch (color) {
      case "blue":
        return `${baseClasses} border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300`
      case "green":
        return `${baseClasses} border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300`
      case "purple":
        return `${baseClasses} border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-700 dark:bg-purple-900/30 dark:text-purple-300`
      case "amber":
        return `${baseClasses} border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-300`
      case "indigo":
        return `${baseClasses} border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300`
      case "pink":
        return `${baseClasses} border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-700 dark:bg-pink-900/30 dark:text-pink-300`
      case "red":
        return `${baseClasses} border-red-200 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300`
      case "yellow":
        return `${baseClasses} border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300`
      default:
        return `${baseClasses} border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900/30 dark:text-gray-300`
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-blue-50/30 dark:bg-blue-950/90">
      {/* Sidebar - Mobile version */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-blue-100 bg-white transition-transform duration-300 ease-in-out dark:border-blue-800/30 dark:bg-blue-900/90 lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-14 items-center border-b border-blue-100 px-4 dark:border-blue-800/30">
          <div className="flex items-center gap-2 font-semibold">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-blue-400">
              <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-white" />
            </div>
            <span>LMS Tels</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/courses"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <Book className="h-5 w-5" />
              <span>My Courses</span>
            </Link>
            <Link
              href="/dashboard/assignments"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <FileText className="h-5 w-5" />
              <span>Assignments</span>
            </Link>
            <Link
              href="/dashboard/grades"
              className="flex items-center gap-3 rounded-lg bg-blue-100/70 px-3 py-2 text-blue-900 transition-all hover:text-blue-600 dark:bg-blue-800/30 dark:text-blue-50 dark:hover:text-blue-400"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Grades</span>
            </Link>
            <Link
              href="/dashboard/calendar"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <Calendar className="h-5 w-5" />
              <span>Calendar</span>
            </Link>
          </nav>

          <div className="mt-6 px-3">
            <p className="px-2 text-xs font-semibold uppercase text-gray-400 dark:text-blue-300/70">Resources</p>
            <nav className="mt-2 grid gap-1">
              <Link
                href="/dashboard/library"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
              >
                <Download className="h-5 w-5" />
                <span>Library</span>
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-blue-100 p-4 dark:border-blue-800/30">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Student" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">Jane Doe</p>
              <p className="truncate text-xs text-gray-500 dark:text-blue-300/70">Grade 10 - Student</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center border-b border-blue-100 bg-white px-4 dark:border-blue-800/30 dark:bg-blue-900/90 lg:px-6">
          <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="flex w-full items-center gap-2 md:ml-auto md:gap-4 lg:ml-0">
            <form className="ml-auto flex-1 md:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-blue-300/70" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="w-full rounded-lg bg-blue-50 pl-8 md:w-[240px] lg:w-[280px] dark:bg-blue-800/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-blue-600"></span>
            </Button>
          </div>
        </header>

        {/* Grades Content */}
        <div className="container mx-auto p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Academic Performance</h1>
            <p className="text-gray-500 dark:text-blue-300/70">Track your grades and academic progress</p>
          </div>

          {/* GPA Overview */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-white">
                  <Award className="mr-2 h-5 w-5" />
                  Current GPA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold">{currentGPA}</div>
                  <div className="ml-2 text-sm text-blue-100">/ 4.00</div>
                </div>
                <p className="mt-1 text-sm text-blue-100">Fall Semester 2023</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs">A: {gradeDistribution[0].value}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-xs">B: {gradeDistribution[1].value}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-xs">C: {gradeDistribution[2].value}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                      <span className="text-xs">D: {gradeDistribution[3].value}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-xs">F: {gradeDistribution[4].value}</span>
                    </div>
                  </div>
                  <div className="h-20 w-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={gradeDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={15}
                          outerRadius={30}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {gradeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">GPA Trend</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={gradeTrendData}>
                      <Line
                        type="monotone"
                        dataKey="GPA"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <YAxis domain={[0, 4]} hide />
                      <XAxis dataKey="name" hide />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Current</p>
                    <p className="text-2xl font-bold">
                      {courseGrades.reduce((sum, course) => sum + course.credits, 0)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Needed</p>
                    <p className="text-2xl font-bold">120</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span>
                      {Math.round((courseGrades.reduce((sum, course) => sum + course.credits, 0) / 120) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(courseGrades.reduce((sum, course) => sum + course.credits, 0) / 120) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs
            defaultValue="current"
            className="mb-6"
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value)}
          >
            <TabsList className="grid w-full grid-cols-3 lg:w-auto">
              <TabsTrigger value="current">Current Semester</TabsTrigger>
              <TabsTrigger value="history">Grade History</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filters and Controls */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Select value={filterGrade} onValueChange={setFilterGrade}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-blue-900/60">
                  <SelectValue placeholder="Filter by grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="A">A Grades</SelectItem>
                  <SelectItem value="B">B Grades</SelectItem>
                  <SelectItem value="C">C Grades</SelectItem>
                  <SelectItem value="D">D Grades</SelectItem>
                  <SelectItem value="F">F Grades</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-blue-900/60">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course">Course Name (A-Z)</SelectItem>
                  <SelectItem value="grade-high">Grade (High to Low)</SelectItem>
                  <SelectItem value="grade-low">Grade (Low to High)</SelectItem>
                  <SelectItem value="recent">Recently Updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Course Grades Table */}
          <Card className="mb-8 overflow-hidden">
            <CardHeader className="bg-blue-50/50 dark:bg-blue-900/20">
              <CardTitle>Course Grades</CardTitle>
              <CardDescription>Current semester academic performance by course</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-blue-50/30 dark:bg-blue-900/10">
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead className="text-center">Current Grade</TableHead>
                    <TableHead className="text-center">Percentage</TableHead>
                    <TableHead className="text-center">Credits</TableHead>
                    <TableHead className="text-center">Trend</TableHead>
                    <TableHead className="text-right">Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow
                      key={course.id}
                      className="cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                      onClick={() => setSelectedCourse(course.id === selectedCourse ? null : course.id)}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <Badge variant="outline" className={getCourseBadgeClass(course.courseColor)}>
                            {course.course.substring(0, 3)}
                          </Badge>
                          <span className="ml-2">{course.course}</span>
                        </div>
                      </TableCell>
                      <TableCell>{course.courseCode}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell className={`text-center font-medium ${getGradeColor(course.letterGrade)}`}>
                        {course.letterGrade}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <span className="mr-2 text-sm">{course.percentage}%</span>
                          <div className="w-16">
                            <Progress
                              value={course.percentage}
                              className={`h-2 ${
                                course.percentage >= 90
                                  ? "bg-green-600"
                                  : course.percentage >= 80
                                    ? "bg-blue-600"
                                    : course.percentage >= 70
                                      ? "bg-yellow-600"
                                      : course.percentage >= 60
                                        ? "bg-orange-600"
                                        : "bg-red-600"
                              }`}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{course.credits}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">{getTrendIcon(course.trend)}</div>
                      </TableCell>
                      <TableCell className="text-right text-sm text-gray-500 dark:text-gray-400">
                        {course.lastUpdated}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Selected Course Detail */}
          {selectedCourse && (
            <Card className="mb-8 overflow-hidden border-t-4 border-t-blue-600">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{courseGrades.find((c) => c.id === selectedCourse)?.course} Details</CardTitle>
                  <Badge
                    variant="outline"
                    className={getCourseBadgeClass(
                      courseGrades.find((c) => c.id === selectedCourse)?.courseColor || "blue",
                    )}
                  >
                    {courseGrades.find((c) => c.id === selectedCourse)?.courseCode}
                  </Badge>
                </div>
                <CardDescription>
                  Instructor: {courseGrades.find((c) => c.id === selectedCourse)?.instructor}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Assignment Grades</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader className="bg-blue-50/30 dark:bg-blue-900/10">
                          <TableRow>
                            <TableHead>Assignment</TableHead>
                            <TableHead className="text-center">Category</TableHead>
                            <TableHead className="text-center">Weight</TableHead>
                            <TableHead className="text-right">Score</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {courseGrades
                            .find((c) => c.id === selectedCourse)
                            ?.assignments.map((assignment, index) => (
                              <TableRow key={index}>
                                <TableCell>{assignment.name}</TableCell>
                                <TableCell className="text-center">
                                  <Badge variant="outline">{assignment.category}</Badge>
                                </TableCell>
                                <TableCell className="text-center">{assignment.weight}%</TableCell>
                                <TableCell className="text-right">
                                  <span
                                    className={`font-medium ${
                                      assignment.score / assignment.maxScore >= 0.9
                                        ? "text-green-600 dark:text-green-400"
                                        : assignment.score / assignment.maxScore >= 0.8
                                          ? "text-blue-600 dark:text-blue-400"
                                          : assignment.score / assignment.maxScore >= 0.7
                                            ? "text-yellow-600 dark:text-yellow-400"
                                            : assignment.score / assignment.maxScore >= 0.6
                                              ? "text-orange-600 dark:text-orange-400"
                                              : "text-red-600 dark:text-red-400"
                                    }`}
                                  >
                                    {assignment.score}/{assignment.maxScore}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          {courseGrades
                            .find((c) => c.id === selectedCourse)
                            ?.remaining.map((assignment, index) => (
                              <TableRow key={`remaining-${index}`} className="bg-gray-50/50 dark:bg-gray-900/10">
                                <TableCell className="text-gray-500 dark:text-gray-400">{assignment.name}</TableCell>
                                <TableCell className="text-center">
                                  <Badge variant="outline" className="text-gray-500 dark:text-gray-400">
                                    {assignment.category}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-center text-gray-500 dark:text-gray-400">
                                  {assignment.weight}%
                                </TableCell>
                                <TableCell className="text-right text-gray-500 dark:text-gray-400">Upcoming</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Grade Breakdown</h3>
                    <div className="rounded-md border p-4">
                      <div className="mb-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">Current Grade</span>
                          <span
                            className={`font-bold ${getGradeColor(courseGrades.find((c) => c.id === selectedCourse)?.letterGrade || "")}`}
                          >
                            {courseGrades.find((c) => c.id === selectedCourse)?.letterGrade} (
                            {courseGrades.find((c) => c.id === selectedCourse)?.percentage}%)
                          </span>
                        </div>
                        <Progress
                          value={courseGrades.find((c) => c.id === selectedCourse)?.percentage || 0}
                          className={`h-2 ${
                            (courseGrades.find((c) => c.id === selectedCourse)?.percentage || 0) >= 90
                              ? "bg-green-600"
                              : (courseGrades.find((c) => c.id === selectedCourse)?.percentage || 0) >= 80
                                ? "bg-blue-600"
                                : (courseGrades.find((c) => c.id === selectedCourse)?.percentage || 0) >= 70
                                  ? "bg-yellow-600"
                                  : (courseGrades.find((c) => c.id === selectedCourse)?.percentage || 0) >= 60
                                    ? "bg-orange-600"
                                    : "bg-red-600"
                          }`}
                        />
                      </div>

                      <div className="mt-6">
                        <h4 className="mb-3 text-sm font-medium">Grade Distribution by Category</h4>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={Object.entries(
                                courseGrades
                                  .find((c) => c.id === selectedCourse)
                                  ?.assignments.reduce(
                                    (acc, assignment) => {
                                      if (!acc[assignment.category]) {
                                        acc[assignment.category] = {
                                          category: assignment.category,
                                          score: 0,
                                          weight: 0,
                                        }
                                      }
                                      acc[assignment.category].score +=
                                        (assignment.score / assignment.maxScore) * assignment.weight
                                      acc[assignment.category].weight += assignment.weight
                                      return acc
                                    },
                                    {} as Record<string, { category: string; score: number; weight: number }>,
                                  ) || {},
                              ).map(([_, value]) => ({
                                name: value.category,
                                Score: Math.round((value.score / value.weight) * 100),
                              }))}
                              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="name" />
                              <YAxis domain={[0, 100]} />
                              <Bar dataKey="Score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="mb-2 text-sm font-medium">What You Need for an A</h4>
                        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                          <p className="text-sm">
                            You need to score at least{" "}
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                              {Math.max(
                                0,
                                Math.round(
                                  ((90 -
                                    (courseGrades
                                      .find((c) => c.id === selectedCourse)
                                      ?.assignments.reduce(
                                        (acc, assignment) =>
                                          acc + (assignment.score / assignment.maxScore) * assignment.weight,
                                        0,
                                      ) || 0)) /
                                    (courseGrades
                                      .find((c) => c.id === selectedCourse)
                                      ?.remaining.reduce((acc, assignment) => acc + assignment.weight, 0) || 1)) *
                                    100,
                                ),
                              )}
                              %
                            </span>{" "}
                            on remaining assignments to achieve an A in this course.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grade Scale Reference */}
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Grading Scale</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Standard grading scale used by the institution</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-green-600 dark:text-green-400">A</span>
                    <span className="text-sm">90-100%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">4.0 Grade Points</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-green-600 dark:text-green-400">A-</span>
                    <span className="text-sm">87-89%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">3.7 Grade Points</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-600 dark:text-blue-400">B+</span>
                    <span className="text-sm">84-86%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">3.3 Grade Points</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-600 dark:text-blue-400">B</span>
                    <span className="text-sm">80-83%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">3.0 Grade Points</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-600 dark:text-blue-400">B-</span>
                    <span className="text-sm">77-79%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">2.7 Grade Points</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-yellow-600 dark:text-yellow-400">C+</span>
                    <span className="text-sm">74-76%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">2.3 Grade Points</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-yellow-600 dark:text-yellow-400">C</span>
                    <span className="text-sm">70-73%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">2.0 Grade Points</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-orange-600 dark:text-orange-400">D+</span>
                    <span className="text-sm">67-69%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">1.3 Grade Points</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-orange-600 dark:text-orange-400">D</span>
                    <span className="text-sm">60-66%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">1.0 Grade Points</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-red-600 dark:text-red-400">F</span>
                    <span className="text-sm">0-59%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">0.0 Grade Points</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Resources</CardTitle>
              <CardDescription>Tools and resources to help improve your academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4 transition-all duration-200 hover:bg-blue-50/50 hover:shadow-md dark:hover:bg-blue-900/20">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <Book className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mb-1 font-medium">Tutoring Services</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Free tutoring available for all subjects through the Academic Success Center.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-blue-600 dark:text-blue-400">
                    Schedule a Session
                  </Button>
                </div>
                <div className="rounded-lg border p-4 transition-all duration-200 hover:bg-blue-50/50 hover:shadow-md dark:hover:bg-blue-900/20">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                    <LucideBarChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="mb-1 font-medium">Grade Calculator</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Calculate what you need on remaining assignments to achieve your target grade.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-blue-600 dark:text-blue-400">
                    Open Calculator
                  </Button>
                </div>
                <div className="rounded-lg border p-4 transition-all duration-200 hover:bg-blue-50/50 hover:shadow-md dark:hover:bg-blue-900/20">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
                    <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="mb-1 font-medium">Academic Advising</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Meet with an academic advisor to discuss your progress and plan your courses.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-blue-600 dark:text-blue-400">
                    Book Appointment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

