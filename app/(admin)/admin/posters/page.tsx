// app/(admin)/admin/posters/page.tsx
"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Edit,
  Trash2,
  MoreVertical,
  Palette,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";
import {
  AdminLayout,
  AdminPageHeader,
  DataTable,
  StatusBadge,
  ConfirmDialog,
  Pagination,
} from "@/components/admin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { posterService, Poster } from "@/services/posterService";
import { POSTER_TYPES } from "@/lib/constants";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminPostersPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["adminPosters", page],
    queryFn: () => posterService.getAll(page, 12),
  });

  const deleteMutation = useMutation({
    mutationFn: posterService.delete,
    onSuccess: () => {
      toast.success("Poster deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminPosters"] });
      setDeleteId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete poster");
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: posterService.togglePublish,
    onSuccess: () => {
      toast.success("Poster status updated");
      queryClient.invalidateQueries({ queryKey: ["adminPosters"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: posterService.toggleFeatured,
    onSuccess: () => {
      toast.success("Featured status updated");
      queryClient.invalidateQueries({ queryKey: ["adminPosters"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update featured status");
    },
  });

  const getTypeLabel = (type: string) => {
    const found = POSTER_TYPES.find((t) => t.value === type);
    return found?.labelEn || type;
  };

  const columns = [
    {
      key: "image",
      header: "Preview",
      cell: (item: Poster) => (
        <div className="relative w-16 h-20 rounded-md overflow-hidden bg-gray-100 border flex items-center justify-center">
          <Image
            src={item.thumbnailUrl || item.imageUrl}
            alt={item.titleBn}
            width={0}
            height={0}
            sizes="64px"
            className="w-full h-full object-contain"
          />
        </div>
      ),
    },
    {
      key: "info",
      header: "Details",
      cell: (item: Poster) => (
        <div className="space-y-1">
          <p className="font-medium truncate max-w-[200px]">{item.titleBn}</p>
          {item.titleEn && (
            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
              {item.titleEn}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (item: Poster) => (
        <Badge variant="outline" className="text-xs">
          <Palette className="w-3 h-3 mr-1" />
          {getTypeLabel(item.posterType)}
        </Badge>
      ),
    },
    {
      key: "featured",
      header: "Featured",
      cell: (item: Poster) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleFeaturedMutation.mutate(item.id)}
          className={item.featured ? "text-yellow-500" : "text-gray-400"}
        >
          <Star className={`h-4 w-4 ${item.featured ? "fill-current" : ""}`} />
        </Button>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item: Poster) => <StatusBadge status={item.published} />,
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (item: Poster) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => router.push(`/admin/posters/${item.id}/edit`)}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => togglePublishMutation.mutate(item.id)}
              >
                {item.published ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" /> Unpublish
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" /> Publish
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setDeleteId(item.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Posters & Graphics"
        description="Manage posters, typography, and edited content"
        actionLabel="Add Poster"
        actionHref="/admin/posters/new"
      />

      <DataTable
        columns={columns}
        data={data?.content || []}
        isLoading={isLoading}
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
        title="Delete Poster"
        description="Are you sure you want to delete this poster? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
      />
    </AdminLayout>
  );
}
