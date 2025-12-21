"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Heart, Quote, Plus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout";
import Pagination from "@/components/admin/Pagination";
import { tributeService } from "@/services/tributeService";
import { useLanguage } from "@/hooks/useLanguage";
import { Tribute } from "@/types";
import { formatRelativeTime, truncate } from "@/lib/utils";
import { TRIBUTE_TYPES } from "@/lib/constants";

export default function TributesPage() {
  const { t, language, isBangla } = useLanguage();
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["tributes", page],
    queryFn: () => tributeService.getAll(page, 12),
  });

  const tributes = data?.content || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <PageHeader
        titleBn="শ্রদ্ধাঞ্জলি"
        titleEn="Tributes"
        descriptionBn="মানুষের স্মৃতি, শ্রদ্ধা ও ভালোবাসার বার্তা"
        descriptionEn="Messages of memory, respect and love from people"
        breadcrumbs={[{ labelBn: "শ্রদ্ধাঞ্জলি", labelEn: "Tributes" }]}
      >
        <Button asChild className="bg-memorial-green hover:bg-memorial-green/90">
          <Link href="/tributes/submit">
            <Plus className="h-4 w-4 mr-2" />
            {t("শ্রদ্ধাঞ্জলি জানান", "Submit Tribute")}
          </Link>
        </Button>
      </PageHeader>

      <section className="py-8 md:py-12">
        <div className="container-memorial">
          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            {t(
              `মোট ${data?.totalElements || 0} টি শ্রদ্ধাঞ্জলি`,
              `Total ${data?.totalElements || 0} tributes`
            )}
          </p>

          {/* Tributes Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <TributeCardSkeleton key={i} />
              ))}
            </div>
          ) : tributes.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {t(
                  "এখনো কোনো শ্রদ্ধাঞ্জলি নেই",
                  "No tributes yet"
                )}
              </p>
              <Button asChild>
                <Link href="/tributes/submit">
                  {t("প্রথম শ্রদ্ধাঞ্জলি জানান", "Be the first to pay tribute")}
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tributes.map((tribute) => (
                <TributeCard
                  key={tribute.id}
                  tribute={tribute}
                  language={language}
                />
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
    </>
  );
}

function TributeCard({
  tribute,
  language,
}: {
  tribute: Tribute;
  language: string;
}) {
  const isBangla = language === "bn";
  const content = isBangla
    ? tribute.contentBn
    : tribute.contentEn || tribute.contentBn;

  const tributeTypeLabel = TRIBUTE_TYPES.find(
    (t) => t.value === tribute.tributeType
  );

  return (
    <Card className="h-full card-hover">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Quote Icon & Type */}
        <div className="flex items-start justify-between mb-4">
          <Quote className="h-8 w-8 text-memorial-green/20" />
          {tribute.tributeType && tributeTypeLabel && (
            <Badge variant="secondary">
              {isBangla ? tributeTypeLabel.labelBn : tributeTypeLabel.labelEn}
            </Badge>
          )}
        </div>

        {/* Content */}
        <p className="text-gray-700 flex-1 mb-6 line-clamp-4">
          {truncate(content, 250)}
        </p>

        {/* Featured Badge */}
        {tribute.featured && (
          <Badge className="bg-memorial-gold w-fit mb-4">Featured</Badge>
        )}

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t">
          <Avatar>
            <AvatarImage src={tribute.authorPhoto} />
            <AvatarFallback className="bg-memorial-green/10 text-memorial-green">
              {tribute.authorName?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{tribute.authorName}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {tribute.authorLocation && (
                <>
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{tribute.authorLocation}</span>
                </>
              )}
              {!tribute.authorLocation && tribute.authorRelation && (
                <span className="truncate">{tribute.authorRelation}</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TributeCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="h-8 w-8 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />
        <div className="flex items-center gap-3 pt-4 border-t">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}