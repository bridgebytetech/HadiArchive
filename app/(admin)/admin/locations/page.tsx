"use client";

import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, MapPin, Plus, Trash2, Globe, Eye } from "lucide-react";
import Link from "next/link";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

import { Button } from "@/components/ui/button";
import { locationService } from "@/services/locationService";
import { Location } from "@/types";
import { toast } from "sonner";

export default function AdminLocationsPage() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: locations, isLoading } = useQuery({
    queryKey: ["adminLocations"],
    queryFn: () => locationService.adminGetAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => locationService.delete(id),
    onSuccess: () => {
      toast.success("Location deleted");
      queryClient.invalidateQueries({ queryKey: ["adminLocations"] });
      setDeleteId(null);
    },
    onError: (e: any) => toast.error(e.message || "Delete failed"),
  });

  const togglePublishMutation = useMutation({
    mutationFn: (id: string) => locationService.togglePublish(id),
    onSuccess: () => {
      toast.success("Publish status updated");
      queryClient.invalidateQueries({ queryKey: ["adminLocations"] });
    },
    onError: (e: any) => toast.error(e.message || "Update failed"),
  });

  const columns: Column<Location>[] = useMemo(
    () => [
      {
        key: "name",
        header: "Location",
        cell: (item) => {
          const name = item.nameBn || item.nameEn || "-";
          return (
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-9 w-9 rounded-lg bg-memorial-green/10 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-memorial-green" />
              </div>
              <div className="min-w-0">
                <div className="font-medium truncate max-w-[240px]">{name}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[260px]">
                  {item.address || item.locationType || ""}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        key: "type",
        header: "Type",
        cell: (item) => (
          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
            {item.locationType || "—"}
          </span>
        ),
      },
      {
        key: "published",
        header: "Status",
        cell: (item) => <StatusBadge status={!!item.published} />,
      },
      {
        key: "actions",
        header: "Actions",
        className: "text-right",
        cell: (item) => {
          const mapsUrl =
            item.googleMapsUrl ||
            (item.coordinates
              ? `https://www.google.com/maps?q=${item.coordinates.latitude},${item.coordinates.longitude}`
              : null);

          return (
            <div className="flex justify-end gap-2">
              {mapsUrl && (
                <Button asChild variant="outline" size="icon" title="Open map">
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => togglePublishMutation.mutate(item.id)}
              >
                {item.published ? "Unpublish" : "Publish"}
              </Button>

              <Button
                variant="outline"
                size="icon"
                asChild
                title="Edit"
              >
                <Link href={`/admin/locations/${item.id}/edit`}>
                  <Edit className="h-4 w-4" />
                </Link>
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
          );
        },
      },
    ],
    [togglePublishMutation]
  );

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Locations"
        description="Manage important locations (published/unpublished)"
        actionLabel="Add Location"
        actionHref="/admin/locations/new"
        actionIcon={<Plus className="h-4 w-4" />}
      />

      <DataTable
        columns={columns}
        data={locations || []}
        isLoading={isLoading}
        emptyMessage="No locations found"
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Location"
        description="Are you sure you want to delete this location?"
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
      />
    </AdminLayout>
  );
}