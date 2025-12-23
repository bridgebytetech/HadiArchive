"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
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
    queryFn: () => publicPosterService.getAll(0, 8), // ৮টি পোস্টার নিচ্ছি
  });

  const posters = data?.content || (Array.isArray(data) ? data : []);

  return (
    <section className="py-24 bg-slate-50/30 dark:bg-slate-950 overflow-hidden">
      <div className="container-memorial">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-memorial-gold/10 text-memorial-gold border border-memorial-gold/20 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3" />
              <span>{t("সৃজনশীল আর্কাইভ", "Exhibition")}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
              {t("পোস্টার ও", "Posters &")}<br/>
              <span className="text-memorial-gold">{t("টাইপোগ্রাফি", "Artworks")}</span>
            </h2>
          </div>
          
          <div className="pb-2">
            <Button asChild variant="link" className="text-lg font-bold group p-0 h-auto">
              <Link href="/posters" className="flex items-center gap-2">
                {t("সব সৃজনশীল কাজ দেখুন", "Explore Full Collection")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Masonry Layout Grid */}
        {isLoading ? (
          <div className="columns-2 md:columns-4 gap-6 space-y-6">
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
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 shadow-sm">
             <p className="text-slate-400 font-medium italic">
               {t("আপাতত কোনো পোস্টার নেই", "Curating collection...")}
             </p>
          </div>
        )}
      </div>
    </section>
  );
}
