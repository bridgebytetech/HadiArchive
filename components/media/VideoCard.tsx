"use client";

import React from "react";
import Link from "next/link";
import { Play, Calendar, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Video } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { getYouTubeThumbnail, formatDuration, formatNumber, formatDate, formatDateEn } from "@/lib/utils";

export default function VideoCard({ video, viewMode = "grid" }: { video: Video; viewMode?: "grid" | "list" }) {
  const { isBangla } = useLanguage();

  // ✅ ইউটিউব থেকে থাম্বনেইল জেনারেট
  const thumbnail = video.thumbnailUrl || getYouTubeThumbnail(video.videoUrl, "hq");
  const title = isBangla ? video.titleBn : video.titleEn || video.titleBn;

  return (
    <Link href={`/videos/${video.id}`} className="group block h-full">
      <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
        {/* Thumbnail Area */}
        <div className="relative aspect-video overflow-hidden bg-slate-200">
          {/* ✅ সরাসরি <img> ট্যাগ ব্যবহার করা হয়েছে ভেরসেল এরর এড়াতে */}
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 flex items-center justify-center transition-all">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>
          </div>
          {video.duration && (
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded">
              {formatDuration(video.duration)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-sm line-clamp-2 group-hover:text-memorial-red transition-colors mb-2">
            {title}
          </h3>
          <div className="flex items-center justify-between mt-auto text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {isBangla ? toBanglaNumber(formatDate(video.createdAt || "")) : formatDateEn(video.createdAt || "")}
            </span>
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

// বাংলা নাম্বার হেল্পার (যদি utils এ না থাকে)
function toBanglaNumber(num: string) {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.replace(/\d/g, (digit) => banglaDigits[parseInt(digit)]);
}
