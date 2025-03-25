import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  Clock,
  Download,
  Edit,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Users,
  Video,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  // Find the course by ID
  const course = courses.find((c) => c.id === params.id) || courses[0]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <Badge>{course.status}</Badge>
          </div>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Course
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Content
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.students}</div>
            <p className="text-xs text-muted-foreground">{course.activeStudents} active in the last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.lessons}</div>
            <p className="text-xs text-muted-foreground">
              {course.completedLessons} published, {course.lessons - course.completedLessons} drafts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.completion}%</div>
            <Progress value={course.completion} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList>
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
              <CardDescription>Manage your course content and materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {course.modules.map((module, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{module.title}</h3>
                      <Button variant="ghost" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Module
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="flex items-center justify-between border-b p-4 last:border-0">
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
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Lesson
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Module
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="students" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Enrolled Students</CardTitle>
                <CardDescription>Students currently enrolled in this course</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export List
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{student.progress}%</span>
                          </div>
                          <Progress value={student.progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{student.lastActivity}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.grade >= 90
                              ? "default"
                              : student.grade >= 80
                                ? "outline"
                                : student.grade >= 70
                                  ? "secondary"
                                  : "destructive"
                          }
                        >
                          {student.grade}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assignments" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Course Assignments</CardTitle>
                <CardDescription>Manage assignments for this course</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{assignment.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{assignment.dueDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            assignment.status === "Active"
                              ? "default"
                              : assignment.status === "Upcoming"
                                ? "outline"
                                : assignment.status === "Past"
                                  ? "secondary"
                                  : "secondary"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{assignment.submissions}</span>
                          <span className="text-muted-foreground">/ {assignment.totalStudents}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Submissions
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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
    activeStudents: 78,
    lessons: 24,
    completedLessons: 24,
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
  {
    id: "ds201",
    title: "Data Structures and Algorithms",
    description: "Advanced data structures and algorithm design",
    image: "/placeholder.svg?height=180&width=320",
    status: "Active",
    students: 64,
    activeStudents: 52,
    lessons: 18,
    completedLessons: 18,
    completion: 72,
    modules: [],
  },
  {
    id: "web101",
    title: "Web Development Fundamentals",
    description: "HTML, CSS, and JavaScript basics for web development",
    image: "/placeholder.svg?height=180&width=320",
    status: "Active",
    students: 78,
    activeStudents: 70,
    lessons: 32,
    completedLessons: 28,
    completion: 91,
    modules: [],
  },
]

const students = [
  {
    id: "STU001",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EW",
    progress: 92,
    lastActivity: "Today, 10:30 AM",
    grade: 95,
  },
  {
    id: "STU002",
    name: "Ryan Lee",
    email: "ryan.l@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RL",
    progress: 88,
    lastActivity: "Today, 9:15 AM",
    grade: 92,
  },
  {
    id: "STU003",
    name: "Sarah Parker",
    email: "sarah.p@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SP",
    progress: 76,
    lastActivity: "Yesterday, 3:45 PM",
    grade: 85,
  },
  {
    id: "STU004",
    name: "Michael Brown",
    email: "michael.b@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MB",
    progress: 45,
    lastActivity: "3 days ago",
    grade: 68,
  },
  {
    id: "STU005",
    name: "Jessica Taylor",
    email: "jessica.t@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JT",
    progress: 32,
    lastActivity: "5 days ago",
    grade: 62,
  },
]

const courseAssignments = [
  {
    id: "assign-001",
    title: "Final Project Submission",
    dueDate: "May 15, 2023",
    status: "Active",
    submissions: 45,
    totalStudents: 78,
  },
  {
    id: "assign-003",
    title: "Lab Assignment #4",
    dueDate: "May 22, 2023",
    status: "Upcoming",
    submissions: 0,
    totalStudents: 92,
  },
  {
    id: "assign-004",
    title: "Database Design Project",
    dueDate: "May 10, 2023",
    status: "Past",
    submissions: 38,
    totalStudents: 42,
  },
]

