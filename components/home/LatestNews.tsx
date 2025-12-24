"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { publicNewsService } from "@/services/publicNewsService";
import { formatDate, formatDateEn, toBanglaNumber } from "@/lib/utils";

export default function LatestNews() {
  const { t, isBangla } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["latestNewsHome"],
    queryFn: () => publicNewsService.getAll(0, 3), // হোমপেজে লেটেস্ট ৩টি নিউজ
  });

  const newsList = data?.content || [];

  if (!isLoading && newsList.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container-memorial">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-memorial-green font-bold uppercase text-xs tracking-widest">
              <Newspaper className="w-4 h-4" />
              <span>{t("গণমাধ্যম সংবাদ", "Press Coverage")}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
              {t("সংবাদে শহীদ ওসমান হাদি", "In The News")}
            </h2>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/news" className="flex items-center gap-2">
              {t("সব সংবাদ দেখুন", "View All News")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))
          ) : (
            newsList.map((news) => (
              <div key={news.id} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                {/* Image/Icon Area */}
                <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  {news.screenshotUrl ? (
                    <img 
                      src={news.screenshotUrl} 
                      alt={news.headlineBn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Newspaper className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-memorial-green uppercase shadow-sm">
                      {news.mediaName}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] mb-3 font-medium uppercase">
                    <Calendar className="w-3 h-3" />
                    <span>{isBangla ? toBanglaNumber(formatDate(news.publishDate || "")) : formatDateEn(news.publishDate || "")}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-snug group-hover:text-memorial-green transition-colors">
                    {isBangla ? news.headlineBn : news.headlineEn || news.headlineBn}
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                    {isBangla ? news.summaryBn : news.summaryEn || news.summaryBn}
                  </p>

                  <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
                    {news.originalUrl ? (
                      <Link 
                        href={news.originalUrl} 
                        target="_blank"
                        className="inline-flex items-center gap-2 text-memorial-green font-bold text-xs hover:gap-3 transition-all"
                      >
                        {t("পুরো সংবাদটি পড়ুন", "Read Full Article")}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <Link href={`/news/${news.id}`} className="text-memorial-green font-bold text-xs">
                        {t("বিস্তারিত দেখুন", "View Details")}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
