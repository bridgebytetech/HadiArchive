"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { videoService } from "@/services/videoService";
import { getYouTubeThumbnail, formatDuration, truncate } from "@/lib/utils";
import { Video } from "@/types";

export default function LatestVideos() {
  const { t, language } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["latestVideos"],
    queryFn: () => videoService.getAll(0, 4),
  });

  const videos = data?.content || [];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container-memorial">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-memorial-green">
              {t("সর্বশেষ ভিডিও", "Latest Videos")}
            </h2>
            <p className="text-muted-foreground mt-1">
              {t(
                "বক্তৃতা, সাক্ষাৎকার ও প্রামাণ্যচিত্র",
                "Speeches, Interviews & Documentaries"
              )}
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/videos">
              {t("সব দেখুন", "View All")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Videos Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} language={language} />
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline">
            <Link href="/videos">
              {t("সব ভিডিও দেখুন", "View All Videos")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video, language }: { video: Video; language: string }) {
  const thumbnail =
    video.thumbnailUrl || getYouTubeThumbnail(video.videoUrl, "hq");
  const title = language === "bn" ? video.titleBn : video.titleEn || video.titleBn;

  return (
    <Link href={`/videos/${video.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover">
        {/* Thumbnail */}
        <div className="relative aspect-video">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="h-6 w-6 text-memorial-green ml-1" fill="currentColor" />
            </div>
          </div>
          {/* Duration Badge */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDuration(video.duration)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold line-clamp-2 group-hover:text-memorial-green transition-colors">
            {truncate(title, 60)}
          </h3>
          {video.date && (
            <p className="text-sm text-muted-foreground mt-2">
              {new Date(video.date).toLocaleDateString(
                language === "bn" ? "bn-BD" : "en-US",
                { year: "numeric", month: "short", day: "numeric" }
              )}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function VideoCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <Skeleton className="aspect-video" />
      <div className="p-4">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-3" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}