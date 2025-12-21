"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ZoomIn } from "lucide-react";
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
    queryFn: () => photoService.getAll(0, 8),
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
    <section className="py-16 md:py-20">
      <div className="container-memorial">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-memorial-green">
              {t("ফটো গ্যালারি", "Photo Gallery")}
            </h2>
            <p className="text-muted-foreground mt-1">
              {t(
                "স্মৃতির পাতা থেকে কিছু মুহূর্ত",
                "Moments from the pages of memory"
              )}
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/photos">
              {t("সব দেখুন", "View All")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Photo Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                className={`rounded-xl ${
                  i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden rounded-xl ${
                  index === 0
                    ? "md:col-span-2 md:row-span-2"
                    : ""
                }`}
              >
                <div className="relative aspect-square">
                  <Image
                    src={photo.thumbnailUrl || photo.imageUrl}
                    alt={
                      language === "bn"
                        ? photo.titleBn
                        : photo.titleEn || photo.titleBn
                    }
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <ZoomIn className="h-5 w-5 text-memorial-green" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline">
            <Link href="/photos">
              {t("সব ছবি দেখুন", "View All Photos")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </section>
  );
}