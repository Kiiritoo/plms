"use client"

import AdminPageLayout from "./layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Users, BookOpen, GraduationCap, BarChart3, Activity, Calendar } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Progress } from "@/Components/ui/progress"
import { Link } from "@inertiajs/react"

export default function AdminDashboard() {
  return (
    <AdminPageLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Welcome to the Telesandi admin dashboard</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-xl shadow-sm border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <CardDescription>All registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">985</div>
                <Users className="h-4 w-4 text-red-600" />
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
                <BookOpen className="h-4 w-4 text-red-600" />
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
                <Calendar className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-xs text-blue-600 mt-2">View calendar</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="rounded-xl shadow-sm border-0">
            <CardHeader>
              <CardTitle>Course Engagement</CardTitle>
              <CardDescription>Student participation by department</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-600" />
                    <span className="text-sm">Computer Science</span>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-600" />
                    <span className="text-sm">Mathematics</span>
                  </div>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <Progress value={70} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-sm">Physics</span>
                  </div>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-600" />
                    <span className="text-sm">Literature</span>
                  </div>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-600" />
                    <span className="text-sm">History</span>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageLayout>
  )
}

