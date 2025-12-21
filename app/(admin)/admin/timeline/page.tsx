"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { timelineService } from "@/services/timelineService";
import { TimelineEvent } from "@/types";
import { toast } from "sonner";
import { formatDateEn } from "@/lib/utils";

export default function AdminTimelinePage() {
  const qc = useQueryClient();
  const [items, setItems] = useState<TimelineEvent[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["adminTimeline"],
    queryFn: () => timelineService.adminGetAll(),
  });

  useEffect(() => {
    if (data) {
      const sorted = [...data].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
      setItems(sorted);
    }
  }, [data]);

  const reorderMutation = useMutation({
    mutationFn: (ids: string[]) => timelineService.reorder(ids),
    onSuccess: () => {
      toast.success("Order saved");
      qc.invalidateQueries({ queryKey: ["adminTimeline"] });
    },
    onError: (e: any) => toast.error(e.message || "Reorder failed"),
  });

  const togglePublishMutation = useMutation({
    mutationFn: (id: string) => timelineService.togglePublish(id),
    onSuccess: () => {
      toast.success("Publish updated");
      qc.invalidateQueries({ queryKey: ["adminTimeline"] });
    },
    onError: (e: any) => toast.error(e.message || "Publish failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => timelineService.delete(id),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["adminTimeline"] });
      setDeleteId(null);
    },
    onError: (e: any) => toast.error(e.message || "Delete failed"),
  });

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  };

  const saveOrder = () => reorderMutation.mutate(items.map((x) => x.id));

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Timeline"
        description="Update & reorder timeline events"
        actionLabel="Add Timeline"
        actionHref="/admin/timeline/new"
        actionIcon={<Plus className="h-4 w-4" />}
      >
        <Button variant="outline" onClick={saveOrder} disabled={reorderMutation.isPending || items.length === 0}>
          <Save className="h-4 w-4 mr-2" />
          {reorderMutation.isPending ? "Saving..." : "Save Order"}
        </Button>
      </AdminPageHeader>

      {isLoading ? (
        <div className="p-6">Loading...</div>
      ) : (
        <div className="space-y-3">
          {items.map((it, idx) => (
            <Card key={it.id} className="bg-white">
              <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-1">
                    <Button variant="outline" size="icon" onClick={() => move(idx, -1)} disabled={idx === 0}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => move(idx, 1)}
                      disabled={idx === items.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="min-w-0">
                    <div className="font-semibold truncate max-w-[520px]">{it.titleBn || it.titleEn}</div>
                    <div className="text-xs text-muted-foreground">
                      {it.eventType || "—"} • {it.date ? formatDateEn(it.date) : "—"} {it.location ? `• ${it.location}` : ""}
                    </div>
                    <div className="mt-1">
                      <StatusBadge status={!!it.published} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/timeline/${it.id}/edit`}>Edit</Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => togglePublishMutation.mutate(it.id)}>
                    {it.published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => setDeleteId(it.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {items.length === 0 && <div className="text-muted-foreground">No timeline items</div>}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Timeline"
        description="Are you sure?"
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
      />
    </AdminLayout>
  );
}