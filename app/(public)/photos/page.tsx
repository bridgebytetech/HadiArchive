"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, ZoomIn } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout";
import Pagination from "@/components/admin/Pagination";
import { photoService } from "@/services/photoService";
import { useLanguage } from "@/hooks/useLanguage";
import { useDebounce } from "@/hooks/useDebounce";
import { PHOTO_TYPES } from "@/lib/constants";
import { Photo } from "@/types";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PhotosPage() {
  const { t, language } = useLanguage();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [photoType, setPhotoType] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["photos", page, debouncedSearch, photoType],
    queryFn: () => photoService.getAll(page, 20),
  });

  const photos = data?.content || [];
  const totalPages = data?.totalPages || 0;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = photos.map((photo) => ({
    src: photo.imageUrl,
    alt: language === "bn" ? photo.titleBn : photo.titleEn || photo.titleBn,
    title: language === "bn" ? photo.titleBn : photo.titleEn || photo.titleBn,
  }));

  return (
    <>
      <PageHeader
        titleBn="ফটো গ্যালারি"
        titleEn="Photo Gallery"
        descriptionBn="শহীদ ওসমান হাদির জীবনের বিভিন্ন মুহূর্তের ছবি"
        descriptionEn="Photos from various moments of Shaheed Osman Hadi's life"
        breadcrumbs={[{ labelBn: "ছবি", labelEn: "Photos" }]}
      />

      <section className="py-8 md:py-12">
        <div className="container-memorial">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("ছবি খুঁজুন...", "Search photos...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={photoType} onValueChange={setPhotoType}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("ধরন", "Type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("সব ধরন", "All Types")}
                </SelectItem>
                {PHOTO_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {language === "bn" ? type.labelBn : type.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            {t(
              `মোট ${data?.totalElements || 0} টি ছবি`,
              `Total ${data?.totalElements || 0} photos`
            )}
          </p>

          {/* Photos Grid - Masonry Style */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-square rounded-xl"
                  style={{
                    height: `${Math.floor(Math.random() * 100) + 200}px`,
                  }}
                />
              ))}
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {t("কোনো ছবি পাওয়া যায়নি", "No photos found")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onClick={() => openLightbox(index)}
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

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </>
  );
}

function PhotoCard({
  photo,
  onClick,
}: {
  photo: Photo;
  onClick: () => void;
}) {
  const { language } = useLanguage();
  const title = language === "bn" ? photo.titleBn : photo.titleEn || photo.titleBn;

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-memorial-green focus:ring-offset-2"
    >
      <div className="relative aspect-square">
        <Image
          src={photo.thumbnailUrl || photo.imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <ZoomIn className="h-5 w-5 text-memorial-green" />
            </div>
          </div>
        </div>
        {/* Photo Type Badge */}
        {photo.imageType && (
          <Badge className="absolute top-2 left-2 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            {photo.imageType}
          </Badge>
        )}
      </div>
      {/* Title on Hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white text-sm font-medium truncate">{title}</p>
      </div>
    </button>
  );
}