import type React from "react"

import { useState, useEffect } from "react"
import { router, Link } from "@inertiajs/react"
import {
  Book,
  Calendar,
  ChevronDown,
  Clock,
  Download,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Play,
  Search,
  Settings,
  Sparkles,
  User,
  X,
  Clock4,
  CalendarClock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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

// Sample data for upcoming assignments
const upcomingAssignments = [
  {
    id: 1,
    title: "Konfigurasi Server",
    course: "Administrasi Sistem Jaringan",
    courseColor: "indigo",
    dueDate: "Today, 10:30 AM",
    status: "due-soon",
    description: "Praktikum Konfigurasi Server Linux",
    type: "Praktikum",
    points: 50,
  },
  {
    id: 2,
    title: "Mathematics Quiz",
    course: "Mathematics",
    courseColor: "blue",
    dueDate: "Today, 1:00 PM",
    status: "upcoming",
    description: "Chapter 4: Derivatives and Applications",
    type: "Quiz",
    points: 50,
  },
  {
    id: 3,
    title: "Literature Discussion",
    course: "Literature",
    courseColor: "purple",
    dueDate: "Tomorrow, 11:59 PM",
    status: "upcoming",
    description: "The Great Gatsby: Themes and Symbolism",
    type: "Discussion",
    points: 30,
  },
  {
    id: 4,
    title: "Science Lab Report",
    course: "Science",
    courseColor: "green",
    dueDate: "Friday, 11:59 PM",
    status: "upcoming",
    description: "Chemical Reactions Experiment - Write-up and Analysis",
    type: "Lab Report",
    points: 100,
  },
]

// Sample data for recent courses - updated to match courses page style
const recentCourses = [
  {
    id: 101,
    title: "Administrasi Sistem Jaringan",
    subtitle: "dari Nol",
    lessons: 15,
    instructor: {
      name: "Budi Santoso",
      avatar: `https://ui-avatars.com/api/?name=Budi+Santoso&background=0D8ABC&color=fff`,
    },
    category: "System Admin",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
  {
    id: 102,
    title: "Belajar Linux",
    subtitle: "dari Nol",
    lessons: 9,
    instructor: {
      name: "Syahrul Ramdan",
      avatar: `https://ui-avatars.com/api/?name=Syahrul+Ramdan&background=0D8ABC&color=fff`,
    },
    category: "System Admin",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
  {
    id: 103,
    title: "Cisco Dasar",
    subtitle: "",
    lessons: 5,
    instructor: {
      name: "Miftahul Huda",
      avatar: `https://ui-avatars.com/api/?name=Miftahul+Huda&background=0D8ABC&color=fff`,
    },
    category: "Cisco",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
]

// Helper function to get status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case "due-soon":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">
          <Clock4 className="mr-1 h-3 w-3" />
          Due Soon
        </Badge>
      )
    case "in-progress":
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600">
          <Clock className="mr-1 h-3 w-3" />
          In Progress
        </Badge>
      )
    case "upcoming":
      return (
        <Badge className="bg-blue-600 hover:bg-blue-700">
          <CalendarClock className="mr-1 h-3 w-3" />
          Upcoming
        </Badge>
      )
    case "completed":
      return (
        <Badge className="bg-green-600 hover:bg-green-700">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      )
    case "late":
      return (
        <Badge className="bg-red-600 hover:bg-red-700">
          <AlertCircle className="mr-1 h-3 w-3" />
          Late
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

// Helper function to get avatar background classes
const getAvatarBgClass = (courseColor: string) => {
  switch (courseColor) {
    case "blue":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
    case "green":
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
    case "purple":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
    case "amber":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
    case "indigo":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300"
    case "pink":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300"
    case "red":
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
    case "yellow":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
    case "orange":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300"
  }
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 1024
      setIsMobile(isMobileView)
      setIsSidebarOpen(!isMobileView)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile)
      clearInterval(timeInterval)
    }
  }, [])

  // Format date for display
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(currentTime)

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const content = (
    <div className="flex min-h-screen w-full overflow-hidden bg-blue-50/30 dark:bg-blue-950/90">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[100] flex w-64 flex-col border-r border-blue-100 bg-white shadow-lg transition-transform duration-300 ease-in-out dark:border-blue-800/30 dark:bg-blue-900/90 lg:relative lg:translate-x-0 ${
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
          {isMobile && (
            <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          )}
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg bg-blue-100/70 px-3 py-2 text-blue-900 transition-all hover:text-blue-600 dark:bg-blue-800/30 dark:text-blue-50 dark:hover:text-blue-400"
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
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
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
              <AvatarImage 
                src="https://ui-avatars.com/api/?name=Jane+Doe&background=0D8ABC&color=fff" 
                alt="Student" 
              />
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

      {/* Add overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 z-[90] bg-black/50 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center border-b border-blue-100 bg-white px-4 dark:border-blue-800/30 dark:bg-blue-900/90 lg:px-6">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}

          <div className="flex w-full items-center gap-2 md:ml-auto md:gap-4 lg:ml-0">
            <form className="ml-auto flex-1 md:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-blue-300/70" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-blue-50 pl-8 md:w-[240px] lg:w-[280px] dark:bg-blue-800/50"
                />
              </div>
            </form>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="container mx-auto p-4 lg:p-6">
          {/* Welcome Banner */}
          <div className="mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white shadow-lg">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">{getGreeting()}, Jane!</h1>
                <p className="text-blue-100">{formattedDate}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
                <Button size="sm" variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Today's Schedule</span>
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  <FileText className="mr-1 h-4 w-4" />
                  <span>Due This Week</span>
                </Button>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-white/20 p-2">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Assignments Due</p>
                    <p className="text-xl font-bold">3</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-white/20 p-2">
                    <Book className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Courses</p>
                    <p className="text-xl font-bold">8</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-white/20 p-2">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Overall Grade</p>
                    <p className="text-xl font-bold">B+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Learning Section */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Continue Learning</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentCourses.map((course) => {
                const handleCardClick = () => {
                  router.visit(`/dashboard/courses/${course.id}`)
                }

                const handleStartLearning = (e: React.MouseEvent) => {
                  e.stopPropagation() // Prevent the card click from triggering
                  router.visit(`/dashboard/courses/${course.id}/learn`)
                }

                return (
                  <div key={course.id} className="group cursor-pointer" onClick={handleCardClick}>
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                      <div className="relative">
                        {/* Course Header with Background */}
                        <div className={`relative h-48 bg-gradient-to-r ${course.bgColor} overflow-hidden`}>
                          {/* Free Label */}
                          {course.isFree && (
                            <div className="absolute left-0 top-0 z-10 bg-yellow-500 px-3 py-1 text-xs font-bold text-white">
                              FREE
                            </div>
                          )}

                          {/* Course Title */}
                          <div className="absolute bottom-0 left-0 p-4 text-white">
                            <h3 className="text-xl font-bold">{course.title}</h3>
                            {course.subtitle && <p className="text-lg">{course.subtitle}</p>}
                            <p className="mt-2 text-xs uppercase">{course.portal}</p>
                          </div>

                          {/* Curved Design Element */}
                          <div className="absolute bottom-0 right-0 h-full w-1/3 bg-white">
                            <div className="absolute bottom-0 right-0 h-full w-full rounded-tl-[100px] bg-gradient-to-r from-blue-900 to-blue-800"></div>
                          </div>

                          {/* Instructor Avatar */}
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
                            <Avatar className="h-20 w-20 border-4 border-white">
                              <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                              <AvatarFallback className="text-lg">
                                {course.instructor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          {/* Gear Icon */}
                          <div className="absolute bottom-4 right-4">
                            <div className="h-8 w-8 rounded-full bg-white/20 p-1.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="h-5 w-5"
                              >
                                <path d="M17.5,12c0,0.4-0.1,0.8-0.2,1.2l1.8,1.4c0.2,0.1,0.2,0.4,0.1,0.6l-1.7,2.9c-0.1,0.2-0.3,0.3-0.5,0.2l-2.1-0.8 c-0.4,0.3-0.9,0.6-1.4,0.8l-0.3,2.2c0,0.2-0.2,0.4-0.5,0.4H9.1c-0.2,0-0.4-0.2-0.5,0.4L8.3,18c-0.5-0.2-1-0.4-1.4-0.8l-2.1,0.8 c-0.2,0.1-0.4,0-0.5-0.2l-1.7-2.9c-0.1-0.2-0.1-0.4,0.1,0.6l1.8-1.4C4.1,12.8,4,12.4,4,12s0.1-0.8,0.2-1.2L2.4,9.4 C2.2,9.3,2.1,9,2.3,8.8l1.7-2.9c0.1-0.2,0.3-0.3,0.5-0.2l2.1,0.8c0.4-0.3,0.9-0.6,1.4-0.8l0.3-2.2C8.3,3.2,8.5,3,8.7,3h3.4 c0.2,0,0.4,0.2,0.5,0.4l0.3,2.2c0.5,0.2,1,0.4,1.4,0.8l2.1-0.8c0.2-0.1,0.4,0,0.5,0.2l1.7,2.9c0.1,0.2,0.1,0.4-0.1,0.6l-1.8,1.4 C17.4,11.2,17.5,11.6,17.5,12z M12,8c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S14.2,8,12,8z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Course Footer */}
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 dark:text-gray-300">{course.lessons} Lessons</p>
                            <div className="flex space-x-2">
                              <div className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-medium text-white">
                                Upgrade Your Skills
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 rounded-full p-0 bg-blue-600 hover:bg-blue-700"
                                onClick={handleStartLearning}
                              >
                                <Play className="h-4 w-4 text-white" />
                                <span className="sr-only">Start Learning</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex justify-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/dashboard/courses">View All Courses</Link>
              </Button>
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Upcoming Assignments</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {upcomingAssignments.slice(0, 3).map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                    >
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${getAvatarBgClass(assignment.courseColor)}`}
                      >
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{assignment.title}</p>
                          {getStatusBadge(assignment.status)}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-blue-300/70">{assignment.dueDate}</p>
                        <p className="mt-1 text-sm">{assignment.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className={getAvatarBgClass(assignment.courseColor)}>
                            {assignment.course}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-blue-50/50 px-6 py-3 dark:bg-blue-900/40">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/assignments">View All Assignments</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Learning Resources */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">Learning Resources</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border p-4 transition-all duration-200 hover:bg-blue-50/50 hover:shadow-md dark:hover:bg-blue-900/20">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                      <Book className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="mb-1 font-medium">Study Materials</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Access textbooks, notes, and supplementary materials for all your courses.
                    </p>
                    <Button variant="link" className="mt-2 h-auto p-0 text-blue-600 dark:text-blue-400">
                      Browse Library
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4 transition-all duration-200 hover:bg-blue-50/50 hover:shadow-md dark:hover:bg-blue-900/20">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                      <Book className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="mb-1 font-medium">Praktikum</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Akses materi praktikum dan panduan untuk Administrasi Sistem Jaringan.
                    </p>
                    <Button variant="link" className="mt-2 h-auto p-0 text-blue-600 dark:text-blue-400">
                      Lihat Materi
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4 transition-all duration-200 hover:bg-blue-50/50 hover:shadow-md dark:hover:bg-blue-900/20">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                      <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="mb-1 font-medium">Schedule</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      View your class schedule and upcoming events.
                    </p>
                    <Button variant="link" className="mt-2 h-auto p-0 text-blue-600 dark:text-blue-400">
                      View Calendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

