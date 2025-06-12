"use client";

import { Skeleton } from "@/components/ui/skeleton";

const EditQuizSkeleton = () => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
      <Skeleton className="h-6 w-32" /> {/* Quiz Details title */}
      {/* Image Upload Box */}
      <div className="relative border border-dashed rounded-md p-4 h-48 flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-md" />
        <Skeleton className="absolute top-2 right-2 h-6 w-6 rounded-full" />
      </div>
      {/* Quiz Title */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
      {/* Join Type */}
      <div className="flex space-x-6">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      {/* Max Users, Quiz Price, Countdown */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
      {/* Moderator Dropdown */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>
    </div>
  );
};

export default EditQuizSkeleton;
