"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin, ExternalLink, Navigation } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/layout";
import { locationService } from "@/services/locationService";
import { useLanguage } from "@/hooks/useLanguage";
import { Location } from "@/types";

export default function LocationsPage() {
  const { t, language, isBangla } = useLanguage();

  const { data: locations, isLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: () => locationService.getAll(),
  });

  return (
    <>
      <PageHeader
        titleBn="গুরুত্বপূর্ণ স্থান"
        titleEn="Important Locations"
        descriptionBn="শহীদ ওসমান হাদির জীবনের সাথে সম্পর্কিত গুরুত্বপূর্ণ স্থানসমূহ"
        descriptionEn="Important places related to Shaheed Osman Hadi's life"
        breadcrumbs={[{ labelBn: "স্থান", labelEn: "Locations" }]}
      />

      <section className="py-8 md:py-12">
        <div className="container-memorial">
          {/* Locations Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <LocationCardSkeleton key={i} />
              ))}
            </div>
          ) : !locations || locations.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {t("কোনো স্থান পাওয়া যায়নি", "No locations found")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  language={language}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function LocationCard({
  location,
  language,
}: {
  location: Location;
  language: string;
}) {
  const isBangla = language === "bn";
  const name = isBangla ? location.nameBn : location.nameEn || location.nameBn;
  const description = isBangla
    ? location.descriptionBn
    : location.descriptionEn || location.descriptionBn;
  const coverImage = location.imageUrls?.[0];

  const getGoogleMapsUrl = () => {
    if (location.googleMapsUrl) return location.googleMapsUrl;
    if (location.coordinates) {
      return `https://www.google.com/maps?q=${location.coordinates.latitude},${location.coordinates.longitude}`;
    }
    return null;
  };

  const mapsUrl = getGoogleMapsUrl();

  const locationTypeLabels: Record<string, { bn: string; en: string }> = {
    BIRTHPLACE: { bn: "জন্মস্থান", en: "Birthplace" },
    EDUCATION: { bn: "শিক্ষা প্রতিষ্ঠান", en: "Educational Institution" },
    WORKPLACE: { bn: "কর্মস্থল", en: "Workplace" },
    POLITICAL: { bn: "রাজনৈতিক", en: "Political" },
    BURIAL: { bn: "সমাধিস্থল", en: "Burial Site" },
    MARTYRDOM: { bn: "শাহাদাতস্থল", en: "Martyrdom Site" },
    OTHER: { bn: "অন্যান্য", en: "Other" },
  };

  const typeLabel = locationTypeLabels[location.locationType || "OTHER"] ||
    locationTypeLabels.OTHER;

  return (
    <Card className="h-full card-hover overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-48">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-memorial-green/20 to-memorial-green/5 flex items-center justify-center">
            <MapPin className="h-16 w-16 text-memorial-green/30" />
          </div>
        )}
        {/* Location Type Badge */}
        <Badge className="absolute top-3 left-3 bg-memorial-green">
          {isBangla ? typeLabel.bn : typeLabel.en}
        </Badge>
      </div>

      <CardContent className="p-5">
        {/* Name */}
        <h3 className="text-lg font-semibold mb-2">{name}</h3>

        {/* Address */}
        {location.address && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{location.address}</span>
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {description}
          </p>
        )}

        {/* Actions */}
        {mapsUrl && (
          <Button asChild variant="outline" size="sm" className="w-full">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <Navigation className="h-4 w-4 mr-2" />
              {isBangla ? "মানচিত্রে দেখুন" : "View on Map"}
              <ExternalLink className="h-3 w-3 ml-2" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function LocationCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48" />
      <CardContent className="p-5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
}