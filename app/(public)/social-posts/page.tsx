"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/admin/Pagination";
import { useLanguage } from "@/hooks/useLanguage";
import { socialPostPublicService } from "@/services/publicSocialPostService";
import { formatDateEn } from "@/lib/utils";

export default function PublicSocialPostsPage() {
  const { t, language } = useLanguage();
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["publicSocialPosts", page],
    queryFn: () => socialPostPublicService.getAll(page, 12),
  });

  return (
    <>
      <PageHeader
        titleBn="সোশ্যাল পোস্ট"
        titleEn="Social Posts"
        descriptionBn="সামাজিক মাধ্যমে প্রকাশিত পোস্টসমূহ"
        descriptionEn="Posts published on social platforms"
        breadcrumbs={[{ labelBn: "সোশ্যাল পোস্ট", labelEn: "Social Posts" }]}
      />

      <section className="py-10">
        <div className="container-memorial">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data?.content || []).map((p) => (
              <Card key={p.id} className="card-hover">
                <CardContent className="p-5">
                  <div className="text-xs text-muted-foreground">
                    {p.platform} • {p.postDate ? formatDateEn(p.postDate) : ""}
                  </div>
                  <div className="mt-2 text-sm whitespace-pre-line line-clamp-6">
                    {language === "bn" ? p.contentBn : p.contentEn || p.contentBn}
                  </div>

                  {p.originalUrl && (
                    <div className="mt-4">
                      <Button asChild variant="outline" size="sm">
                        <a href={p.originalUrl} target="_blank" rel="noopener noreferrer">
                          {t("মূল পোস্ট", "Original Post")}
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {data && data.totalPages > 1 && (
            <div className="mt-10">
              <Pagination currentPage={page + 1} totalPages={data.totalPages} onPageChange={(p) => setPage(p - 1)} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}