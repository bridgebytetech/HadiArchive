"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import {
  Calendar,
  Clock,
  Eye,
  Share2,
  Download,
  Tag,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { videoService } from "@/services/videoService";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDate, formatDateEn, formatDuration, formatNumber } from "@/lib/utils";
import ShareButtons from "@/components/shared/ShareButtons";
import RelatedVideos from "@/components/media/RelatedVideos";

// Dynamic import for ReactPlayer (client-side only)
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { t, language, isBangla } = useLanguage();

  const { data: video, isLoading } = useQuery({
    queryKey: ["video", id],
    queryFn: () => videoService.getById(id),
  });

  if (isLoading) {
    return <VideoDetailSkeleton />;
  }

  if (!video) {
    return (
      <div className="container-memorial py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {t("ভিডিও পাওয়া যায়নি", "Video not found")}
        </h1>
        <Button asChild>
          <Link href="/videos">
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t("ভিডিও তালিকায় ফিরে যান", "Back to Videos")}
          </Link>
        </Button>
      </div>
    );
  }

  const title = isBangla ? video.titleBn : video.titleEn || video.titleBn;
  const description = isBangla
    ? video.descriptionBn
    : video.descriptionEn || video.descriptionBn;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container-memorial py-4">
        <Link
          href="/videos"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t("ভিডিও তালিকা", "Video List")}
        </Link>
      </div>

      {/* Video Player Section */}
      <div className="bg-black">
        <div className="container-memorial">
          <div className="aspect-video max-w-5xl mx-auto">
            <ReactPlayer
              url={video.videoUrl}
              width="100%"
              height="100%"
              controls
              playing={false}
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-memorial py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                {video.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {isBangla
                        ? formatDate(video.date)
                        : formatDateEn(video.date)}
                    </span>
                  </div>
                )}
                {video.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(video.duration)}</span>
                  </div>
                )}
                {video.viewCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>
                      {formatNumber(video.viewCount)} {t("বার দেখা হয়েছে", "views")}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {video.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator className="my-6" />

              {/* Description */}
              {description && (
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-lg font-semibold mb-3">
                    {t("বিবরণ", "Description")}
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {description}
                  </p>
                </div>
              )}

              {/* Source */}
              {video.source && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>{t("সূত্র:", "Source:")}</strong> {video.source}
                  </p>
                  {video.sourceUrl && (
                    <a
                      href={video.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-memorial-green hover:underline"
                    >
                      {t("মূল লিংক দেখুন", "View original link")}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Share */}
              <div className="bg-white rounded-xl p-5 border mb-6">
                <h3 className="font-semibold mb-4">
                  {t("শেয়ার করুন", "Share")}
                </h3>
                <ShareButtons
                  url={typeof window !== "undefined" ? window.location.href : ""}
                  title={title}
                />
              </div>

              {/* Video Type */}
              {video.videoType && (
                <div className="bg-white rounded-xl p-5 border mb-6">
                  <h3 className="font-semibold mb-3">
                    {t("ভিডিও ধরন", "Video Type")}
                  </h3>
                  <Badge variant="memorial">{video.videoType}</Badge>
                </div>
              )}
            </div>
          </div>

          {/* Related Videos */}
          <div className="mt-12">
            <RelatedVideos currentVideoId={video.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-memorial py-4">
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="bg-black">
        <div className="container-memorial">
          <Skeleton className="aspect-video max-w-5xl mx-auto" />
        </div>
      </div>
      <div className="container-memorial py-8">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-5 w-1/2 mb-6" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}