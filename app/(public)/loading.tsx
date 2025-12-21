import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="bg-memorial-dark h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="w-40 h-40 rounded-full mx-auto mb-6" />
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-48 mx-auto" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container-memorial py-12">
        <Skeleton className="h-8 w-48 mx-auto mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}