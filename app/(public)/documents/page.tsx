"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";

import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/admin/Pagination";
import { useLanguage } from "@/hooks/useLanguage";
import { docPublicService } from "@/services/publicDocumentService";
import { formatDate, formatDateEn } from "@/lib/utils";

export default function PublicDocumentsPage() {
  const { t, language, isBangla } = useLanguage();
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["publicDocuments", page],
    queryFn: () => docPublicService.getAll(page, 12),
  });

  return (
    <>
      <PageHeader
        titleBn="ডকুমেন্টস"
        titleEn="Documents"
        descriptionBn="গুরুত্বপূর্ণ দলিলপত্র ও নথি"
        descriptionEn="Important documents and records"
        breadcrumbs={[{ labelBn: "ডকুমেন্টস", labelEn: "Documents" }]}
      />

      <section className="py-10">
        <div className="container-memorial">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data?.content || []).map((doc) => (
                <Card key={doc.id} className="card-hover">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-memorial-green/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-memorial-green" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold truncate">
                          {language === "bn" ? doc.titleBn : doc.titleEn || doc.titleBn}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {doc.documentType || ""}{" "}
                          {doc.date ? "• " + (isBangla ? formatDate(doc.date) : formatDateEn(doc.date)) : ""}
                        </p>
                      </div>
                    </div>

                    {doc.descriptionBn || doc.descriptionEn ? (
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                        {language === "bn" ? doc.descriptionBn : doc.descriptionEn || doc.descriptionBn}
                      </p>
                    ) : null}

                    <div className="mt-4 flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                          {t("ডাউনলোড/দেখুন", "Open")}
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {data && data.totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={page + 1}
                totalPages={data.totalPages}
                onPageChange={(p) => setPage(p - 1)}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}