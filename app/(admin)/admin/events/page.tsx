"use client";

import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Plus, Star, Trash2 } from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

import { Button } from "@/components/ui/button";
import { eventService } from "@/services/eventService";
import { SpecialEvent } from "@/types";
import { toast } from "sonner";
import { formatDateEn } from "@/lib/utils";

export default function AdminEventsPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["adminEvents", page],
    queryFn: () => eventService.adminGetAll(page, 20),
  });

  const togglePublish = useMutation({
    mutationFn: (id: string) => eventService.togglePublish(id),
    onSuccess: () => {
      toast.success("Publish updated");
      qc.invalidateQueries({ queryKey: ["adminEvents"] });
    },
    onError: (e: any) => toast.error(e.message || "Publish update failed"),
  });

  const toggleFeatured = useMutation({
    mutationFn: (id: string) => eventService.toggleFeatured(id),
    onSuccess: () => {
      toast.success("Featured updated");
      qc.invalidateQueries({ queryKey: ["adminEvents"] });
    },
    onError: (e: any) => toast.error(e.message || "Featured update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => eventService.delete(id),
    onSuccess: () => {
      toast.success("Event deleted");
      qc.invalidateQueries({ queryKey: ["adminEvents"] });
      setDeleteId(null);
    },
    onError: (e: any) => toast.error(e.message || "Delete failed"),
  });

  const columns: Column<SpecialEvent>[] = useMemo(
    () => [
      {
        key: "title",
        header: "Event",
        cell: (item) => (
          <div className="min-w-0">
            <div className="font-medium truncate max-w-[360px]">
              {item.titleBn || item.titleEn}
            </div>
            <div className="text-xs text-muted-foreground">
              {item.eventType || "—"} • {item.date ? formatDateEn(item.date) : "—"} •{" "}
              {item.location || ""}
            </div>
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        cell: (item) => (
          <div className="flex flex-col gap-1">
            <StatusBadge status={!!item.published} />
            {item.featured ? (
              <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded w-fit">
                Featured
              </span>
            ) : null}
          </div>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        className: "text-right",
        cell: (item) => (
          <div className="flex justify-end gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/events/${item.id}/edit`}>Edit</Link>
            </Button>

            <Button variant="outline" size="sm" onClick={() => togglePublish.mutate(item.id)}>
              {item.published ? "Unpublish" : "Publish"}
            </Button>

            <Button variant="outline" size="icon" onClick={() => toggleFeatured.mutate(item.id)} title="Toggle featured">
              <Star className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => setDeleteId(item.id)}
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [togglePublish, toggleFeatured]
  );

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Events"
        description="Manage special events"
        actionLabel="Add Event"
        actionHref="/admin/events/new"
        actionIcon={<Plus className="h-4 w-4" />}
      />

      <DataTable
        columns={columns}
        data={data?.content || []}
        isLoading={isLoading}
        emptyMessage="No events found"
      />

      {data && data.totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={page + 1}
            totalPages={data.totalPages}
            onPageChange={(p) => setPage(p - 1)}
          />
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Event"
        description="Are you sure you want to delete this event?"
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
      />
    </AdminLayout>
  );
}