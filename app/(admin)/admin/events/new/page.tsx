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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { eventService } from "@/services/eventService";
import { toast } from "sonner";

const EVENT_TYPES = [
  "JANAZA",
  "BURIAL",
  "MEMORIAL",
  "ANNIVERSARY",
  "PROTEST",
  "TRIBUTE",
  "PRAYER",
  "RALLY",
] as const;

const schema = z.object({
  titleBn: z.string().min(1, "Title (BN) required"),
  titleEn: z.string().optional(),
  descriptionBn: z.string().optional(),
  descriptionEn: z.string().optional(),

  eventType: z.enum(EVENT_TYPES, { required_error: "Event type required" }),

  date: z.string().min(1, "Date required"),
  time: z.string().optional(),
  location: z.string().optional(),
  attendees: z.string().optional(),
  leadBy: z.string().optional(),
  source: z.string().optional(),

  latitude: z.string().optional(),
  longitude: z.string().optional(),

  published: z.boolean().default(true),
  featured: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function NewEventPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      published: true,
      featured: false,
      eventType: "MEMORIAL",
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => eventService.create(payload),
    onSuccess: () => {
      toast.success("Event created");
      router.push("/admin/events");
    },
    onError: (e: any) => toast.error(e.message || "Create failed"),
  });

  const onSubmit = (data: FormData) => {
    const payload: any = {
      titleBn: data.titleBn,
      titleEn: data.titleEn,
      descriptionBn: data.descriptionBn,
      descriptionEn: data.descriptionEn,
      eventType: data.eventType,
      date: data.date,
      time: data.time,
      location: data.location,
      attendees: data.attendees,
      leadBy: data.leadBy,
      source: data.source,
      published: data.published,
      featured: data.featured,
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
      <AdminPageHeader title="Add Event" backHref="/admin/events" />

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Title (BN) *</Label>
                  <Input {...register("titleBn")} />
                  {errors.titleBn && (
                    <p className="text-sm text-red-500">{errors.titleBn.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Title (EN)</Label>
                  <Input {...register("titleEn")} />
                </div>
              </div>

              {/* Descriptions */}
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

              {/* Type & Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Event Type *</Label>
                  <Select
                    defaultValue={watch("eventType")}
                    onValueChange={(v) => setValue("eventType", v as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventType && (
                    <p className="text-sm text-red-500">{errors.eventType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input type="date" {...register("date")} />
                  {errors.date && (
                    <p className="text-sm text-red-500">{errors.date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input {...register("time")} placeholder="e.g. 14:25" />
                </div>
              </div>

              {/* Location & Attendees */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input {...register("location")} />
                </div>
                <div className="space-y-2">
                  <Label>Attendees</Label>
                  <Input {...register("attendees")} />
                </div>
              </div>

              {/* Lead & Source */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Lead By</Label>
                  <Input {...register("leadBy")} />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Input {...register("source")} />
                </div>
              </div>

              {/* Coordinates optional */}
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

              {/* Flags */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="published"
                    defaultChecked
                    onCheckedChange={(v) => setValue("published", !!v)}
                  />
                  <Label htmlFor="published">Publish now</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="featured"
                    onCheckedChange={(v) => setValue("featured", !!v)}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  className="bg-memorial-green hover:bg-memorial-green/90"
                  type="submit"
                  disabled={isSubmitting}
                >
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