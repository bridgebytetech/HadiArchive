"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout";
import VideoCard from "@/components/media/VideoCard";
import Pagination from "@/components/admin/Pagination";
import { videoService } from "@/services/videoService";
import { useLanguage } from "@/hooks/useLanguage";
import { useDebounce } from "@/hooks/useDebounce";
import { VIDEO_TYPES } from "@/lib/constants";

export default function VideosPage() {
  const { t, language } = useLanguage();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [videoType, setVideoType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["videos", page, debouncedSearch, videoType],
    queryFn: () => videoService.getAll(page, 12),
  });

  const videos = data?.content || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <PageHeader
        titleBn="ভিডিও গ্যালারি"
        titleEn="Video Gallery"
        descriptionBn="শহীদ ওসমান হাদির বক্তৃতা, সাক্ষাৎকার ও প্রামাণ্যচিত্র"
        descriptionEn="Speeches, interviews and documentaries of Shaheed Osman Hadi"
        breadcrumbs={[{ labelBn: "ভিডিও", labelEn: "Videos" }]}
      />

      <section className="py-8 md:py-12">
        <div className="container-memorial">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("ভিডিও খুঁজুন...", "Search videos...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={videoType} onValueChange={setVideoType}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("ধরন", "Type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("সব ধরন", "All Types")}
                </SelectItem>
                {VIDEO_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {language === "bn" ? type.labelBn : type.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            {t(
              `মোট ${data?.totalElements || 0} টি ভিডিও`,
              `Total ${data?.totalElements || 0} videos`
            )}
          </p>

          {/* Videos Grid */}
          {isLoading ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {[...Array(8)].map((_, i) => (
                <VideoCardSkeleton key={i} viewMode={viewMode} />
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {t("কোনো ভিডিও পাওয়া যায়নি", "No videos found")}
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={page + 1}
                totalPages={totalPages}
                onPageChange={(p) => setPage(p - 1)}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function VideoCardSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <div className="flex gap-4 bg-white rounded-xl p-4 border">
        <Skeleton className="w-48 h-28 rounded-lg flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden border">
      <Skeleton className="aspect-video" />
      <div className="p-4">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}