"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, XCircle, Star, Trash2 } from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

import { Button } from "@/components/ui/button";
import { tributeService } from "@/services/tributeService";
import { Tribute } from "@/types";
import { toast } from "sonner";

export default function AdminTributesPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["adminTributes", page],
    queryFn: () => tributeService.adminGetAll(page, 20),
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => tributeService.approve(id),
    onSuccess: () => {
      toast.success("Tribute approved");
      queryClient.invalidateQueries({ queryKey: ["adminTributes"] });
    },
    onError: (e: any) => toast.error(e.message || "Approve failed"),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      tributeService.reject(id, reason),
    onSuccess: () => {
      toast.success("Tribute rejected");
      queryClient.invalidateQueries({ queryKey: ["adminTributes"] });
    },
    onError: (e: any) => toast.error(e.message || "Reject failed"),
  });

  const featureMutation = useMutation({
    mutationFn: (id: string) => tributeService.toggleFeatured(id),
    onSuccess: () => {
      toast.success("Featured status updated");
      queryClient.invalidateQueries({ queryKey: ["adminTributes"] });
    },
    onError: (e: any) => toast.error(e.message || "Feature update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => tributeService.delete(id),
    onSuccess: () => {
      toast.success("Tribute deleted");
      queryClient.invalidateQueries({ queryKey: ["adminTributes"] });
      setDeleteId(null);
    },
    onError: (e: any) => toast.error(e.message || "Delete failed"),
  });

  const columns: Column<Tribute>[] = [
    {
      key: "author",
      header: "Author",
      cell: (item) => (
        <div>
          <div className="font-medium">{item.authorName}</div>
          <div className="text-xs text-muted-foreground">
            {item.authorLocation || item.authorRelation || "-"}
          </div>
        </div>
      ),
    },
    {
      key: "content",
      header: "Message",
      cell: (item) => (
        <div className="max-w-[360px]">
          <div className="text-sm line-clamp-2">{item.contentBn}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => (
        <StatusBadge status={(item.status || "PENDING").toLowerCase() as any} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (item) => (
        <div className="flex justify-end gap-2">
          {item.status === "PENDING" && (
            <>
              <Button
                size="icon"
                variant="outline"
                className="text-green-600 border-green-200 hover:bg-green-50"
                onClick={() => approveMutation.mutate(item.id)}
                title="Approve"
              >
                <CheckCircle className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => rejectMutation.mutate({ id: item.id })}
                title="Reject"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}

          <Button
            size="icon"
            variant="outline"
            onClick={() => featureMutation.mutate(item.id)}
            title="Toggle Featured"
          >
            <Star className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => setDeleteId(item.id)}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Tributes"
        description="Approve / reject public tributes"
      />

      <DataTable
        columns={columns}
        data={data?.content || []}
        isLoading={isLoading}
        emptyMessage="No tributes found"
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
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Tribute"
        description="Are you sure you want to delete this tribute?"
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
      />
    </AdminLayout>
  );
}