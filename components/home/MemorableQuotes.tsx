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
   * ✅ টাইপস্ক্রিপ্ট এরর ফিক্স: 
   * 'any' কাস্টিং ব্যবহার করা হয়েছে যাতে বিল্ড টাইমে .content নিয়ে এরর না দেয়।
   * এটি এপিআই থেকে আসা অ্যারে বা অবজেক্ট—উভয়ই নিরাপদে হ্যান্ডেল করবে।
   */
  const rawData = data as any;
  const quotes: Quote[] = rawData?.content || (Array.isArray(rawData) ? rawData : []);
  const displayQuotes = quotes.slice(0, 4); // ৪টি উক্তি দেখানোর জন্য

  if (!isLoading && displayQuotes.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container-memorial">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-memorial-red font-bold uppercase text-xs tracking-widest">
              <MessageCircle className="w-4 h-4" />
              <span>{t("স্মরণীয় উক্তি", "Memorable Quotes")}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("বাণী ও দর্শন", "Words & Philosophy")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t(
                "শহীদ ওসমান হাদির তেজস্বী বাণী যা প্রজন্মকে পথ দেখাবে।",
                "Powerful words and philosophy of Shaheed Osman Hadi."
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

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            [...Array(2)].map((_, i) => (
              <div key={i} className="p-10 border rounded-[2.5rem] bg-slate-50 space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))
          ) : (
            displayQuotes.map((quote) => (
              <div 
                key={quote.id} 
                className="relative group p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-transparent hover:border-memorial-red/20 hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                <QuoteIcon className="absolute top-8 right-8 w-12 h-12 text-slate-200 dark:text-slate-800 group-hover:text-memorial-red/10 transition-colors" />
                
                <div className="relative z-10 space-y-6">
                  <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
                    "{isBangla ? quote.quoteBn : quote.quoteEn || quote.quoteBn}"
                  </p>
                  
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">
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
