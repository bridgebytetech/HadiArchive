"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Clock, Eye } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: Video;
  viewMode?: "grid" | "list";
}

export default function VideoCard({ video, viewMode = "grid" }: VideoCardProps) {
  const { language, isBangla } = useLanguage();

  const thumbnail =
    video.thumbnailUrl || getYouTubeThumbnail(video.videoUrl, "hq");
  const title = isBangla ? video.titleBn : video.titleEn || video.titleBn;
  const description = isBangla
    ? video.descriptionBn
    : video.descriptionEn || video.descriptionBn;

  if (viewMode === "list") {
    return (
      <Link href={`/videos/${video.id}`} className="group block">
        <div className="flex gap-4 bg-white rounded-xl p-4 border card-hover">
          {/* Thumbnail */}
          <div className="relative w-48 h-28 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
            />
            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="h-4 w-4 text-memorial-green ml-0.5" fill="currentColor" />
              </div>
            </div>
            {/* Duration */}
            {video.duration && (
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded">
                {formatDuration(video.duration)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 group-hover:text-memorial-green transition-colors line-clamp-1">
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                {truncate(description, 120)}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {video.date && (
                <span>
                  {isBangla ? formatDate(video.date) : formatDateEn(video.date)}
                </span>
              )}
              {video.viewCount !== undefined && (
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {formatNumber(video.viewCount)}
                </span>
              )}
              {video.videoType && (
                <Badge variant="secondary" className="text-xs">
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
    <Link href={`/videos/${video.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border card-hover">
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
          {/* Featured Badge */}
          {video.featured && (
            <Badge className="absolute top-2 left-2 bg-memorial-gold">
              Featured
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold line-clamp-2 group-hover:text-memorial-green transition-colors mb-2">
            {title}
          </h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {video.date && (
              <span>
                {isBangla ? formatDate(video.date) : formatDateEn(video.date)}
              </span>
            )}
            {video.viewCount !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatNumber(video.viewCount)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}