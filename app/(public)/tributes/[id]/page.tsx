"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  User,
  Calendar,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/layout";
import { tributePublicService } from "@/services/publicTributeService";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDateEn, formatDate } from "@/lib/utils";
import { TRIBUTE_TYPES } from "@/lib/constants";

export default function SingleTributePage() {
  const params = useParams();
  const id = params.id as string;
  const { t, language, isBangla } = useLanguage();

  const { data: tribute, isLoading } = useQuery({
    queryKey: ["publicTribute", id],
    queryFn: () => tributePublicService.getById(id),
  });

  const content = language === "bn" ? tribute?.contentBn : tribute?.contentEn || tribute?.contentBn;
  const tributeTypeLabel = TRIBUTE_TYPES.find(
    (t) => t.value === tribute?.tributeType
  );

  if (isLoading) {
    return <SingleTributeSkeleton />;
  }

  if (!tribute) {
    return <div className="p-10 text-center">Tribute not found.</div>;
  }

  return (
    <>
      <PageHeader
        titleBn="শ্রদ্ধাঞ্জলি বিস্তারিত"
        titleEn="Tribute Details"
        descriptionBn={`${tribute.authorName} এর পক্ষ থেকে`}
        descriptionEn={`From ${tribute.authorName}`}
        breadcrumbs={[
          { href: "/tributes", labelBn: "শ্রদ্ধাঞ্জলি", labelEn: "Tributes" },
          { labelBn: "বিস্তারিত", labelEn: "Details" },
        ]}
      />

      <section className="py-10">
        <div className="container-memorial max-w-4xl">
          <Card>
            <CardContent className="p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={tribute.authorPhoto} />
                    <AvatarFallback className="bg-memorial-green/10 text-memorial-green text-2xl">
                      {tribute.authorName?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{tribute.authorName}</h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                      {tribute.authorLocation && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {tribute.authorLocation}
                        </div>
                      )}
                      {tribute.authorRelation && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {tribute.authorRelation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {tribute.featured && (
                    <Badge className="bg-memorial-gold">Featured</Badge>
                  )}
                  {tributeTypeLabel && (
                    <Badge variant="secondary">
                      {isBangla ? tributeTypeLabel.labelBn : tributeTypeLabel.labelEn}
                    </Badge>
                  )}
                </div>
              </div>

              <Separator />

              {/* Main Content */}
              <article className="prose prose-lg max-w-none mt-6">
                <div className="whitespace-pre-line leading-relaxed text-gray-700">
                  {content}
                </div>
              </article>

              {/* Footer */}
              {tribute.submittedAt && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-8 border-t pt-4">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {t("জমা দেওয়া হয়েছে:", "Submitted:")}{" "}
                    {isBangla
                      ? formatDate(tribute.submittedAt)
                      : formatDateEn(tribute.submittedAt)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/tributes">
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t("সব শ্রদ্ধাঞ্জলি দেখুন", "View all tributes")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function SingleTributeSkeleton() {
  return (
    <div className="container-memorial max-w-4xl py-10">
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Separator />
          <div className="mt-6 space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
