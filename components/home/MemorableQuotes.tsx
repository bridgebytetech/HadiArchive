"use client";

import React from "react";
import { Quote as QuoteIcon, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { publicQuoteService } from "@/services/publicQuoteService";
import { useLanguage } from "@/hooks/useLanguage";
import { Skeleton } from "@/components/ui/skeleton";

export default function MemorableQuotes() {
  const { t, isBangla } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["featuredQuotesHome"],
    queryFn: () => publicQuoteService.getFeatured(),
  });

  // ডাটা এক্সট্রাকশন (নিরাপদ রেন্ডারিং)
  const quotes = Array.isArray(data) ? data.slice(0, 3) : [];

  if (!isLoading && quotes.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container-memorial">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-memorial-red/10 text-memorial-red text-[10px] font-bold uppercase tracking-widest">
            <MessageCircle className="w-3 h-3" />
            <span>{t("স্মরণীয় উক্তি", "Memorable Quotes")}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t("বাণী ও দর্শন", "Words & Philosophy")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t(
              "শহীদ ওসমান হাদির তেজস্বী বাণী ও বিপ্লবের দর্শন যা প্রজন্মকে পথ দেখাবে।",
              "Powerful words and revolutionary philosophy that will guide generations."
            )}
          </p>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="p-8 border rounded-3xl space-y-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))
          ) : (
            quotes.map((quote) => (
              <div 
                key={quote.id} 
                className="relative group p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-transparent hover:border-memorial-red/20 hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                {/* Decorative Quote Icon */}
                <QuoteIcon className="absolute top-8 left-8 w-10 h-10 text-memorial-red/10 group-hover:text-memorial-red/20 transition-colors" />
                
                <div className="relative z-10 space-y-6">
                  <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
                    "{isBangla ? quote.textBn : quote.textEn || quote.textBn}"
                  </p>
                  
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {isBangla ? "শহীদ ওসমান হাদি" : "Shaheed Osman Hadi"}
                    </p>
                    {quote.sourceBn && (
                      <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                        {isBangla ? quote.sourceBn : quote.sourceEn || quote.sourceBn}
                      </p>
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
