"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Users, BookOpen, GraduationCap, BarChart3, Activity, Calendar, SettingsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/Components/ui/progress"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for charts
const userActivityData = [
  { name: "Jan", count: 400 },
  { name: "Feb", count: 300 },
  { name: "Mar", count: 500 },
  { name: "Apr", count: 280 },
  { name: "May", count: 590 },
  { name: "Jun", count: 320 },
  { name: "Jul", count: 350 },
]

const courseEngagementData = [
  { name: "Computer Science", students: 120, completion: 85 },
  { name: "Mathematics", students: 80, completion: 70 },
  { name: "Physics", students: 60, completion: 65 },
  { name: "Literature", students: 40, completion: 90 },
  { name: "History", students: 30, completion: 75 },
]

const userTypeData = [
  { name: "Students", value: 850 },
  { name: "Teachers", value: 120 },
  { name: "Admins", value: 15 },
]

const COLORS = ["#0088FE", "#00C49F", "#FF8042"]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome to the Telesandi admin dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => (window.location.href = "/admin/settings")}>
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <TabsTrigger value="overview" className="text-xs md:text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="text-xs md:text-sm">
            Users
          </TabsTrigger>
          <TabsTrigger value="courses" className="text-xs md:text-sm">
            Courses
          </TabsTrigger>
          <TabsTrigger value="activity" className="text-xs md:text-sm">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-xl shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <CardDescription>All registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">985</div>
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                <CardDescription>Currently running courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">42</div>
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">+3 new this month</p>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Student Engagement</CardTitle>
                <CardDescription>Average daily activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">76%</div>
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
                <Progress value={76} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">8</div>
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-xs text-blue-600 mt-2">View calendar</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="rounded-xl shadow-sm border-0">
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Daily active users over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm border-0">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown by user type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-xl shadow-sm border-0">
            <CardHeader>
              <CardTitle>Course Engagement</CardTitle>
              <CardDescription>Student enrollment and completion rates</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseEngagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#3b82f6" name="Enrolled Students" />
                  <Bar dataKey="completion" fill="#10b981" name="Completion Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="rounded-xl shadow-sm border-0">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => (window.location.href = "/admin/users")}
                >
                  View All Users
                </Button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="font-medium">Students</h3>
                      </div>
                      <span className="text-xl font-bold">850</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Active learning accounts</p>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        <h3 className="font-medium">Teachers</h3>
                      </div>
                      <span className="text-xl font-bold">120</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Course instructors</p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-100 dark:border-red-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <h3 className="font-medium">Admins</h3>
                      </div>
                      <span className="text-xl font-bold">15</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">System administrators</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Recent User Activity</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                            User
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                            Action
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-3 text-sm">Jane Doe</td>
                          <td className="px-4 py-3 text-sm">Logged in</td>
                          <td className="px-4 py-3 text-sm">10 minutes ago</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">Dr. Smith</td>
                          <td className="px-4 py-3 text-sm">Updated course materials</td>
                          <td className="px-4 py-3 text-sm">1 hour ago</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">Admin User</td>
                          <td className="px-4 py-3 text-sm">Added new user</td>
                          <td className="px-4 py-3 text-sm">2 hours ago</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">Mike Johnson</td>
                          <td className="px-4 py-3 text-sm">Submitted assignment</td>
                          <td className="px-4 py-3 text-sm">3 hours ago</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card className="rounded-xl shadow-sm border-0">
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>View and manage all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => (window.location.href = "/admin/courses")}
                >
                  View All Courses
                </Button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-100 dark:border-green-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <h3 className="font-medium">Active Courses</h3>
                      </div>
                      <span className="text-xl font-bold">42</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Currently running</p>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-100 dark:border-amber-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        <h3 className="font-medium">Upcoming</h3>
                      </div>
                      <span className="text-xl font-bold">8</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Starting soon</p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-100 dark:border-purple-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        <h3 className="font-medium">Avg. Completion</h3>
                      </div>
                      <span className="text-xl font-bold">76%</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Course completion rate</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Popular Courses</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                            Course
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                            Instructor
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                            Students
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                            Rating
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-3 text-sm">Introduction to Computer Science</td>
                          <td className="px-4 py-3 text-sm">Dr. Smith</td>
                          <td className="px-4 py-3 text-sm">120</td>
                          <td className="px-4 py-3 text-sm">4.8/5</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">Advanced Mathematics</td>
                          <td className="px-4 py-3 text-sm">Prof. Williams</td>
                          <td className="px-4 py-3 text-sm">80</td>
                          <td className="px-4 py-3 text-sm">4.6/5</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">Physics 101</td>
                          <td className="px-4 py-3 text-sm">Dr. Johnson</td>
                          <td className="px-4 py-3 text-sm">60</td>
                          <td className="px-4 py-3 text-sm">4.5/5</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">World Literature</td>
                          <td className="px-4 py-3 text-sm">Prof. Garcia</td>
                          <td className="px-4 py-3 text-sm">40</td>
                          <td className="px-4 py-3 text-sm">4.9/5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="rounded-xl shadow-sm border-0">
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>Recent system events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Today's Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Logins</p>
                      <p className="text-xl font-bold">124</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Course Views</p>
                      <p className="text-xl font-bold">568</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Assignments</p>
                      <p className="text-xl font-bold">47</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400">New Users</p>
                      <p className="text-xl font-bold">12</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recent System Events</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                            Event
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                            User
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                            Time
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-3 text-sm">System backup</td>
                          <td className="px-4 py-3 text-sm">System</td>
                          <td className="px-4 py-3 text-sm">2 hours ago</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Success
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">New course created</td>
                          <td className="px-4 py-3 text-sm">Dr. Smith</td>
                          <td className="px-4 py-3 text-sm">3 hours ago</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Success
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">User registration</td>
                          <td className="px-4 py-3 text-sm">Sarah Parker</td>
                          <td className="px-4 py-3 text-sm">5 hours ago</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                              Pending
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">System update</td>
                          <td className="px-4 py-3 text-sm">Admin User</td>
                          <td className="px-4 py-3 text-sm">Yesterday</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Success
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => (window.location.href = "/admin/logs")}>
                    View All Activity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

