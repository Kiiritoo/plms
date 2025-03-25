import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, LineChartIcon, ChevronRight } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Progress } from "@/components/ui/progress"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Track student performance and course engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-[180px] rounded-xl border-slate-200 dark:border-slate-800">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="all-time">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-800">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-1"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
            <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <LineChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-green-500">+5.2%</span> from last month
            </p>
            <div className="mt-4">
              <Progress
                value={78}
                className="h-1.5 bg-blue-100 dark:bg-blue-900"
                indicatorClassName="bg-blue-600 dark:bg-blue-500"
              />
            </div>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEngagement)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0">
          <div className="bg-gradient-to-r from-green-600 to-green-500 p-1"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
            <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <LineChartIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">65%</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-green-500">+2.1%</span> from last month
            </p>
            <div className="mt-4">
              <Progress
                value={65}
                className="h-1.5 bg-green-100 dark:bg-green-900"
                indicatorClassName="bg-green-600 dark:bg-green-500"
              />
            </div>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={completionData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#22c55e" fillOpacity={1} fill="url(#colorCompletion)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0">
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-1"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <LineChartIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">B+ (87%)</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-green-500">+1.3%</span> from last month
            </p>
            <div className="mt-4">
              <Progress
                value={87}
                className="h-1.5 bg-amber-100 dark:bg-amber-900"
                indicatorClassName="bg-amber-600 dark:bg-amber-500"
              />
            </div>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gradeData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#f59e0b" fillOpacity={1} fill="url(#colorGrade)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-1"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <LineChartIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">214</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="text-green-500">+12</span> from last month
            </p>
            <div className="mt-4">
              <Progress
                value={75}
                className="h-1.5 bg-indigo-100 dark:bg-indigo-900"
                indicatorClassName="bg-indigo-600 dark:bg-indigo-500"
              />
            </div>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeStudentsData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorActive)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          <TabsTrigger
            value="engagement"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            Engagement
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            Courses
          </TabsTrigger>
        </TabsList>
        <TabsContent value="engagement" className="mt-6">
          <Card className="rounded-xl shadow-md border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Student Engagement Over Time</CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">
                    Track how students interact with your courses
                  </CardDescription>
                </div>
                <Select defaultValue="weekly">
                  <SelectTrigger className="h-9 w-[120px] rounded-lg border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="View by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "none",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="videoWatched"
                      name="Videos Watched"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="quizCompleted"
                      name="Quizzes Completed"
                      stroke="#22c55e"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="discussionPosts"
                      name="Discussion Posts"
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                variant="ghost"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0"
              >
                <span>View detailed analytics</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const engagementData = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 59 },
  { name: "Mar", value: 70 },
  { name: "Apr", value: 72 },
  { name: "May", value: 68 },
  { name: "Jun", value: 75 },
  { name: "Jul", value: 78 },
]

const completionData = [
  { name: "Jan", value: 55 },
  { name: "Feb", value: 57 },
  { name: "Mar", value: 58 },
  { name: "Apr", value: 60 },
  { name: "May", value: 62 },
  { name: "Jun", value: 63 },
  { name: "Jul", value: 65 },
]

const gradeData = [
  { name: "Jan", value: 82 },
  { name: "Feb", value: 83 },
  { name: "Mar", value: 84 },
  { name: "Apr", value: 85 },
  { name: "May", value: 86 },
  { name: "Jun", value: 86 },
  { name: "Jul", value: 87 },
]

const activeStudentsData = [
  { name: "Jan", value: 180 },
  { name: "Feb", value: 185 },
  { name: "Mar", value: 190 },
  { name: "Apr", value: 195 },
  { name: "May", value: 200 },
  { name: "Jun", value: 205 },
  { name: "Jul", value: 214 },
]

const engagementTimeData = [
  { name: "Week 1", videoWatched: 40, quizCompleted: 24, discussionPosts: 10 },
  { name: "Week 2", videoWatched: 45, quizCompleted: 28, discussionPosts: 12 },
  { name: "Week 3", videoWatched: 50, quizCompleted: 32, discussionPosts: 15 },
  { name: "Week 4", videoWatched: 55, quizCompleted: 35, discussionPosts: 18 },
  { name: "Week 5", videoWatched: 60, quizCompleted: 38, discussionPosts: 20 },
  { name: "Week 6", videoWatched: 65, quizCompleted: 40, discussionPosts: 22 },
  { name: "Week 7", videoWatched: 70, quizCompleted: 42, discussionPosts: 25 },
  { name: "Week 8", videoWatched: 75, quizCompleted: 45, discussionPosts: 28 },
]

const performanceData = [
  { name: "Introduction to Computer Science", averageGrade: 85, passingRate: 92 },
  { name: "Data Structures and Algorithms", averageGrade: 78, passingRate: 85 },
  { name: "Web Development Fundamentals", averageGrade: 88, passingRate: 95 },
  { name: "Python Programming", averageGrade: 82, passingRate: 90 },
  { name: "Database Design", averageGrade: 76, passingRate: 82 },
]

const coursePopularityData = [
  { name: "Introduction to Computer Science", students: 92 },
  { name: "Web Development Fundamentals", students: 78 },
  { name: "Data Structures and Algorithms", students: 64 },
  { name: "Python Programming", students: 56 },
  { name: "Database Design", students: 42 },
  { name: "Introduction to AI", students: 38 },
]

