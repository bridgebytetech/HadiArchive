"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { videoService } from "@/services/videoService";
import { useLanguage } from "@/hooks/useLanguage";
import VideoCard from "./VideoCard";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedVideosProps {
  currentVideoId: string;
}

export default function RelatedVideos({ currentVideoId }: RelatedVideosProps) {
  const { t } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["relatedVideos", currentVideoId],
    queryFn: () => videoService.getAll(0, 4),
  });

  const videos = (data?.content || []).filter((v) => v.id !== currentVideoId).slice(0, 3);

  if (isLoading) {
    return (
      <div>
        <h3 className="text-xl font-bold mb-6">
          {t("সম্পর্কিত ভিডিও", "Related Videos")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden border">
              <Skeleton className="aspect-video" />
              <div className="p-4">
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (videos.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">
        {t("সম্পর্কিত ভিডিও", "Related Videos")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}