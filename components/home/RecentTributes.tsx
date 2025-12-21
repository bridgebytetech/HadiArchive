"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Quote, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { tributeService } from "@/services/tributeService";
import { Tribute } from "@/types";
import { truncate, formatRelativeTime } from "@/lib/utils";

export default function RecentTributes() {
  const { t, language } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["recentTributes"],
    queryFn: () => tributeService.getAll(0, 4),
  });

  const tributes = data?.content || [];

  return (
    <section className="py-16 md:py-20">
      <div className="container-memorial">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-memorial-green">
              {t("শ্রদ্ধাঞ্জলি", "Tributes")}
            </h2>
            <p className="text-muted-foreground mt-1">
              {t(
                "মানুষের স্মৃতি ও শ্রদ্ধাঞ্জলি",
                "Memories & tributes from people"
              )}
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/tributes">
              {t("সব দেখুন", "View All")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Tributes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <TributeCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tributes.map((tribute) => (
              <TributeCard key={tribute.id} tribute={tribute} language={language} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-memorial-green/5 rounded-2xl border border-memorial-green/20">
            <div className="w-14 h-14 rounded-full bg-memorial-green/10 flex items-center justify-center">
              <Heart className="h-7 w-7 text-memorial-green" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-lg">
                {t("আপনিও শ্রদ্ধাঞ্জলি জানান", "Submit Your Tribute")}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t(
                  "আপনার স্মৃতি ও শ্রদ্ধাঞ্জলি শেয়ার করুন",
                  "Share your memories and tributes"
                )}
              </p>
            </div>
            <Button
              asChild
              className="bg-memorial-green hover:bg-memorial-green/90"
            >
              <Link href="/tributes/submit">
                {t("শ্রদ্ধাঞ্জলি দিন", "Pay Tribute")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TributeCard({
  tribute,
  language,
}: {
  tribute: Tribute;
  language: string;
}) {
  const content =
    language === "bn"
      ? tribute.contentBn
      : tribute.contentEn || tribute.contentBn;

  return (
    <div className="bg-white rounded-xl p-6 border shadow-sm card-hover">
      {/* Quote Icon */}
      <Quote className="h-8 w-8 text-memorial-green/20 mb-4" />

      {/* Content */}
      <p className="text-gray-700 mb-6 line-clamp-3">{truncate(content, 200)}</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={tribute.authorPhoto} />
          <AvatarFallback className="bg-memorial-green/10 text-memorial-green">
            {tribute.authorName?.charAt(0) || "A"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{tribute.authorName}</p>
          <p className="text-sm text-muted-foreground">
            {tribute.authorLocation || tribute.authorRelation}
          </p>
        </div>
      </div>
    </div>
  );
}

function TributeCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 border shadow-sm">
      <Skeleton className="h-8 w-8 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-6" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}