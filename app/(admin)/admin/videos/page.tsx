"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Play,
  CheckCircle,
  XCircle,
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
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { videoService } from "@/services/videoService";
import { Video } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminVideosPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  // Fetch videos
  const { data, isLoading } = useQuery({
    queryKey: ["adminVideos", page, debouncedSearch],
    queryFn: () => videoService.adminGetAll(page, 10),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: videoService.delete,
    onSuccess: () => {
      toast.success("Video deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminVideos"] });
      setDeleteId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete video");
    },
  });

  // Toggle publish mutation
  const togglePublishMutation = useMutation({
    mutationFn: videoService.togglePublish,
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["adminVideos"] });
    },
  });

  // Toggle featured mutation
  const toggleFeaturedMutation = useMutation({
    mutationFn: videoService.toggleFeatured,
    onSuccess: () => {
      toast.success("Featured status updated");
      queryClient.invalidateQueries({ queryKey: ["adminVideos"] });
    },
  });

  const columns = [
    {
      key: "thumbnail",
      header: "Video",
      cell: (item: Video) => (
        <div className="flex items-center gap-3">
          <div className="relative w-24 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            {item.thumbnailUrl ? (
              <Image
                src={item.thumbnailUrl}
                alt={item.titleBn}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Play className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
          <div className="max-w-[200px]">
            <p className="font-medium truncate" title={item.titleBn}>
              {item.titleBn}
            </p>
            <p className="text-xs text-muted-foreground truncate" title={item.titleEn}>
              {item.titleEn || "-"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (item: Video) => (
        <span className="capitalize text-sm bg-gray-100 px-2 py-1 rounded">
          {item.videoType?.toLowerCase()}
        </span>
      ),
    },
    {
      key: "stats",
      header: "Stats",
      cell: (item: Video) => (
        <div className="text-sm">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {item.viewCount || 0}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item: Video) => (
        <div className="flex flex-col gap-1">
          <StatusBadge status={item.published || false} />
          {item.featured && (
            <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded w-fit">
              Featured
            </span>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (item: Video) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/admin/videos/${item.id}/edit`)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => togglePublishMutation.mutate(item.id)}>
                {item.published ? (
                  <>
                    <XCircle className="h-4 w-4 mr-2 text-red-500" /> Unpublish
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Publish
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleFeaturedMutation.mutate(item.id)}>
                {item.featured ? "Remove Featured" : "Mark as Featured"}
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
        title="Videos"
        description="Manage video gallery content"
        actionLabel="Add Video"
        actionHref="/admin/videos/new"
      >
        <Input
          placeholder="Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
      </AdminPageHeader>

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
        title="Delete Video"
        description="Are you sure you want to delete this video? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
      />
    </AdminLayout>
  );
}