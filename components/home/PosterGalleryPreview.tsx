"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Palette } from "lucide-react";
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
    queryFn: () => publicPosterService.getAll(0, 12), // বেশি পোস্টার দেখালে ম্যাশনরি সুন্দর লাগে
  });

  const posters = data?.content || (Array.isArray(data) ? data : []);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container-memorial">
        {/* Section Header - লেখার স্টাইল আগের মতো করা হয়েছে */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-memorial-gold font-bold tracking-widest uppercase text-xs">
              <Palette className="w-4 h-4" />
              <span>{t("সৃজনশীল আর্কাইভ", "Creative Archive")}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("পোস্টার ও টাইপোগ্রাফি", "Posters & Typography")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t(
                "শহীদ ওসমান হাদির স্মরণে তৈরি পোস্টার ও সৃজনশীল ডিজাইনসমূহ।",
                "Creative posters and designs dedicated to Shaheed Osman Hadi."
              )}
            </p>
          </div>
          <Button asChild variant="outline" className="group border-2 hover:bg-slate-50">
            <Link href="/posters" className="flex items-center gap-2">
              {t("সব পোস্টার দেখুন", "View All Posters")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Masonry Layout Grid - ছবিগুলো ক্রপ হবে না */}
        {isLoading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-80 rounded-2xl mb-6" />
            ))}
          </div>
        ) : posters.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {posters.map((poster: any) => (
              <PosterCard key={poster.id} poster={poster} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-medium">
               {t("কোনো পোস্টার পাওয়া যায়নি।", "No posters found.")}
             </p>
          </div>
        )}
      </div>
    </section>
  );
}
