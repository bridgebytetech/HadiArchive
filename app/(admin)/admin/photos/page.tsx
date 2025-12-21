"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Edit,
  Trash2,
  MoreVertical,
  Image as ImageIcon,
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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { photoService } from "@/services/photoService";
import { Photo } from "@/types";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminPhotosPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch photos
  const { data, isLoading } = useQuery({
    queryKey: ["adminPhotos", page],
    queryFn: () => photoService.adminGetAll(page, 12),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: photoService.delete,
    onSuccess: () => {
      toast.success("Photo deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminPhotos"] });
      setDeleteId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete photo");
    },
  });

  const columns = [
    {
      key: "image",
      header: "Image",
      cell: (item: Photo) => (
        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
          <Image
            src={item.thumbnailUrl || item.imageUrl}
            alt={item.titleBn}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      key: "info",
      header: "Details",
      cell: (item: Photo) => (
        <div>
          <p className="font-medium truncate max-w-[200px]">{item.titleBn}</p>
          <p className="text-xs text-muted-foreground">{item.imageType}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item: Photo) => (
        <StatusBadge status={item.published || false} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (item: Photo) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/admin/photos/${item.id}/edit`)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
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
        title="Photos"
        description="Manage photo gallery"
        actionLabel="Add Photo"
        actionHref="/admin/photos/new"
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
        title="Delete Photo"
        description="Are you sure you want to delete this photo?"
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
      />
    </AdminLayout>
  );
}