"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Clock, Eye, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Video } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import {
  getYouTubeThumbnail,
  formatDuration,
  formatNumber,
  truncate,
  formatDate,
  formatDateEn,
} from "@/lib/utils";

interface VideoCardProps {
  video: Video;
  viewMode?: "grid" | "list";
}

export default function VideoCard({ video, viewMode = "grid" }: VideoCardProps) {
  const { isBangla } = useLanguage();

  // ইউটিউব থাম্বনেইল জেনারেট করা
  const thumbnail = video.thumbnailUrl || getYouTubeThumbnail(video.videoUrl, "hq");
  const title = isBangla ? video.titleBn : video.titleEn || video.titleBn;
  const description = isBangla ? video.descriptionBn : video.descriptionEn || video.descriptionBn;

  if (viewMode === "list") {
    return (
      <Link href={`/videos/${video.id}`} className="group block">
        <div className="flex gap-4 bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
          {/* Thumbnail */}
          <div className="relative w-48 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              // ✅ Vercel 402 Error এবং ছবি না আসার সমস্যার সমাধান
              unoptimized={true} 
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="h-4 w-4 text-memorial-red fill-current ml-0.5" />
              </div>
            </div>
            {video.duration && (
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded">
                {formatDuration(video.duration)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className="font-bold text-lg mb-1 group-hover:text-memorial-red transition-colors line-clamp-1">
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground text-xs line-clamp-2 mb-2">
                {truncate(description, 100)}
              </p>
            )}
            <div className="flex items-center gap-4 text-[10px] text-slate-400 font-medium uppercase">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {isBangla ? formatDate(video.createdAt || "") : formatDateEn(video.createdAt || "")}
              </span>
              {video.videoType && (
                <Badge variant="secondary" className="text-[9px] py-0 h-4">
                  {video.videoType}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/videos/${video.id}`} className="group block h-full">
      <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            // ✅ Vercel 402 Error এবং ছবি না আসার সমস্যার সমাধান
            unoptimized={true} 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-7 h-7 fill-current ml-1" />
            </div>
          </div>
          {video.duration && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-[10px] font-bold rounded flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDuration(video.duration)}
            </div>
          )}
          {video.featured && (
            <Badge className="absolute top-3 left-3 bg-memorial-gold text-white border-none shadow-lg">
              Featured
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-md line-clamp-2 group-hover:text-memorial-red transition-colors mb-4 leading-snug flex-1">
            {title}
          </h3>
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-t pt-4 border-slate-50 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {isBangla ? formatDate(video.createdAt || "") : formatDateEn(video.createdAt || "")}
            </span>
            {video.viewCount !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {formatNumber(video.viewCount)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
