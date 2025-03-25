import { Skeleton } from "@/components/ui/skeleton"

export default function NewAnnouncementLoading() {
  return (
    <div className="container py-6 space-y-6">
      <div>
        <Skeleton className="h-10 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <Skeleton className="h-[600px] w-full rounded-xl" />
    </div>
  )
}

