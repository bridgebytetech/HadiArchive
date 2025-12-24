"use client";

import React from "react";
import { Quote as QuoteIcon, MessageCircle, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { publicQuoteService } from "@/services/publicQuoteService";
import { useLanguage } from "@/hooks/useLanguage";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Quote } from "@/types";

export default function MemorableQuotes() {
  const { t, isBangla } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["featuredQuotesHome"],
    queryFn: () => publicQuoteService.getFeatured(),
  });

  /**
   * ✅ ডাটা এক্সট্রাকশন ফিক্স:
   * ১. যদি ডাটা data.content এ থাকে তবে সেটি নিবে।
   * ২. যদি সরাসরি অ্যারে হয় তবে সেটি নিবে।
   * ৩. ৩-৪টি উক্তি দেখানোর জন্য slice(0, 4) ব্যবহার করা হয়েছে।
   */
  const quotes: Quote[] = data?.content || (Array.isArray(data) ? data : []);
  const displayQuotes = quotes.slice(0, 4); 

  if (!isLoading && displayQuotes.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-950">
      <div className="container-memorial">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2 text-memorial-red font-bold uppercase text-xs tracking-widest">
              <MessageCircle className="w-4 h-4" />
              <span>{t("স্মরণীয় উক্তি", "Memorable Quotes")}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("বাণী ও দর্শন", "Words & Philosophy")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t(
                "শহীদ ওসমান হাদির তেজস্বী বাণী যা আমাদের বিপ্লবের প্রেরণা।",
                "Powerful words of Shaheed Osman Hadi that inspire our revolution."
              )}
            </p>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/quotes" className="flex items-center gap-2">
              {t("সব উক্তি দেখুন", "View All Quotes")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Quotes Grid - এটি ৩-৪টি কার্ড সুন্দরভাবে দেখাবে */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {isLoading ? (
            [...Array(2)].map((_, i) => (
              <div key={i} className="p-10 border rounded-[2.5rem] bg-white space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))
          ) : (
            displayQuotes.map((quote) => (
              <div 
                key={quote.id} 
                className="relative group p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500"
              >
                <QuoteIcon className="absolute top-8 right-8 w-12 h-12 text-slate-100 dark:text-slate-800 group-hover:text-memorial-red/10 transition-colors" />
                
                <div className="relative z-10 space-y-6">
                  <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    "{isBangla ? quote.quoteBn : quote.quoteEn || quote.quoteBn}"
                  </p>
                  
                  <div className="pt-6 border-t border-slate-50 dark:border-slate-800">
                    <p className="font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
                      — {isBangla ? "শহীদ ওসমান হাদি" : "Shaheed Osman Hadi"}
                    </p>
                    {quote.source && (
                      <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">
                        {quote.source}
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
