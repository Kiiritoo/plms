import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, FileText, Filter, MoreHorizontal, Plus, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">Create and manage assignments for your courses</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/teacher/assignments/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search assignments..." className="w-full bg-background pl-8" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Select defaultValue="all-courses">
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-courses">All Courses</SelectItem>
              <SelectItem value="cs101">Intro to Computer Science</SelectItem>
              <SelectItem value="ds201">Data Structures</SelectItem>
              <SelectItem value="web101">Web Development</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Assignment List</CardTitle>
              <CardDescription>View and manage all assignments across your courses</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{assignment.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{assignment.course}</span>
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                            <DropdownMenuItem>View Submissions</DropdownMenuItem>
                            <DropdownMenuItem>Download All</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

const assignments = [
  {
    id: "assign-001",
    title: "Final Project Submission",
    course: "Web Development Fundamentals",
    dueDate: "May 15, 2023",
    status: "Active",
    submissions: 45,
    totalStudents: 78,
  },
  {
    id: "assign-002",
    title: "Midterm Exam",
    course: "Data Structures and Algorithms",
    dueDate: "May 20, 2023",
    status: "Upcoming",
    submissions: 0,
    totalStudents: 64,
  },
  {
    id: "assign-003",
    title: "Lab Assignment #4",
    course: "Introduction to Computer Science",
    dueDate: "May 22, 2023",
    status: "Upcoming",
    submissions: 0,
    totalStudents: 92,
  },
  {
    id: "assign-004",
    title: "Database Design Project",
    course: "Database Design",
    dueDate: "May 10, 2023",
    status: "Past",
    submissions: 38,
    totalStudents: 42,
  },
  {
    id: "assign-005",
    title: "Programming Exercise #2",
    course: "Python Programming",
    dueDate: "May 5, 2023",
    status: "Past",
    submissions: 52,
    totalStudents: 56,
  },
  {
    id: "assign-006",
    title: "Research Paper",
    course: "Introduction to AI",
    dueDate: "Not set",
    status: "Draft",
    submissions: 0,
    totalStudents: 38,
  },
]

