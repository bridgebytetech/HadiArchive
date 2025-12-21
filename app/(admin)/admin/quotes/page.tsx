"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

import { Button } from "@/components/ui/button";
import { quoteService } from "@/services/quoteService";
import { Quote } from "@/types";
import { toast } from "sonner";

export default function AdminQuotesPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["adminQuotes", page],
    queryFn: () => quoteService.adminGetAll(page, 20),
  });

  const togglePublish = useMutation({
    mutationFn: (id: string) => quoteService.togglePublish(id),
    onSuccess: () => {
      toast.success("Publish updated");
      qc.invalidateQueries({ queryKey: ["adminQuotes"] });
    },
    onError: (e: any) => toast.error(e.message || "Publish failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => quoteService.delete(id),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["adminQuotes"] });
      setDeleteId(null);
    },
    onError: (e: any) => toast.error(e.message || "Delete failed"),
  });

  const columns: Column<Quote>[] = useMemo(
    () => [
      {
        key: "quote",
        header: "Quote",
        cell: (item) => (
          <div className="max-w-[520px]">
            <div className="text-sm line-clamp-2">{item.quoteBn || item.quoteEn}</div>
            {(item.contextBn || item.contextEn) && (
              <div className="text-xs text-muted-foreground line-clamp-1">
                — {item.contextBn || item.contextEn}
              </div>
            )}
          </div>
        ),
      },
      { key: "status", header: "Status", cell: (item) => <StatusBadge status={!!item.published} /> },
      {
        key: "actions",
        header: "Actions",
        className: "text-right",
        cell: (item) => (
          <div className="flex justify-end gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/quotes/${item.id}/edit`}>Edit</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => togglePublish.mutate(item.id)}>
              {item.published ? "Unpublish" : "Publish"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => setDeleteId(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [togglePublish]
  );

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Quotes"
        description="Manage quotes"
        actionLabel="Add Quote"
        actionHref="/admin/quotes/new"
        actionIcon={<Plus className="h-4 w-4" />}
      />

      <DataTable columns={columns} data={data?.content || []} isLoading={isLoading} emptyMessage="No quotes found" />

      {data && data.totalPages > 1 && (
        <div className="mt-6">
          <Pagination currentPage={page + 1} totalPages={data.totalPages} onPageChange={(p) => setPage(p - 1)} />
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Quote"
        description="Are you sure?"
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
      />
    </AdminLayout>
  );
}