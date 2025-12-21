"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/layout";
import { writingPublicService } from "@/services/publicWritingService";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "@/components/admin/Pagination";
import { formatDateEn, truncate } from "@/lib/utils";

export default function PublicWritingsPage() {
  const [page, setPage] = useState(0);

  const { data } = useQuery({
    queryKey: ["publicWritings", page],
    queryFn: () => writingPublicService.getAll(page),
  });

  return (
    <>
      <PageHeader titleEn="Writings" titleBn="লেখালেখি" />
      <section className="py-10">
        <div className="container-memorial grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data?.content || []).map((writing) => (
            <Link key={writing.id} href={`/writings/${writing.id}`}>
              <Card className="card-hover h-full">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg">{writing.titleBn || writing.titleEn}</h3>
                  <p className="text-xs text-muted-foreground">{writing.date ? formatDateEn(writing.date) : ""}</p>
                  <p className="text-sm mt-2 line-clamp-3">{truncate(writing.contentBn || writing.contentEn || "", 150)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {data && data.totalPages > 1 && (
          <div className="mt-10">
            <Pagination currentPage={page + 1} totalPages={data.totalPages} onPageChange={setPage} />
          </div>
        )}
      </section>
    </>
  );
}
