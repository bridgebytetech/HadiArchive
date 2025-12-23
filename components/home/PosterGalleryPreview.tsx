"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Maximize2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { photoService } from "@/services/photoService";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PhotoGalleryPreview() {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["previewPhotos"],
    queryFn: () => photoService.getAll(0, 6),
  });

  const photos = data?.content || [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = photos.map((photo) => ({
    src: photo.imageUrl,
    alt: language === "bn" ? photo.titleBn : photo.titleEn || photo.titleBn,
  }));

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="container-memorial">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-memorial-green font-medium tracking-wider uppercase text-sm">
              <Camera className="w-4 h-4" />
              <span>{t("ভিজ্যুয়াল আর্কাইভ", "Visual Archive")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {t("স্মৃতিতে অমর মুহূর্ত", "Eternal Moments in Memory")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t(
                "শহীদ ওসমান হাদির জীবনের বিভিন্ন সময়ের দুর্লভ আলোকচিত্রসমূহ।",
                "Rare photographs from various periods of Shaheed Osman Hadi's life."
              )}
            </p>
          </div>
          <Button asChild variant="ghost" className="group text-memorial-green hover:text-memorial-green hover:bg-memorial-green/10 w-fit">
            <Link href="/photos" className="flex items-center gap-2">
              {t("সব ছবি দেখুন", "View Full Gallery")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Photo Grid (Bento Style with pure CSS transitions) */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
            <Skeleton className="col-span-2 row-span-2 rounded-2xl" />
            <Skeleton className="rounded-2xl" />
            <Skeleton className="rounded-2xl" />
            <Skeleton className="col-span-2 md:col-span-1 rounded-2xl" />
            <Skeleton className="rounded-2xl" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {photos.map((photo, index) => {
              // Bento Grid layout rules
              const gridClasses = [
                "md:col-span-2 md:row-span-2", 
                "md:col-span-1 md:row-span-1",
                "md:col-span-1 md:row-span-1",
                "md:col-span-2 md:row-span-1",
                "md:col-span-1 md:row-span-1",
                "md:col-span-1 md:row-span-1",
              ];

              return (
                <button
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  className={`group relative overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 transition-all duration-300 hover:shadow-xl ${gridClasses[index] || ""}`}
                >
                  <Image
                    src={photo.thumbnailUrl || photo.imageUrl}
                    alt={language === "bn" ? photo.titleBn : photo.titleEn || photo.titleBn}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  
                  {/* Hover Overlay with CSS Transitions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
<span className="text-white/70 text-[10px] font-medium tracking-widest uppercase">
  {t("আর্কাইভ", "Archive")}
</span>
                      <h3 className="text-white font-semibold text-sm line-clamp-2">
                        {language === "bn" ? photo.titleBn : photo.titleEn || photo.titleBn}
                      </h3>
                      <div className="flex items-center gap-2 text-memorial-green text-[10px] font-bold">
                        <Maximize2 className="w-3 h-3" />
                        {t("বড় করে দেখুন", "VIEW LARGER")}
                      </div>
                    </div>
                  </div>

                  {/* Glass-morphism Badge (Visible on hover) */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile Call to Action */}
        <div className="mt-10 md:hidden">
          <Button asChild className="w-full bg-memorial-green hover:bg-memorial-green/90 h-12 rounded-xl shadow-lg shadow-memorial-green/20">
            <Link href="/photos">
              {t("গ্যালারি ভিজিট করুন", "Visit Full Gallery")}
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
