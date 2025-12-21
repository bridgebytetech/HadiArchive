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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { timelineService } from "@/services/timelineService";
import { toast } from "sonner";

const schema = z.object({
  titleBn: z.string().min(1),
  titleEn: z.string().optional(),
  descriptionBn: z.string().optional(),
  descriptionEn: z.string().optional(),
  date: z.string().min(1),
  endDate: z.string().optional(),
  eventType: z.string().optional(),
  importance: z.string().optional(),
  location: z.string().optional(),
  published: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function EditTimelinePage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["adminTimelineItem", id],
    queryFn: () => timelineService.adminGetById(id),
  });

  const { register, handleSubmit, setValue, reset, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { published: false },
  });

  React.useEffect(() => {
    if (data) {
      reset({
        titleBn: data.titleBn,
        titleEn: data.titleEn || "",
        descriptionBn: data.descriptionBn || "",
        descriptionEn: data.descriptionEn || "",
        date: data.date,
        endDate: data.endDate || "",
        eventType: data.eventType || "",
        importance: data.importance || "",
        location: data.location || "",
        published: !!data.published,
      });
    }
  }, [data, reset]);

  const updateMutation = useMutation({
    mutationFn: (payload: any) => timelineService.update(id, payload),
    onSuccess: () => {
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: ["adminTimeline"] });
      qc.invalidateQueries({ queryKey: ["adminTimelineItem", id] });
    },
    onError: (e: any) => toast.error(e.message || "Update failed"),
  });

  if (isLoading || !data) {
    return (
      <AdminLayout>
        <AdminPageHeader title="Edit Timeline" backHref="/admin/timeline" />
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader title="Edit Timeline" backHref="/admin/timeline" />
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit((f) => updateMutation.mutate({ ...data, ...f }))} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Title (BN) *</Label>
                  <Input {...register("titleBn")} />
                </div>
                <div className="space-y-2">
                  <Label>Title (EN)</Label>
                  <Input {...register("titleEn")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Description (BN)</Label>
                  <Textarea rows={5} {...register("descriptionBn")} />
                </div>
                <div className="space-y-2">
                  <Label>Description (EN)</Label>
                  <Textarea rows={5} {...register("descriptionEn")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input type="date" {...register("date")} />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" {...register("endDate")} />
                </div>
                <div className="space-y-2">
                  <Label>Event Type</Label>
                  <Input {...register("eventType")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Importance</Label>
                  <Input {...register("importance")} />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input {...register("location")} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="published" defaultChecked={data.published} onCheckedChange={(v) => setValue("published", !!v)} />
                <Label htmlFor="published">Published</Label>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>Back</Button>
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