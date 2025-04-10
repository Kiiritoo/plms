"use client"

import { useState } from "react"
import { Link, router } from "@inertiajs/react"
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
  Grid,
  List,
  BookOpen,
  Filter,
  BookMarked,
  Video,
  FileQuestion,
  Newspaper,
  Bookmark,
  Star,
  Clock,
  Eye,
  CheckCircle2,
  PlusCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

// Sample data for library resources
const libraryResources = [
  {
    id: 1,
    title: "Mathematics Textbook - Grade 10",
    type: "textbook",
    subject: "Mathematics",
    subjectColor: "blue",
    author: "Dr. Robert Chen",
    description: "Comprehensive textbook covering algebra, geometry, and pre-calculus for 10th grade students.",
    format: "PDF",
    size: "12.5 MB",
    dateAdded: "Aug 15, 2023",
    downloads: 245,
    rating: 4.8,
    featured: true,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Math",
  },
  {
    id: 2,
    title: "Biology: The Living World",
    type: "textbook",
    subject: "Science",
    subjectColor: "green",
    author: "Dr. Emily Johnson",
    description: "Explore the fascinating world of biology with detailed illustrations and explanations.",
    format: "PDF",
    size: "18.2 MB",
    dateAdded: "Sep 5, 2023",
    downloads: 187,
    rating: 4.6,
    featured: true,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Biology",
  },
  {
    id: 3,
    title: "Introduction to Chemical Reactions",
    type: "video",
    subject: "Science",
    subjectColor: "green",
    author: "Ms. Sarah Williams",
    description: "Video tutorial explaining the basics of chemical reactions with visual demonstrations.",
    format: "MP4",
    duration: "18:45",
    dateAdded: "Sep 12, 2023",
    views: 312,
    rating: 4.9,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Chemistry",
  },
  {
    id: 4,
    title: "World History: Modern Era",
    type: "textbook",
    subject: "History",
    subjectColor: "amber",
    author: "Prof. Michael Brown",
    description: "Comprehensive textbook covering world history from the Renaissance to modern times.",
    format: "PDF",
    size: "15.7 MB",
    dateAdded: "Aug 28, 2023",
    downloads: 156,
    rating: 4.5,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=History",
  },
  {
    id: 5,
    title: "English Literature Anthology",
    type: "textbook",
    subject: "Literature",
    subjectColor: "purple",
    author: "Dr. Jessica Parker",
    description: "Collection of classic and modern literature with analysis and study guides.",
    format: "PDF",
    size: "20.3 MB",
    dateAdded: "Jul 20, 2023",
    downloads: 203,
    rating: 4.7,
    featured: true,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Literature",
  },
  {
    id: 6,
    title: "Algebra Practice Problems",
    type: "practice",
    subject: "Mathematics",
    subjectColor: "blue",
    author: "Mr. David Lee",
    description: "Collection of practice problems with step-by-step solutions for algebra concepts.",
    format: "PDF",
    size: "5.2 MB",
    dateAdded: "Sep 18, 2023",
    downloads: 278,
    rating: 4.9,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Algebra",
  },
  {
    id: 7,
    title: "Understanding Shakespeare's Plays",
    type: "video",
    subject: "Literature",
    subjectColor: "purple",
    author: "Prof. Elizabeth Taylor",
    description: "Video series analyzing Shakespeare's major plays with historical context.",
    format: "MP4",
    duration: "45:20",
    dateAdded: "Aug 10, 2023",
    views: 189,
    rating: 4.6,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Shakespeare",
  },
  {
    id: 8,
    title: "Physics Fundamentals Quiz",
    type: "practice",
    subject: "Science",
    subjectColor: "green",
    author: "Dr. Alan Wong",
    description: "Interactive quiz to test your understanding of basic physics concepts.",
    format: "Interactive",
    questions: 25,
    dateAdded: "Sep 8, 2023",
    attempts: 156,
    rating: 4.4,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Physics",
  },
  {
    id: 9,
    title: "Geography of Asia",
    type: "reference",
    subject: "Geography",
    subjectColor: "indigo",
    author: "Dr. Maria Rodriguez",
    description: "Detailed maps and information about the geography, climate, and cultures of Asia.",
    format: "PDF",
    size: "8.7 MB",
    dateAdded: "Jul 25, 2023",
    downloads: 134,
    rating: 4.5,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Geography",
  },
  {
    id: 10,
    title: "Computer Science Basics",
    type: "textbook",
    subject: "Computer Science",
    subjectColor: "pink",
    author: "Prof. James Wilson",
    description: "Introduction to programming concepts, algorithms, and computer systems.",
    format: "PDF",
    size: "10.2 MB",
    dateAdded: "Sep 1, 2023",
    downloads: 221,
    rating: 4.7,
    featured: true,
    thumbnail: "/placeholder.svg?height=400&width=300&text=CS",
  },
  {
    id: 11,
    title: "Art History: Renaissance to Modern",
    type: "textbook",
    subject: "Art",
    subjectColor: "red",
    author: "Dr. Sophia Martinez",
    description: "Explore the evolution of art from the Renaissance period to modern art movements.",
    format: "PDF",
    size: "22.5 MB",
    dateAdded: "Aug 5, 2023",
    downloads: 98,
    rating: 4.8,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Art",
  },
  {
    id: 12,
    title: "Trigonometry Explained",
    type: "video",
    subject: "Mathematics",
    subjectColor: "blue",
    author: "Ms. Jennifer Kim",
    description: "Clear explanations of trigonometric functions and their applications.",
    format: "MP4",
    duration: "32:15",
    dateAdded: "Sep 15, 2023",
    views: 267,
    rating: 4.9,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Trig",
  },
  {
    id: 13,
    title: "Chemistry Lab Safety Guidelines",
    type: "reference",
    subject: "Science",
    subjectColor: "green",
    author: "Dr. Thomas Clark",
    description: "Essential safety guidelines and procedures for chemistry laboratory work.",
    format: "PDF",
    size: "3.5 MB",
    dateAdded: "Aug 20, 2023",
    downloads: 312,
    rating: 4.7,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Lab+Safety",
  },
  {
    id: 14,
    title: "Spanish Language Basics",
    type: "practice",
    subject: "Languages",
    subjectColor: "yellow",
    author: "Prof. Isabella Rodriguez",
    description: "Interactive exercises for learning basic Spanish vocabulary and grammar.",
    format: "Interactive",
    lessons: 15,
    dateAdded: "Sep 10, 2023",
    attempts: 178,
    rating: 4.6,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Spanish",
  },
  {
    id: 15,
    title: "Environmental Science Today",
    type: "article",
    subject: "Science",
    subjectColor: "green",
    author: "Dr. Robert Green",
    description: "Current issues and developments in environmental science and conservation.",
    format: "PDF",
    size: "2.8 MB",
    dateAdded: "Sep 20, 2023",
    downloads: 87,
    rating: 4.5,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Environment",
  },
  {
    id: 16,
    title: "Music Theory Fundamentals",
    type: "textbook",
    subject: "Music",
    subjectColor: "orange",
    author: "Prof. Daniel White",
    description: "Introduction to music notation, scales, chords, and composition basics.",
    format: "PDF",
    size: "7.3 MB",
    dateAdded: "Aug 12, 2023",
    downloads: 124,
    rating: 4.7,
    featured: false,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Music",
  },
]

// Resource categories
const resourceCategories = [
  { id: "all", name: "All Resources", icon: <BookOpen className="h-4 w-4" /> },
  { id: "textbook", name: "Textbooks", icon: <Book className="h-4 w-4" /> },
  { id: "video", name: "Video Tutorials", icon: <Video className="h-4 w-4" /> },
  { id: "practice", name: "Practice Materials", icon: <FileQuestion className="h-4 w-4" /> },
  { id: "reference", name: "Reference Materials", icon: <BookMarked className="h-4 w-4" /> },
  { id: "article", name: "Articles", icon: <Newspaper className="h-4 w-4" /> },
]

// Subject filters
const subjectFilters = [
  { id: "all", name: "All Subjects" },
  { id: "Mathematics", name: "Mathematics" },
  { id: "Science", name: "Science" },
  { id: "Literature", name: "Literature" },
  { id: "History", name: "History" },
  { id: "Geography", name: "Geography" },
  { id: "Computer Science", name: "Computer Science" },
  { id: "Art", name: "Art" },
  { id: "Languages", name: "Languages" },
  { id: "Music", name: "Music" },
]

// Helper function to get subject badge color
const getSubjectBadgeClass = (color: string) => {
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
    case "orange":
      return `${baseClasses} border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-700 dark:bg-orange-900/30 dark:text-orange-300`
    default:
      return `${baseClasses} border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900/30 dark:text-gray-300`
  }
}

// Helper function to get resource type icon
const getResourceTypeIcon = (type: string) => {
  switch (type) {
    case "textbook":
      return <Book className="h-5 w-5" />
    case "video":
      return <Video className="h-5 w-5" />
    case "practice":
      return <FileQuestion className="h-5 w-5" />
    case "reference":
      return <BookMarked className="h-5 w-5" />
    case "article":
      return <Newspaper className="h-5 w-5" />
    default:
      return <FileText className="h-5 w-5" />
  }
}

// Helper function to get resource type badge
const getResourceTypeBadge = (type: string) => {
  switch (type) {
    case "textbook":
      return (
        <Badge className="bg-blue-600 hover:bg-blue-700">
          <Book className="mr-1 h-3 w-3" />
          Textbook
        </Badge>
      )
    case "video":
      return (
        <Badge className="bg-red-600 hover:bg-red-700">
          <Video className="mr-1 h-3 w-3" />
          Video
        </Badge>
      )
    case "practice":
      return (
        <Badge className="bg-green-600 hover:bg-green-700">
          <FileQuestion className="mr-1 h-3 w-3" />
          Practice
        </Badge>
      )
    case "reference":
      return (
        <Badge className="bg-purple-600 hover:bg-purple-700">
          <BookMarked className="mr-1 h-3 w-3" />
          Reference
        </Badge>
      )
    case "article":
      return (
        <Badge className="bg-amber-600 hover:bg-amber-700">
          <Newspaper className="mr-1 h-3 w-3" />
          Article
        </Badge>
      )
    default:
      return <Badge>{type}</Badge>
  }
}

// Helper function to get gradient classes
const getGradientClasses = (color: string) => {
  switch (color) {
    case "blue":
      return "from-blue-600 to-blue-400"
    case "green":
      return "from-green-600 to-green-400"
    case "purple":
      return "from-purple-600 to-purple-400"
    case "amber":
      return "from-amber-600 to-amber-400"
    case "indigo":
      return "from-indigo-600 to-indigo-400"
    case "pink":
      return "from-pink-600 to-pink-400"
    case "red":
      return "from-red-600 to-red-400"
    case "yellow":
      return "from-yellow-600 to-yellow-400"
    case "orange":
      return "from-orange-600 to-orange-400"
    default:
      return "from-gray-600 to-gray-400"
  }
}

// Helper function to get avatar background class
const getAvatarBgClass = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300"
    case "green":
      return "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300"
    case "purple":
      return "bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300"
    case "amber":
      return "bg-amber-100 text-amber-600 dark:bg-amber-800 dark:text-amber-300"
    case "indigo":
      return "bg-indigo-100 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-300"
    case "pink":
      return "bg-pink-100 text-pink-600 dark:bg-pink-800 dark:text-pink-300"
    case "red":
      return "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300"
    case "yellow":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-300"
    case "orange":
      return "bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-300"
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
  }
}

export default function LibraryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("recent")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [savedResources, setSavedResources] = useState<number[]>([])

  // Add a new state to track the selected subject view
  const [subjectView, setSubjectView] = useState<string | null>(null)

  // Filter resources based on selected filters and search query
  const filteredResources = libraryResources
    .filter((resource) => {
      // If in subject view, only show resources for that subject
      if (subjectView && resource.subject !== subjectView) return false

      // Filter by category
      if (selectedCategory !== "all" && resource.type !== selectedCategory) return false

      // Filter by subject if not in subject view
      if (!subjectView && selectedSubject !== "all" && resource.subject !== selectedSubject) return false

      // Filter by search query
      if (
        searchQuery &&
        !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !resource.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !resource.author.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false

      return true
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      }
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title)
      }
      if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title)
      }
      if (sortBy === "popular") {
        const aPopularity = a.downloads || a.views || a.attempts || 0
        const bPopularity = b.downloads || b.views || b.attempts || 0
        return bPopularity - aPopularity
      }
      if (sortBy === "rating") {
        return b.rating - a.rating
      }
      return 0
    })

  // Toggle save resource
  const toggleSaveResource = (id: number) => {
    if (savedResources.includes(id)) {
      setSavedResources(savedResources.filter((resourceId) => resourceId !== id))
    } else {
      setSavedResources([...savedResources, id])
    }
  }

  // Get unique subjects with their colors
  const uniqueSubjects = Array.from(new Set(libraryResources.map((resource) => resource.subject)))
    .map((subject) => {
      const resourceWithSubject = libraryResources.find((r) => r.subject === subject)
      return {
        name: subject,
        color: resourceWithSubject?.subjectColor || "blue",
        resourceCount: libraryResources.filter((r) => r.subject === subject).length,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  // Replace the Library Content section with this updated version
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
                className="flex items-center gap-3 rounded-lg bg-blue-100/70 px-3 py-2 text-blue-900 transition-all hover:text-blue-600 dark:bg-blue-800/30 dark:text-blue-50 dark:hover:text-blue-400"
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
                  placeholder="Search resources..."
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

        {/* Library Content */}
        <div className="container mx-auto p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Library</h1>
            <p className="text-gray-500 dark:text-blue-300/70">Access educational resources and study materials</p>
          </div>

          {/* Subject View or Resource List */}
          {subjectView ? (
            <>
              {/* Back button when viewing a specific subject */}
              <div className="mb-6">
                <Button
                  variant="outline"
                  className="mb-4"
                  onClick={() => {
                    setSubjectView(null)
                    setSelectedCategory("all")
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Subjects
                </Button>

                {/* Subject header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">{subjectView} Resources</h2>
                    <Badge
                      variant="outline"
                      className={getSubjectBadgeClass(
                        libraryResources.find((r) => r.subject === subjectView)?.subjectColor || "blue",
                      )}
                    >
                      {libraryResources.filter((r) => r.subject === subjectView).length} Resources
                    </Badge>
                  </div>
                  <p className="text-gray-500 dark:text-blue-300/70">Browse all learning materials for {subjectView}</p>
                </div>
              </div>

              {/* Resource Categories */}
              <div className="mb-6">
                <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="mb-4 w-full overflow-x-auto">
                    {resourceCategories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
                        {category.icon}
                        <span>{category.name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Filters and View Controls */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] bg-white dark:bg-blue-900/60">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recently Added</SelectItem>
                      <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                      <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    className="gap-1"
                    onClick={() => {
                      setSelectedCategory("all")
                      setSortBy("recent")
                      setSearchQuery("")
                    }}
                  >
                    <Filter className="h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    <Grid className="h-4 w-4" />
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    <List className="h-4 w-4" />
                    <span className="sr-only">List view</span>
                  </Button>
                </div>
              </div>

              {/* Resources List */}
              {filteredResources.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredResources.map((resource) => (
                      <Card key={resource.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={resource.thumbnail || "/placeholder.svg"}
                            alt={resource.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <Badge variant="outline" className={getSubjectBadgeClass(resource.subjectColor)}>
                              {resource.subject}
                            </Badge>
                            <h3 className="text-lg font-bold text-white line-clamp-1">{resource.title}</h3>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            {getResourceTypeBadge(resource.type)}
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Star className="mr-1 h-4 w-4 text-yellow-500" />
                              <span>{resource.rating}</span>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {resource.description}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <User className="mr-1 h-4 w-4" />
                              <span>{resource.author}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="mr-1 h-4 w-4" />
                              <span>{resource.dateAdded}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 px-4 py-3 dark:bg-gray-900/40">
                          <div className="flex w-full items-center justify-between">
                            <Button variant="ghost" size="sm" onClick={() => toggleSaveResource(resource.id)}>
                              {savedResources.includes(resource.id) ? (
                                <CheckCircle2 className="mr-1 h-4 w-4 text-green-600" />
                              ) : (
                                <Bookmark className="mr-1 h-4 w-4" />
                              )}
                              {savedResources.includes(resource.id) ? "Saved" : "Save"}
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Download className="mr-1 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredResources.map((resource) => (
                      <Card key={resource.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative h-40 w-full md:h-auto md:w-48">
                            <img
                              src={resource.thumbnail || "/placeholder.svg"}
                              alt={resource.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <CardHeader>
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <CardTitle>{resource.title}</CardTitle>
                                    {getResourceTypeBadge(resource.type)}
                                  </div>
                                  <CardDescription>{resource.author}</CardDescription>
                                </div>
                                <Badge variant="outline" className={getSubjectBadgeClass(resource.subjectColor)}>
                                  {resource.subject}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{resource.description}</p>
                              <div className="mt-4 flex flex-wrap items-center gap-4">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <Star className="mr-1 h-4 w-4 text-yellow-500" />
                                  <span>{resource.rating} Rating</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <Clock className="mr-1 h-4 w-4" />
                                  <span>Added {resource.dateAdded}</span>
                                </div>
                                {resource.format && (
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <FileText className="mr-1 h-4 w-4" />
                                    <span>{resource.format}</span>
                                    {resource.size && <span> • {resource.size}</span>}
                                  </div>
                                )}
                                {resource.downloads && (
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <Download className="mr-1 h-4 w-4" />
                                    <span>{resource.downloads} Downloads</span>
                                  </div>
                                )}
                                {resource.views && (
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <Eye className="mr-1 h-4 w-4" />
                                    <span>{resource.views} Views</span>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter className="border-t bg-gray-50 px-6 py-3 dark:bg-gray-900/40">
                              <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-between">
                                <Button variant="ghost" size="sm" onClick={() => toggleSaveResource(resource.id)}>
                                  {savedResources.includes(resource.id) ? (
                                    <CheckCircle2 className="mr-1 h-4 w-4 text-green-600" />
                                  ) : (
                                    <Bookmark className="mr-1 h-4 w-4" />
                                  )}
                                  {savedResources.includes(resource.id) ? "Saved" : "Save"}
                                </Button>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  <Download className="mr-1 h-4 w-4" />
                                  Download
                                </Button>
                              </div>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center dark:border-blue-800/30 dark:bg-blue-900/20">
                  <Book className="h-12 w-12 text-gray-400 dark:text-blue-300/50" />
                  <h3 className="mt-4 text-lg font-medium">No resources found</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-blue-300/70">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <Button
                    className="mt-6 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setSelectedCategory("all")
                      setSortBy("recent")
                      setSearchQuery("")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Subject Areas View */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Subject Areas</h2>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-blue-300/70" />
                    <Input
                      type="search"
                      placeholder="Search subjects..."
                      className="w-full rounded-lg bg-blue-50 pl-8 md:w-[240px] lg:w-[280px] dark:bg-blue-800/50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Subject Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {uniqueSubjects
                  .filter((subject) => !searchQuery || subject.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((subject) => (
                    <Card
                      key={subject.name}
                      className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer group"
                      onClick={() => setSubjectView(subject.name)}
                    >
                      {/* Colored header with subject name */}
                      <div
                        className={`relative h-32 overflow-hidden p-4 bg-gradient-to-r ${getGradientClasses(subject.color)}`}
                      >
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold text-white truncate">{subject.name}</h3>
                          <p className="text-sm text-white/80 mt-1 truncate">{subject.resourceCount} Resources</p>
                        </div>

                        {/* Decorative icon in background */}
                        <div className="absolute right-4 top-4 opacity-10">
                          <BookOpen className="h-16 w-16 text-white" />
                        </div>
                      </div>

                      {/* Avatar that overlaps the header */}
                      <div className="relative h-16 flex justify-end px-6">
                        <div className="absolute -top-8">
                          <div
                            className={`flex h-16 w-16 items-center justify-center rounded-full border-4 border-white dark:border-gray-900 shadow-md ${getAvatarBgClass(subject.color)}`}
                          >
                            <BookOpen className="h-8 w-8" />
                          </div>
                        </div>
                      </div>

                      {/* Card content */}
                      <CardContent className="pt-2 pb-4">
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2 min-h-[3rem]">
                          Browse {subject.resourceCount} learning resources for {subject.name} including textbooks,
                          videos, and practice materials.
                        </p>
                      </CardContent>

                      {/* Card footer with action buttons */}
                      <CardFooter className="border-t bg-gray-50 px-6 py-3 dark:bg-gray-900/40 flex justify-between">
                        <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full">
                          <BookMarked className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full">
                          <Download className="h-5 w-5" />
                        </Button>
                        <Button
                          className={`w-10 h-10 p-0 rounded-full bg-gradient-to-r ${getGradientClasses(subject.color)} group-hover:scale-110 transition-transform`}
                        >
                          <ArrowRight className="h-5 w-5 text-white" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>

              {/* No subjects found state */}
              {uniqueSubjects.filter(
                (subject) => !searchQuery || subject.name.toLowerCase().includes(searchQuery.toLowerCase()),
              ).length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center dark:border-blue-800/30 dark:bg-blue-900/20">
                  <Book className="h-12 w-12 text-gray-400 dark:text-blue-300/50" />
                  <h3 className="mt-4 text-lg font-medium">No subjects found</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-blue-300/70">
                    Try adjusting your search to find what you're looking for.
                  </p>
                  <Button
                    className="mt-6 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setSearchQuery("")
                    }}
                  >
                    Reset Search
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Request Resources */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Can't find what you need?</CardTitle>
                <CardDescription>Request new resources or suggest improvements to existing ones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900/20">
                  <PlusCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  <h3 className="mt-4 text-lg font-medium">Request New Resources</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    If you need specific study materials or resources that aren't available in the library, let us know.
                  </p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Submit Resource Request</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

