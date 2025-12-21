"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  MapPin,
  Users,
  Filter,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout";
import Pagination from "@/components/admin/Pagination";
import { eventService } from "@/services/eventService";
import { useLanguage } from "@/hooks/useLanguage";
import { SpecialEvent } from "@/types";
import { EVENT_TYPES } from "@/lib/constants";
import { formatDate, formatDateEn, truncate } from "@/lib/utils";

export default function EventsPage() {
  const { t, language, isBangla } = useLanguage();
  const [page, setPage] = useState(0);
  const [eventType, setEventType] = useState<string>("all");

  const { data, isLoading } = useQuery({
    queryKey: ["events", page, eventType],
    queryFn: () => eventService.getAll(page, 9),
  });

  const events = data?.content || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <PageHeader
        titleBn="বিশেষ ইভেন্ট"
        titleEn="Special Events"
        descriptionBn="জানাযা, স্মরণসভা ও অন্যান্য গুরুত্বপূর্ণ অনুষ্ঠান"
        descriptionEn="Janaza, memorials and other important events"
        breadcrumbs={[{ labelBn: "ইভেন্ট", labelEn: "Events" }]}
      />

      <section className="py-8 md:py-12">
        <div className="container-memorial">
          {/* Filter */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              {t(
                `মোট ${data?.totalElements || 0} টি ইভেন্ট`,
                `Total ${data?.totalElements || 0} events`
              )}
            </p>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("ধরন", "Type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("সব ধরন", "All Types")}
                </SelectItem>
                {EVENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {language === "bn" ? type.labelBn : type.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Events Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {t("কোনো ইভেন্ট পাওয়া যায়নি", "No events found")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} language={language} />
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

function EventCard({
  event,
  language,
}: {
  event: SpecialEvent;
  language: string;
}) {
  const isBangla = language === "bn";
  const title = isBangla ? event.titleBn : event.titleEn || event.titleBn;
  const description = isBangla
    ? event.descriptionBn
    : event.descriptionEn || event.descriptionBn;
  const coverPhoto = event.photos?.[0]?.url;

  const eventTypeLabels: Record<string, { bn: string; en: string; color: string }> = {
    JANAZA: { bn: "জানাযা", en: "Janaza", color: "bg-purple-500" },
    BURIAL: { bn: "দাফন", en: "Burial", color: "bg-gray-500" },
    MEMORIAL: { bn: "স্মরণসভা", en: "Memorial", color: "bg-blue-500" },
    ANNIVERSARY: { bn: "বার্ষিকী", en: "Anniversary", color: "bg-orange-500" },
    PROTEST: { bn: "প্রতিবাদ", en: "Protest", color: "bg-red-500" },
    OTHER: { bn: "অন্যান্য", en: "Other", color: "bg-gray-400" },
  };

  const typeInfo = eventTypeLabels[event.eventType || "OTHER"] || eventTypeLabels.OTHER;

  return (
    <Link href={`/events/${event.id}`}>
      <Card className="h-full card-hover overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48">
          {coverPhoto ? (
            <Image
              src={coverPhoto}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-memorial-green/20 to-memorial-green/5 flex items-center justify-center">
              <Calendar className="h-16 w-16 text-memorial-green/30" />
            </div>
          )}
          {/* Event Type Badge */}
          <Badge className={`absolute top-3 left-3 ${typeInfo.color}`}>
            {isBangla ? typeInfo.bn : typeInfo.en}
          </Badge>
          {/* Featured Badge */}
          {event.featured && (
            <Badge className="absolute top-3 right-3 bg-memorial-gold">
              Featured
            </Badge>
          )}
        </div>

        <CardContent className="p-5">
          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-memorial-green transition-colors">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
              {truncate(description, 100)}
            </p>
          )}

          {/* Meta */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-memorial-green" />
              <span>
                {isBangla ? formatDate(event.date) : formatDateEn(event.date)}
              </span>
              {event.time && (
                <>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{event.time}</span>
                </>
              )}
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-memorial-green" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
            {event.attendees && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-memorial-green" />
                <span>{event.attendees}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48" />
      <CardContent className="p-5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}