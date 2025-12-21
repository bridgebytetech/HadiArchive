"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/useLanguage";
import { poemPublicService } from "@/services/publicPoemService";
import { formatDateEn, formatDate } from "@/lib/utils";

export default function SinglePoemPage() {
  const params = useParams();
  const id = params.id as string;
  const { language, isBangla } = useLanguage();

  const { data: poem, isLoading } = useQuery({
    queryKey: ["publicPoem", id],
    queryFn: () => poemPublicService.getById(id),
  });

  const title = language === "bn" ? poem?.titleBn : poem?.titleEn || poem?.titleBn;
  const content = language === "bn" ? poem?.contentBn : poem?.contentEn || poem?.contentBn;

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!poem) {
    return <div className="p-10 text-center">Poem not found.</div>;
  }

  return (
    <>
      <PageHeader
        titleBn={poem.titleBn}
        titleEn={poem.titleEn || poem.titleBn}
        breadcrumbs={[
          { href: "/poems", labelBn: "কবিতা", labelEn: "Poems" },
          { labelBn: "বিস্তারিত", labelEn: "Details" },
        ]}
      />

      <section className="py-10">
        <div className="container-memorial max-w-3xl">
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-4">
                {poem.dedicatedTo && (
                  <span className="text-sm text-muted-foreground">
                    <strong>Dedicated to:</strong> {poem.dedicatedTo}
                  </span>
                )}
                {poem.date && (
                  <span className="text-sm text-muted-foreground">
                    {isBangla ? formatDate(poem.date) : formatDateEn(poem.date)}
                  </span>
                )}
              </div>

              <Separator className="mb-6" />

              <article className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line leading-relaxed">
                  {content}
                </div>
              </article>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
