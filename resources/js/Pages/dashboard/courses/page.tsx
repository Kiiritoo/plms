"use client"

import { useState, useEffect } from "react"
import { Link } from "@inertiajs/react"
import {
  Bell,
  Book,
  Calendar,
  ChevronDown,
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
  Download,
  Play,
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Input } from "@/Components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Card, CardContent, CardFooter } from "@/Components/ui/card"

// New course data structure based on the image
const courses = [
  {
    id: 101,
    title: "Cyber Security Dasar",
    subtitle: "dari Nol",
    lessons: 13,
    instructor: {
      name: "Aditya Firman",
      avatar: "/placeholder.svg?height=150&width=150&text=AF",
    },
    category: "Security",
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
      avatar: "/placeholder.svg?height=150&width=150&text=SR",
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
      avatar: "/placeholder.svg?height=150&width=150&text=MH",
    },
    category: "Cisco",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
  {
    id: 104,
    title: "Course OOP",
    subtitle: "",
    lessons: 28,
    instructor: {
      name: "Yogiyana Aditya",
      avatar: "/placeholder.svg?height=150&width=150&text=YA",
    },
    category: "Programming",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
  {
    id: 105,
    title: "Network",
    subtitle: "Fundamentals",
    lessons: 8,
    instructor: {
      name: "Syahrul Fathoni",
      avatar: "/placeholder.svg?height=150&width=150&text=SF",
    },
    category: "Networking",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
  {
    id: 106,
    title: "Mikrotik Dasar",
    subtitle: "",
    lessons: 26,
    instructor: {
      name: "Ody Tifa Saputra",
      avatar: "/placeholder.svg?height=150&width=150&text=OT",
    },
    category: "Mikrotik",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
  {
    id: 107,
    title: "Pemrograman Dart",
    subtitle: "Dasar",
    lessons: 20,
    instructor: {
      name: "Yogiyana Aditya",
      avatar: "/placeholder.svg?height=150&width=150&text=YA",
    },
    category: "Programming",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
  {
    id: 108,
    title: "Simulasi Jaringan",
    subtitle: "Dengan PNETlab",
    lessons: 6,
    instructor: {
      name: "Miftahul Huda",
      avatar: "/placeholder.svg?height=150&width=150&text=MH",
    },
    category: "Networking",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
  {
    id: 201,
    title: "MTCNA",
    subtitle: "Mikrotik Certified",
    lessons: 15,
    instructor: {
      name: "Doni Prasetyo",
      avatar: "/placeholder.svg?height=150&width=150&text=DP",
    },
    category: "Mikrotik",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
  {
    id: 301,
    title: "CCNA Enterprise",
    subtitle: "200-301",
    lessons: 30,
    instructor: {
      name: "Ahmad Fauzi",
      avatar: "/placeholder.svg?height=150&width=150&text=AF",
    },
    category: "Cisco",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
  {
    id: 401,
    title: "Android Basic",
    subtitle: "Java",
    lessons: 24,
    instructor: {
      name: "Rini Sulistiawati",
      avatar: "/placeholder.svg?height=150&width=150&text=RS",
    },
    category: "Android",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
  {
    id: 501,
    title: "AWS Cloud",
    subtitle: "Practitioner",
    lessons: 18,
    instructor: {
      name: "Budi Santoso",
      avatar: "/placeholder.svg?height=150&width=150&text=BS",
    },
    category: "Cloud Computing",
    isFree: true,
    bgColor: "from-blue-900 to-blue-800",
    portal: "PORTAL BELAJAR IDN",
  },
]

// Categories for filtering
const categories = [
  { id: "all", name: "All Courses" },
  { id: "Security", name: "Security" },
  { id: "System Admin", name: "System Admin" },
  { id: "Cisco", name: "Cisco" },
  { id: "Programming", name: "Programming" },
  { id: "Networking", name: "Networking" },
  { id: "Mikrotik", name: "Mikrotik" },
  { id: "Android", name: "Android" },
  { id: "Cloud Computing", name: "Cloud Computing" },
]

const CoursesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  // Add this useEffect to simulate data loading
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Filter courses based on search query and category
  const filteredCourses = courses.filter((course) => {
    // Filter by category
    if (selectedCategory !== "all" && course.category !== selectedCategory) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const fullTitle = `${course.title} ${course.subtitle}`.toLowerCase()
      return fullTitle.includes(searchQuery.toLowerCase())
    }

    return true
  })

  // Add this loading state check
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Courses</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 rounded-lg bg-gray-200 animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-blue-950/90">
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
              className="flex items-center gap-3 rounded-lg bg-blue-100/70 px-3 py-2 text-blue-900 transition-all hover:text-blue-600 dark:bg-blue-800/30 dark:text-blue-50 dark:hover:text-blue-400"
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

        {/* Courses Content */}
        <div className="container mx-auto p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Courses Catalog</h1>
            <p className="text-gray-500 dark:text-blue-300/70">
              Browse and enroll in our comprehensive course offerings
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={selectedCategory === category.id ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.lessons} Lessons</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/courses/${course.id}`}>View Course</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center dark:border-blue-800/30 dark:bg-blue-900/20">
              <Book className="h-12 w-12 text-gray-400 dark:text-blue-300/50" />
              <h3 className="mt-4 text-lg font-medium">No courses found</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-blue-300/70">
                Try adjusting your search to find what you're looking for.
              </p>
              <Button
                className="mt-6 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                Reset Search
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default CoursesPage

