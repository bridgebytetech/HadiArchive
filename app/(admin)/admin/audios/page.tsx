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
import { audioService } from "@/services/audioService";
import { Audio } from "@/types";
import { toast } from "sonner";
import { formatDateEn } from "@/lib/utils";

export default function AdminAudiosPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["adminAudios", page],
    queryFn: () => audioService.adminGetAll(page, 20),
  });

  const togglePublish = useMutation({
    mutationFn: (id: string) => audioService.togglePublish(id),
    onSuccess: () => {
      toast.success("Publish updated");
      qc.invalidateQueries({ queryKey: ["adminAudios"] });
    },
    onError: (e: any) => toast.error(e.message || "Publish failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => audioService.delete(id),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["adminAudios"] });
      setDeleteId(null);
    },
    onError: (e: any) => toast.error(e.message || "Delete failed"),
  });

  const columns: Column<Audio>[] = useMemo(
    () => [
      {
        key: "title",
        header: "Audio",
        cell: (item) => (
          <div className="min-w-0">
            <div className="font-medium truncate max-w-[420px]">{item.titleBn || item.titleEn}</div>
            <div className="text-xs text-muted-foreground">
              {item.audioType || "—"} • {item.date ? formatDateEn(item.date) : "—"}
            </div>
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
              <Link href={`/admin/audios/${item.id}/edit`}>Edit</Link>
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
        title="Audios"
        description="Manage audios"
        actionLabel="Add Audio"
        actionHref="/admin/audios/new"
        actionIcon={<Plus className="h-4 w-4" />}
      />

      <DataTable columns={columns} data={data?.content || []} isLoading={isLoading} emptyMessage="No audios found" />

      {data && data.totalPages > 1 && (
        <div className="mt-6">
          <Pagination currentPage={page + 1} totalPages={data.totalPages} onPageChange={(p) => setPage(p - 1)} />
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Audio"
        description="Are you sure?"
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
      />
    </AdminLayout>
  );
}