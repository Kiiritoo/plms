"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Checkbox } from "@/Components/ui/checkbox"
import { Sparkles, ArrowRight, AlertCircle, Info, HelpCircle, GraduationCap, Users } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link, router } from "@inertiajs/react"


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  // Prevent hydration errors with useEffect
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate email format
    if (!email.includes("@")) {
      setError("Please enter a valid school email address")
      setIsLoading(false)
      return
    }

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      router.visit('/dashboard')
    }, 1500)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Decorative */}
      <div className="fixed bottom-0 left-0 top-0 hidden w-1/2 bg-blue-600 lg:block">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-600/90 to-blue-800/90"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-900 to-transparent"></div>
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full bg-blue-700/30 blur-3xl"></div>

        {/* Content container with proper z-index */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center p-10 text-xl font-medium text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="ml-3">LMS Tels</span>
          </div>

          {/* Illustration and features - centered in remaining space */}
          <div className="flex flex-1 flex-col items-center justify-center px-10 pb-10">
            <div className="relative h-[300px] w-[300px] overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="School illustration"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20"></div>
            </div>

            {/* Features */}
            <div className="mt-12 w-full max-w-md space-y-6">
              <h3 className="text-2xl font-bold text-white">Welcome to Your Learning Portal</h3>
              <p className="text-lg text-blue-100">
                Access your courses, assignments, and school resources all in one place.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="group flex items-center space-x-4 rounded-xl bg-white/10 p-5 transition-all duration-300 hover:bg-white/15">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <GraduationCap className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="text-white">
                    <p className="font-medium">Access all your courses</p>
                    <p className="text-blue-200">View lessons, assignments, and grades</p>
                  </div>
                </div>
                <div className="group flex items-center space-x-4 rounded-xl bg-white/10 p-5 transition-all duration-300 hover:bg-white/15">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <Users className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="text-white">
                    <p className="font-medium">Collaborate with classmates</p>
                    <p className="text-blue-200">Participate in discussions and group projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-blue-50/50 p-6 dark:bg-blue-950/10 lg:ml-[50%] lg:w-1/2 lg:p-12">
        {/* Mobile logo - only visible on small screens */}
        <div className="mb-8 flex items-center justify-center text-xl font-medium lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
            <Sparkles className="h-6 w-6 text-blue-600" />
          </div>
          <span className="ml-3">LMS Tels</span>
        </div>

        {/* Form container */}
        <div className="w-full max-w-[450px] space-y-8">
          <div className="rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-background/80 dark:backdrop-blur-sm">
            {/* Heading */}
            <div className="mb-8 space-y-3 text-center">
              <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
              <p className="text-muted-foreground">Enter your school credentials to access your account</p>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email" className="text-base">
                      School Email
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Use your school-provided email address</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="email"
                    placeholder="student@school.edu"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`h-12 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 ${error ? "border-red-500 ring-2 ring-red-500/20" : ""}`}
                    required
                  />
                  {error && (
                    <div className="flex items-center gap-1 text-sm text-red-500">
                      <AlertCircle className="h-4 w-4" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-base">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>
                <div className="flex items-center space-x-2 py-1">
                  <Checkbox
                    id="remember"
                    className="h-5 w-5 rounded-md border-muted-foreground/30 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me for 30 days
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="h-12 w-full bg-blue-600 text-base font-medium transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:translate-y-0.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Sign in
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted-foreground/20"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground dark:bg-background">Or continue with</span>
                </div>
              </div>

              {/* Google login */}
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full flex items-center justify-center gap-2 text-base font-medium border-muted-foreground/30 transition-all duration-200 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                      fill="#4285F4"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 45.859 C -20.534 43.009 -17.884 40.899 -14.754 40.899 Z"
                    />
                  </g>
                </svg>
                <span>Sign in with Google</span>
              </Button>
            </form>
          </div>

          {/* Help section */}
          <div className="rounded-xl border bg-white/90 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:bg-white/5 dark:backdrop-blur-md">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                <HelpCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium">Need help?</h4>
                <p className="mt-2 text-muted-foreground">
                  If you're having trouble logging in, please contact your school's IT support at{" "}
                  <span className="font-medium text-foreground">support@school.edu</span> or call{" "}
                  <span className="font-medium text-foreground">(555) 123-4567</span>.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                  >
                    View FAQ
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                  >
                    Reset Password
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Return to home link */}
          <div className="flex justify-center py-4">
            <Link
              href="/"
              className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-blue-600"
            >
              <ArrowRight className="mr-1 h-3 w-3 rotate-180 transition-transform group-hover:-translate-x-1" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

