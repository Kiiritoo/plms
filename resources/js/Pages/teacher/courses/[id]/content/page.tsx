import { Link, router } from "@inertiajs/react"
import { BookOpen, ChevronLeft, Edit, FileText, MoreHorizontal, Plus, Trash2, Video } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import TeacherLayout from "../../../layout"

export default function CourseContentPage({ params }: { params: { id: string } }) {
  // Find the course by ID
  const course = courses.find((c) => c.id === params.id) || courses[0]

  return (
    <TeacherLayout>
      <div className="container max-w-5xl py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href={`/teacher/courses/${course.id}`}>
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Course Content</h1>
              <p className="text-sm text-muted-foreground">
                Manage and organize your course content and materials
              </p>
            </div>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Module
          </Button>
        </div>

        <div className="space-y-6">
          {course.modules.map((module, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{module.title}</CardTitle>
                  <CardDescription>Module {index + 1}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Module
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Module
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        {lesson.type === "video" ? (
                          <Video className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {lesson.type === "video" ? `${lesson.duration} minutes` : "Reading material"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={lesson.status === "Published" ? "default" : "secondary"}>
                          {lesson.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Lesson
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Lesson
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lesson
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {course.modules.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No modules yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Start by adding your first module to organize your course content.
              </p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Module
              </Button>
            </div>
          )}
        </div>
      </div>
    </TeacherLayout>
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
    modules: [
      {
        title: "Module 1: Introduction to Programming",
        lessons: [
          {
            title: "What is Computer Science?",
            type: "video",
            duration: 15,
            status: "Published",
          },
          {
            title: "History of Computing",
            type: "reading",
            status: "Published",
          },
          {
            title: "Basic Programming Concepts",
            type: "video",
            duration: 22,
            status: "Published",
          },
        ],
      },
      {
        title: "Module 2: Variables and Data Types",
        lessons: [
          {
            title: "Understanding Variables",
            type: "video",
            duration: 18,
            status: "Published",
          },
          {
            title: "Data Types in Programming",
            type: "video",
            duration: 20,
            status: "Published",
          },
          {
            title: "Working with Strings and Numbers",
            type: "video",
            duration: 25,
            status: "Published",
          },
        ],
      },
    ],
  },
] 