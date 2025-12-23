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

  const { data, isLoading, error } = useQuery({
    queryKey: ["previewPostersHome"],
    // আমরা হোমপেজের জন্য প্রথম ৬টি পোস্টার নিচ্ছি
    queryFn: () => publicPosterService.getAll(0, 6),
  });

  /**
   * ✅ ডাটা এক্সট্রাকশন ফিক্স:
   * ১. যদি ডাটা পেজিনেটেড হয়, তবে ডাটা আসবে data.content এ।
   * ২. যদি সরাসরি এপিআই অ্যারে পাঠায়, তবে ডাটা হবে সরাসরি data।
   */
  const posters = data?.content || (Array.isArray(data) ? data : []);

  // কনসোলে চেক করার জন্য (প্রয়োজনে এটি ডিলিট করতে পারেন)
  console.log("Home Posters Data:", posters);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container-memorial">
        {/* Section Header */}
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

        {/* Grid Display */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        ) : posters.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {posters.map((poster: any) => (
              <div key={poster.id} className="transition-all duration-500 hover:scale-105">
                <PosterCard poster={poster} />
              </div>
            ))}
          </div>
        ) : (
          /* যদি কোনো ডাটা না থাকে */
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-medium">
               {t("কোনো পোস্টার পাওয়া যায়নি", "No posters available at the moment.")}
             </p>
          </div>
        )}
      </div>
    </section>
  );
}
