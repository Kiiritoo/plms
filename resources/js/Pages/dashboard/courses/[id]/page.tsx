"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Info,
  Layers,
  MessageSquare,
  MoreHorizontal,
  Play,
  Share2,
  Users,
  Award,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Server,
  Network,
  Terminal,
  Shield,
  Lock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"

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
    materials: [
      { id: 1, title: "Panduan Administrasi Sistem Linux", type: "pdf", size: "18.4 MB" },
      { id: 2, title: "Cheat Sheet Perintah Terminal", type: "pdf", size: "5.2 MB" },
      { id: 3, title: "Konfigurasi Server Dasar", type: "pdf", size: "12.1 MB" },
      { id: 4, title: "Latihan Manajemen Pengguna", type: "pdf", size: "7.7 MB" },
      { id: 5, title: "Template Konfigurasi Server", type: "zip", size: "35.8 MB" },
    ],
    faqs: [
      {
        question: "Apakah kursus ini cocok untuk pemula?",
        answer:
          "Ya, kursus ini dirancang khusus untuk pemula yang belum memiliki pengalaman dalam administrasi sistem. Kami memulai dari konsep paling dasar.",
      },
      {
        question: "Apakah saya perlu pengalaman Linux sebelumnya?",
        answer:
          "Tidak, kursus ini akan mengajarkan Linux dari dasar. Namun, pemahaman dasar tentang cara kerja komputer akan sangat membantu.",
      },
      {
        question: "Perangkat apa yang saya butuhkan untuk mengikuti kursus ini?",
        answer:
          "Anda membutuhkan komputer dengan minimal 4GB RAM dan kemampuan untuk menjalankan mesin virtual. Semua software yang digunakan dalam kursus ini adalah gratis dan open source.",
      },
      {
        question: "Apakah ada sertifikat setelah menyelesaikan kursus?",
        answer:
          "Ya, Anda akan mendapatkan sertifikat penyelesaian digital setelah menyelesaikan semua modul dan lulus ujian akhir.",
      },
    ],
    progress: 0,
    enrolled: false,
  },
  // Cyber Security Course
  {
    id: 102,
    title: "Cyber Security Dasar",
    subtitle: "dari Nol",
    category: "Security",
    description: "Pelajari dasar-dasar keamanan siber dan lindungi diri Anda dari ancaman digital.",
    longDescription:
      "Kursus ini dirancang untuk pemula yang ingin memahami dasar-dasar keamanan siber. Anda akan mempelajari konsep dasar keamanan informasi, jenis-jenis ancaman siber, teknik serangan umum, dan cara melindungi diri dari serangan. Kursus ini juga mencakup pengenalan alat keamanan dasar dan praktik terbaik untuk menjaga keamanan online.",
    level: "Beginner",
    duration: "13 jam",
    language: "Bahasa Indonesia",
    certification: "Sertifikat Penyelesaian",
    enrollmentStatus: "Free Access",
    startDate: "2023-09-15",
    endDate: "2023-12-15",
    price: "Free",
    prerequisites: ["Pengetahuan dasar komputer", "Koneksi internet"],
    objectives: [
      "Memahami konsep dasar keamanan siber",
      "Mengenali jenis-jenis ancaman dan serangan siber",
      "Mempelajari teknik perlindungan dasar",
      "Menerapkan praktik keamanan terbaik dalam kehidupan sehari-hari",
    ],
    instructor: {
      name: "Aditya Firman",
      title: "Cyber Security Specialist",
      bio: "Aditya Firman adalah spesialis keamanan siber dengan pengalaman lebih dari 8 tahun di bidang keamanan informasi. Dia telah membantu banyak organisasi dalam mengamankan infrastruktur IT mereka dan sering menjadi pembicara di konferensi keamanan.",
      avatar: "/placeholder.svg?height=150&width=150&text=AF",
    },
    rating: 4.8,
    reviewCount: 245,
    studentsEnrolled: 1250,
    portal: "PORTAL BELAJAR IDN",
    bgColor: "from-red-900 to-red-800",
    syllabus: [
      {
        id: 1,
        title: "Pengenalan Keamanan Siber",
        lessons: [
          { id: 101, title: "Apa itu Keamanan Siber?", type: "video", duration: "45 menit" },
          { id: 102, title: "Sejarah Serangan Siber Terkenal", type: "video", duration: "60 menit" },
          { id: 103, title: "Prinsip Dasar Keamanan Informasi", type: "video", duration: "55 menit" },
          { id: 104, title: "Quiz: Konsep Dasar", type: "quiz", duration: "30 menit" },
        ],
      },
      {
        id: 2,
        title: "Jenis-jenis Ancaman Siber",
        lessons: [
          { id: 201, title: "Malware dan Jenisnya", type: "video", duration: "50 menit" },
          { id: 202, title: "Phishing dan Social Engineering", type: "video", duration: "65 menit" },
          { id: 203, title: "Serangan DDoS dan DoS", type: "video", duration: "55 menit" },
          { id: 204, title: "Praktikum: Identifikasi Ancaman", type: "lab", duration: "90 menit" },
          { id: 205, title: "Quiz: Jenis Ancaman", type: "quiz", duration: "30 menit" },
        ],
      },
      {
        id: 3,
        title: "Keamanan Jaringan Dasar",
        lessons: [
          { id: 301, title: "Konsep Firewall", type: "video", duration: "75 menit" },
          { id: 302, title: "Penggunaan VPN", type: "video", duration: "60 menit" },
          { id: 303, title: "Keamanan Wi-Fi", type: "video", duration: "70 menit" },
          { id: 304, title: "Praktikum: Konfigurasi Firewall Dasar", type: "lab", duration: "120 menit" },
          { id: 305, title: "Quiz: Keamanan Jaringan", type: "quiz", duration: "45 menit" },
        ],
      },
    ],
    materials: [
      { id: 1, title: "Panduan Keamanan Siber Dasar", type: "pdf", size: "15.4 MB" },
      { id: 2, title: "Checklist Keamanan Personal", type: "pdf", size: "8.2 MB" },
      { id: 3, title: "Referensi Alat Keamanan", type: "pdf", size: "2.1 MB" },
      { id: 4, title: "Latihan Identifikasi Phishing", type: "pdf", size: "4.7 MB" },
      { id: 5, title: "Software Keamanan Demo", type: "zip", size: "45.8 MB" },
    ],
    faqs: [
      {
        question: "Apakah kursus ini cocok untuk pemula?",
        answer:
          "Ya, kursus ini dirancang khusus untuk pemula yang belum memiliki pengetahuan mendalam tentang keamanan siber. Kami memulai dari konsep paling dasar.",
      },
      {
        question: "Apakah saya perlu software khusus untuk mengikuti kursus ini?",
        answer:
          "Sebagian besar materi dapat diikuti tanpa software khusus. Untuk beberapa praktikum, kami akan menyarankan beberapa tools gratis yang dapat diunduh.",
      },
      {
        question: "Berapa lama saya memiliki akses ke materi kursus?",
        answer:
          "Anda akan memiliki akses ke semua materi kursus selama 12 bulan sejak tanggal pendaftaran, termasuk pembaruan yang dilakukan selama periode tersebut.",
      },
      {
        question: "Apakah ada sertifikat setelah menyelesaikan kursus?",
        answer:
          "Ya, Anda akan mendapatkan sertifikat penyelesaian digital setelah menyelesaikan semua modul dan lulus ujian akhir.",
      },
    ],
    progress: 0,
    enrolled: false,
  },
  // Linux Course
  {
    id: 103,
    title: "Belajar Linux",
    subtitle: "dari Nol",
    category: "System Admin",
    description: "Pelajari sistem operasi Linux dari dasar hingga mahir untuk administrasi sistem.",
    longDescription:
      "Kursus ini akan mengajarkan Anda dasar-dasar sistem operasi Linux, perintah terminal, manajemen file, dan administrasi sistem dasar. Cocok untuk pemula yang ingin memulai karir di bidang administrasi sistem atau pengembangan software yang membutuhkan pengetahuan Linux.",
    level: "Beginner",
    duration: "9 jam",
    language: "Bahasa Indonesia",
    certification: "Sertifikat Penyelesaian",
    enrollmentStatus: "Free Access",
    startDate: "2023-09-20",
    endDate: "2023-12-20",
    price: "Free",
    prerequisites: ["Pengetahuan dasar komputer", "Koneksi internet"],
    objectives: [
      "Memahami konsep dasar sistem operasi Linux",
      "Menguasai perintah terminal dasar",
      "Mempelajari manajemen file dan pengguna",
      "Mengkonfigurasi layanan dasar pada Linux",
    ],
    instructor: {
      name: "Syahrul Ramdan",
      title: "Linux System Administrator",
      bio: "Syahrul Ramdan adalah seorang Linux System Administrator dengan pengalaman lebih dari 10 tahun. Dia telah mengelola ratusan server Linux dan memiliki sertifikasi RHCE dan LPIC-3.",
      avatar: "/placeholder.svg?height=150&width=150&text=SR",
    },
    rating: 4.7,
    reviewCount: 189,
    studentsEnrolled: 950,
    portal: "PORTAL BELAJAR IDN",
    bgColor: "from-red-900 to-red-800",
    syllabus: [
      {
        id: 1,
        title: "Pengenalan Linux",
        lessons: [
          { id: 101, title: "Sejarah dan Filosofi Linux", type: "video", duration: "45 menit" },
          { id: 102, title: "Distribusi Linux dan Perbedaannya", type: "video", duration: "60 menit" },
          { id: 103, title: "Instalasi Linux (Ubuntu/Debian)", type: "video", duration: "55 menit" },
          { id: 104, title: "Praktikum: Instalasi Virtual Machine", type: "lab", duration: "90 menit" },
        ],
      },
      {
        id: 2,
        title: "Perintah Dasar Terminal",
        lessons: [
          { id: 201, title: "Navigasi File System", type: "video", duration: "50 menit" },
          { id: 202, title: "Manipulasi File dan Direktori", type: "video", duration: "65 menit" },
          { id: 203, title: "Pencarian dan Filtering", type: "video", duration: "55 menit" },
          { id: 204, title: "Praktikum: Perintah Terminal", type: "lab", duration: "90 menit" },
          { id: 205, title: "Quiz: Perintah Dasar", type: "quiz", duration: "30 menit" },
        ],
      },
    ],
    materials: [
      { id: 1, title: "Panduan Linux untuk Pemula", type: "pdf", size: "12.8 MB" },
      { id: 2, title: "Cheat Sheet Perintah Terminal", type: "pdf", size: "5.3 MB" },
      { id: 3, title: "Latihan Praktikum", type: "pdf", size: "7.6 MB" },
      { id: 4, title: "Konfigurasi Virtual Machine", type: "pdf", size: "4.2 MB" },
    ],
    faqs: [
      {
        question: "Apakah saya perlu pengalaman programming untuk mengikuti kursus ini?",
        answer: "Tidak, kursus ini dirancang untuk pemula dan tidak memerlukan pengalaman programming sebelumnya.",
      },
      {
        question: "Sistem operasi apa yang sebaiknya saya gunakan?",
        answer:
          "Anda dapat menggunakan Windows, macOS, atau Linux. Kami akan mengajarkan cara menginstal Linux di virtual machine.",
      },
      {
        question: "Apakah kursus ini mencakup scripting bash?",
        answer: "Ya, kursus ini mencakup pengenalan dasar scripting bash untuk otomatisasi tugas-tugas sederhana.",
      },
    ],
    progress: 0,
    enrolled: false,
  },
  // Cisco Course
  {
    id: 104,
    title: "Cisco Dasar",
    subtitle: "",
    category: "Cisco",
    description: "Pelajari dasar-dasar jaringan Cisco untuk persiapan sertifikasi CCNA.",
    longDescription:
      "Kursus ini memberikan pengenalan komprehensif tentang perangkat jaringan Cisco, konfigurasi dasar router dan switch, serta konsep jaringan yang diperlukan untuk persiapan sertifikasi CCNA. Cocok untuk pemula yang ingin memulai karir di bidang jaringan komputer.",
    level: "Beginner",
    duration: "5 jam",
    language: "Bahasa Indonesia",
    certification: "Sertifikat Penyelesaian",
    enrollmentStatus: "Free Access",
    startDate: "2023-10-05",
    endDate: "2023-11-05",
    price: "Free",
    prerequisites: ["Pengetahuan dasar jaringan komputer", "Pemahaman dasar TCP/IP"],
    objectives: [
      "Memahami perangkat jaringan Cisco",
      "Mempelajari konfigurasi dasar router dan switch",
      "Mengenal konsep routing dan switching",
      "Persiapan awal untuk sertifikasi CCNA",
    ],
    instructor: {
      name: "Miftahul Huda",
      title: "Cisco Certified Instructor",
      bio: "Miftahul Huda adalah seorang Cisco Certified Instructor dengan pengalaman mengajar lebih dari 7 tahun. Dia telah membantu ratusan siswa mendapatkan sertifikasi CCNA dan CCNP.",
      avatar: "/placeholder.svg?height=150&width=150&text=MH",
    },
    rating: 4.9,
    reviewCount: 312,
    studentsEnrolled: 1580,
    portal: "PORTAL BELAJAR IDN",
    bgColor: "from-red-900 to-red-800",
    syllabus: [
      {
        id: 1,
        title: "Pengenalan Jaringan Cisco",
        lessons: [
          { id: 101, title: "Perangkat Jaringan Cisco", type: "video", duration: "45 menit" },
          { id: 102, title: "Arsitektur Jaringan Dasar", type: "video", duration: "60 menit" },
          { id: 103, title: "Pengenalan IOS Cisco", type: "video", duration: "50 menit" },
          { id: 104, title: "Quiz: Konsep Dasar", type: "quiz", duration: "20 menit" },
        ],
      },
      {
        id: 2,
        title: "Konfigurasi Dasar",
        lessons: [
          { id: 201, title: "Konfigurasi Awal Router", type: "video", duration: "55 menit" },
          { id: 202, title: "Konfigurasi Awal Switch", type: "video", duration: "50 menit" },
          { id: 203, title: "Praktikum: Konfigurasi Dasar", type: "lab", duration: "90 menit" },
          { id: 204, title: "Quiz: Konfigurasi", type: "quiz", duration: "30 menit" },
        ],
      },
    ],
    materials: [
      { id: 1, title: "Panduan Cisco Dasar", type: "pdf", size: "14.2 MB" },
      { id: 2, title: "Cheat Sheet Perintah IOS", type: "pdf", size: "3.5 MB" },
      { id: 3, title: "Topologi Latihan", type: "pdf", size: "8.7 MB" },
      { id: 4, title: "File Konfigurasi Contoh", type: "zip", size: "2.3 MB" },
    ],
    faqs: [
      {
        question: "Apakah saya perlu perangkat Cisco untuk mengikuti kursus ini?",
        answer:
          "Tidak, kami akan menggunakan simulator jaringan seperti Packet Tracer yang dapat diunduh secara gratis.",
      },
      {
        question: "Apakah kursus ini cukup untuk lulus ujian CCNA?",
        answer:
          "Kursus ini hanya memberikan pengenalan dasar. Untuk persiapan CCNA lengkap, Anda perlu mengikuti kursus CCNA yang lebih komprehensif.",
      },
      {
        question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan kursus ini?",
        answer: "Dengan belajar 1-2 jam per hari, Anda dapat menyelesaikan kursus ini dalam waktu sekitar 1 minggu.",
      },
    ],
    progress: 0,
    enrolled: false,
  },
  // Additional courses would be added here
]

// Course video mapping - these are actual relevant videos for each course
const courseVideos = {
  // Administrasi Sistem Jaringan Videos - Using real system administration educational videos
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

export default function CourseDetailPage() {
  // Add a loading state at the top of the component
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const courseId = Number(params.id)

  // Find the course by ID
  const course = courseData.find((c) => c.id === courseId)

  // Update the useState section to include more state variables for functionality
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false)
  const [courseProgress, setCourseProgress] = useState<number>(0)
  const [lastAccessedLesson, setLastAccessedLesson] = useState<{ moduleId: number; lessonId: number } | null>(null)
  const [notes, setNotes] = useState<string>("")
  const [noteInput, setNoteInput] = useState<string>("")

  // Modify the useEffect to include loading state
  useEffect(() => {
    // Set loading to true initially
    setIsLoading(true)

    // Use a small timeout to ensure the component is mounted before checking course
    const timer = setTimeout(() => {
      if (!course) {
        router.push("/dashboard/courses")
        return
      }

      // Check if already enrolled and set initial state
      setIsEnrolled(course.enrolled || false)

      // Simulate retrieving last accessed lesson from storage
      try {
        if (typeof window !== "undefined") {
          // Check if we're in the browser
          const storedData = localStorage.getItem(`course-${courseId}`)
          if (storedData) {
            const data = JSON.parse(storedData)
            setLastAccessedLesson(data.lastAccessedLesson || null)
            setNotes(data.notes || "")
            setIsEnrolled(true)

            // Calculate progress based on completed lessons
            const totalLessons = course.syllabus.reduce((total, module) => total + module.lessons.length, 0)
            const completedLessons = course.syllabus.reduce((total, module) => {
              return (
                total +
                module.lessons.filter(
                  (lesson) =>
                    localStorage.getItem(`course-${courseId}-lesson-${module.id}-${lesson.id}-completed`) === "true",
                ).length
              )
            }, 0)

            const calculatedProgress = Math.round((completedLessons / totalLessons) * 100)
            setCourseProgress(calculatedProgress || data.progress || course.progress || 0)
          }
        }
      } catch (e) {
        console.error("Error parsing stored course data", e)
      }

      // Set loading to false after data is processed
      setIsLoading(false)
    }, 0)

    return () => clearTimeout(timer)
  }, [course, router, courseId])

  // Add these functions to handle course interactions
  const handleEnroll = () => {
    setIsEnrolled(true)
    setCourseProgress(0)

    // Save enrollment status to localStorage
    const data = {
      enrolled: true,
      progress: 0,
      lastAccessedLesson: null,
      notes: "",
    }
    localStorage.setItem(`course-${courseId}`, JSON.stringify(data))
  }

  const handleSaveNotes = () => {
    const updatedNotes = noteInput
    setNotes(updatedNotes)

    // Save to localStorage
    const data = {
      enrolled: true,
      progress: courseProgress,
      lastAccessedLesson,
      notes: updatedNotes,
    }
    localStorage.setItem(`course-${courseId}`, JSON.stringify(data))
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq((prev) => (prev === index ? null : index))
  }

  // Function to get video URL for a lesson
  const getVideoUrl = (moduleId: number, lessonId: number) => {
    if (courseVideos[courseId] && courseVideos[courseId][lessonId]) {
      return `https://www.youtube.com/embed/${courseVideos[courseId][lessonId]}`
    }
    return null
  }

  // Function to get icon based on course category
  const getCourseIcon = () => {
    switch (course?.category) {
      case "System Admin":
        return <Server className="h-8 w-8" />
      case "Security":
        return <Shield className="h-8 w-8" />
      case "Cisco":
        return <Network className="h-8 w-8" />
      default:
        return <BookOpen className="h-8 w-8" />
    }
  }

  // Add this function to safely check if a lesson is completed
  // This will prevent potential localStorage errors

  const isLessonCompleted = (moduleId, lessonId) => {
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

  // Add a function to check if a lesson is accessible (unlocked)
  // This should be added near the other utility functions like getVideoUrl, getCourseIcon, etc.
  const isLessonAccessible = (moduleId: number, lessonId: number) => {
    if (!isEnrolled) return false

    // First lesson is always accessible
    if (moduleId === 1 && lessonId === course.syllabus[0].lessons[0].id) return true

    // For other lessons, we need to check if all previous lessons are completed
    const allLessons: { moduleId: number; lessonId: number }[] = []
    course.syllabus.forEach((module) => {
      module.lessons.forEach((lesson) => {
        allLessons.push({ moduleId: module.id, lessonId: lesson.id })
      })
    })

    // Find current lesson index
    const currentIndex = allLessons.findIndex((l) => l.moduleId === moduleId && l.lessonId === lessonId)

    if (currentIndex <= 0) return true // First lesson or invalid lesson

    // Check if all previous lessons are completed
    for (let i = 0; i < currentIndex; i++) {
      const prevLesson = allLessons[i]
      const isCompleted =
        localStorage.getItem(`course-${courseId}-lesson-${prevLesson.moduleId}-${prevLesson.lessonId}-completed`) ===
        "true"

      if (!isCompleted) return false
    }

    return true
  }

  // Modify the handleAccessLesson function to check if the lesson is accessible
  const handleAccessLesson = (moduleId: number, lessonId: number) => {
    if (!isEnrolled) return

    // Check if the lesson is accessible
    if (!isLessonAccessible(moduleId, lessonId)) {
      // Show a message that previous lessons need to be completed first
      alert("You need to complete previous lessons before accessing this one.")
      return
    }

    setLastAccessedLesson({ moduleId, lessonId })

    // Save last accessed lesson to localStorage
    const data = {
      enrolled: true,
      progress: courseProgress,
      lastAccessedLesson: { moduleId, lessonId },
      notes: notes,
    }
    localStorage.setItem(`course-${courseId}`, JSON.stringify(data))

    // Navigate to the learn page with the selected lesson
    router.push(`/dashboard/courses/${courseId}/learn?module=${moduleId}&lesson=${lessonId}`)
  }

  // Replace the loading check with our new loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-blue-950/90">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  // Add a null check for course
  if (!course) {
    return null // Return null while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-blue-950/90">
      {/* Course Header */}
      <div className="sticky top-0 z-30 flex h-14 items-center border-b border-blue-100 bg-white px-4 dark:border-blue-800/30 dark:bg-blue-900/90 lg:px-6">
        <Button variant="ghost" size="icon" className="mr-2" asChild>
          <Link href="/dashboard/courses">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to courses</span>
          </Link>
        </Button>

        <div className="flex-1 truncate">
          <h1 className="truncate text-lg font-semibold">
            {course.title} {course.subtitle}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-blue-600 hover:bg-blue-700">{isEnrolled ? "Enrolled" : "Not Enrolled"}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share Course</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Download Materials</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Contact Instructor</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="container mx-auto p-4 lg:p-6">
        {/* Course Banner */}
        <div className="mb-8 overflow-hidden rounded-lg">
          <div className={`relative h-48 bg-gradient-to-r ${course.bgColor} overflow-hidden`}>
            {/* Free Label */}
            {course.price === "Free" && (
              <div className="absolute left-0 top-0 z-10 bg-yellow-500 px-3 py-1 text-xs font-bold text-white">
                FREE
              </div>
            )}

            {/* Course Title */}
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              {course.subtitle && <p className="text-xl">{course.subtitle}</p>}
              <p className="mt-2 text-sm uppercase">{course.portal}</p>
            </div>

            {/* Curved Design Element */}
            <div className="absolute bottom-0 right-0 h-full w-1/3 bg-white">
              <div className="absolute bottom-0 right-0 h-full w-full rounded-tl-[100px] bg-gradient-to-r from-blue-900 to-blue-800"></div>
            </div>

            {/* Instructor Avatar */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 transform">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                <AvatarFallback className="text-lg">
                  {course.instructor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Course Icon */}
            <div className="absolute bottom-4 right-4">
              <div className="h-8 w-8 rounded-full bg-white/20 p-1.5">{getCourseIcon()}</div>
            </div>
          </div>
        </div>

        {/* Course Overview */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    >
                      {course.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                    >
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">
                    {course.title} {course.subtitle}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-2 text-lg font-medium">About This Course</h3>
                        <p className="text-gray-700 dark:text-gray-300">{course.longDescription}</p>
                      </div>

                      <div>
                        <h3 className="mb-2 text-lg font-medium">What You'll Learn</h3>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {course.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                              <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-2 text-lg font-medium">Prerequisites</h3>
                        <ul className="space-y-1">
                          {course.prerequisites.map((prerequisite, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ChevronRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                              <span className="text-gray-700 dark:text-gray-300">{prerequisite}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="syllabus" className="mt-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Course Syllabus</h3>
                      <Accordion type="single" collapsible className="w-full">
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
                                    {module.lessons.length} lessons
                                  </p>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0">
                              <div className="space-y-1 pl-11">
                                {module.lessons.map((lesson) => {
                                  let LessonIcon
                                  switch (lesson.type) {
                                    case "video":
                                      LessonIcon = Play
                                      break
                                    case "lab":
                                      LessonIcon = Terminal
                                      break
                                    case "quiz":
                                    case "exam":
                                      LessonIcon = FileText
                                      break
                                    default:
                                      LessonIcon = FileText
                                  }

                                  // Check if video is available
                                  const hasVideo = getVideoUrl(module.id, lesson.id) !== null
                                  // Check if lesson is accessible
                                  const isAccessible = isLessonAccessible(module.id, lesson.id)

                                  return (
                                    <div
                                      key={lesson.id}
                                      className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors ${
                                        isAccessible
                                          ? "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                          : "opacity-60 cursor-not-allowed"
                                      }`}
                                      onClick={() => isAccessible && handleAccessLesson(module.id, lesson.id)}
                                    >
                                      <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                          hasVideo
                                            ? isAccessible
                                              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                                              : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500"
                                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                        }`}
                                      >
                                        {!isAccessible ? (
                                          <Lock className="h-4 w-4" />
                                        ) : (
                                          <LessonIcon className="h-4 w-4" />
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="text-sm font-medium">{lesson.title}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                          <Clock className="h-3 w-3" />
                                          <span>{lesson.duration}</span>
                                          {hasVideo && isAccessible && (
                                            <Badge
                                              variant="outline"
                                              className="ml-2 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            >
                                              Video Available
                                            </Badge>
                                          )}
                                          {!isAccessible && (
                                            <Badge
                                              variant="outline"
                                              className="ml-2 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                            >
                                              Locked
                                            </Badge>
                                          )}
                                        </div>
                                        {lesson.description && (
                                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            {lesson.description}
                                          </p>
                                        )}
                                      </div>
                                      {isEnrolled ? (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0"
                                          disabled={!isAccessible}
                                          onClick={(e) => {
                                            e.stopPropagation() // Prevent the parent onClick from firing
                                            if (isEnrolled && isAccessible) {
                                              router.push(
                                                `/dashboard/courses/${courseId}/learn?module=${module.id}&lesson=${lesson.id}`,
                                              )
                                            }
                                          }}
                                        >
                                          {isAccessible ? <Play className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                                        </Button>
                                      ) : (
                                        <Badge variant="outline" className="text-xs">
                                          Locked
                                        </Badge>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>

                  <TabsContent value="materials" className="mt-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Course Materials</h3>
                      <div className="space-y-3">
                        {course.materials.map((material) => (
                          <div
                            key={material.id}
                            className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                                {material.type === "pdf" ? (
                                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                ) : (
                                  <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                )}
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">{material.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {material.type.toUpperCase()} • {material.size}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={!isEnrolled}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      {!isEnrolled && (
                        <div className="mt-4 rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Enroll in this course to access all materials
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="faq" className="mt-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                        {course.faqs.map((faq, index) => (
                          <div
                            key={index}
                            className="rounded-lg border p-4 transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                          >
                            <div
                              className="flex cursor-pointer items-center justify-between"
                              onClick={() => toggleFaq(index)}
                            >
                              <h4 className="font-medium">{faq.question}</h4>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                {expandedFaq === index ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            {expandedFaq === index && (
                              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{faq.answer}</p>
                            )}
                          </div>
                        ))}
                      </div>
                      {isEnrolled && (
                        <div className="mt-8 space-y-4">
                          <h3 className="text-lg font-medium">Your Course Notes</h3>
                          <div className="rounded-lg border p-4">
                            {notes ? (
                              <div className="mb-4 whitespace-pre-line text-sm text-gray-700 dark:text-gray-300">
                                {notes}
                              </div>
                            ) : (
                              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                You haven't added any notes for this course yet.
                              </p>
                            )}
                            <div className="space-y-2">
                              <textarea
                                className="w-full resize-none rounded-lg border bg-white p-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800"
                                placeholder="Add your notes here..."
                                rows={5}
                                value={noteInput}
                                onChange={(e) => setNoteInput(e.target.value)}
                              ></textarea>
                              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveNotes}>
                                Save Notes
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Update the video preview in the course details page: */}
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  {courseVideos[courseId] && courseVideos[courseId][101] ? (
                    <div className="relative h-full w-full flex items-center justify-center bg-gray-900">
                      <img
                        src={`https://img.youtube.com/vi/${courseVideos[courseId][101]}/maxresdefault.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="bg-blue-600 rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
                          onClick={() => handleAccessLesson(1, 101)}
                        >
                          <Play className="h-8 w-8 text-white" fill="white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                        Preview Available
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-600" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Certification</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{course.certification}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Students</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{course.studentsEnrolled} enrolled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Language</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{course.language}</p>
                    </div>
                  </div>
                </div>

                {isEnrolled && (
                  <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-blue-900 dark:text-blue-300">Your Progress</p>
                      <span className="text-sm font-medium">{courseProgress}%</span>
                    </div>
                    <Progress value={courseProgress} className="mt-2 h-2 bg-blue-200 dark:bg-blue-900">
                      <div className="h-full bg-blue-600" style={{ width: `${courseProgress}%` }}></div>
                    </Progress>
                    {lastAccessedLesson && (
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Last accessed: Module {lastAccessedLesson.moduleId}, Lesson {lastAccessedLesson.lessonId}
                      </p>
                    )}
                  </div>
                )}

                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                  <p className="font-medium text-blue-900 dark:text-blue-300">Price</p>
                  <p className="text-xl font-bold text-blue-900 dark:text-blue-300">{course.price}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Enrollment open until {new Date(course.endDate).toLocaleDateString()}
                  </p>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={isEnrolled} onClick={handleEnroll}>
                  {isEnrolled ? "Already Enrolled" : "Enroll Now"}
                </Button>

                {isEnrolled && (
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={`/dashboard/courses/${course.id}/learn`}>
                      Start Learning
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4 border-t bg-gray-50 px-6 py-4 dark:bg-gray-900/40">
                <div>
                  <p className="font-medium">Instructor</p>
                  <div className="mt-2 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                      <AvatarFallback>
                        {course.instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{course.instructor.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{course.instructor.title}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(course.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : i < course.rating
                                ? "fill-yellow-400/50 text-yellow-400/50"
                                : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-sm font-medium">{course.rating}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({course.reviewCount} reviews)</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

