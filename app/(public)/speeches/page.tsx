"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Search, Calendar, Mic, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout";
import Pagination from "@/components/admin/Pagination";
import { speechService } from "@/services/speechService";
import { useLanguage } from "@/hooks/useLanguage";
import { useDebounce } from "@/hooks/useDebounce";
import { Speech } from "@/types";
import { formatDate, formatDateEn, truncate } from "@/lib/utils";

export default function SpeechesPage() {
  const { t, language, isBangla } = useLanguage();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["speeches", page, debouncedSearch],
    queryFn: () => speechService.getAll(page, 10),
  });

  const speeches = data?.content || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <PageHeader
        titleBn="বক্তৃতা সংকলন"
        titleEn="Speeches Collection"
        descriptionBn="শহীদ ওসমান হাদির বিভিন্ন সমাবেশ ও অনুষ্ঠানে দেওয়া বক্তৃতা"
        descriptionEn="Speeches delivered by Shaheed Osman Hadi at various rallies and events"
        breadcrumbs={[{ labelBn: "বক্তৃতা", labelEn: "Speeches" }]}
      />

      <section className="py-8 md:py-12">
        <div className="container-memorial">
          {/* Search */}
          <div className="max-w-xl mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("বক্তৃতা খুঁজুন...", "Search speeches...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            {t(
              `মোট ${data?.totalElements || 0} টি বক্তৃতা`,
              `Total ${data?.totalElements || 0} speeches`
            )}
          </p>

          {/* Speeches List */}
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <SpeechCardSkeleton key={i} />
              ))}
            </div>
          ) : speeches.length === 0 ? (
            <div className="text-center py-12">
              <Mic className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {t("কোনো বক্তৃতা পাওয়া যায়নি", "No speeches found")}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {speeches.map((speech) => (
                <SpeechCard key={speech.id} speech={speech} language={language} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={page + 1}
                totalPages={totalPages}
                onPageChange={(p) => setPage(p - 1)}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function SpeechCard({
  speech,
  language,
}: {
  speech: Speech;
  language: string;
}) {
  const isBangla = language === "bn";
  const title = isBangla ? speech.titleBn : speech.titleEn || speech.titleBn;
  const content = isBangla
    ? speech.contentBn
    : speech.contentEn || speech.contentBn;

  return (
    <Link href={`/speeches/${speech.id}`}>
      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-memorial-green/10 flex items-center justify-center flex-shrink-0">
              <Mic className="h-7 w-7 text-memorial-green" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {speech.featured && (
                  <Badge className="bg-memorial-gold">Featured</Badge>
                )}
                {speech.occasion && (
                  <Badge variant="secondary">{speech.occasion}</Badge>
                )}
              </div>

              <h3 className="text-xl font-semibold mb-2 hover:text-memorial-green transition-colors">
                {title}
              </h3>

              <p className="text-muted-foreground line-clamp-2 mb-3">
                {truncate(content, 200)}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {speech.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {isBangla
                        ? formatDate(speech.date)
                        : formatDateEn(speech.date)}
                    </span>
                  </div>
                )}
                {speech.venue && (
                  <span className="truncate max-w-[200px]">{speech.venue}</span>
                )}
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function SpeechCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}