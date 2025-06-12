"use client";

import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-60" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>

      {/* Quiz Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl shadow-md overflow-hidden w-full max-w-sm bg-white"
          >
            {/* Top colored image + share icon + badge */}
            <div className="relative h-36 bg-gray-200">
              {/* badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/30 backdrop-blur-sm text-white text-sm font-medium rounded-full px-3 py-1">
                <Skeleton className="h-4 w-4 rounded-full bg-white/60" />
                <Skeleton className="h-4 w-20 bg-white/60" />
              </div>

              {/* Share icon */}
              <div className="absolute top-3 right-3">
                <Skeleton className="h-6 w-6 rounded-full bg-white/60" />
              </div>

              {/* Centered logo area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-10 w-36 rounded-md bg-white/60" />
              </div>
            </div>

            {/* Bottom section */}
            <div className="px-4 py-3 flex justify-between items-center">
              <div>
                <Skeleton className="h-5 w-32 mb-1" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              {/* Link icon */}
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Quiz History Title */}
      <Skeleton className="h-6 w-32 mt-6" />

      {/* Quiz History Placeholder */}
      <Skeleton className="h-24 w-full rounded-md" />
    </div>
  );
};

export default DashboardSkeleton;
