"use client"

import type React from "react"

import { useState } from "react"
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
  SettingsIcon,
  Sparkles,
  User,
  X,
  Shield,
  Moon,
  Sun,
  Monitor,
  BellOff,
  Palette,
  Save,
  Camera,
  Lock,
  HelpCircle,
  Info,
  Check,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [theme, setTheme] = useState("system")
  const [saveStatus, setSaveStatus] = useState("")

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@school.edu",
    phone: "+1 (555) 123-4567",
    bio: "Grade 10 student interested in mathematics and computer science.",
    language: "english",
  })

  // Notification preferences state
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailAssignments: true,
    emailGrades: true,
    emailAnnouncements: true,
    pushAssignments: true,
    pushGrades: true,
    pushAnnouncements: false,
    emailDigest: true,
    emailMarketing: false,
  })

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "students-teachers",
    activityStatus: true,
    showLastSeen: true,
    allowTagging: true,
    dataCollection: "minimal",
  })

  // Accessibility settings state
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: "medium",
    contrastMode: false,
    reduceMotion: false,
    screenReader: false,
  })

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle notification toggle changes
  const handleNotificationToggle = (key: string) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  // Handle privacy settings changes
  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Handle accessibility settings changes
  const handleAccessibilityChange = (key: string, value: any) => {
    setAccessibilitySettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Handle theme change
  const handleThemeChange = (value: string) => {
    setTheme(value)
    // In a real app, this would apply the theme to the document
  }

  // Handle save settings
  const handleSaveSettings = () => {
    // In a real app, this would save to a database
    setSaveStatus("Settings saved successfully!")
    setTimeout(() => setSaveStatus(""), 3000)
  }

  return (
    <div className="flex w-full h-screen overflow-hidden bg-blue-50/30 dark:bg-blue-950/90">
      {/* Sidebar - Mobile version */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-blue-100 bg-white transition-transform duration-300 ease-in-out dark:border-blue-800/30 dark:bg-blue-900/90 lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center px-4 border-b border-blue-100 h-14 dark:border-blue-800/30">
          <div className="flex items-center gap-2 font-semibold">
            <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-blue-400">
              <Sparkles className="absolute inset-0 w-5 h-5 m-auto text-white" />
            </div>
            <span>LMS Tels</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 py-4 overflow-auto">
          <nav className="grid gap-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all rounded-lg hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/courses"
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all rounded-lg hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <Book className="w-5 h-5" />
              <span>My Courses</span>
            </Link>
            <Link
              href="/dashboard/assignments"
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all rounded-lg hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <FileText className="w-5 h-5" />
              <span>Assignments</span>
            </Link>
            <Link
              href="/dashboard/grades"
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all rounded-lg hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Grades</span>
            </Link>
            <Link
              href="/dashboard/calendar"
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all rounded-lg hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            >
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </Link>
          </nav>

          <div className="px-3 mt-6">
            <p className="px-2 text-xs font-semibold text-gray-400 uppercase dark:text-blue-300/70">Resources</p>
            <nav className="grid gap-1 mt-2">
              <Link
                href="/dashboard/library"
                className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all rounded-lg hover:bg-blue-100/70 hover:text-blue-600 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
              >
                <Download className="w-5 h-5" />
                <span>Library</span>
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-3 py-2 text-blue-900 transition-all rounded-lg bg-blue-100/70 hover:text-blue-600 dark:bg-blue-800/30 dark:text-blue-50 dark:hover:text-blue-400"
              >
                <SettingsIcon className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-blue-100 dark:border-blue-800/30">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Student" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">Jane Doe</p>
              <p className="text-xs text-gray-500 truncate dark:text-blue-300/70">Grade 10 - Student</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="w-4 h-4 mr-2" />
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
        <header className="sticky top-0 z-30 flex items-center px-4 bg-white border-b border-blue-100 h-14 dark:border-blue-800/30 dark:bg-blue-900/90 lg:px-6">
          <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="flex items-center w-full gap-2 md:ml-auto md:gap-4 lg:ml-0">
            <form className="flex-1 ml-auto md:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-blue-300/70" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-blue-50 pl-8 md:w-[240px] lg:w-[280px] dark:bg-blue-800/50"
                />
              </div>
            </form>
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="w-5 h-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute flex w-2 h-2 bg-blue-600 rounded-full right-1 top-1"></span>
            </Button>
          </div>
        </header>

        {/* Settings Content */}
        <div className="container p-4 mx-auto lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-gray-500 dark:text-blue-300/70">Manage your account preferences and settings</p>
          </div>

          {saveStatus && (
            <Alert className="mb-6 text-green-800 bg-green-50 dark:bg-green-900/30 dark:text-green-300">
              <Check className="w-4 h-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{saveStatus}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="profile" className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-1">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-1">
                <Palette className="w-4 h-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="accessibility" className="flex items-center gap-1">
                <HelpCircle className="w-4 h-4" />
                <span>Accessibility</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <div className="grid gap-6 md:grid-cols-5">
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={profileForm.firstName}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={profileForm.lastName}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        This is your school email address and cannot be changed.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        placeholder="Tell us a little about yourself"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Preferred Language</Label>
                      <Select
                        value={profileForm.language}
                        onValueChange={(value: string) => setProfileForm((prev) => ({ ...prev, language: value }))}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-3 border-t bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                    <Button className="ml-auto bg-blue-600 hover:bg-blue-700" onClick={handleSaveSettings}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Update your profile photo</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center space-y-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                      <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Recommended: Square image, at least 300x300 pixels, less than 2MB.
                    </p>
                  </CardContent>

                  <Separator />

                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>View your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Student ID</p>
                      <p>S10245789</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Grade Level</p>
                      <p>Grade 10</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</p>
                      <Badge>Student</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined</p>
                      <p>September 1, 2023</p>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-3 border-t bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                    <Button variant="outline" className="w-full">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailAssignments">Assignment Notifications</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive emails about new assignments and due dates
                          </p>
                        </div>
                        <Switch
                          id="emailAssignments"
                          checked={notificationPreferences.emailAssignments}
                          onCheckedChange={() => handleNotificationToggle("emailAssignments")}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailGrades">Grade Notifications</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive emails when new grades are posted
                          </p>
                        </div>
                        <Switch
                          id="emailGrades"
                          checked={notificationPreferences.emailGrades}
                          onCheckedChange={() => handleNotificationToggle("emailGrades")}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailAnnouncements">Announcements</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive emails about course announcements
                          </p>
                        </div>
                        <Switch
                          id="emailAnnouncements"
                          checked={notificationPreferences.emailAnnouncements}
                          onCheckedChange={() => handleNotificationToggle("emailAnnouncements")}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailDigest">Weekly Digest</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive a weekly summary of your academic activity
                          </p>
                        </div>
                        <Switch
                          id="emailDigest"
                          checked={notificationPreferences.emailDigest}
                          onCheckedChange={() => handleNotificationToggle("emailDigest")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="pushAssignments">Assignment Notifications</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive push notifications about assignments
                          </p>
                        </div>
                        <Switch
                          id="pushAssignments"
                          checked={notificationPreferences.pushAssignments}
                          onCheckedChange={() => handleNotificationToggle("pushAssignments")}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="pushGrades">Grade Notifications</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive push notifications when grades are posted
                          </p>
                        </div>
                        <Switch
                          id="pushGrades"
                          checked={notificationPreferences.pushGrades}
                          onCheckedChange={() => handleNotificationToggle("pushGrades")}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="pushAnnouncements">Announcements</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive push notifications for announcements
                          </p>
                        </div>
                        <Switch
                          id="pushAnnouncements"
                          checked={notificationPreferences.pushAnnouncements}
                          onCheckedChange={() => handleNotificationToggle("pushAnnouncements")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Marketing Communications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailMarketing">Educational Updates</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive emails about educational resources and opportunities
                          </p>
                        </div>
                        <Switch
                          id="emailMarketing"
                          checked={notificationPreferences.emailMarketing}
                          onCheckedChange={() => handleNotificationToggle("emailMarketing")}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-3 border-t bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                  <Button variant="outline" className="mr-auto">
                    <BellOff className="w-4 h-4 mr-2" />
                    Pause All Notifications
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how the application looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <RadioGroup
                      value={theme}
                      onValueChange={handleThemeChange}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                    >
                      <div>
                        <RadioGroupItem value="light" id="theme-light" className="sr-only peer" />
                        <Label
                          htmlFor="theme-light"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                        >
                          <Sun className="w-6 h-6 mb-3" />
                          <div className="text-center">
                            <p className="font-medium">Light</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Light mode for daytime use</p>
                          </div>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="dark" id="theme-dark" className="sr-only peer" />
                        <Label
                          htmlFor="theme-dark"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gray-950 p-4 hover:bg-gray-900 hover:border-gray-700 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                        >
                          <Moon className="w-6 h-6 mb-3 text-white" />
                          <div className="text-center text-white">
                            <p className="font-medium">Dark</p>
                            <p className="text-sm text-gray-400">
                              Dark mode for nighttime use
                            </p>
                          </div>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="system" id="theme-system" className="sr-only peer" />
                        <Label
                          htmlFor="theme-system"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                        >
                          <Monitor className="w-6 h-6 mb-3" />
                          <div className="text-center">
                            <p className="font-medium">System</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Follow system theme</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Color Scheme</h3>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
                        <Label className="cursor-pointer">
                          <RadioGroupItem
                            value="blue"
                            id="color-blue"
                            name="color-scheme"
                            className="sr-only"
                            defaultChecked
                          />
                          <span>Blue</span>
                        </Label>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-purple-600 rounded-full"></div>
                        <Label className="cursor-pointer">
                          <RadioGroupItem value="purple" id="color-purple" name="color-scheme" className="sr-only" />
                          <span>Purple</span>
                        </Label>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-green-600 rounded-full"></div>
                        <Label className="cursor-pointer">
                          <RadioGroupItem value="green" id="color-green" name="color-scheme" className="sr-only" />
                          <span>Green</span>
                        </Label>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 rounded-full bg-amber-600"></div>
                        <Label className="cursor-pointer">
                          <RadioGroupItem value="amber" id="color-amber" name="color-scheme" className="sr-only" />
                          <span>Amber</span>
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Font Size</h3>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="x-large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-3 border-t bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                  <Button className="ml-auto bg-blue-600 hover:bg-blue-700" onClick={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                   </Button>
                  </CardFooter>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your privacy and data sharing preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Visibility</h3>
                    <RadioGroup
                      value={privacySettings.profileVisibility}
                      onValueChange={(value: string) => handlePrivacyChange("profileVisibility", value)}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="public" id="visibility-public" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="visibility-public">Public</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your profile is visible to everyone in the school
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="students-teachers" id="visibility-students-teachers" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="visibility-students-teachers">Students & Teachers</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your profile is visible only to students and teachers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="teachers-only" id="visibility-teachers-only" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="visibility-teachers-only">Teachers Only</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your profile is visible only to teachers
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Activity Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="activityStatus">Online Status</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Show when you're active on the platform
                          </p>
                        </div>
                        <Switch
                          id="activityStatus"
                          checked={privacySettings.activityStatus}
                          onCheckedChange={(checked) => handlePrivacyChange("activityStatus", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="showLastSeen">Last Seen</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Show when you were last active</p>
                        </div>
                        <Switch
                          id="showLastSeen"
                          checked={privacySettings.showLastSeen}
                          onCheckedChange={(checked) => handlePrivacyChange("showLastSeen", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Collection</h3>
                    <RadioGroup
                      value={privacySettings.dataCollection}
                      onValueChange={(value) => handlePrivacyChange("dataCollection", value)}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="full" id="data-full" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="data-full">Full</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Allow collection of all usage data to improve your experience
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="minimal" id="data-minimal" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="data-minimal">Minimal</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Only collect essential data required for the platform to function
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <Alert className="text-blue-800 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300">
                    <Info className="w-4 h-4" />
                    <AlertTitle>Privacy Notice</AlertTitle>
                    <AlertDescription>
                      Your data is always protected and never shared with third parties outside of your school. For more
                      information, please read our{" "}
                      <Link href="#" className="underline">
                        Privacy Policy
                      </Link>
                      .
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter className="px-6 py-3 border-t bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                  <Button variant="outline" className="mr-auto text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete My Data
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Accessibility Settings */}
            <TabsContent value="accessibility">
              <Card>
                <CardHeader>
                  <CardTitle>Accessibility</CardTitle>
                  <CardDescription>Customize your experience to make the platform more accessible</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Text Size</h3>
                    <RadioGroup
                      value={accessibilitySettings.fontSize}
                      onValueChange={(value) => handleAccessibilityChange("fontSize", value)}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-4"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center justify-center w-10 h-10 text-xs font-medium bg-gray-100 rounded-full dark:bg-gray-800">
                          A
                        </div>
                        <Label className="cursor-pointer">
                          <RadioGroupItem value="small" id="font-small" className="sr-only" />
                          <span>Small</span>
                        </Label>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center justify-center w-10 h-10 text-sm font-medium bg-gray-100 rounded-full dark:bg-gray-800">
                          A
                        </div>
                        <Label className="cursor-pointer">
                          <RadioGroupItem value="medium" id="font-medium" className="sr-only" />
                          <span>Medium</span>
                        </Label>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center justify-center w-10 h-10 text-base font-medium bg-gray-100 rounded-full dark:bg-gray-800">
                          A
                        </div>
                        <Label className="cursor-pointer">
                          <RadioGroupItem value="large" id="font-large" className="sr-only" />
                          <span>Large</span>
                        </Label>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center justify-center w-10 h-10 text-lg font-medium bg-gray-100 rounded-full dark:bg-gray-800">
                          A
                        </div>
                        <Label className="cursor-pointer">
                          <RadioGroupItem value="x-large" id="font-x-large" className="sr-only" />
                          <span>Extra Large</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Display Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="contrastMode">High Contrast Mode</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Increase contrast for better visibility
                          </p>
                        </div>
                        <Switch
                          id="contrastMode"
                          checked={accessibilitySettings.contrastMode}
                          onCheckedChange={(checked) => handleAccessibilityChange("contrastMode", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="reduceMotion">Reduce Motion</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Minimize animations and transitions
                          </p>
                        </div>
                        <Switch
                          id="reduceMotion"
                          checked={accessibilitySettings.reduceMotion}
                          onCheckedChange={(checked) => handleAccessibilityChange("reduceMotion", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="screenReader">Screen Reader Support</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Optimize for screen readers</p>
                        </div>
                        <Switch
                          id="screenReader"
                          checked={accessibilitySettings.screenReader}
                          onCheckedChange={(checked) => handleAccessibilityChange("screenReader", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Alert className="text-blue-800 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300">
                    <HelpCircle className="w-4 h-4" />
                    <AlertTitle>Accessibility Support</AlertTitle>
                    <AlertDescription>
                      If you need additional accessibility accommodations, please contact your school's IT support team.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter className="px-6 py-3 border-t bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                  <Button className="ml-auto bg-blue-600 hover:bg-blue-700" onClick={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

