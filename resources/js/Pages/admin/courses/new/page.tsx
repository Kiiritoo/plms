"use client"

import type React from "react"

import { useState, useRef } from "react"
import { router } from "@inertiajs/react"
import { Link } from "@inertiajs/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  ArrowDown,
  ArrowUp,
  CalendarIcon,
  ChevronLeft,
  Edit,
  File,
  FileText,
  HelpCircle,
  ImagePlus,
  Loader2,
  MoreHorizontal,
  Plus,
  Save,
  Trash2,
  Video,
  X,
  Check,
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import { Calendar } from "@/Components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { toast } from "@/Components/ui/use-toast"
import { Badge } from "@/Components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import TeacherLayout from "../../layout"

// Form schemas
const courseFormSchema = z.object({
  title: z.string().min(3, {
    message: "Course title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Course description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  endDate: z.date({
    required_error: "An end date is required.",
  }),
})

// Update the lessonSchema to remove the 5-option limit and assignment type
const lessonSchema = z.object({
  title: z.string().min(3, {
    message: "Lesson title must be at least 3 characters.",
  }),
  description: z.string().optional(),
  type: z.enum(["video", "reading", "quiz"]),
  duration: z.string().optional(),
  videoUrl: z.string().optional(),
  videoSource: z.enum(["upload", "youtube"]).optional(),
  readingContent: z.string().optional(),
  readingSource: z.enum(["upload", "text"]).optional(),
  quizType: z.enum(["multiple-choice"]).optional(),
  timeLimit: z.string().optional(),
  passingScore: z.string().optional(),
  questions: z
    .array(
      z.object({
        id: z.string(),
        question: z.string(),
        options: z
          .array(
            z.object({
              id: z.string(),
              text: z.string(),
              isCorrect: z.boolean().optional(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
})

const chapterSchema = z.object({
  title: z.string().min(3, {
    message: "Chapter title must be at least 3 characters.",
  }),
  description: z.string().optional(),
})

type CourseFormValues = z.infer<typeof courseFormSchema>
type ChapterFormValues = z.infer<typeof chapterSchema>
type LessonFormValues = z.infer<typeof lessonSchema>

const defaultValues: Partial<CourseFormValues> = {
  title: "",
  description: "",
}

interface Option {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  description?: string;
  duration?: string;
  videoUrl?: string;
  videoSource?: 'upload' | 'youtube';
  videoFile?: File;
  readingContent?: string;
  readingSource?: 'upload' | 'text';
  readingFile?: File;
  questions: Question[];
  timeLimit?: string;
  passingScore?: string;
  order: number;
}

interface Chapter {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  order: number;
}

export default function NewCoursePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [courseThumbnail, setCourseThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  // Chapter management state
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [isAddingChapter, setIsAddingChapter] = useState(false)
  const [isEditingChapter, setIsEditingChapter] = useState(false)
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(null)

  // Lesson management state
  const [isAddingLesson, setIsAddingLesson] = useState(false)
  const [isEditingLesson, setIsEditingLesson] = useState(false)
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number | null>(null)

  // File management state
  const [uploadedVideos, setUploadedVideos] = useState<{ [key: string]: File }>({})
  const [uploadedReadings, setUploadedReadings] = useState<{ [key: string]: File }>({})

  // Add this new state for quiz questions management
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [isEditingQuestion, setIsEditingQuestion] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null)

  // Forms
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
  })

  const chapterForm = useForm<ChapterFormValues>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const lessonForm = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      type: "video",
      description: "",
      duration: "",
      videoUrl: "",
      videoSource: "upload",
      readingContent: "",
      readingSource: "upload",
    },
  })

  // Handle course thumbnail selection
  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setCourseThumbnail(file)

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file)
      setThumbnailPreview(previewUrl)

      toast({
        title: "Thumbnail selected",
        description: `${file.name} has been selected as the course thumbnail.`,
      })
    }
  }

  // Remove thumbnail
  const removeThumbnail = () => {
    setCourseThumbnail(null)
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview)
      setThumbnailPreview(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Handle course form submission
  function onSubmit(data: CourseFormValues) {
    if (chapters.length === 0) {
      toast({
        title: "No chapters added",
        description: "Please add at least one chapter to your course.",
        variant: "destructive",
      })
      setActiveTab("chapters")
      return
    }

    setIsSubmitting(true)

    // Prepare course data with chapters and lessons
    const courseData = {
      ...data,
      thumbnail: courseThumbnail ? courseThumbnail.name : null,
      chapters: chapters.map((chapter) => ({
        ...chapter,
        lessons: chapter.lessons.map((lesson: Lesson) => ({
          ...lesson,
          // We would handle file uploads separately in a real implementation
          videoFile: lesson.videoFile ? lesson.videoFile.name : null,
          readingFile: lesson.readingFile ? lesson.readingFile.name : null,
        })),
      })),
    }

    // Simulate API call
    setTimeout(() => {
      console.log(courseData)
      setIsSubmitting(false)
      toast({
        title: "Course created successfully",
        description: `${data.title} has been created with ${chapters.length} chapters.`,
      })
      router.visit("/teacher/courses")
    }, 1500)
  }

  // Handle chapter form submission
  const handleChapterSubmit = (data: ChapterFormValues) => {
    if (isEditingChapter && currentChapterIndex !== null) {
      // Edit existing chapter
      const updatedChapters = [...chapters]
      updatedChapters[currentChapterIndex] = {
        ...updatedChapters[currentChapterIndex],
        ...data,
      }
      setChapters(updatedChapters)
      toast({
        title: "Chapter updated",
        description: `${data.title} has been updated.`,
      })
    } else {
      // Add new chapter
      setChapters([
        ...chapters,
        {
          id: `chapter-${Date.now()}`,
          ...data,
          order: chapters.length + 1,
          lessons: [],
        },
      ])
      toast({
        title: "Chapter added",
        description: `${data.title} has been added to your course.`,
      })
    }

    setIsAddingChapter(false)
    setIsEditingChapter(false)
    chapterForm.reset()
    setCurrentChapterIndex(null)
  }

  // Replace the handleAddQuestion function with this improved version
  const handleAddQuestion = (data: any) => {
    // No longer enforcing exactly 5 options
    const newQuestion = {
      id: `question-${Date.now()}`,
      question: data.question,
      options: data.options || [],
      // Instead of a single correctAnswer, we'll use isCorrect flag on each option
    }

    if (isEditingQuestion && currentQuestionIndex !== null) {
      // Edit existing question
      const updatedQuestions = [...quizQuestions]
      updatedQuestions[currentQuestionIndex] = newQuestion
      setQuizQuestions(updatedQuestions)
    } else {
      // Add new question
      setQuizQuestions([...quizQuestions, newQuestion])
    }

    setIsAddingQuestion(false)
    setIsEditingQuestion(false)
    setCurrentQuestionIndex(null)
    setCurrentQuestion(null)
  }

  // Add this function to handle deleting a question
  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = [...quizQuestions]
    updatedQuestions.splice(index, 1)
    setQuizQuestions(updatedQuestions)
  }

  // Check if a chapter already has a lesson of the specified type
  const hasLessonType = (chapter: Chapter, type: string) => {
    return chapter.lessons.some((lesson: Lesson) => lesson.type === type)
  }

  // Handle lesson form submission
  const handleLessonSubmit = (data: LessonFormValues) => {
    if (!currentChapter) return

    const chapterIndex = chapters.findIndex((c) => c.id === currentChapter.id)
    if (chapterIndex === -1) return

    // Check if this chapter already has a lesson of this type
    if (!isEditingLesson && hasLessonType(currentChapter, data.type)) {
      toast({
        title: "Lesson type limit reached",
        description: `This chapter already has a ${data.type} lesson. Only one of each type is allowed per chapter.`,
        variant: "destructive",
      })
      return
    }

    const updatedChapters = [...chapters]
    const lessonKey =
      isEditingLesson && currentLessonIndex !== null
        ? `${currentChapter.id}-${currentLessonIndex}`
        : `${currentChapter.id}-new`

    // Prepare media data based on lesson type
    let mediaData = {}

    if (data.type === "video") {
      if (data.videoSource === "upload") {
        mediaData = {
          videoSource: "upload",
          videoFile: uploadedVideos[lessonKey] || null,
          videoUrl: "",
        }
      } else {
        mediaData = {
          videoSource: "youtube",
          videoFile: null,
          videoUrl: data.videoUrl || "",
        }
      }
    } else if (data.type === "reading") {
      if (data.readingSource === "upload") {
        mediaData = {
          readingSource: "upload",
          readingFile: uploadedReadings[lessonKey] || null,
          readingContent: "",
        }
      } else {
        mediaData = {
          readingSource: "text",
          readingFile: null,
          readingContent: data.readingContent || "",
        }
      }
    } else if (data.type === "quiz") {
      mediaData = {
        quizType: "multiple-choice",
        timeLimit: data.timeLimit || "",
        passingScore: data.passingScore || "60",
        questions: quizQuestions,
      }
    }

    if (isEditingLesson && currentLessonIndex !== null) {
      // Edit existing lesson
      updatedChapters[chapterIndex].lessons[currentLessonIndex] = {
        ...updatedChapters[chapterIndex].lessons[currentLessonIndex],
        ...data,
        ...mediaData,
      }
      toast({
        title: "Lesson updated",
        description: `${data.title} has been updated.`,
      })
    } else {
      // Add new lesson
      const newLessonId = `lesson-${Date.now()}`
      updatedChapters[chapterIndex].lessons.push({
        id: newLessonId,
        ...data,
        ...mediaData,
        order: updatedChapters[chapterIndex].lessons.length + 1,
      })
      toast({
        title: "Lesson added",
        description: `${data.title} has been added to the chapter.`,
      })
    }

    setChapters(updatedChapters)
    setIsAddingLesson(false)
    setIsEditingLesson(false)
    lessonForm.reset()
    setCurrentLessonIndex(null)
    setQuizQuestions([])

    // Clear temporary uploads
    if (uploadedVideos[`${currentChapter.id}-new`]) {
      const newUploadedVideos = { ...uploadedVideos }
      delete newUploadedVideos[`${currentChapter.id}-new`]
      setUploadedVideos(newUploadedVideos)
    }

    if (uploadedReadings[`${currentChapter.id}-new`]) {
      const newUploadedReadings = { ...uploadedReadings }
      delete newUploadedReadings[`${currentChapter.id}-new`]
      setUploadedReadings(newUploadedReadings)
    }
  }

  // Handle chapter edit
  const handleEditChapter = (index: number) => {
    const chapter = chapters[index]
    chapterForm.setValue("title", chapter.title)
    chapterForm.setValue("description", chapter.description || "")
    setCurrentChapterIndex(index)
    setIsEditingChapter(true)
    setIsAddingChapter(true)
  }

  // Handle chapter delete
  const handleDeleteChapter = (index: number) => {
    const updatedChapters = [...chapters]
    updatedChapters.splice(index, 1)

    // Update order for remaining chapters
    updatedChapters.forEach((chapter, idx) => {
      chapter.order = idx + 1
    })

    setChapters(updatedChapters)
    toast({
      title: "Chapter deleted",
      description: "The chapter has been removed from your course.",
    })
  }

  // Update the handleEditLesson function to load quiz data
  const handleEditLesson = (chapterIndex: number, lessonIndex: number) => {
    const chapter = chapters[chapterIndex]
    const lesson = chapter.lessons[lessonIndex]
    const lessonKey = `${chapter.id}-${lessonIndex}`

    lessonForm.setValue("title", lesson.title)
    lessonForm.setValue("type", lesson.type)
    lessonForm.setValue("description", lesson.description || "")
    lessonForm.setValue("duration", lesson.duration || "")

    // Set media fields based on lesson type
    if (lesson.type === "video") {
      lessonForm.setValue("videoSource", lesson.videoSource || "upload")
      lessonForm.setValue("videoUrl", lesson.videoUrl || "")
    } else if (lesson.type === "reading") {
      lessonForm.setValue("readingSource", lesson.readingSource || "upload")
      lessonForm.setValue("readingContent", lesson.readingContent || "")
    } else if (lesson.type === "quiz") {
      lessonForm.setValue("quizType", "multiple-choice")
      lessonForm.setValue("timeLimit", lesson.timeLimit || "")
      lessonForm.setValue("passingScore", lesson.passingScore || "")

      // Load quiz questions
      if (lesson.questions && lesson.questions.length > 0) {
        setQuizQuestions(lesson.questions)
      } else {
        setQuizQuestions([])
      }
    }

    setCurrentChapter(chapter)
    setCurrentLessonIndex(lessonIndex)
    setIsEditingLesson(true)
    setIsAddingLesson(true)

    // Set uploaded files for this lesson
    if (lesson.videoFile) {
      setUploadedVideos({
        ...uploadedVideos,
        [lessonKey]: lesson.videoFile,
      })
    }

    if (lesson.readingFile) {
      setUploadedReadings({
        ...uploadedReadings,
        [lessonKey]: lesson.readingFile,
      })
    }
  }

  // Handle lesson delete
  const handleDeleteLesson = (chapterIndex: number, lessonIndex: number) => {
    const updatedChapters = [...chapters]
    updatedChapters[chapterIndex].lessons.splice(lessonIndex, 1)

    // Update order for remaining lessons
    updatedChapters[chapterIndex].lessons.forEach((lesson: Lesson, idx: number) => {
      lesson.order = idx + 1
    })

    setChapters(updatedChapters)
    toast({
      title: "Lesson deleted",
      description: "The lesson has been removed from the chapter.",
    })
  }

  // Handle video upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setUploadedVideos({
        ...uploadedVideos,
        [key]: file,
      })

      toast({
        title: "Video selected",
        description: `${file.name} has been selected and will be uploaded when you save.`,
      })
    }
  }

  // Handle reading file upload
  const handleReadingUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setUploadedReadings({
        ...uploadedReadings,
        [key]: file,
      })

      toast({
        title: "Reading file selected",
        description: `${file.name} has been selected and will be uploaded when you save.`,
      })
    }
  }

  // Remove video
  const removeVideo = (key: string) => {
    const newUploadedVideos = { ...uploadedVideos }
    delete newUploadedVideos[key]
    setUploadedVideos(newUploadedVideos)
  }

  // Remove reading file
  const removeReading = (key: string) => {
    const newUploadedReadings = { ...uploadedReadings }
    delete newUploadedReadings[key]
    setUploadedReadings(newUploadedReadings)
  }

  // Get file extension
  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toUpperCase() || ""
  }

  // Move chapter up/down
  const moveChapter = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === chapters.length - 1)) {
      return
    }

    const updatedChapters = [...chapters]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    // Swap chapters
    ;[updatedChapters[index], updatedChapters[targetIndex]] = [updatedChapters[targetIndex], updatedChapters[index]]

    // Update order
    updatedChapters.forEach((chapter, idx) => {
      chapter.order = idx + 1
    })

    setChapters(updatedChapters)
  }

  // Move lesson up/down
  const moveLesson = (chapterIndex: number, lessonIndex: number, direction: "up" | "down") => {
    const chapter = chapters[chapterIndex]
    if (
      (direction === "up" && lessonIndex === 0) ||
      (direction === "down" && lessonIndex === chapter.lessons.length - 1)
    ) {
      return
    }

    const updatedChapters = [...chapters]
    const updatedLessons = [...chapter.lessons]
    const targetIndex = direction === "up" ? lessonIndex - 1 : lessonIndex + 1

    // Swap lessons
    ;[updatedLessons[lessonIndex], updatedLessons[targetIndex]] = [
      updatedLessons[targetIndex],
      updatedLessons[lessonIndex],
    ]

    // Update order
    updatedLessons.forEach((lesson: Lesson, idx: number) => {
      lesson.order = idx + 1
    })

    updatedChapters[chapterIndex].lessons = updatedLessons
    setChapters(updatedChapters)
  }

  const handleOptionChange = (option: Option, optIndex: number) => {
    const updatedChapters = chapters.map((chapter) => {
      if (chapter.id === currentChapter?.id) {
        const updatedLessons = chapter.lessons.map((lesson: Lesson) => {
          if (lesson.id === currentLesson?.id) {
            const updatedQuestions = lesson.questions?.map((q: Question) => {
              if (q.id === currentQuestion?.id) {
                const updatedOptions = q.options.map((opt: Option, idx: number) =>
                  idx === optIndex ? option : opt
                );
                return { ...q, options: updatedOptions };
              }
              return q;
            });
            return { ...lesson, questions: updatedQuestions };
          }
          return lesson;
        });
        return { ...chapter, lessons: updatedLessons };
      }
      return chapter;
    });
    setChapters(updatedChapters);
  };

  const handleOptionDelete = (opt: Option) => {
    const updatedChapters = chapters.map((chapter) => {
      if (chapter.id === currentChapter?.id) {
        const updatedLessons = chapter.lessons.map((lesson: Lesson) => {
          if (lesson.id === currentLesson?.id) {
            const updatedQuestions = lesson.questions?.map((q: Question) => {
              if (q.id === currentQuestion?.id) {
                const updatedOptions = q.options.filter((o: Option) => o !== opt);
                return { ...q, options: updatedOptions };
              }
              return q;
            });
            return { ...lesson, questions: updatedQuestions };
          }
          return lesson;
        });
        return { ...chapter, lessons: updatedLessons };
      }
      return chapter;
    });
    setChapters(updatedChapters);
  };

  return (
    <TeacherLayout>
      <div className="container max-w-5xl py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/teacher/courses">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Create New Course</h1>
              <p className="text-sm text-muted-foreground">
                Fill in the details below to create a new course for your students.
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="chapters">Chapters & Content</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Enter the basic details about your course.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-2/3 space-y-6">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Course Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Introduction to Computer Science" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is the name of your course as it will appear to students.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Course Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Provide a detailed description of your course..."
                                  className="min-h-32 resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>Describe what students will learn in this course.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full md:w-1/3 space-y-6">
                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center text-center h-48 relative">
                          {thumbnailPreview ? (
                            <>
                              <div className="relative w-full h-full">
                                <img
                                  src={thumbnailPreview}
                                  alt="Course thumbnail"
                                  className="aspect-video w-full rounded-lg object-cover"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
                                  onClick={removeThumbnail}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">Upload course thumbnail</p>
                              <p className="text-xs text-muted-foreground mt-1">Recommended size: 1280x720px</p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-4"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                Select Image
                              </Button>
                              <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleThumbnailSelect}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="computer-science">Computer Science</SelectItem>
                                <SelectItem value="mathematics">Mathematics</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="humanities">Humanities</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="arts">Arts</SelectItem>
                                <SelectItem value="language">Language</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Select the main category for your course.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>When will the course be available to students?</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>When will the course end?</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline" onClick={() => router.visit("/teacher/courses")}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("chapters")}>
                      Next: Add Chapters
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="chapters" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Chapters & Content</CardTitle>
                      <CardDescription>Organize your course into chapters and add lessons.</CardDescription>
                    </div>
                    <Button
                      onClick={() => {
                        chapterForm.reset()
                        setCurrentChapterIndex(null)
                        setIsEditingChapter(false)
                        setIsAddingChapter(true)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Chapter
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {chapters.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-primary/10 p-3">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">No chapters yet</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Start by adding your first chapter to organize your course content.
                        </p>
                        <Button
                          className="mt-4"
                          onClick={() => {
                            chapterForm.reset()
                            setCurrentChapterIndex(null)
                            setIsEditingChapter(false)
                            setIsAddingChapter(true)
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Your First Chapter
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {chapters.map((chapter, chapterIndex) => (
                          <div key={chapter.id} className="border rounded-lg overflow-hidden">
                            <div className="bg-muted p-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{chapterIndex + 1}</Badge>
                                <h3 className="font-medium">Chapter: {chapter.title}</h3>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveChapter(chapterIndex, "up")}
                                  disabled={chapterIndex === 0}
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveChapter(chapterIndex, "down")}
                                  disabled={chapterIndex === chapters.length - 1}
                                >
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEditChapter(chapterIndex)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit Chapter
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setCurrentChapter(chapter)
                                        setCurrentLessonIndex(null)
                                        setIsEditingLesson(false)
                                        setIsAddingLesson(true)
                                      }}
                                    >
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Lesson
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600 dark:text-red-400"
                                      onClick={() => handleDeleteChapter(chapterIndex)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete Chapter
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>

                            <div className="p-4">
                              {chapter.description && (
                                <p className="text-sm text-muted-foreground mb-4">{chapter.description}</p>
                              )}

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium">Lessons</h4>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      lessonForm.reset()
                                      setCurrentChapter(chapter)
                                      setCurrentLessonIndex(null)
                                      setIsEditingLesson(false)
                                      setIsAddingLesson(true)
                                    }}
                                    disabled={chapter.lessons.length >= 3}
                                  >
                                    <Plus className="mr-1 h-3 w-3" />
                                    Add Lesson
                                  </Button>
                                </div>

                                {chapter.lessons && chapter.lessons.length > 0 ? (
                                  <div className="space-y-2 mt-2">
                                    {chapter.lessons.map((lesson: Lesson, lessonIndex: number) => (
                                      <div
                                        key={lesson.id}
                                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                                            {lesson.type === "video" ? (
                                              <Video className="h-4 w-4" />
                                            ) : lesson.type === "reading" ? (
                                              <FileText className="h-4 w-4" />
                                            ) : lesson.type === "quiz" ? (
                                              <HelpCircle className="h-4 w-4" />
                                            ) : (
                                              <File className="h-4 w-4" />
                                            )}
                                          </div>
                                          <div>
                                            <div className="flex items-center gap-2">
                                              <span className="font-medium">{lesson.title}</span>
                                              <Badge variant="outline" className="text-xs">
                                                {lesson.type}
                                              </Badge>
                                              {lesson.type === "video" && lesson.videoSource && (
                                                <Badge variant="secondary" className="text-xs">
                                                  {lesson.videoSource === "youtube" ? "YouTube" : "Uploaded"}
                                                </Badge>
                                              )}
                                              {lesson.type === "reading" && lesson.readingSource && (
                                                <Badge variant="secondary" className="text-xs">
                                                  {lesson.readingSource === "text" ? "Text" : "PDF/Document"}
                                                </Badge>
                                              )}
                                              {lesson.type === "quiz" && (
                                                <Badge variant="secondary" className="text-xs">
                                                  Multiple Choice
                                                </Badge>
                                              )}
                                            </div>
                                            {lesson.description && (
                                              <p className="text-xs text-muted-foreground">{lesson.description}</p>
                                            )}
                                            {lesson.duration && (
                                              <p className="text-xs text-muted-foreground">Duration: {lesson.duration}</p>
                                            )}
                                            {lesson.type === "quiz" && lesson.timeLimit && (
                                              <p className="text-xs text-muted-foreground">
                                                Time Limit: {lesson.timeLimit} minutes
                                              </p>
                                            )}
                                            {lesson.type === "quiz" && lesson.questions && (
                                              <p className="text-xs text-muted-foreground">
                                                {lesson.questions.length} question(s)
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => moveLesson(chapterIndex, lessonIndex, "up")}
                                            disabled={lessonIndex === 0}
                                          >
                                            <ArrowUp className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => moveLesson(chapterIndex, lessonIndex, "down")}
                                            disabled={lessonIndex === chapter.lessons.length - 1}
                                          >
                                            <ArrowDown className="h-4 w-4" />
                                          </Button>
                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                              </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                              <DropdownMenuItem
                                                onClick={() => handleEditLesson(chapterIndex, lessonIndex)}
                                              >
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Lesson
                                              </DropdownMenuItem>
                                              <DropdownMenuSeparator />
                                              <DropdownMenuItem
                                                className="text-red-600 dark:text-red-400"
                                                onClick={() => handleDeleteLesson(chapterIndex, lessonIndex)}
                                              >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete Lesson
                                              </DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-center py-6 border-2 border-dashed rounded-lg">
                                    <p className="text-muted-foreground">No lessons in this chapter yet.</p>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="mt-2"
                                      onClick={() => {
                                        setCurrentChapter(chapter)
                                        setCurrentLessonIndex(null)
                                        setIsEditingLesson(false)
                                        setIsAddingLesson(true)
                                      }}
                                    >
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Lesson
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline" onClick={() => setActiveTab("details")}>
                      Back: Course Details
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Create Course
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </form>
          </Form>
        </Tabs>

        {/* Add/Edit Chapter Dialog */}
        <Dialog
          open={isAddingChapter}
          onOpenChange={(open) => {
            if (!open) {
              setIsAddingChapter(false)
              setIsEditingChapter(false)
              setCurrentChapterIndex(null)
              chapterForm.reset()
            }
          }}
        >
          <DialogContent className="max-w-lg w-full p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-xl">{isEditingChapter ? "Edit Chapter" : "Add New Chapter"}</DialogTitle>
              <DialogDescription>
                {isEditingChapter ? "Update the chapter details below." : "Create a new chapter for your course content."}
              </DialogDescription>
            </DialogHeader>
            <Form {...chapterForm}>
              <form onSubmit={chapterForm.handleSubmit(handleChapterSubmit)} className="space-y-4 py-2">
                <FormField
                  control={chapterForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Chapter Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Introduction to the Course" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={chapterForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a brief description of this chapter..."
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A short description to help students understand what this chapter covers.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddingChapter(false)
                      setIsEditingChapter(false)
                      setCurrentChapterIndex(null)
                      chapterForm.reset()
                    }}
                    className="w-full sm:w-auto order-2 sm:order-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto order-1 sm:order-2">
                    {isEditingChapter ? "Save Changes" : "Add Chapter"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Add/Edit Lesson Dialog */}
        <Dialog
          open={isAddingLesson}
          onOpenChange={(open) => {
            if (!open) {
              setIsAddingLesson(false)
              setIsEditingLesson(false)
              setCurrentLessonIndex(null)
              lessonForm.reset()
            }
          }}
        >
          <DialogContent className="max-w-2xl w-full p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-xl">{isEditingLesson ? "Edit Lesson" : "Add New Lesson"}</DialogTitle>
              <DialogDescription>
                {isEditingLesson ? "Update the lesson details below." : "Create a new lesson for this chapter."}
              </DialogDescription>
            </DialogHeader>
            <Form {...lessonForm}>
              <form onSubmit={lessonForm.handleSubmit(handleLessonSubmit)} className="space-y-4 py-2">
                <FormField
                  control={lessonForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Lesson Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Introduction to Variables" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={lessonForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a brief description of this lesson..."
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A short description to help students understand what this lesson covers.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={lessonForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Lesson Type</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            // Reset media fields when changing types
                            if (value !== "video") {
                              lessonForm.setValue("videoUrl", "")
                              lessonForm.setValue("videoSource", "upload")
                            }
                            if (value !== "reading") {
                              lessonForm.setValue("readingContent", "")
                              lessonForm.setValue("readingSource", "upload")
                            }
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem
                              value="video"
                              disabled={!isEditingLesson && hasLessonType(currentChapter, "video")}
                            >
                              Video
                            </SelectItem>
                            <SelectItem
                              value="reading"
                              disabled={!isEditingLesson && hasLessonType(currentChapter, "reading")}
                            >
                              Reading
                            </SelectItem>
                            <SelectItem value="quiz" disabled={!isEditingLesson && hasLessonType(currentChapter, "quiz")}>
                              Quiz
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={lessonForm.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Duration (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 15 minutes" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Video Content Section */}
                {lessonForm.watch("type") === "video" && (
                  <div className="space-y-4 pt-2">
                    <FormField
                      control={lessonForm.control}
                      name="videoSource"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base">Video Source</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="upload" id="upload-video" />
                                <Label htmlFor="upload-video" className="text-base">
                                  Upload Video
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="youtube" id="youtube" />
                                <Label htmlFor="youtube" className="text-base">
                                  YouTube Link
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {lessonForm.watch("videoSource") === "upload" ? (
                      <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center text-center">
                        <Video className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Drag and drop your video file here</p>
                        <p className="text-xs text-muted-foreground mt-1">MP4, MOV, or WebM up to 500MB</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => document.getElementById("video-upload")?.click()}
                        >
                          Select Video
                        </Button>
                        <input
                          id="video-upload"
                          type="file"
                          accept="video/mp4,video/webm,video/mov"
                          className="hidden"
                          onChange={(e) => {
                            if (currentChapter) {
                              handleVideoUpload(
                                e,
                                isEditingLesson && currentLessonIndex !== null
                                  ? `${currentChapter.id}-${currentLessonIndex}`
                                  : `${currentChapter.id}-new`,
                              )
                            }
                          }}
                        />
                        {currentChapter &&
                          ((isEditingLesson &&
                            currentLessonIndex !== null &&
                            uploadedVideos[`${currentChapter.id}-${currentLessonIndex}`]) ||
                            (!isEditingLesson && uploadedVideos[`${currentChapter.id}-new`])) && (
                            <div className="mt-4 w-full">
                              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                <div className="flex items-center overflow-hidden">
                                  <Video className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
                                  <span className="text-sm truncate">
                                    {isEditingLesson && currentLessonIndex !== null
                                      ? uploadedVideos[`${currentChapter.id}-${currentLessonIndex}`]?.name
                                      : uploadedVideos[`${currentChapter.id}-new`]?.name}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 flex-shrink-0"
                                  onClick={() => {
                                    if (currentChapter) {
                                      removeVideo(
                                        isEditingLesson && currentLessonIndex !== null
                                          ? `${currentChapter.id}-${currentLessonIndex}`
                                          : `${currentChapter.id}-new`,
                                      )
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                      </div>
                    ) : (
                      <FormField
                        control={lessonForm.control}
                        name="videoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">YouTube URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://www.youtube.com/watch?v=..." {...field} className="w-full" />
                            </FormControl>
                            <FormDescription>Paste the full YouTube video URL</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )}

                {/* Reading Content Section */}
                {lessonForm.watch("type") === "reading" && (
                  <div className="space-y-4 pt-2">
                    <FormField
                      control={lessonForm.control}
                      name="readingSource"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base">Reading Material Source</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="upload" id="upload-reading" />
                                <Label htmlFor="upload-reading" className="text-base">
                                  Upload Document
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="text" id="text-reading" />
                                <Label htmlFor="text-reading" className="text-base">
                                  Write Text Content
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {lessonForm.watch("readingSource") === "upload" ? (
                      <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center text-center">
                        <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Drag and drop your document file here</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, or TXT up to 50MB</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => document.getElementById("reading-upload")?.click()}
                        >
                          Select Document
                        </Button>
                        <input
                          id="reading-upload"
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                          onChange={(e) => {
                            if (currentChapter) {
                              handleReadingUpload(
                                e,
                                isEditingLesson && currentLessonIndex !== null
                                  ? `${currentChapter.id}-${currentLessonIndex}`
                                  : `${currentChapter.id}-new`,
                              )
                            }
                          }}
                        />
                        {currentChapter &&
                          ((isEditingLesson &&
                            currentLessonIndex !== null &&
                            uploadedReadings[`${currentChapter.id}-${currentLessonIndex}`]) ||
                            (!isEditingLesson && uploadedReadings[`${currentChapter.id}-new`])) && (
                              <div className="mt-4 w-full">
                                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                  <div className="flex items-center overflow-hidden">
                                    <FileText className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
                                    <span className="text-sm truncate">
                                      {isEditingLesson && currentLessonIndex !== null
                                        ? uploadedReadings[`${currentChapter.id}-${currentLessonIndex}`]?.name
                                        : uploadedReadings[`${currentChapter.id}-new`]?.name}
                                    </span>
                                    <Badge variant="outline" className="ml-2 text-xs flex-shrink-0">
                                      {isEditingLesson && currentLessonIndex !== null
                                        ? getFileExtension(
                                            uploadedReadings[`${currentChapter.id}-${currentLessonIndex}`]?.name,
                                          )
                                        : getFileExtension(uploadedReadings[`${currentChapter.id}-new`]?.name)}
                                    </Badge>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 flex-shrink-0"
                                    onClick={() => {
                                      if (currentChapter) {
                                        removeReading(
                                          isEditingLesson && currentLessonIndex !== null
                                            ? `${currentChapter.id}-${currentLessonIndex}`
                                            : `${currentChapter.id}-new`,
                                        )
                                      }
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                      </div>
                    ) : (
                      <FormField
                        control={lessonForm.control}
                        name="readingContent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Reading Content</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter the reading content here..."
                                className="min-h-[200px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>You can use Markdown formatting for rich text content</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )}

                {/* Quiz Content Section */}
                {lessonForm.watch("type") === "quiz" && (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={lessonForm.control}
                        name="timeLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Time Limit (minutes)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 30" {...field} className="w-full" />
                            </FormControl>
                            <FormDescription>Leave empty for no time limit</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={lessonForm.control}
                        name="passingScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Passing Score (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="e.g., 70"
                                {...field}
                                defaultValue="60"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between py-4">
                        <div>
                          <CardTitle className="text-base">Questions</CardTitle>
                          <CardDescription>Add multiple choice questions to your quiz</CardDescription>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            // Create a new question with default options
                            const newOptions = Array(4)
                              .fill(null)
                              .map((_, i) => ({
                                id: `option-${Date.now()}-${i}`,
                                text: "",
                                isCorrect: i === 0, // First option is correct by default
                              }))

                            setCurrentQuestion({
                              id: `question-${Date.now()}`,
                              question: "",
                              options: newOptions,
                            })
                            setCurrentQuestionIndex(null)
                            setIsEditingQuestion(false)
                            setIsAddingQuestion(true)
                          }}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Add Question
                        </Button>
                      </CardHeader>
                      <CardContent>
                        {quizQuestions.length === 0 ? (
                          <div className="text-center py-8 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground mb-2">No questions added yet</p>
                            <p className="text-xs text-muted-foreground mb-4">Start by adding questions to your quiz</p>
                            <Button
                              onClick={() => {
                                // Create a new question with default options
                                const newOptions = Array(4)
                                  .fill(null)
                                  .map((_, i) => ({
                                    id: `option-${Date.now()}-${i}`,
                                    text: "",
                                    isCorrect: i === 0, // First option is correct by default
                                  }))

                                setCurrentQuestion({
                                  id: `question-${Date.now()}`,
                                  question: "",
                                  options: newOptions,
                                })
                                setCurrentQuestionIndex(null)
                                setIsEditingQuestion(false)
                                setIsAddingQuestion(true)
                              }}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Question
                            </Button>
                          </div>
                        ) : (
                          quizQuestions.map((question, index) => (
                            <div
                              key={question.id}
                              className="flex flex-col border rounded-lg p-4 hover:bg-muted/50 transition-colors mb-4"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className="h-6 w-6 rounded-full p-0 flex items-center justify-center"
                                  >
                                    {index + 1}
                                  </Badge>
                                  <h4 className="font-medium">{question.question}</h4>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => {
                                      setCurrentQuestion(question)
                                      setCurrentQuestionIndex(index)
                                      setIsEditingQuestion(true)
                                      setIsAddingQuestion(true)
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleDeleteQuestion(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {question.options?.map((option, optIndex) => (
                                  <div
                                    key={option.id}
                                    className={`flex items-center p-2 rounded-md text-sm ${
                                      option.isCorrect
                                        ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400"
                                        : "bg-muted/50 border border-transparent"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border">
                                        {optIndex + 1}
                                      </div>
                                      <span className="truncate">{option.text}</span>
                                    </div>
                                    {option.isCorrect && (
                                      <Check className="h-4 w-4 ml-auto text-green-600 dark:text-green-400" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        )}
                      </CardContent>
                      {quizQuestions.length > 0 && (
                        <CardFooter className="border-t px-6 py-4">
                          <Button
                            variant="outline"
                            className="ml-auto"
                            onClick={() => {
                              // Create a new question with default options
                              const newOptions = Array(4)
                                .fill(null)
                                .map((_, i) => ({
                                  id: `option-${Date.now()}-${i}`,
                                  text: "",
                                  isCorrect: i === 0, // First option is correct by default
                                }))

                              setCurrentQuestion({
                                id: `question-${Date.now()}`,
                                question: "",
                                options: newOptions,
                              })
                              setCurrentQuestionIndex(null)
                              setIsEditingQuestion(false)
                              setIsAddingQuestion(true)
                            }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Another Question
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  </div>
                )}

                <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddingLesson(false)
                      setIsEditingLesson(false)
                      setCurrentLessonIndex(null)
                      lessonForm.reset()
                    }}
                    className="w-full sm:w-auto order-2 sm:order-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto order-1 sm:order-2">
                    {isEditingLesson ? "Save Changes" : "Add Lesson"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Add/Edit Question Dialog */}
        <Dialog
          open={isAddingQuestion}
          onOpenChange={(open) => {
            if (!open) {
              setIsAddingQuestion(false)
              setIsEditingQuestion(false)
              setCurrentQuestionIndex(null)
              setCurrentQuestion(null)
            }
          }}
        >
          <DialogContent className="max-w-2xl w-full p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-xl">{isEditingQuestion ? "Edit Question" : "Add New Question"}</DialogTitle>
              <DialogDescription>
                {isEditingQuestion ? "Update the question details below." : "Create a new multiple choice question."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="question-text" className="text-base">
                  Question Text
                </Label>
                <Textarea
                  id="question-text"
                  placeholder="Enter your question here..."
                  className="min-h-[80px] w-full"
                  value={currentQuestion?.question || ""}
                  onChange={(e) => {
                    setCurrentQuestion({
                      ...currentQuestion,
                      question: e.target.value,
                    })
                  }}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base">Answer Options (Max 5)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentOptions = currentQuestion?.options || []
                      if (currentOptions.length >= 5) {
                        toast({
                          title: "Maximum options reached",
                          description: "You can only add up to 5 options per question.",
                          variant: "destructive",
                        })
                        return
                      }
                      setCurrentQuestion({
                        ...currentQuestion,
                        options: [
                          ...currentOptions,
                          {
                            id: `option-${Date.now()}-${currentOptions.length}`,
                            text: "",
                            isCorrect: false,
                          },
                        ],
                      })
                    }}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add Option
                  </Button>
                </div>

                <div className="space-y-3">
                  {(currentQuestion?.options || []).length === 0 ? (
                    <div className="text-center py-4 border-2 border-dashed rounded-lg">
                      <p className="text-muted-foreground">No options yet</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          // Create default options (4 options)
                          const newOptions = Array(4)
                            .fill(null)
                            .map((_, i) => ({
                              id: `option-${Date.now()}-${i}`,
                              text: "",
                              isCorrect: i === 0, // First option is correct by default
                            }))
                          setCurrentQuestion({
                            ...currentQuestion,
                            options: newOptions,
                          })
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Default Options
                      </Button>
                    </div>
                  ) : (
                    (currentQuestion?.options || []).map((option: any, index: number) => (
                      <div key={option.id} className="flex items-center gap-3">
                        <div className="flex items-center h-10">
                          <input
                            type="radio"
                            checked={option.isCorrect || false}
                            onChange={(e) => {
                              const updatedOptions = [...(currentQuestion?.options || [])].map((opt, i) => ({
                                ...opt,
                                isCorrect: i === index, // Only this option is correct
                              }))

                              setCurrentQuestion({
                                ...currentQuestion,
                                options: updatedOptions,
                              })
                            }}
                            className="h-4 w-4"
                          />
                        </div>
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option.text}
                          onChange={(e) => {
                            const updatedOptions = [...(currentQuestion?.options || [])]
                            updatedOptions[index].text = e.target.value
                            setCurrentQuestion({
                              ...currentQuestion,
                              options: updatedOptions,
                            })
                          }}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => {
                            // Only allow deletion if we have more than 2 options
                            if ((currentQuestion?.options || []).length <= 2) {
                              toast({
                                title: "Cannot delete",
                                description: "Questions must have at least 2 options",
                                variant: "destructive",
                              })
                              return
                            }

                            const updatedOptions = [...(currentQuestion?.options || [])]
                            updatedOptions.splice(index, 1)

                            // If we removed the correct option, make the first option correct
                            if (option.isCorrect && updatedOptions.length > 0) {
                              updatedOptions[0].isCorrect = true
                            }

                            setCurrentQuestion({
                              ...currentQuestion,
                              options: updatedOptions,
                            })
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddingQuestion(false)
                  setIsEditingQuestion(false)
                  setCurrentQuestionIndex(null)
                  setCurrentQuestion(null)
                }}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  if (!currentQuestion?.question) {
                    toast({
                      title: "Question text required",
                      description: "Please enter a question.",
                      variant: "destructive",
                    })
                    return
                  }

                  if (!currentQuestion?.options || currentQuestion.options.length < 2) {
                    toast({
                      title: "Options required",
                      description: "Please add at least two options.",
                      variant: "destructive",
                    })
                    return
                  }

                  // Check if exactly one option is marked as correct
                  const correctOptions = currentQuestion.options.filter((opt) => opt.isCorrect)
                  if (correctOptions.length !== 1) {
                    toast({
                      title: "One correct answer required",
                      description: "Please mark exactly one option as correct.",
                      variant: "destructive",
                    })
                    return
                  }

                  handleAddQuestion(currentQuestion)
                }}
                className="w-full sm:w-auto order-1 sm:order-2"
              >
                {isEditingQuestion ? "Save Changes" : "Add Question"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TeacherLayout>
  )
}
