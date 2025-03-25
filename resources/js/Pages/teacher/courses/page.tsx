import Link from "next/link"
import { BookOpen, Edit, MoreHorizontal, Plus, Search, Trash2, Users, Filter, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function TeacherCourses() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Your Courses
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and organize your teaching materials</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200 dark:shadow-blue-900/20">
            <Plus className="mr-2 h-4 w-4" />
            Create New Course
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="w-full bg-white dark:bg-slate-900 pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-12 rounded-xl border-slate-200 dark:border-slate-800">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          <TabsTrigger
            value="all"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            All Courses
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="draft"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            Draft
          </TabsTrigger>
          <TabsTrigger
            value="archived"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            Archived
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden flex flex-col rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-0 hover:translate-y-[-4px]"
              >
                <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full rounded-t-xl"
                  />
                  <Badge
                    className="absolute top-3 right-3 rounded-full font-medium"
                    variant={
                      course.status === "Active" ? "default" : course.status === "Draft" ? "secondary" : "outline"
                    }
                  >
                    {course.status}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="line-clamp-1 text-lg">{course.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                        <DropdownMenuItem className="rounded-lg cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer">
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Content
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 dark:text-red-400 rounded-lg cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2 text-slate-500 dark:text-slate-400">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Users className="h-4 w-4" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Course completion</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">{course.completion}%</span>
                    </div>
                    <Progress
                      value={course.completion}
                      className="h-2 bg-blue-100 dark:bg-blue-900"
                      indicatorClassName={
                        course.completion > 75
                          ? "bg-green-600 dark:bg-green-500"
                          : course.completion > 50
                            ? "bg-blue-600 dark:bg-blue-500"
                            : course.completion > 25
                              ? "bg-amber-600 dark:bg-amber-500"
                              : "bg-red-600 dark:bg-red-500"
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between mt-auto pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-xl border-slate-200 dark:border-slate-800"
                  >
                    <Link href={`/teacher/courses/${course.id}`}>Manage</Link>
                  </Button>
                  <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                    <Link href={`/teacher/courses/${course.id}/content`}>Edit Content</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-800">
              <span>Load more courses</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const courses = [
  {
    id: "cs101",
    title: "Introduction to Computer Science",
    description: "Fundamental concepts of computer science and programming",
    image: "/placeholder.svg?height=180&width=320",
    status: "Active",
    students: 92,
    lessons: 24,
    completion: 85,
  },
  {
    id: "ds201",
    title: "Data Structures and Algorithms",
    description: "Advanced data structures and algorithm design",
    image: "/placeholder.svg?height=180&width=320",
    status: "Active",
    students: 64,
    lessons: 18,
    completion: 72,
  },
  {
    id: "web101",
    title: "Web Development Fundamentals",
    description: "HTML, CSS, and JavaScript basics for web development",
    image: "/placeholder.svg?height=180&width=320",
    status: "Active",
    students: 78,
    lessons: 32,
    completion: 91,
  },
  {
    id: "py201",
    title: "Python Programming",
    description: "Intermediate Python programming techniques",
    image: "/placeholder.svg?height=180&width=320",
    status: "Active",
    students: 56,
    lessons: 20,
    completion: 68,
  },
  {
    id: "db101",
    title: "Database Design",
    description: "Relational database concepts and SQL",
    image: "/placeholder.svg?height=180&width=320",
    status: "Draft",
    students: 0,
    lessons: 15,
    completion: 0,
  },
  {
    id: "ai301",
    title: "Introduction to AI",
    description: "Fundamentals of artificial intelligence and machine learning",
    image: "/placeholder.svg?height=180&width=320",
    status: "Draft",
    students: 0,
    lessons: 22,
    completion: 0,
  },
]

