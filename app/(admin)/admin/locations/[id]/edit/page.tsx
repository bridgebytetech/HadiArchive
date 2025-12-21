"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditLocationPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["adminLocation", id],
    queryFn: () => locationService.getById(id),
  });

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    if (data) {
      reset({
        nameBn: data.nameBn,
        nameEn: data.nameEn || "",
        descriptionBn: data.descriptionBn || "",
        descriptionEn: data.descriptionEn || "",
        address: data.address || "",
        locationType: data.locationType || "",
        googleMapsUrl: data.googleMapsUrl || "",
        latitude: data.coordinates?.latitude?.toString() || "",
        longitude: data.coordinates?.longitude?.toString() || "",
      });
    }
  }, [data, reset]);

  const updateMutation = useMutation({
    mutationFn: (payload: any) => locationService.update(id, payload),
    onSuccess: () => {
      toast.success("Location updated");
      qc.invalidateQueries({ queryKey: ["adminLocations"] });
      qc.invalidateQueries({ queryKey: ["adminLocation", id] });
    },
    onError: (e: any) => toast.error(e.message || "Update failed"),
  });

  const onSubmit = async (form: FormData) => {
    const payload: any = {
      ...data,
      nameBn: form.nameBn,
      nameEn: form.nameEn,
      descriptionBn: form.descriptionBn,
      descriptionEn: form.descriptionEn,
      address: form.address,
      locationType: form.locationType,
      googleMapsUrl: form.googleMapsUrl,
    };

    if (form.latitude && form.longitude) {
      payload.coordinates = { latitude: Number(form.latitude), longitude: Number(form.longitude) };
    }

    updateMutation.mutate(payload);
  };

  if (isLoading || !data) {
    return (
      <AdminLayout>
        <AdminPageHeader title="Edit Location" backHref="/admin/locations" />
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader title="Edit Location" backHref="/admin/locations" />

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
                  <Input {...register("locationType")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Google Maps URL</Label>
                <Input {...register("googleMapsUrl")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Latitude</Label>
                  <Input {...register("latitude")} />
                </div>
                <div className="space-y-2">
                  <Label>Longitude</Label>
                  <Input {...register("longitude")} />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Back
                </Button>
                <Button className="bg-memorial-green hover:bg-memorial-green/90" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}