"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Quote as QuoteIcon, Calendar, Tag, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout";
import Pagination from "@/components/admin/Pagination";
import { quoteService } from "@/services/quoteService";
import { useLanguage } from "@/hooks/useLanguage";
import { Quote } from "@/types";
import { formatDate, formatDateEn, cn } from "@/lib/utils";
import { toast } from "sonner";

export default function QuotesPage() {
  const { t, language, isBangla } = useLanguage();
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["quotes", page],
    queryFn: () => quoteService.getAll(page, 12),
  });

  const quotes = data?.content || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <PageHeader
        titleBn="উক্তি সংকলন"
        titleEn="Quotes Collection"
        descriptionBn="শহীদ ওসমান হাদির স্মরণীয় উক্তি ও বাণী"
        descriptionEn="Memorable quotes and sayings of Shaheed Osman Hadi"
        breadcrumbs={[{ labelBn: "উক্তি", labelEn: "Quotes" }]}
      />

      <section className="py-8 md:py-12">
        <div className="container-memorial">
          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            {t(
              `মোট ${data?.totalElements || 0} টি উক্তি`,
              `Total ${data?.totalElements || 0} quotes`
            )}
          </p>

          {/* Quotes Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <QuoteCardSkeleton key={i} />
              ))}
            </div>
          ) : quotes.length === 0 ? (
            <div className="text-center py-12">
              <QuoteIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {t("কোনো উক্তি পাওয়া যায়নি", "No quotes found")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((quote, index) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  language={language}
                  colorIndex={index}
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
        </div>
      </section>
    </>
  );
}

const bgColors = [
  "bg-gradient-to-br from-memorial-green/10 to-memorial-green/5",
  "bg-gradient-to-br from-blue-50 to-blue-100/50",
  "bg-gradient-to-br from-purple-50 to-purple-100/50",
  "bg-gradient-to-br from-orange-50 to-orange-100/50",
  "bg-gradient-to-br from-teal-50 to-teal-100/50",
  "bg-gradient-to-br from-pink-50 to-pink-100/50",
];

function QuoteCard({
  quote,
  language,
  colorIndex,
}: {
  quote: Quote;
  language: string;
  colorIndex: number;
}) {
  const isBangla = language === "bn";
  const quoteText = isBangla ? quote.quoteBn : quote.quoteEn || quote.quoteBn;
  const context = isBangla
    ? quote.contextBn
    : quote.contextEn || quote.contextBn;
  const [copied, setCopied] = useState(false);

  const bgColor = bgColors[colorIndex % bgColors.length];

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quoteText);
      setCopied(true);
      toast.success(isBangla ? "কপি হয়েছে" : "Copied");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error(isBangla ? "কপি করা যায়নি" : "Failed to copy");
    }
  };

  return (
    <Card className={cn("h-full border-0 shadow-sm card-hover", bgColor)}>
      <CardContent className="p-6 flex flex-col h-full">
        {/* Quote Icon */}
        <QuoteIcon className="h-10 w-10 text-memorial-green/30 mb-4" />

        {/* Quote Text */}
        <blockquote className="text-lg md:text-xl font-medium text-gray-800 flex-1 mb-4 leading-relaxed">
          "{quoteText}"
        </blockquote>

        {/* Context */}
        {context && (
          <p className="text-sm text-muted-foreground mb-4 italic">
            — {context}
          </p>
        )}

        {/* Featured Badge */}
        {quote.featured && (
          <Badge className="bg-memorial-gold w-fit mb-4">Featured</Badge>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
          {/* Date & Source */}
          <div className="text-sm text-muted-foreground">
            {quote.date && (
              <span>
                {isBangla ? formatDate(quote.date) : formatDateEn(quote.date)}
              </span>
            )}
          </div>

          {/* Copy Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={copyQuote}
            className="h-8 px-2"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Tags */}
        {quote.tags && quote.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {quote.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function QuoteCardSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <Skeleton className="h-10 w-10 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}