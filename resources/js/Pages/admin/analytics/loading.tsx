import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>

      <Card className="rounded-xl shadow-md border-0">
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-48 mb-1" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-10 flex-1 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <Card key={i} className="rounded-xl overflow-hidden shadow-sm border-0">
                    <Skeleton className="h-1 w-full" />
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-9 w-9 rounded-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-20 mb-1" />
                      <Skeleton className="h-3 w-32 mb-4" />
                      <Skeleton className="h-2 w-full" />
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array(2)
                .fill(null)
                .map((_, i) => (
                  <Card key={i} className="rounded-xl shadow-sm border-0">
                    <CardHeader>
                      <Skeleton className="h-5 w-40 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    </CardContent>
                  </Card>
                ))}
            </div>

            <Card className="rounded-xl shadow-sm border-0">
              <CardHeader>
                <Skeleton className="h-5 w-40 mb-1" />
                <Skeleton className="h-3 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full rounded-lg" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

