"use client"

import type React from "react"

import { useState } from "react"
import { router } from "@inertiajs/react"
import { Link } from "@inertiajs/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChevronLeft, File, FileText, Loader2, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const materialFormSchema = z.object({
  title: z.string().min(3, {
    message: "Material title must be at least 3 characters.",
  }),
  description: z.string().optional(),
  courseId: z.string({
    required_error: "Please select a course.",
  }),
  materialType: z.string({
    required_error: "Please select a material type.",
  }),
  // In a real app, you'd handle file validation differently
  files: z.any().optional(),
})

type MaterialFormValues = z.infer<typeof materialFormSchema>

const defaultValues: Partial<MaterialFormValues> = {
  title: "",
  description: "",
}

const courses = [
  { id: "cs101", name: "Introduction to Computer Science" },
  { id: "ds201", name: "Data Structures and Algorithms" },
  { id: "web301", name: "Web Development Fundamentals" },
  { id: "db401", name: "Database Design" },
  { id: "ai501", name: "Artificial Intelligence" },
]

export default function UploadMaterialsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialFormSchema),
    defaultValues,
  })

  function onSubmit(data: MaterialFormValues) {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one file.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data, uploadedFiles)
      setIsSubmitting(false)
      toast({
        title: "Materials uploaded successfully",
        description: `${uploadedFiles.length} file(s) have been uploaded to the course.`,
      })
      router.visit("/teacher")
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setUploadedFiles((prev) => [...prev, ...filesArray])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/teacher">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
          Upload Course Materials
        </h1>
      </div>
      <p className="text-slate-500 dark:text-slate-400 ml-10">
        Upload documents, presentations, videos, and other materials for your courses.
      </p>

      <Card className="rounded-xl shadow-md border-0">
        <CardHeader>
          <CardTitle>Upload Materials</CardTitle>
          <CardDescription>Add learning materials that will be available to your students.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the course these materials belong to.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="materialType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select material type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="lecture">Lecture Materials</SelectItem>
                          <SelectItem value="assignment">Assignment Resources</SelectItem>
                          <SelectItem value="reading">Required Reading</SelectItem>
                          <SelectItem value="supplemental">Supplemental Materials</SelectItem>
                          <SelectItem value="video">Video Content</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Categorize the type of material you're uploading.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Week 3 Lecture Slides" {...field} />
                    </FormControl>
                    <FormDescription>A descriptive title for these materials.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide additional information about these materials..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Add context or instructions for students.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div>
                  <FormLabel>Upload Files</FormLabel>
                  <div
                    className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center text-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        const filesArray = Array.from(e.dataTransfer.files)
                        setUploadedFiles((prev) => [...prev, ...filesArray])
                      }
                    }}
                  >
                    <FileText className="h-10 w-10 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
                      Supports PDFs, documents, images, videos, and more (max 50MB per file)
                    </p>
                    <Input type="file" multiple className="hidden" id="file-upload" onChange={handleFileChange} />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Browse Files
                    </Button>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Files ({uploadedFiles.length})</p>
                    <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded-lg">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-md"
                        >
                          <div className="flex items-center space-x-2 overflow-hidden">
                            <File className="h-4 w-4 flex-shrink-0 text-slate-400" />
                            <span className="text-sm truncate">{file.name}</span>
                            <span className="text-xs text-slate-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/teacher")}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Materials
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

