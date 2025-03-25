"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, BookOpen, Clock, FileText, Layers } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Simplified course data
const courseData = {
  101: {
    title: "Administrasi Sistem Jaringan",
    lessons: [
      {
        id: 101,
        title: "Apa itu Administrasi Sistem?",
        description: "Pengenalan tentang peran dan tanggung jawab administrator sistem dalam organisasi IT.",
        videoId: "1DvTwuByjo0",
      },
      {
        id: 102,
        title: "Dasar-dasar Sistem Operasi Linux",
        description: "Pengenalan sistem operasi Linux dan komponen-komponen utamanya untuk administrasi sistem.",
        videoId: "ROjZy1WbCIA",
      },
    ],
  },
  102: {
    title: "Cyber Security Dasar",
    lessons: [
      {
        id: 101,
        title: "Apa itu Keamanan Siber?",
        description: "Pengenalan tentang konsep dasar keamanan siber dan pentingnya dalam dunia digital saat ini.",
        videoId: "inWWhr5tnEA",
      },
    ],
  },
  103: {
    title: "Belajar Linux",
    lessons: [
      {
        id: 101,
        title: "Pengenalan Linux",
        description: "Pengenalan tentang sistem operasi Linux dan sejarahnya.",
        videoId: "ROjZy1WbCIA",
      },
    ],
  },
  104: {
    title: "Cisco Dasar",
    lessons: [
      {
        id: 101,
        title: "Pengenalan Jaringan Cisco",
        description: "Pengenalan tentang perangkat jaringan Cisco dan konsep dasar jaringan.",
        videoId: "H8W9oMNSuwo",
      },
    ],
  },
}

export default function StaticCoursePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get course ID from URL parameters
  const courseIdStr = params?.id || "101"
  const courseId = Number(courseIdStr)

  // Get lesson ID from query parameters
  const lessonIdStr = searchParams?.get("lesson") || "101"
  const lessonId = Number(lessonIdStr)

  // Get course data
  const course = courseData[courseId] || {
    title: "Course Not Found",
    lessons: [
      {
        id: 101,
        title: "Default Lesson",
        description: "This is a default lesson for when course data is not found.",
        videoId: "3QhU9jd03a0",
      },
    ],
  }

  // Find the current lesson
  const currentLesson = course.lessons.find((l) => l.id === lessonId) || course.lessons[0]

  // State for loading
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-blue-950/90">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-blue-100 bg-white px-4 dark:border-blue-800/30 dark:bg-blue-900/90 lg:px-6">
        <Button variant="ghost" size="icon" className="mr-2" asChild>
          <Link href={`/dashboard/courses/${courseId}`}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to course</span>
          </Link>
        </Button>

        <div className="flex-1 truncate">
          <h1 className="truncate text-lg font-semibold">
            {course.title}: {currentLesson.title}
          </h1>
        </div>

        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/courses/${courseId}`}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Course Home</span>
          </Link>
        </Button>
      </header>

      <div className="container mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Main content */}
          <div className="md:col-span-2">
            <div className="rounded-lg border bg-white p-6 dark:bg-blue-900/20 dark:border-blue-800/30">
              <h2 className="text-xl font-bold mb-4">{currentLesson.title}</h2>

              {/* Video */}
              <div className="aspect-video overflow-hidden rounded-lg bg-black mb-6">
                {currentLesson.videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${currentLesson.videoId}`}
                    title={currentLesson.title}
                    className="h-full w-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-white">Video not available for this lesson</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    Video Lesson
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>45 minutes</span>
                  </div>
                </div>
                <h3 className="font-medium mb-2">Lesson Description</h3>
                <p className="text-gray-700 dark:text-gray-300">{currentLesson.description}</p>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <Button variant="outline" disabled={course.lessons.indexOf(currentLesson) === 0}>
                  Previous Lesson
                </Button>
                <Button disabled={course.lessons.indexOf(currentLesson) === course.lessons.length - 1}>
                  Next Lesson
                </Button>
              </div>
            </div>
          </div>

          {/* Lesson list */}
          <div>
            <div className="rounded-lg border bg-white p-6 dark:bg-blue-900/20 dark:border-blue-800/30">
              <h2 className="text-lg font-bold mb-4">Course Content</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                      <Layers className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium">Lessons</h3>
                  </div>

                  <div className="space-y-2 ml-8">
                    {course.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors ${
                          lesson.id === currentLesson.id
                            ? "bg-blue-100 dark:bg-blue-900/50"
                            : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        }`}
                        onClick={() => router.push(`/dashboard/courses/${courseId}/learn?lesson=${lesson.id}`)}
                      >
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${
                            lesson.id === currentLesson.id
                              ? "bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-300"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          <FileText className="h-3 w-3" />
                        </div>
                        <div className="flex-1 text-sm">
                          <p className={`${lesson.id === currentLesson.id ? "font-medium" : ""}`}>{lesson.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

