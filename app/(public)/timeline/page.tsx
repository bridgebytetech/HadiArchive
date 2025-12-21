"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  MapPin,
  ChevronDown,
  Filter,
  Circle,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout";
import { timelineService } from "@/services/timelineService";
import { useLanguage } from "@/hooks/useLanguage";
import { TimelineEvent } from "@/types";
import { TIMELINE_EVENT_TYPES } from "@/lib/constants";
import { formatDate, formatDateEn, toBanglaNumber, cn } from "@/lib/utils";

export default function TimelinePage() {
  const { t, language, isBangla } = useLanguage();
  const [filterType, setFilterType] = useState<string>("all");

  const { data: events, isLoading } = useQuery({
    queryKey: ["timeline"],
    queryFn: () => timelineService.getAll(),
  });

  const filteredEvents = filterType === "all"
    ? events || []
    : (events || []).filter((e) => e.eventType === filterType);

  // Group events by year
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {} as Record<string, TimelineEvent[]>);

  const years = Object.keys(groupedEvents).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <>
      <PageHeader
        titleBn="জীবনের টাইমলাইন"
        titleEn="Life Timeline"
        descriptionBn="শহীদ ওসমান হাদির জীবনের গুরুত্বপূর্ণ মুহূর্তগুলো"
        descriptionEn="Important moments from Shaheed Osman Hadi's life"
        breadcrumbs={[{ labelBn: "টাইমলাইন", labelEn: "Timeline" }]}
      />

      <section className="py-8 md:py-12">
        <div className="container-memorial">
          {/* Filter */}
          <div className="flex justify-center mb-10">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-64">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("ফিল্টার করুন", "Filter")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("সব ইভেন্ট", "All Events")}
                </SelectItem>
                {TIMELINE_EVENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {language === "bn" ? type.labelBn : type.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timeline */}
          {isLoading ? (
            <TimelineSkeleton />
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {t("কোনো ইভেন্ট পাওয়া যায়নি", "No events found")}
              </p>
            </div>
          ) : (
            <div className="relative max-w-4xl mx-auto">
              {/* Center Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-memorial-green/20 -translate-x-1/2 hidden md:block" />

              {years.map((year) => (
                <div key={year} className="mb-12">
                  {/* Year Badge */}
                  <div className="flex justify-center mb-8">
                    <Badge
                      variant="outline"
                      className="text-lg px-6 py-2 border-memorial-green text-memorial-green bg-white"
                    >
                      {isBangla ? toBanglaNumber(year) : year}
                    </Badge>
                  </div>

                  {/* Events */}
                  <div className="space-y-8">
                    {groupedEvents[year].map((event, index) => (
                      <TimelineItem
                        key={event.id}
                        event={event}
                        isLeft={index % 2 === 0}
                        language={language}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function TimelineItem({
  event,
  isLeft,
  language,
}: {
  event: TimelineEvent;
  isLeft: boolean;
  language: string;
}) {
  const isBangla = language === "bn";
  const title = isBangla ? event.titleBn : event.titleEn || event.titleBn;
  const description = isBangla
    ? event.descriptionBn
    : event.descriptionEn || event.descriptionBn;

  const eventTypeColors: Record<string, string> = {
    BIRTH: "bg-green-500",
    EDUCATION: "bg-blue-500",
    CAREER: "bg-purple-500",
    POLITICAL: "bg-orange-500",
    MOVEMENT: "bg-yellow-500",
    ACHIEVEMENT: "bg-teal-500",
    MARTYRDOM: "bg-red-500",
    OTHER: "bg-gray-500",
  };

  const dotColor = eventTypeColors[event.eventType || "OTHER"] || "bg-memorial-green";

  return (
    <div
      className={cn(
        "relative flex items-start gap-6",
        "md:w-1/2",
        isLeft ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8 md:text-right"
      )}
    >
      {/* Connector Dot - Desktop */}
      <div
        className={cn(
          "hidden md:block absolute top-6 w-4 h-4 rounded-full border-4 border-white shadow-md z-10",
          dotColor,
          isLeft ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
        )}
      />

      {/* Content Card */}
      <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border card-hover">
        {/* Mobile Dot */}
        <div className="flex items-center gap-3 mb-3 md:hidden">
          <div className={cn("w-3 h-3 rounded-full", dotColor)} />
          <span className="text-sm text-muted-foreground">
            {isBangla ? formatDate(event.date) : formatDateEn(event.date)}
          </span>
        </div>

        {/* Event Type Badge */}
        {event.eventType && (
          <Badge variant="secondary" className="mb-3">
            {TIMELINE_EVENT_TYPES.find((t) => t.value === event.eventType)?.[
              isBangla ? "labelBn" : "labelEn"
            ] || event.eventType}
          </Badge>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        {/* Date - Desktop */}
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4" />
          <span>
            {isBangla ? formatDate(event.date) : formatDateEn(event.date)}
          </span>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-600 mb-4">{description}</p>
        )}

        {/* Location */}
        {event.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        )}

        {/* Images */}
        {event.imageUrls && event.imageUrls.length > 0 && (
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {event.imageUrls.slice(0, 3).map((url, i) => (
              <div
                key={i}
                className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
              >
                <Image
                  src={url}
                  alt={`${title} - ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-6">
          <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}