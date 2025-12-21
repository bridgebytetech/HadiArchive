"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/useLanguage";
import { writingPublicService } from "@/services/publicWritingService";
import { formatDateEn, formatDate } from "@/lib/utils";

export default function SingleWritingPage() {
  const params = useParams();
  const id = params.id as string;
  const { language, isBangla } = useLanguage();

  const { data: writing, isLoading } = useQuery({
    queryKey: ["publicWriting", id],
    queryFn: () => writingPublicService.getById(id),
  });

  const title = language === "bn" ? writing?.titleBn : writing?.titleEn || writing?.titleBn;
  const content = language === "bn" ? writing?.contentBn : writing?.contentEn || writing?.contentBn;

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!writing) {
    return <div className="p-10 text-center">Writing not found.</div>;
  }

  return (
    <>
      <PageHeader
        titleBn={writing.titleBn}
        titleEn={writing.titleEn || writing.titleBn}
        breadcrumbs={[
          { href: "/writings", labelBn: "লেখালেখি", labelEn: "Writings" },
          { labelBn: "বিস্তারিত", labelEn: "Details" },
        ]}
      />

      <section className="py-10">
        <div className="container-memorial max-w-3xl">
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">
                  {writing.writingType || "Article"}
                </span>
                {writing.date && (
                  <span className="text-sm text-muted-foreground">
                    {isBangla ? formatDate(writing.date) : formatDateEn(writing.date)}
                  </span>
                )}
              </div>

              <Separator className="mb-6" />

              <article className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line leading-relaxed">
                  {content}
                </div>
              </article>

              {writing.publishedIn && (
                <p className="text-sm text-muted-foreground mt-8 border-t pt-4">
                  <strong>Published in:</strong> {writing.publishedIn}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
