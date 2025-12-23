"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Maximize2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { photoService } from "@/services/photoService"; // নিশ্চিত করুন এটি পাবলিক সার্ভিস কল করছে
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PhotoGalleryPreview() {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["previewPhotos"],
    // হোমপেজের জন্য সাইজ ৬ রাখা হয়েছে
    queryFn: () => photoService.getAll(0, 6),
  });

  /**
   * ✅ সেফ ডাটা হ্যান্ডলিং: 
   * এপিআই যদি {content: []} পাঠায় অথবা সরাসরি [] পাঠায়—উভয়ই হ্যান্ডেল করবে।
   */
  const photos = data?.content || (Array.isArray(data) ? data : []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = photos.map((photo: any) => ({
    src: photo.imageUrl,
    alt: language === "bn" ? photo.titleBn : photo.titleEn || photo.titleBn,
  }));

  // যদি ডাটা লোড হয়ে যায় কিন্তু কোনো ফটো না থাকে
  if (!isLoading && photos.length === 0) {
    return null; // অথবা একটি "No photos found" মেসেজ দিতে পারেন
  }

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
          </div>
          <Button asChild variant="ghost" className="group text-memorial-green hover:text-memorial-green hover:bg-memorial-green/10 w-fit">
            <Link href="/photos" className="flex items-center gap-2">
              {t("সব ছবি দেখুন", "View Full Gallery")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Photo Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px]">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {photos.map((photo: any, index: number) => {
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
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <Maximize2 className="text-white w-8 h-8" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </section>
  );
}
