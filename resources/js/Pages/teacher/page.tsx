"use client"

import {
  BookOpen,
  Clock,
  FileText,
  GraduationCap,
  Users,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Welcome Back, Dr. Smith
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Here's what's happening with your courses today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200 dark:shadow-blue-900/20"
            onClick={() => (window.location.href = "/teacher/courses/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Course
          </Button>
        </div>
      </div>

      {/* Top Quick Actions Cards with Fixed Height */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Create Course Card */}
          <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 h-[250px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-500"></div>
            <div className="p-5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <kbd className="hidden group-hover:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-600 dark:text-slate-400">
                  <span className="text-xs">⌘</span>N
                </kbd>
              </div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Create Course</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Design a new course with modules and lessons
              </p>
              <div className="mt-auto">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => (window.location.href = "/teacher/courses/new")}
                >
                  Create New Course
                </Button>
              </div>
            </div>
          </div>

          {/* Create Assignment Card */}
          <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 h-[250px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>
            <div className="p-5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <kbd className="hidden group-hover:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-600 dark:text-slate-400">
                  <span className="text-xs">⌘</span>A
                </kbd>
              </div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Create Assignment</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Create homework, quizzes, or exams for students
              </p>
              <div className="mt-auto">
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => (window.location.href = "/teacher/assignments/new")}
                >
                  Create Assignment
                </Button>
              </div>
            </div>
          </div>

          {/* Manage Students Card */}
          <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 h-[250px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-green-500"></div>
            <div className="p-5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <kbd className="hidden group-hover:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-600 dark:text-slate-400">
                  <span className="text-xs">⌘</span>S
                </kbd>
              </div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Manage Students</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                View, add, or manage student enrollments
              </p>
              <div className="mt-auto">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => (window.location.href = "/teacher/students")}
                >
                  View Students
                </Button>
              </div>
            </div>
          </div>

          {/* Upload Materials Card */}
          <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 h-[250px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-500"></div>
            <div className="p-5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <kbd className="hidden group-hover:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-600 dark:text-slate-400">
                  <span className="text-xs">⌘</span>U
                </kbd>
              </div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Upload Materials</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Add resources, videos, or documents to courses
              </p>
              <div className="mt-auto">
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => (window.location.href = "/teacher/materials/upload")}
                >
                  Upload Content
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-1"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-green-500">+2</span> from last semester
            </p>
            <div className="mt-4">
              <Progress
                value={80}
                className="h-1.5 bg-blue-100 dark:bg-blue-900"
                indicatorClassName="bg-blue-600 dark:bg-blue-500"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-1"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">245</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-green-500">+18</span> new enrollments this week
            </p>
            <div className="mt-4">
              <Progress
                value={65}
                className="h-1.5 bg-indigo-100 dark:bg-indigo-900"
                indicatorClassName="bg-indigo-600 dark:bg-indigo-500"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0">
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-1"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-red-500">12</span> need grading
            </p>
            <div className="mt-4">
              <Progress
                value={45}
                className="h-1.5 bg-amber-100 dark:bg-amber-900"
                indicatorClassName="bg-amber-600 dark:bg-amber-500"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0">
          <div className="bg-gradient-to-r from-green-600 to-green-500 p-1"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Student Messages</CardTitle>
            <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-red-500">3</span> unread messages
            </p>
            <div className="mt-4">
              <Progress
                value={25}
                className="h-1.5 bg-green-100 dark:bg-green-900"
                indicatorClassName="bg-green-600 dark:bg-green-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Course Activity</CardTitle>
              <Select defaultValue="week">
                <SelectTrigger className="w-[120px] h-8 rounded-lg border-slate-200 dark:border-slate-800">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Student engagement across your courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm font-medium">Introduction to Computer Science</span>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">92 students</span>
                </div>
                <Progress
                  value={85}
                  className="h-2 bg-blue-100 dark:bg-blue-900"
                  indicatorClassName="bg-blue-600 dark:bg-blue-500"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>85% engagement rate</span>
                  <span>Last activity: 2 hours ago</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
                    <span className="text-sm font-medium">Data Structures and Algorithms</span>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">64 students</span>
                </div>
                <Progress
                  value={72}
                  className="h-2 bg-indigo-100 dark:bg-indigo-900"
                  indicatorClassName="bg-indigo-600 dark:bg-indigo-500"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>72% engagement rate</span>
                  <span>Last activity: 5 hours ago</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-600"></div>
                    <span className="text-sm font-medium">Web Development Fundamentals</span>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">78 students</span>
                </div>
                <Progress
                  value={91}
                  className="h-2 bg-green-100 dark:bg-green-900"
                  indicatorClassName="bg-green-600 dark:bg-green-500"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>91% engagement rate</span>
                  <span>Last activity: 30 minutes ago</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="ghost"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0"
            >
              <span>View all courses</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        <Card className="lg:col-span-3 rounded-xl shadow-md hover:shadow-lg transition-shadow border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Upcoming Deadlines</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Assignments due in the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                  <Clock className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">Final Project Submission</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800 rounded-full"
                    >
                      Web Development
                    </Badge>
                    <span className="text-xs text-red-600 dark:text-red-400 font-medium">Due in 2 days</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                  <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">Midterm Exam</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-800 rounded-full"
                    >
                      Data Structures
                    </Badge>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Due in 5 days</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">Lab Assignment #4</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800 rounded-full"
                    >
                      Computer Science
                    </Badge>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Due in 6 days</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="ghost"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0"
            >
              <span>View all deadlines</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Student Activity</CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Latest student interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border-2 border-blue-100 dark:border-blue-900">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Submitted assignment: "Database Design Project"
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border-2 border-blue-100 dark:border-blue-900">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    MS
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Mike Smith</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Completed lesson: "JavaScript Promises"</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border-2 border-blue-100 dark:border-blue-900">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    AJ
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Alex Johnson</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Asked a question in "Data Structures"</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="ghost"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0"
            >
              <span>View all activity</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Performing Students</CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Students with highest grades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border-2 border-blue-100 dark:border-blue-900">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
                    <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      EW
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Emma Wilson</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Computer Science</p>
                  </div>
                </div>
                <Badge className="bg-blue-600 text-white rounded-full">98%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border-2 border-blue-100 dark:border-blue-900">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
                    <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      RL
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Ryan Lee</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Web Development</p>
                  </div>
                </div>
                <Badge className="bg-blue-600 text-white rounded-full">96%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border-2 border-blue-100 dark:border-blue-900">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
                    <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      SP
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Sarah Parker</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Data Structures</p>
                  </div>
                </div>
                <Badge className="bg-blue-600 text-white rounded-full">95%</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="ghost"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0"
            >
              <span>View all students</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

