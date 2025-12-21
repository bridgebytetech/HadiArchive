"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { locationService } from "@/services/locationService";
import { toast } from "sonner";

const schema = z.object({
  nameBn: z.string().min(1),
  nameEn: z.string().optional(),
  descriptionBn: z.string().optional(),
  descriptionEn: z.string().optional(),
  address: z.string().optional(),
  locationType: z.string().optional(),
  googleMapsUrl: z.string().optional(),
  // coordinates optional
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  published: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NewLocationPage() {
  const router = useRouter();

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => locationService.create(payload),
    onSuccess: () => {
      toast.success("Location created");
      router.push("/admin/locations");
    },
    onError: (e: any) => toast.error(e.message || "Create failed"),
  });

  const onSubmit = async (data: FormData) => {
    const payload: any = {
      nameBn: data.nameBn,
      nameEn: data.nameEn,
      descriptionBn: data.descriptionBn,
      descriptionEn: data.descriptionEn,
      address: data.address,
      locationType: data.locationType,
      googleMapsUrl: data.googleMapsUrl,
      published: false,
    };

    if (data.latitude && data.longitude) {
      payload.coordinates = {
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
      };
    }

    createMutation.mutate(payload);
  };

  return (
    <AdminLayout>
      <AdminPageHeader title="Add Location" backHref="/admin/locations" />

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Name (BN) *</Label>
                  <Input {...register("nameBn")} />
                </div>
                <div className="space-y-2">
                  <Label>Name (EN)</Label>
                  <Input {...register("nameEn")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Description (BN)</Label>
                  <Textarea rows={4} {...register("descriptionBn")} />
                </div>
                <div className="space-y-2">
                  <Label>Description (EN)</Label>
                  <Textarea rows={4} {...register("descriptionEn")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input {...register("address")} />
                </div>
                <div className="space-y-2">
                  <Label>Location Type</Label>
                  <Input {...register("locationType")} placeholder="BIRTHPLACE / BURIAL / ..." />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Google Maps URL</Label>
                <Input {...register("googleMapsUrl")} placeholder="https://maps.google.com/..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Latitude</Label>
                  <Input {...register("latitude")} placeholder="23.7351422" />
                </div>
                <div className="space-y-2">
                  <Label>Longitude</Label>
                  <Input {...register("longitude")} placeholder="90.3947337" />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button className="bg-memorial-green hover:bg-memorial-green/90" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Create"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}