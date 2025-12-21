"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "@/services/eventService";
import { SpecialEvent } from "@/types";
import { formatDate, formatDateEn } from "@/lib/utils";

export default function FeaturedEvents() {
  const { t, language, isBangla } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["featuredEvents"],
    queryFn: () => eventService.getAll(0, 3),
  });

  const events = data?.content || [];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container-memorial">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-memorial-green">
              {t("গুরুত্বপূর্ণ ইভেন্ট", "Important Events")}
            </h2>
            <p className="text-muted-foreground mt-1">
              {t(
                "জানাযা, স্মরণসভা ও অন্যান্য অনুষ্ঠান",
                "Janaza, Memorial & Other Events"
              )}
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/events">
              {t("সব দেখুন", "View All")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} language={language} />
            ))}
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline">
            <Link href="/events">
              {t("সব ইভেন্ট দেখুন", "View All Events")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function EventCard({
  event,
  language,
}: {
  event: SpecialEvent;
  language: string;
}) {
  const title = language === "bn" ? event.titleBn : event.titleEn || event.titleBn;
  const description =
    language === "bn"
      ? event.descriptionBn
      : event.descriptionEn || event.descriptionBn;
  const coverPhoto = event.photos?.[0]?.url;

  const eventTypeLabels: Record<string, { bn: string; en: string }> = {
    JANAZA: { bn: "জানাযা", en: "Janaza" },
    BURIAL: { bn: "দাফন", en: "Burial" },
    MEMORIAL: { bn: "স্মরণসভা", en: "Memorial" },
    ANNIVERSARY: { bn: "বার্ষিকী", en: "Anniversary" },
  };

  const typeLabel = eventTypeLabels[event.eventType || ""] || {
    bn: event.eventType,
    en: event.eventType,
  };

  return (
    <Link href={`/events/${event.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48">
          {coverPhoto ? (
            <Image
              src={coverPhoto}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-memorial-green/10 flex items-center justify-center">
              <Calendar className="h-12 w-12 text-memorial-green/30" />
            </div>
          )}
          {/* Event Type Badge */}
          <Badge className="absolute top-3 left-3 bg-memorial-green">
            {language === "bn" ? typeLabel.bn : typeLabel.en}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-memorial-green transition-colors">
            {title}
          </h3>

          {description && (
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
              {description}
            </p>
          )}

          {/* Meta */}
          <div className="mt-auto space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {language === "bn"
                  ? formatDate(event.date)
                  : formatDateEn(event.date)}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <Skeleton className="h-48" />
      <div className="p-5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}