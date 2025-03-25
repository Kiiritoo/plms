"use client"

import { useState } from "react"
import {
  BarChart,
  LineChart,
  Download,
  RefreshCw,
  ChevronDown,
  Users,
  BookOpen,
  Clock,
  ArrowUpRight,
  Award,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AreaChart,
  BarChart as BarChartComponent,
  LineChart as LineChartComponent,
  PieChart as PieChartComponent,
} from "@/components/ui/chart"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [activeTab, setActiveTab] = useState("overview")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefreshData = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  // Sample data for charts
  const userActivityData = [
    { name: "Mon", Students: 120, Teachers: 45 },
    { name: "Tue", Students: 150, Teachers: 50 },
    { name: "Wed", Students: 180, Teachers: 55 },
    { name: "Thu", Students: 170, Teachers: 60 },
    { name: "Fri", Students: 190, Teachers: 65 },
    { name: "Sat", Students: 95, Teachers: 30 },
    { name: "Sun", Students: 85, Teachers: 25 },
  ]

  const courseEngagementData = [
    { name: "Week 1", Engagement: 65 },
    { name: "Week 2", Engagement: 75 },
    { name: "Week 3", Engagement: 85 },
    { name: "Week 4", Engagement: 70 },
    { name: "Week 5", Engagement: 90 },
    { name: "Week 6", Engagement: 95 },
    { name: "Week 7", Engagement: 88 },
    { name: "Week 8", Engagement: 92 },
  ]

  const userRoleDistributionData = [
    { name: "Students", value: 1024 },
    { name: "Teachers", value: 156 },
    { name: "Admins", value: 10 },
    { name: "Staff", value: 58 },
  ]

  const courseCompletionData = [
    { name: "Computer Science", Completed: 85, InProgress: 15 },
    { name: "Mathematics", Completed: 70, InProgress: 30 },
    { name: "Engineering", Completed: 60, InProgress: 40 },
    { name: "Business", Completed: 75, InProgress: 25 },
    { name: "Arts", Completed: 65, InProgress: 35 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Analytics & Reports
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Insights and statistics about system usage</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] rounded-xl">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={handleRefreshData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-xl gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="rounded-xl shadow-md border-0">
        <CardHeader className="pb-2">
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            Comprehensive data and insights for{" "}
            {timeRange === "day"
              ? "today"
              : timeRange === "week"
                ? "this week"
                : timeRange === "month"
                  ? "this month"
                  : timeRange === "quarter"
                    ? "this quarter"
                    : "this year"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Courses</span>
              </TabsTrigger>
              <TabsTrigger value="engagement" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                <span>Engagement</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="rounded-xl overflow-hidden shadow-sm border-0">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-1"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1,248</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <span className="text-green-500">+24</span> new this {timeRange}
                    </p>
                    <div className="mt-4">
                      <Progress
                        value={78}
                        className="h-1.5 bg-blue-100 dark:bg-blue-900"
                        indicatorClassName="bg-blue-600 dark:bg-blue-500"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl overflow-hidden shadow-sm border-0">
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-1"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                    <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">87</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <span className="text-green-500">+5</span> new this {timeRange}
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

                <Card className="rounded-xl overflow-hidden shadow-sm border-0">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-1"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                    <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">76%</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <span className="text-green-500">+3%</span> from last {timeRange}
                    </p>
                    <div className="mt-4">
                      <Progress
                        value={76}
                        className="h-1.5 bg-purple-100 dark:bg-purple-900"
                        indicatorClassName="bg-purple-600 dark:bg-purple-500"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl overflow-hidden shadow-sm border-0">
                  <div className="bg-gradient-to-r from-green-600 to-green-500 p-1"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Time Spent</CardTitle>
                    <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">42 min</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <span className="text-green-500">+5 min</span> from last {timeRange}
                    </p>
                    <div className="mt-4">
                      <Progress
                        value={70}
                        className="h-1.5 bg-green-100 dark:bg-green-900"
                        indicatorClassName="bg-green-600 dark:bg-green-500"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-xl shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>Daily active users by role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <BarChartComponent
                        data={userActivityData}
                        index="name"
                        categories={["Students", "Teachers"]}
                        colors={["blue", "indigo"]}
                        valueFormatter={(value) => `${value} users`}
                        yAxisWidth={40}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>User Distribution</CardTitle>
                    <CardDescription>Breakdown by role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <PieChartComponent
                        data={userRoleDistributionData}
                        index="name"
                        category="value"
                        colors={["blue", "indigo", "red", "green"]}
                        valueFormatter={(value) => `${value} users`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Course Engagement Trends</CardTitle>
                  <CardDescription>Weekly engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <AreaChart
                      data={courseEngagementData}
                      index="name"
                      categories={["Engagement"]}
                      colors={["blue"]}
                      valueFormatter={(value) => `${value}%`}
                      yAxisWidth={40}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              {/* User analytics content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="rounded-xl shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>New Registrations</CardTitle>
                    <CardDescription>User sign-ups over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <LineChartComponent
                        data={[
                          { date: "Jan", count: 45 },
                          { date: "Feb", count: 52 },
                          { date: "Mar", count: 48 },
                          { date: "Apr", count: 61 },
                          { date: "May", count: 55 },
                          { date: "Jun", count: 67 },
                        ]}
                        index="date"
                        categories={["count"]}
                        colors={["blue"]}
                        valueFormatter={(value) => `${value} users`}
                        yAxisWidth={40}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>User Retention</CardTitle>
                    <CardDescription>Return rate by cohort</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Jan Cohort</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Feb Cohort</span>
                          <span className="text-sm font-medium">82%</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Mar Cohort</span>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Apr Cohort</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">May Cohort</span>
                          <span className="text-sm font-medium">80%</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>By time of day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <BarChartComponent
                        data={[
                          { time: "Morning", users: 320 },
                          { time: "Afternoon", users: 580 },
                          { time: "Evening", users: 420 },
                          { time: "Night", users: 180 },
                        ]}
                        index="time"
                        categories={["users"]}
                        colors={["indigo"]}
                        valueFormatter={(value) => `${value} users`}
                        yAxisWidth={40}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Top Active Users</CardTitle>
                  <CardDescription>Users with highest engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 dark:bg-slate-900"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              {String.fromCharCode(64 + i)}S
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Student {i}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{90 - i * 5} hours active time</p>
                          </div>
                        </div>
                        <Badge className="bg-green-600 hover:bg-green-700">Top {i}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              {/* Course analytics content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-xl shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>Course Completion Rates</CardTitle>
                    <CardDescription>By department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <BarChartComponent
                        data={courseCompletionData}
                        index="name"
                        categories={["Completed", "InProgress"]}
                        colors={["green", "amber"]}
                        valueFormatter={(value) => `${value}%`}
                        yAxisWidth={40}
                        layout="vertical"
                        stack
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>Popular Courses</CardTitle>
                    <CardDescription>By enrollment count</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Introduction to Computer Science", count: 245, dept: "Computer Science" },
                        { name: "Business Analytics", count: 210, dept: "Business" },
                        { name: "Calculus I", count: 195, dept: "Mathematics" },
                        { name: "Introduction to Psychology", count: 180, dept: "Psychology" },
                        { name: "Digital Marketing", count: 165, dept: "Business" },
                      ].map((course, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-medium">{course.name}</span>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{course.dept}</p>
                            </div>
                            <span className="text-sm font-medium">{course.count} students</span>
                          </div>
                          <Progress value={(course.count / 245) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Course Activity Timeline</CardTitle>
                  <CardDescription>Engagement over the semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <LineChartComponent
                      data={[
                        { week: "Week 1", assignments: 85, quizzes: 92, discussions: 78 },
                        { week: "Week 2", assignments: 82, quizzes: 89, discussions: 85 },
                        { week: "Week 3", assignments: 78, quizzes: 85, discussions: 90 },
                        { week: "Week 4", assignments: 75, quizzes: 82, discussions: 88 },
                        { week: "Week 5", assignments: 70, quizzes: 80, discussions: 85 },
                        { week: "Week 6", assignments: 65, quizzes: 78, discussions: 82 },
                        { week: "Week 7", assignments: 60, quizzes: 75, discussions: 80 },
                        { week: "Week 8", assignments: 55, quizzes: 72, discussions: 75 },
                        { week: "Week 9", assignments: 50, quizzes: 68, discussions: 72 },
                        { week: "Week 10", assignments: 45, quizzes: 65, discussions: 70 },
                      ]}
                      index="week"
                      categories={["assignments", "quizzes", "discussions"]}
                      colors={["blue", "purple", "green"]}
                      valueFormatter={(value) => `${value}%`}
                      yAxisWidth={40}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-6">
              {/* Engagement analytics content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="rounded-xl shadow-sm border-0 col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Engagement by Feature</CardTitle>
                    <CardDescription>Usage of platform features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <AreaChart
                        data={[
                          { month: "Jan", assignments: 65, discussions: 45, quizzes: 55, videos: 35 },
                          { month: "Feb", assignments: 70, discussions: 50, quizzes: 60, videos: 40 },
                          { month: "Mar", assignments: 75, discussions: 55, quizzes: 65, videos: 45 },
                          { month: "Apr", assignments: 80, discussions: 60, quizzes: 70, videos: 50 },
                          { month: "May", assignments: 85, discussions: 65, quizzes: 75, videos: 55 },
                          { month: "Jun", assignments: 90, discussions: 70, quizzes: 80, videos: 60 },
                        ]}
                        index="month"
                        categories={["assignments", "discussions", "quizzes", "videos"]}
                        colors={["blue", "green", "purple", "amber"]}
                        valueFormatter={(value) => `${value}%`}
                        yAxisWidth={40}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>Device Usage</CardTitle>
                    <CardDescription>Platform access by device</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <PieChartComponent
                        data={[
                          { device: "Desktop", percentage: 55 },
                          { device: "Mobile", percentage: 35 },
                          { device: "Tablet", percentage: 10 },
                        ]}
                        index="device"
                        category="percentage"
                        colors={["blue", "green", "amber"]}
                        valueFormatter={(value) => `${value}%`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { title: "Avg. Session Duration", value: "18:42", change: "+2:15", icon: Clock },
                      { title: "Pages per Session", value: "5.8", change: "+0.7", icon: BookOpen },
                      { title: "Bounce Rate", value: "24%", change: "-3%", icon: ArrowUpRight },
                      { title: "Completion Rate", value: "76%", change: "+5%", icon: Award },
                    ].map((metric, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <metric.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm font-medium">{metric.title}</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <span className="text-2xl font-bold">{metric.value}</span>
                          <span className="text-xs text-green-500">{metric.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Data last updated: Today at 10:45 AM. Analytics are refreshed every hour.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

