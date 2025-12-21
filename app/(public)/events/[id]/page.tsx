"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronLeft,
  Play,
  ZoomIn,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventService } from "@/services/eventService";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDate, formatDateEn } from "@/lib/utils";
import ShareButtons from "@/components/shared/ShareButtons";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { t, language, isBangla } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: () => eventService.getById(id),
  });

  if (isLoading) {
    return <EventDetailSkeleton />;
  }

  if (!event) {
    return (
      <div className="container-memorial py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {t("ইভেন্ট পাওয়া যায়নি", "Event not found")}
        </h1>
        <Button asChild>
          <Link href="/events">
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t("ইভেন্ট তালিকায় ফিরে যান", "Back to Events")}
          </Link>
        </Button>
      </div>
    );
  }

  const title = isBangla ? event.titleBn : event.titleEn || event.titleBn;
  const description = isBangla
    ? event.descriptionBn
    : event.descriptionEn || event.descriptionBn;

  const photos = event.photos || [];
  const videos = event.videos || [];

  const lightboxSlides = photos.map((photo) => ({
    src: photo.url,
    alt: photo.caption || title,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-memorial py-4">
          <Link
            href="/events"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t("ইভেন্ট তালিকা", "Events List")}
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      {photos.length > 0 && (
        <div className="relative h-64 md:h-96 bg-memorial-dark">
          <Image
            src={photos[0].url}
            alt={title}
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container-memorial">
              <Badge className="mb-3 bg-memorial-green">
                {event.eventType}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {title}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container-memorial py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title (if no hero image) */}
            {photos.length === 0 && (
              <div className="mb-6">
                <Badge className="mb-3">{event.eventType}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-memorial-green">
                  {title}
                </h1>
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="prose prose-gray max-w-none mb-8">
                <p className="text-lg leading-relaxed">{description}</p>
              </div>
            )}

            {/* Media Tabs */}
            {(photos.length > 0 || videos.length > 0) && (
              <Tabs defaultValue="photos" className="mt-8">
                <TabsList>
                  {photos.length > 0 && (
                    <TabsTrigger value="photos">
                      {t("ছবি", "Photos")} ({photos.length})
                    </TabsTrigger>
                  )}
                  {videos.length > 0 && (
                    <TabsTrigger value="videos">
                      {t("ভিডিও", "Videos")} ({videos.length})
                    </TabsTrigger>
                  )}
                </TabsList>

                {/* Photos Tab */}
                <TabsContent value="photos" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="group relative aspect-square rounded-xl overflow-hidden"
                      >
                        <Image
                          src={photo.url}
                          alt={photo.caption || `Photo ${index + 1}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                {/* Videos Tab */}
                <TabsContent value="videos" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videos.map((video, index) => (
                      <a
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                      >
                        {video.thumbnailUrl ? (
                          <Image
                            src={video.thumbnailUrl}
                            alt={video.title || `Video ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-memorial-dark/10">
                            <Play className="h-12 w-12 text-memorial-green" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-memorial-green ml-1" fill="currentColor" />
                          </div>
                        </div>
                        {video.title && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white text-sm font-medium truncate">
                              {video.title}
                            </p>
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Event Info Card */}
            <div className="bg-white rounded-xl p-6 border shadow-sm mb-6">
              <h3 className="font-semibold text-lg mb-4">
                {t("ইভেন্ট তথ্য", "Event Details")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-memorial-green mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("তারিখ", "Date")}
                    </p>
                    <p className="font-medium">
                      {isBangla
                        ? formatDate(event.date)
                        : formatDateEn(event.date)}
                    </p>
                  </div>
                </div>
                {event.time && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-memorial-green mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("সময়", "Time")}
                      </p>
                      <p className="font-medium">{event.time}</p>
                    </div>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-memorial-green mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("স্থান", "Location")}
                      </p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>
                )}
                {event.attendees && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-memorial-green mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("অংশগ্রহণকারী", "Attendees")}
                      </p>
                      <p className="font-medium">{event.attendees}</p>
                    </div>
                  </div>
                )}
                {event.leadBy && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-memorial-green mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("পরিচালনায়", "Led By")}
                      </p>
                      <p className="font-medium">{event.leadBy}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Google Maps Link */}
              {event.coordinates && (
                <Button asChild className="w-full mt-6" variant="outline">
                  <a
                    href={`https://www.google.com/maps?q=${event.coordinates.latitude},${event.coordinates.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {t("মানচিত্রে দেখুন", "View on Map")}
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              )}
            </div>

            {/* Share */}
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="font-semibold mb-4">
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

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </div>
  );
}

function EventDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container-memorial py-4">
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
      <Skeleton className="h-64 md:h-96" />
      <div className="container-memorial py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div>
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}