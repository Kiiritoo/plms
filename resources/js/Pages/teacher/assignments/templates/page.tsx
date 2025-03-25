import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, Filter, Plus, Search, Star, StarHalf, Clock, Copy } from "lucide-react"

export default function AssignmentTemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignment Templates</h1>
          <p className="text-slate-500 dark:text-slate-400">Create and manage reusable assignment templates</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm">
            <Link href="/teacher/assignments/templates/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="w-full bg-background pl-8 border-slate-200 dark:border-slate-800 rounded-xl"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 rounded-xl">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="my">My Templates</TabsTrigger>
          <TabsTrigger value="shared">Shared Templates</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow rounded-xl"
              >
                <div className={`h-1.5 w-full ${template.colorClass}`}></div>
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <CardDescription className="mt-1">{template.description}</CardDescription>
                    </div>
                    {template.featured && (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
                      >
                        <Star className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{template.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{template.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{template.subject}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4 bg-slate-50 dark:bg-slate-900">
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <StarHalf className="h-4 w-4 text-amber-500" />
                    <span>
                      {template.rating} ({template.reviews} reviews)
                    </span>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-lg">
                    <Copy className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my" className="mt-0">
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <FileText className="h-10 w-10 text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold">No Templates Created Yet</h3>
              <p className="mb-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                You haven't created any assignment templates yet. Templates help you save time by reusing common
                assignment structures.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/teacher/assignments/templates/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Template
                </Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const templates = [
  {
    id: "template-001",
    title: "Research Paper Assignment",
    description: "A comprehensive template for research paper assignments with rubric",
    tags: ["Research", "Academic Writing", "APA Format"],
    type: "Essay",
    estimatedTime: "2-3 weeks",
    subject: "Multiple Subjects",
    rating: 4.8,
    reviews: 124,
    featured: true,
    colorClass: "bg-blue-600",
  },
  {
    id: "template-002",
    title: "Weekly Reading Quiz",
    description: "Quick assessment of assigned reading materials",
    tags: ["Quiz", "Reading", "Comprehension"],
    type: "Quiz",
    estimatedTime: "15-20 min",
    subject: "Literature",
    rating: 4.5,
    reviews: 87,
    featured: false,
    colorClass: "bg-indigo-600",
  },
  {
    id: "template-003",
    title: "Group Project Framework",
    description: "Structured template for collaborative group projects",
    tags: ["Group Work", "Collaboration", "Project-Based"],
    type: "Project",
    estimatedTime: "3-4 weeks",
    subject: "Multiple Subjects",
    rating: 4.7,
    reviews: 92,
    featured: true,
    colorClass: "bg-green-600",
  },
  {
    id: "template-004",
    title: "Lab Report Template",
    description: "Scientific lab report with methodology and results sections",
    tags: ["Science", "Lab", "Experiment"],
    type: "Lab Report",
    estimatedTime: "1 week",
    subject: "Science",
    rating: 4.9,
    reviews: 156,
    featured: false,
    colorClass: "bg-amber-600",
  },
  {
    id: "template-005",
    title: "Coding Challenge",
    description: "Programming assignment with test cases and rubric",
    tags: ["Coding", "Programming", "Computer Science"],
    type: "Project",
    estimatedTime: "1-2 weeks",
    subject: "Computer Science",
    rating: 4.6,
    reviews: 78,
    featured: false,
    colorClass: "bg-purple-600",
  },
  {
    id: "template-006",
    title: "Discussion Forum Prompt",
    description: "Engaging discussion questions with grading criteria",
    tags: ["Discussion", "Critical Thinking", "Participation"],
    type: "Discussion",
    estimatedTime: "Ongoing",
    subject: "Multiple Subjects",
    rating: 4.3,
    reviews: 64,
    featured: false,
    colorClass: "bg-red-600",
  },
]

