import { Skeleton } from "@/components/ui/skeleton"

export default function NewCourseLoading() {
  return (
    <div className="container py-6 space-y-6">
      <div>
        <Skeleton className="h-10 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />

        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        <div className="flex justify-end gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}

