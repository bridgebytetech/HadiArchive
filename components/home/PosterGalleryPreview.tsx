// components/home/PosterGalleryPreview.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Maximize2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { publicPosterService } from "@/services/publicPosterService";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PosterGalleryPreview() {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["featuredPosters"],
    queryFn: () => publicPosterService.getFeatured(),
  });

  const posters = data || [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = posters.map((poster) => ({
    src: poster.imageUrl,
    alt: language === "bn" ? poster.titleBn : poster.titleEn || poster.titleBn,
  }));

  return (
    <section className="py-20 bg-white dark:bg-slate-900/40">
      <div className="container-memorial">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-memorial-green font-medium tracking-wider uppercase text-sm">
              <Palette className="w-4 h-4" />
              <span>{t("সৃজনশীল আর্কাইভ", "Creative Archive")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {t("পোস্টার ও টাইপোগ্রাফি", "Posters & Typography")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t(
                "শহীদ ওসমান হাদির স্মরণে তৈরি পোস্টার ও সৃজনশীল ডিজাইনসমূহ।",
                "Posters and creative designs in memory of Shaheed Osman Hadi."
              )}
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="group text-memorial-green hover:text-memorial-green hover:bg-memorial-green/10 w-fit"
          >
            <Link href="/posters" className="flex items-center gap-2">
              {t("সব পোস্টার দেখুন", "View All Posters")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Poster Grid - Masonry Style */}
        {isLoading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl mb-4 break-inside-avoid" />
            ))}
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {posters.slice(0, 8).map((poster, index) => (
              <button
                key={poster.id}
                onClick={() => openLightbox(index)}
                className="group relative w-full overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 transition-all duration-300 hover:shadow-xl break-inside-avoid mb-4"
              >
                <Image
                  src={poster.thumbnailUrl || poster.imageUrl}
                  alt={language === "bn" ? poster.titleBn : poster.titleEn || poster.titleBn}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                    <span className="text-white/70 text-[10px] font-medium tracking-widest uppercase">
                      {t("পোস্টার", "Poster")}
                    </span>
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
        )}

        {/* Mobile CTA */}
        <div className="mt-10 md:hidden">
          <Button
            asChild
            className="w-full bg-memorial-green hover:bg-memorial-green/90 h-12 rounded-xl shadow-lg shadow-memorial-green/20"
          >
            <Link href="/posters">
              {t("সব পোস্টার দেখুন", "View All Posters")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        animation={{ fade: 300 }}
      />
    </section>
  );
}
