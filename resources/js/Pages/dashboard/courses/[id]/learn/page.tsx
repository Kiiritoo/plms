"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Home,
  Info,
  Layers,
  List,
  Lock,
  Play,
  Terminal,
  X,
} from "lucide-react"
import YouTube from 'react-youtube'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Comprehensive course data with detailed information
const courseData = [
  // Administrasi Sistem Jaringan Course
  {
    id: 101,
    title: "Administrasi Sistem Jaringan",
    subtitle: "dari Nol",
    category: "System Admin",
    description: "Pelajari dasar-dasar administrasi sistem dan jaringan untuk mengelola infrastruktur IT.",
    longDescription:
      "Kursus ini dirancang untuk pemula yang ingin memahami dasar-dasar administrasi sistem dan jaringan. Anda akan mempelajari konsep dasar sistem operasi Linux, konfigurasi server, manajemen jaringan, dan praktik terbaik dalam pengelolaan infrastruktur IT. Kursus ini mencakup teori dan praktik langsung dengan berbagai tools administrasi sistem.",
    level: "Beginner",
    duration: "15 jam",
    language: "Bahasa Indonesia",
    certification: "Sertifikat Penyelesaian",
    enrollmentStatus: "Free Access",
    startDate: "2023-09-10",
    endDate: "2023-12-10",
    price: "Free",
    prerequisites: ["Pengetahuan dasar komputer", "Koneksi internet"],
    objectives: [
      "Memahami konsep dasar administrasi sistem",
      "Menguasai perintah dasar Linux untuk administrasi",
      "Mempelajari konfigurasi server dan layanan",
      "Menerapkan praktik keamanan dasar pada sistem",
    ],
    instructor: {
      name: "Budi Santoso",
      title: "System Administrator",
      bio: "Budi Santoso adalah seorang System Administrator dengan pengalaman lebih dari 10 tahun dalam mengelola infrastruktur IT perusahaan besar. Dia memiliki sertifikasi RHCE, LPIC-3, dan AWS Certified Solutions Architect.",
      avatar: "/placeholder.svg?height=150&width=150&text=BS",
    },
    rating: 4.9,
    reviewCount: 320,
    studentsEnrolled: 1450,
    portal: "PORTAL BELAJAR IDN",
    bgColor: "from-blue-900 to-blue-800",
    syllabus: [
      {
        id: 1,
        title: "Pengenalan Administrasi Sistem",
        lessons: [
          {
            id: 101,
            title: "Apa itu Administrasi Sistem?",
            type: "video",
            duration: "45 menit",
            description: "Pengenalan tentang peran dan tanggung jawab administrator sistem dalam organisasi IT.",
          },
          {
            id: 102,
            title: "Dasar-dasar Sistem Operasi Linux",
            type: "video",
            duration: "60 menit",
            description: "Pengenalan sistem operasi Linux dan komponen-komponen utamanya untuk administrasi sistem.",
          },
          {
            id: 103,
            title: "Perintah Terminal Dasar",
            type: "video",
            duration: "55 menit",
            description:
              "Mempelajari perintah-perintah terminal dasar yang sering digunakan dalam administrasi sistem.",
          },
          {
            id: 104,
            title: "Quiz: Konsep Dasar",
            type: "quiz",
            duration: "30 menit",
            description: "Evaluasi pemahaman tentang konsep dasar administrasi sistem.",
          },
        ],
      },
      {
        id: 2,
        title: "Manajemen Pengguna dan Grup",
        lessons: [
          {
            id: 201,
            title: "Membuat dan Mengelola Pengguna",
            type: "video",
            duration: "50 menit",
            description: "Cara membuat, memodifikasi, dan menghapus akun pengguna di sistem Linux.",
          },
          {
            id: 202,
            title: "Manajemen Grup dan Izin",
            type: "video",
            duration: "65 menit",
            description: "Mengelola grup pengguna dan mengatur izin akses file dan direktori.",
          },
          {
            id: 203,
            title: "Kebijakan Password dan Keamanan Akun",
            type: "video",
            duration: "55 menit",
            description: "Mengimplementasikan kebijakan password yang kuat dan mengamankan akun pengguna.",
          },
          {
            id: 204,
            title: "Praktikum: Manajemen Pengguna",
            type: "lab",
            duration: "90 menit",
            description: "Praktik langsung mengelola pengguna dan grup di sistem Linux.",
          },
          {
            id: 205,
            title: "Quiz: Manajemen Pengguna",
            type: "quiz",
            duration: "30 menit",
            description: "Evaluasi pemahaman tentang manajemen pengguna dan grup.",
          },
        ],
      },
      {
        id: 3,
        title: "Konfigurasi Server",
        lessons: [
          {
            id: 301,
            title: "Instalasi dan Konfigurasi Web Server",
            type: "video",
            duration: "75 menit",
            description: "Menginstal dan mengkonfigurasi Apache web server di Linux.",
          },
          {
            id: 302,
            title: "Konfigurasi DNS Server",
            type: "video",
            duration: "60 menit",
            description: "Menyiapkan dan mengkonfigurasi BIND DNS server untuk resolusi nama domain.",
          },
          {
            id: 303,
            title: "Konfigurasi Database Server",
            type: "video",
            duration: "70 menit",
            description: "Instalasi dan konfigurasi MySQL/MariaDB database server.",
          },
          {
            id: 304,
            title: "Praktikum: Konfigurasi LAMP Stack",
            type: "lab",
            duration: "120 menit",
            description: "Praktik menginstal dan mengkonfigurasi LAMP (Linux, Apache, MySQL, PHP) stack.",
          },
          {
            id: 305,
            title: "Quiz: Konfigurasi Server",
            type: "quiz",
            duration: "45 menit",
            description: "Evaluasi pemahaman tentang konfigurasi berbagai jenis server.",
          },
        ],
      },
    ],
  },
  // Adding other courses with proper structure
  {
    id: 102,
    title: "Web Development",
    subtitle: "Modern Web Development",
    category: "Programming",
    description: "Learn modern web development with React and Next.js",
    longDescription: "Comprehensive course on modern web development...",
    level: "Intermediate",
    duration: "20 jam",
    language: "Bahasa Indonesia",
    certification: "Sertifikat Penyelesaian",
    enrollmentStatus: "Free Access",
    startDate: "2023-09-10",
    endDate: "2023-12-10",
    price: "Free",
    prerequisites: ["Basic HTML/CSS", "JavaScript fundamentals"],
    objectives: [
      "Master React fundamentals",
      "Build modern web applications",
      "Learn Next.js framework",
    ],
    instructor: {
      name: "John Doe",
      title: "Senior Web Developer",
      bio: "Experienced web developer with 10+ years of experience",
      avatar: "/placeholder.svg?height=150&width=150&text=JD",
    },
    rating: 4.8,
    reviewCount: 250,
    studentsEnrolled: 1200,
    portal: "PORTAL BELAJAR IDN",
    bgColor: "from-purple-900 to-purple-800",
    syllabus: [
      {
        id: 1,
        title: "Introduction to Web Development",
        lessons: [
          {
            id: 101,
            title: "Getting Started with React",
            type: "video",
            duration: "45 menit",
            description: "Introduction to React and its core concepts",
          },
          {
            id: 102,
            title: "Components and Props",
            type: "video",
            duration: "60 menit",
            description: "Understanding React components and props",
          },
          {
            id: 103,
            title: "State and Lifecycle",
            type: "video",
            duration: "55 menit",
            description: "Managing state and component lifecycle",
          },
        ],
      },
    ],
  },
  // Add more courses as needed...
]

// Add TypeScript interfaces for better type safety
interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'quiz' | 'lab';
  duration: string;
  description: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Instructor {
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

interface Course {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  level: string;
  duration: string;
  language: string;
  certification: string;
  enrollmentStatus: string;
  startDate: string;
  endDate: string;
  price: string;
  prerequisites: string[];
  objectives: string[];
  instructor: Instructor;
  rating: number;
  reviewCount: number;
  studentsEnrolled: number;
  portal: string;
  bgColor: string;
  syllabus: Module[];
}

// Update the courseVideos type definition
const courseVideos: Record<number, Record<number, string>> = {
  101: {
    101: "1DvTwuByjo0",
    102: "ROjZy1WbCIA",
    103: "cBokz0LTizk",
    201: "zRw0SKaXSfI",
    202: "rtQx6o9_aO4",
    203: "Y_UsAOR1aWc",
    301: "HEbK-Tignuc",
    302: "0X9em99Vcl0",
    303: "Cz3WcZLRaWc",
  },
  102: {
    101: "inWWhr5tnEA",
    102: "rcDO8km6R6c",
    103: "U_P23SqJaDc",
  },
  103: {
    101: "ROjZy1WbCIA",
    102: "KFwBC45Ib_o",
    103: "ROjZy1WbCIA",
  },
  104: {
    101: "H8W9oMNSuwo",
    102: "cNwEVYkx2Kk",
    103: "e5xKayCBOeU",
  },
}

// Declare YouTube types
declare global {
  interface Window {
    YT: {
      Player: any;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface LessonInfo {
  moduleId: number;
  lessonId: number;
}

// Update the YouTubeEvent interface
interface YouTubeEvent {
  data: number;
  target: {
    getCurrentTime: () => number;
    getDuration: () => number;
    seekTo: (seconds: number, allowSeekAhead: boolean) => void;
    playVideo: () => void;
  };
}

export default function CourseLearnPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseId = Number(params.id)

  // Get module and lesson IDs from URL query parameters
  const moduleId = Number(searchParams.get("module") || "1")
  const lessonId = Number(searchParams.get("lesson") || "101")

  // Find the course by ID
  const course = courseData.find((c) => c.id === courseId) as Course | undefined

  // Find the current module and lesson
  const currentModule = course?.syllabus.find((m) => m.id === moduleId)
  const currentLesson = currentModule?.lessons.find((l) => l.id === lessonId)

  // State for sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // State for video progress tracking
  const [videoStarted, setVideoStarted] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [videoWatched, setVideoWatched] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [lastTimeUpdate, setLastTimeUpdate] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  // Reference to YouTube player
  const playerRef = useRef<any>(null)

  // Get the YouTube video ID for the current lesson
  const videoId = courseVideos[courseId]?.[lessonId]

  const isLessonCompleted = (moduleId: number, lessonId: number): boolean => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(`course-${courseId}-lesson-${moduleId}-${lessonId}-completed`) === "true"
      }
      return false
    } catch (e) {
      console.error("Error checking lesson completion status", e)
      return false
    }
  }

  const markLessonAsCompleted = (moduleId: number, lessonId: number): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(`course-${courseId}-lesson-${moduleId}-${lessonId}-completed`, "true")
        // Update course progress
        updateCourseProgress()
      }
    } catch (e) {
      console.error("Error marking lesson as completed", e)
    }
  }

  // Function to update overall course progress
  const updateCourseProgress = () => {
    if (!course) return

    const totalLessons = course.syllabus.reduce((total, module) => total + module.lessons.length, 0)
    const completedLessons = course.syllabus.reduce((total, module) => {
      return total + module.lessons.filter((lesson) => isLessonCompleted(module.id, lesson.id)).length
    }, 0)

    const calculatedProgress = Math.round((completedLessons / totalLessons) * 100)

    // Save progress to localStorage
    const data = JSON.parse(localStorage.getItem(`course-${courseId}`) || "{}")
    data.progress = calculatedProgress
    localStorage.setItem(`course-${courseId}`, JSON.stringify(data))
  }

  // Update the isLessonAccessible function to be more robust
  const isLessonAccessible = (moduleId: number, lessonId: number): boolean => {
    if (!course) return false;

    // First lesson is always accessible
    if (moduleId === 1 && lessonId === course.syllabus[0].lessons[0].id) return true;

    // Get all lessons in sequence
    const allLessons: LessonInfo[] = [];
    course.syllabus.forEach((module) => {
      module.lessons.forEach((lesson) => {
        allLessons.push({ moduleId: module.id, lessonId: lesson.id });
      });
    });

    // Find current lesson index
    const currentIndex = allLessons.findIndex(
      (l) => l.moduleId === moduleId && l.lessonId === lessonId
    );

    if (currentIndex <= 0) return true;

    // Check if ALL previous lessons are completed
    for (let i = 0; i < currentIndex; i++) {
      const prevLesson = allLessons[i];
      if (!isLessonCompleted(prevLesson.moduleId, prevLesson.lessonId)) {
        return false;
      }
    }

    // If we get here, all previous lessons are completed
    return true;
  };

  // Add this new function to get lesson status
  const getLessonStatus = (moduleId: number, lessonId: number) => {
    const completed = isLessonCompleted(moduleId, lessonId);
    const accessible = isLessonAccessible(moduleId, lessonId);
    
    if (completed) return "completed";
    if (accessible) return "unlocked";
    return "locked";
  };

  // Function to navigate to a specific lesson
  const navigateToLesson = (moduleId: number, lessonId: number): void => {
    if (!isLessonAccessible(moduleId, lessonId)) {
      alert("You need to complete previous lessons before accessing this one.")
      return
    }

    // Save last accessed lesson
    const data = JSON.parse(localStorage.getItem(`course-${courseId}`) || "{}")
    data.lastAccessedLesson = { moduleId, lessonId }
    localStorage.setItem(`course-${courseId}`, JSON.stringify(data))

    // Navigate to the lesson
    router.push(`/dashboard/courses/${courseId}/learn?module=${moduleId}&lesson=${lessonId}`)
  }

  // Function to navigate to the next lesson
  const navigateToNextLesson = () => {
    if (!course) return

    if (!videoWatched && currentLesson?.type === "video") {
      setShowWarning(true)
      return
    }

    // Find all lessons in the course
    const allLessons: LessonInfo[] = []
    course.syllabus.forEach((module) => {
      module.lessons.forEach((lesson) => {
        allLessons.push({ moduleId: module.id, lessonId: lesson.id })
      })
    })

    // Find current lesson index
    const currentIndex = allLessons.findIndex((l) => l.moduleId === moduleId && l.lessonId === lessonId)

    // If there's a next lesson, navigate to it
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1]
      navigateToLesson(nextLesson.moduleId, nextLesson.lessonId)
    } else {
      // If this is the last lesson, go back to the course page
      router.push(`/dashboard/courses/${courseId}`)
    }
  }

  // Update the handleVideoStateChange function
  const handleVideoStateChange = (event: YouTubeEvent) => {
    if (typeof window === 'undefined' || !event.target) return;

    const player = event.target;
    playerRef.current = player;

    // Store video duration when available
    if (videoDuration === 0) {
      setVideoDuration(player.getDuration());
    }

    // Handle different player states
    if (typeof window.YT !== 'undefined' && window.YT.PlayerState) {
      switch (event.data) {
        case window.YT.PlayerState.PLAYING:
          setVideoStarted(true);
          
          // Clear existing interval if any
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }

          // Start new progress tracking interval
          progressInterval.current = setInterval(() => {
            if (playerRef.current) {
              const currentTime = playerRef.current.getCurrentTime();
              const duration = playerRef.current.getDuration();
              const progress = (currentTime / duration) * 100;

              // Update progress
              setVideoProgress(progress);
              setLastTimeUpdate(currentTime);

              // Mark as watched when 95% complete
              if (progress >= 95 && !videoWatched) {
                setVideoWatched(true);
                markLessonAsCompleted(moduleId, lessonId);
                setShowCompletion(true);
              }
            }
          }, 500);
          break;

        case window.YT.PlayerState.ENDED:
          setVideoWatched(true);
          markLessonAsCompleted(moduleId, lessonId);
          setShowCompletion(true);
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
          break;
      }
    }
  };

  // Function to handle video end
  const handleVideoEnd = () => {
    setVideoWatched(true);
    markLessonAsCompleted(moduleId, lessonId);
    setShowCompletion(true);
    // Clear any existing intervals
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  // Add new state for completion message
  const [showCompletion, setShowCompletion] = useState(false);

  // Update the completeAndContinue function
  const completeAndContinue = () => {
    if (!course) return;

    // Mark current lesson as completed if not already
    if (!isLessonCompleted(moduleId, lessonId)) {
      markLessonAsCompleted(moduleId, lessonId);
    }

    // Find next lesson
    const allLessons: LessonInfo[] = [];
    course.syllabus.forEach((module) => {
      module.lessons.forEach((lesson) => {
        allLessons.push({ moduleId: module.id, lessonId: lesson.id });
      });
    });

    const currentIndex = allLessons.findIndex(
      (l) => l.moduleId === moduleId && l.lessonId === lessonId
    );

    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      // Navigate to next lesson
      router.push(
        `/dashboard/courses/${courseId}/learn?module=${nextLesson.moduleId}&lesson=${nextLesson.lessonId}`
      );
    } else {
      // If this is the last lesson, go back to course page
      router.push(`/dashboard/courses/${courseId}`);
    }
  };

  // Update the useEffect hook
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reset video state when lesson changes
    setVideoProgress(0);
    setVideoWatched(isLessonCompleted(moduleId, lessonId));
    setShowWarning(false);

    let player = null;
    let progressInterval = null;
    const controller = new AbortController();
    let isMounted = true;

    // Function to initialize the player
    const initializePlayer = () => {
      if (!isMounted || typeof window === 'undefined') return;

      if (videoId && document.getElementById("youtube-player")) {
        try {
          player = new window.YT.Player("youtube-player", {
            videoId: videoId,
            events: {
              onReady: handleVideoStateChange,
              onEnd: handleVideoEnd,
            },
            playerVars: {
              autoplay: 1,
              controls: 0,
              disablekb: 1,
              enablejsapi: 1,
              modestbranding: 1,
              rel: 0,
              fs: 0,
              playsinline: 1,
              start: 0,
              iv_load_policy: 3,
              cc_load_policy: 0,
              showinfo: 0,
              origin: window.location.origin,
            },
          });
        } catch (error) {
          console.error("Error initializing YouTube player:", error);
        }
      }
    };

    // Only load YouTube API if we're in the browser
    if (typeof window !== 'undefined') {
      // Load YouTube API if not already loaded
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";

        // Create a cleanup function to remove the script if component unmounts before API loads
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Initialize YouTube player when API is ready
        window.onYouTubeIframeAPIReady = () => {
          if (isMounted) {
            initializePlayer();
          }
        };
      } else if (window.YT && window.YT.Player) {
        // If API is already loaded, create player directly
        initializePlayer();
      }

      // Set up interval to check video progress
      progressInterval = setInterval(() => {
        if (playerRef.current && isMounted) {
          handleVideoStateChange({ 
            data: window.YT?.PlayerState?.PLAYING || 1,
            target: playerRef.current 
          });
        }
      }, 1000);
    }

    return () => {
      isMounted = false;

      if (controller) {
        controller.abort();
      }

      if (typeof window !== 'undefined') {
        window.onYouTubeIframeAPIReady = () => {};
      }

      if (progressInterval) {
        clearInterval(progressInterval);
      }

      if (playerRef.current) {
        try {
          const playerToDestroy = playerRef.current;
          playerRef.current = null;

          setTimeout(() => {
            try {
              playerToDestroy.destroy();
            } catch (e) {
              console.log("Cleanup error ignored:", e);
            }
          }, 0);
        } catch (e) {
          console.log("Player cleanup error ignored:", e);
        }
      }
    };
  }, [courseId, moduleId, lessonId, videoId]);

  // If course not found, redirect to courses page
  if (!course) {
    router.push("/dashboard/courses")
    return null
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50 dark:bg-blue-950/90">
      {/* Header */}
      <header className="flex h-14 items-center border-b border-blue-100 bg-white px-4 dark:border-blue-800/30 dark:bg-blue-900/90 lg:px-6">
        <Button variant="ghost" size="icon" className="mr-2" asChild>
          <Link href={`/dashboard/courses/${courseId}`}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to course</span>
          </Link>
        </Button>

        <div className="flex-1 truncate">
          <h1 className="truncate text-lg font-semibold">
            {course.title}: {currentLesson?.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden">
            <List className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 right-0 z-50 w-80 flex-shrink-0 border-l border-blue-100 bg-white transition-transform duration-300 ease-in-out dark:border-blue-800/30 dark:bg-blue-900/90 lg:static lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex h-14 items-center border-b border-blue-100 px-4 dark:border-blue-800/30">
            <h2 className="flex-1 font-semibold">Course Content</h2>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="h-[calc(100vh-3.5rem)] overflow-auto p-4">
            <Accordion type="multiple" defaultValue={[`module-${moduleId}`]} className="w-full">
              {course.syllabus.map((module) => (
                <AccordionItem key={module.id} value={`module-${module.id}`}>
                  <AccordionTrigger className="hover:bg-blue-50/50 px-4 py-3 dark:hover:bg-blue-900/20">
                    <div className="flex flex-1 items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                        <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">{module.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {module.lessons.filter(lesson => 
                            isLessonCompleted(module.id, lesson.id)
                          ).length} / {module.lessons.length} completed
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0">
                    <div className="space-y-1 pl-11">
                      {module.lessons.map((lesson) => {
                        const status = getLessonStatus(module.id, lesson.id);
                        const isCurrent = module.id === moduleId && lesson.id === lessonId;

                        return (
                          <div
                            key={lesson.id}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors ${
                              isCurrent ? "bg-blue-50 dark:bg-blue-900/20" : ""
                            } ${
                              status === "locked"
                                ? "opacity-60 cursor-not-allowed"
                                : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            }`}
                            onClick={() => status !== "locked" && navigateToLesson(module.id, lesson.id)}
                          >
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                status === "completed"
                                  ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                                  : status === "unlocked"
                                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500"
                              }`}
                            >
                              {status === "completed" ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : status === "locked" ? (
                                <Lock className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{lesson.title}</h4>
                              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.duration}</span>
                                {status === "completed" && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                  >
                                    Completed
                                  </Badge>
                                )}
                                {status === "locked" && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                                  >
                                    Locked
                                  </Badge>
                                )}
                                {status === "unlocked" && isCurrent && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                  >
                                    In Progress
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {isCurrent && <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>}
                          </div>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 lg:p-6">
            {/* Lesson Content */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{currentLesson?.title}</CardTitle>
                    <CardDescription>
                      {currentModule?.title} • {currentLesson?.duration}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      videoWatched || isLessonCompleted(moduleId, lessonId)
                        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {videoWatched || isLessonCompleted(moduleId, lessonId) ? "Watched" : "Not Completed"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Video Player */}
                {currentLesson?.type === "video" && videoId ? (
                  <div className="relative aspect-video w-full bg-black">
                    <YouTube
                      videoId={videoId}
                      id="youtube-player"
                      onStateChange={handleVideoStateChange}
                      onEnd={handleVideoEnd}
                      opts={{
                        height: '100%',
                        width: '100%',
                        playerVars: {
                          autoplay: 1,
                          controls: 0,
                          disablekb: 1,
                          enablejsapi: 1,
                          modestbranding: 1,
                          rel: 0,
                          fs: 0,
                          playsinline: 1,
                          start: 0,
                          iv_load_policy: 3,
                          cc_load_policy: 0,
                          showinfo: 0,
                          origin: window.location.origin,
                        },
                      }}
                      className="absolute inset-0 h-full w-full"
                      iframeClassName="w-full h-full"
                    />
                    {/* Progress Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <div className="text-white text-sm text-center">
                        Progress: {Math.round(videoProgress)}%
                      </div>
                    </div>
                  </div>
                ) : currentLesson?.type === "quiz" ? (
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-center dark:border-blue-800/30 dark:bg-blue-900/20">
                    <FileText className="mx-auto mb-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
                    <h3 className="mb-2 text-lg font-medium">Quiz Time!</h3>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                      Test your knowledge with this quiz on {currentModule?.title}.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Start Quiz</Button>
                  </div>
                ) : currentLesson?.type === "lab" ? (
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-center dark:border-blue-800/30 dark:bg-blue-900/20">
                    <Terminal className="mx-auto mb-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
                    <h3 className="mb-2 text-lg font-medium">Hands-on Lab</h3>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                      Practice your skills with this hands-on lab on {currentModule?.title}.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Start Lab</Button>
                  </div>
                ) : (
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-center dark:border-blue-800/30 dark:bg-blue-900/20">
                    <BookOpen className="mx-auto mb-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
                    <h3 className="mb-2 text-lg font-medium">Lesson Content</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {currentLesson?.description || "No content available for this lesson."}
                    </p>
                  </div>
                )}

                {/* Warning Alert */}
                {showWarning && currentLesson?.type === "video" && !isLessonAccessible(moduleId, lessonId) && (
                  <Alert className="mt-4 border-red-200 bg-red-50 text-red-800 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-200">
                    <Lock className="h-4 w-4" />
                    <AlertTitle>Lesson Locked</AlertTitle>
                    <AlertDescription>
                      You need to complete all previous lessons before accessing this one.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Lesson Description */}
                {currentLesson?.description && (
                  <div className="mt-6">
                    <h3 className="mb-2 text-lg font-medium">About This Lesson</h3>
                    <p className="text-gray-700 dark:text-gray-300">{currentLesson.description}</p>
                  </div>
                )}

                {/* Add this near the video player */}
                {showCompletion && (
                  <Alert className="mt-4 border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-200">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Lesson Completed!</AlertTitle>
                    <AlertDescription>
                      You've completed this lesson. Click "Continue" to proceed to the next lesson.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-4 dark:bg-gray-900/40">
                <Button variant="outline" onClick={() => router.push(`/dashboard/courses/${courseId}`)}>
                  Back to Course
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={completeAndContinue}
                  disabled={currentLesson?.type === "video" && !videoWatched && !isLessonCompleted(moduleId, lessonId)}
                >
                  Continue to Next Lesson
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Additional Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="notes">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                    <TabsTrigger value="downloads">Downloads</TabsTrigger>
                  </TabsList>
                  <TabsContent value="notes" className="mt-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-lg font-medium">Your Notes</h3>
                      <textarea
                        className="w-full resize-none rounded-lg border bg-white p-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800"
                        placeholder="Add your notes for this lesson here..."
                        rows={5}
                      ></textarea>
                      <Button className="mt-2 bg-blue-600 hover:bg-blue-700">Save Notes</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="discussion" className="mt-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-lg font-medium">Discussion</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        No comments yet. Be the first to start a discussion!
                      </p>
                      <div className="mt-4">
                        <textarea
                          className="w-full resize-none rounded-lg border bg-white p-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800"
                          placeholder="Add your comment..."
                          rows={3}
                        ></textarea>
                        <Button className="mt-2 bg-blue-600 hover:bg-blue-700">Post Comment</Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="downloads" className="mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Lesson Slides</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF • 2.4 MB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Exercise Files</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ZIP • 5.7 MB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

