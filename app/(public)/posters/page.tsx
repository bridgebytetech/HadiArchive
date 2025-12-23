// app/posters/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Palette, Maximize2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";
import { publicPosterService } from "@/services/publicPosterService";
import { POSTER_TYPES } from "@/lib/constants";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PostersPage() {
  const { t, language } = useLanguage();
  const [page, setPage] = useState(0);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["posters", page, selectedType],
    queryFn: () =>
      selectedType === "ALL"
        ? publicPosterService.getAll(page, 12)
        : publicPosterService.getByType(selectedType, page, 12),
  });

  const posters = data?.content || [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = posters.map((poster) => ({
    src: poster.imageUrl,
    alt: language === "bn" ? poster.titleBn : poster.titleEn || poster.titleBn,
  }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b">
        <div className="container-memorial py-12">
          <div className="flex items-center gap-2 text-memorial-green font-medium tracking-wider uppercase text-sm mb-2">
            <Palette className="w-4 h-4" />
            <span>{t("সৃজনশীল আর্কাইভ", "Creative Archive")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t("পোস্টার গ্যালারি", "Poster Gallery")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t(
              "শহীদ ওসমান হাদির স্মরণে তৈরি পোস্টার, টাইপোগ্রাফি ও সৃজনশীল ডিজাইনসমূহ।",
              "Posters, typography and creative designs in memory of Shaheed Osman Hadi."
            )}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="container-memorial py-6">
        <div className="flex items-center gap-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t("সব ধরন", "All Types")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">{t("সব ধরন", "All Types")}</SelectItem>
              {POSTER_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {language === "bn" ? type.labelBn : type.labelEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="container-memorial pb-12">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
            ))}
          </div>
        ) : posters.length === 0 ? (
          <div className="text-center py-20">
            <Palette className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {t("কোনো পোস্টার পাওয়া যায়নি", "No posters found")}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {posters.map((poster, index) => (
                <button
                  key={poster.id}
                  onClick={() => openLightbox(index)}
                  className="group relative overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 aspect-[3/4] transition-all duration-300 hover:shadow-xl"
                >
                  <Image
                    src={poster.thumbnailUrl || poster.imageUrl}
                    alt={language === "bn" ? poster.titleBn : poster.titleEn || poster.titleBn}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                      <h3 className="text-white font-semibold text-sm line-clamp-2">
                        {language === "bn" ? poster.titleBn : poster.titleEn || poster.titleBn}
                      </h3>
                      <div className="flex items-center gap-2 text-memorial-green text-[10px] font-bold">
                        <Maximize2 className="w-3 h-3" />
                        {t("বড় করে দেখুন", "VIEW LARGER")}
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  {t("আগের", "Previous")}
                </Button>
                <span className="flex items-center px-4 text-sm text-muted-foreground">
                  {page + 1} / {data.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={data.last}
                >
                  {t("পরের", "Next")}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        animation={{ fade: 300 }}
      />
    </div>
  );
}
