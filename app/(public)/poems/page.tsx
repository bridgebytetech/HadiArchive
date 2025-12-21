"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/layout";
import { poemPublicService } from "@/services/publicPoemService";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "@/components/admin/Pagination";
import { formatDateEn, truncate } from "@/lib/utils";

export default function PublicPoemsPage() {
  const [page, setPage] = useState(0);

  const { data } = useQuery({
    queryKey: ["publicPoems", page],
    queryFn: () => poemPublicService.getAll(page),
  });

  return (
    <>
      <PageHeader titleEn="Poems" titleBn="কবিতা" />
      <section className="py-10">
        <div className="container-memorial grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data?.content || []).map((poem) => (
            <Link key={poem.id} href={`/poems/${poem.id}`}>
              <Card className="card-hover h-full">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg">{poem.titleBn || poem.titleEn}</h3>
                  <p className="text-xs text-muted-foreground">{poem.date ? formatDateEn(poem.date) : ""}</p>
                  <p className="text-sm mt-2 line-clamp-3">{truncate(poem.contentBn || poem.contentEn || "", 150)}</p>
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
