"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Palette } from "lucide-material"; // যদি lucide-react হয় তবে lucide-react লিখবেন
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { publicPosterService } from "@/services/publicPosterService";
import PosterCard from "@/components/shared/PosterCard";

export default function PosterGalleryPreview() {
  const { t } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["previewPostersHome"],
    queryFn: () => publicPosterService.getAll(0, 6), // হোমপেজের জন্য ৬টি
  });

  // ✅ ডাটা এক্সট্রাকশন লজিক (নিরাপদ রেন্ডারিং)
  const posters = data?.content || (Array.isArray(data) ? data : []);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container-memorial">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
              {t("পোস্টার ও টাইপোগ্রাফি", "Posters & Typography")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("শহীদ ওসমান হাদির স্মরণে তৈরি পোস্টারসমূহ।", "Posters dedicated to Shaheed Osman Hadi.")}
            </p>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/posters" className="flex items-center gap-2">
              {t("সব পোস্টার দেখুন", "View All")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Poster Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-xl w-full" />
            ))}
          </div>
        ) : posters.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {posters.map((poster: any) => (
              <PosterCard key={poster.id} poster={poster} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400">
            {t("কোনো পোস্টার পাওয়া যায়নি", "No posters found.")}
          </div>
        )}
      </div>
    </section>
  );
}
