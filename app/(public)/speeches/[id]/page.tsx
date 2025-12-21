"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ChevronLeft,
  Video,
  Headphones,
  Share2,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { speechService } from "@/services/speechService";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDate, formatDateEn } from "@/lib/utils";
import ShareButtons from "@/components/shared/ShareButtons";

export default function SpeechDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { t, language, isBangla } = useLanguage();

  const { data: speech, isLoading } = useQuery({
    queryKey: ["speech", id],
    queryFn: () => speechService.getById(id),
  });

  if (isLoading) {
    return <SpeechDetailSkeleton />;
  }

  if (!speech) {
    return (
      <div className="container-memorial py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {t("বক্তৃতা পাওয়া যায়নি", "Speech not found")}
        </h1>
        <Button asChild>
          <Link href="/speeches">
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t("বক্তৃতা তালিকায় ফিরে যান", "Back to Speeches")}
          </Link>
        </Button>
      </div>
    );
  }

  const title = isBangla ? speech.titleBn : speech.titleEn || speech.titleBn;
  const content = isBangla
    ? speech.contentBn
    : speech.contentEn || speech.contentBn;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-memorial py-4">
          <Link
            href="/speeches"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t("বক্তৃতা তালিকা", "Speeches List")}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container-memorial py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {speech.featured && (
              <Badge className="bg-memorial-gold">Featured</Badge>
            )}
            {speech.occasion && (
              <Badge variant="secondary">{speech.occasion}</Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-memorial-green mb-6">
            {title}
          </h1>

          {/* Info */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            {speech.date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {isBangla ? formatDate(speech.date) : formatDateEn(speech.date)}
                </span>
              </div>
            )}
            {speech.venue && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{speech.venue}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {speech.videoId && (
              <Button asChild variant="outline">
                <Link href={`/videos/${speech.videoId}`}>
                  <Video className="h-4 w-4 mr-2" />
                  {t("ভিডিও দেখুন", "Watch Video")}
                </Link>
              </Button>
            )}
            {speech.audioId && (
              <Button asChild variant="outline">
                <Link href={`/audios/${speech.audioId}`}>
                  <Headphones className="h-4 w-4 mr-2" />
                  {t("অডিও শুনুন", "Listen Audio")}
                </Link>
              </Button>
            )}
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              {t("প্রিন্ট", "Print")}
            </Button>
          </div>

          <Separator className="my-8" />

          {/* Content */}
          <article className="prose prose-gray prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {content}
            </div>
          </article>

          {/* Tags */}
          {speech.tags && speech.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {t("ট্যাগ", "Tags")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {speech.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Source */}
          {speech.source && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>{t("সূত্র:", "Source:")}</strong> {speech.source}
              </p>
            </div>
          )}

          {/* Share */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">
              {t("শেয়ার করুন", "Share")}
            </h3>
            <ShareButtons
              url={typeof window !== "undefined" ? window.location.href : ""}
              title={title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpeechDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container-memorial py-4">
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
      <div className="container-memorial py-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}