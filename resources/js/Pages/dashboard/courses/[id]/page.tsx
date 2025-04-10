"use client"

import { useState, useEffect } from "react"
import { Link, router } from "@inertiajs/react"
import {
  Bell,
  Book,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  User,
  X,
  LucideBarChart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Award,
  Filter,
  MoreHorizontal,
  Star,
  StarHalf,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Course {
  id: string
  title: string
  description: string
  progress: number
  upcomingAssignments: Array<{
    id: string
    title: string
    dueDate: string
    status: string
  }>
}

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    // Fetch course details
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${router.params.id}`)
        const data = await response.json()
        setCourse(data)
      } catch (error) {
        console.error("Error fetching course:", error)
      }
    }

    fetchCourse()
  }, [router.params.id])

  if (!course) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-blue-50/30 dark:bg-blue-950/90">
      {/* Sidebar - Mobile version */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-blue-100 bg-white transition-transform duration-300 ease-in-out dark:border-blue-800/30 dark:bg-blue-900/90 lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-14 items-center border-b border-blue-100 px-4 dark:border-blue-800/30">
          <div className="flex items-center gap-2 font-semibold">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-blue-400">
              <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-white" />
            </div>
            <span>LMS Tels</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/courses"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <Book className="h-5 w-5" />
              <span>My Courses</span>
            </Link>
            <Link
              href="/dashboard/assignments"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <FileText className="h-5 w-5" />
              <span>Assignments</span>
            </Link>
            <Link
              href="/dashboard/grades"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Grades</span>
            </Link>
            <Link
              href="/dashboard/calendar"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <Calendar className="h-5 w-5" />
              <span>Calendar</span>
            </Link>
          </nav>

          <div className="mt-6 px-3">
            <p className="px-2 text-xs font-semibold uppercase text-gray-400 dark:text-blue-300/70">Resources</p>
            <nav className="mt-2 grid gap-1">
              <Link
                href="/dashboard/library"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
              >
                <Download className="h-5 w-5" />
                <span>Library</span>
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-blue-100 p-4 dark:border-blue-800/30">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Student" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">Jane Doe</p>
              <p className="truncate text-xs text-gray-500 dark:text-blue-300/70">Grade 10 - Student</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center border-b border-blue-100 bg-white px-4 dark:border-blue-800/30 dark:bg-blue-900/90 lg:px-6">
          <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="flex w-full items-center gap-2 md:ml-auto md:gap-4 lg:ml-0">
            <form className="ml-auto flex-1 md:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-blue-300/70" />
                <Input
                  type="search"
                  placeholder="Search course content..."
                  className="w-full rounded-lg bg-blue-50 pl-8 md:w-[240px] lg:w-[280px] dark:bg-blue-800/50"
                />
              </div>
            </form>
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-blue-600"></span>
            </Button>
          </div>
        </header>

        {/* Course Content */}
        <div className="container mx-auto p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-gray-500 dark:text-blue-300/70">{course.description}</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mb-6" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Tab Content */}
          {selectedTab === "overview" && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Course Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.upcomingAssignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{assignment.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Due {assignment.dueDate}
                          </p>
                        </div>
                        <Badge variant="outline">{assignment.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Course Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Instructor</span>
                      <span className="text-sm font-medium">{course.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Schedule</span>
                      <span className="text-sm font-medium">{course.schedule}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Credits</span>
                      <span className="text-sm font-medium">{course.credits}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === "assignments" && (
            <Card>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>View and submit your course assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {course.assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{assignment.type}</Badge>
                        </TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={assignment.status === "Completed" ? "default" : "secondary"}
                            className="rounded-full"
                          >
                            {assignment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                              <DropdownMenuItem className="rounded-lg cursor-pointer">
                                <FileText className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg cursor-pointer">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {selectedTab === "grades" && (
            <Card>
              <CardHeader>
                <CardTitle>Grades</CardTitle>
                <CardDescription>View your course grades and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {course.grades.map((grade) => (
                      <TableRow key={grade.id}>
                        <TableCell className="font-medium">{grade.assignment}</TableCell>
                        <TableCell>
                          <Badge
                            variant={grade.score >= 70 ? "default" : "secondary"}
                            className="rounded-full"
                          >
                            {grade.score}%
                          </Badge>
                        </TableCell>
                        <TableCell>{grade.weight}%</TableCell>
                        <TableCell>
                          <Badge
                            variant={grade.status === "Graded" ? "default" : "secondary"}
                            className="rounded-full"
                          >
                            {grade.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                              <DropdownMenuItem className="rounded-lg cursor-pointer">
                                <FileText className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg cursor-pointer">
                                <Star className="mr-2 h-4 w-4" />
                                Request Review
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {selectedTab === "resources" && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {course.resources.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {resource.type === "document" && <FileText className="h-5 w-5" />}
                      {resource.type === "video" && <Video className="h-5 w-5" />}
                      {resource.type === "link" && <Link className="h-5 w-5" />}
                      {resource.title}
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

