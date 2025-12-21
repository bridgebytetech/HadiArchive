"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, Upload } from "lucide-react";

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
import { uploadService } from "@/services/uploadService";
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
  titleBn: z.string().min(1),
  titleEn: z.string().optional(),
  descriptionBn: z.string().optional(),
  descriptionEn: z.string().optional(),

  eventType: z.enum(EVENT_TYPES),

  date: z.string().min(1),
  time: z.string().optional(),
  location: z.string().optional(),
  attendees: z.string().optional(),
  leadBy: z.string().optional(),
  source: z.string().optional(),

  latitude: z.string().optional(),
  longitude: z.string().optional(),

  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function EditEventPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const qc = useQueryClient();

  const { data: event, isLoading } = useQuery({
    queryKey: ["adminEvent", id],
    queryFn: () => eventService.adminGetById(id),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      published: false,
      featured: false,
      eventType: "MEMORIAL",
    },
  });

  React.useEffect(() => {
    if (event) {
      reset({
        titleBn: event.titleBn,
        titleEn: event.titleEn || "",
        descriptionBn: event.descriptionBn || "",
        descriptionEn: event.descriptionEn || "",
        eventType: (event.eventType as any) || "MEMORIAL",
        date: event.date,
        time: event.time || "",
        location: event.location || "",
        attendees: event.attendees || "",
        leadBy: event.leadBy || "",
        source: event.source || "",
        latitude: event.coordinates?.latitude?.toString() || "",
        longitude: event.coordinates?.longitude?.toString() || "",
        published: !!event.published,
        featured: !!event.featured,
      });
    }
  }, [event, reset]);

  const updateMutation = useMutation({
    mutationFn: (payload: any) => eventService.update(id, payload),
    onSuccess: () => {
      toast.success("Event updated");
      qc.invalidateQueries({ queryKey: ["adminEvent", id] });
      qc.invalidateQueries({ queryKey: ["adminEvents"] });
    },
    onError: (e: any) => toast.error(e.message || "Update failed"),
  });

  const addPhotosMutation = useMutation({
    mutationFn: (photos: any[]) => eventService.addPhotos(id, photos),
    onSuccess: () => {
      toast.success("Photos added");
      qc.invalidateQueries({ queryKey: ["adminEvent", id] });
    },
    onError: (e: any) => toast.error(e.message || "Add photos failed"),
  });

  const addVideosMutation = useMutation({
    mutationFn: (videos: any[]) => eventService.addVideos(id, videos),
    onSuccess: () => {
      toast.success("Videos added");
      qc.invalidateQueries({ queryKey: ["adminEvent", id] });
    },
    onError: (e: any) => toast.error(e.message || "Add videos failed"),
  });

  const [uploading, setUploading] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");
  const [videoTitle, setVideoTitle] = React.useState("");

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

    updateMutation.mutate(payload);
  };

  const uploadPhoto = async (file: File) => {
    setUploading(true);
    try {
      const res = await uploadService.quickUpload(file);
      addPhotosMutation.mutate([{ url: res.imageUrl, caption: "", order: (event?.photos?.length || 0) + 1 }]);
    } finally {
      setUploading(false);
    }
  };

  const addVideo = () => {
    if (!videoUrl.trim()) return;
    addVideosMutation.mutate([{ url: videoUrl.trim(), title: videoTitle || "Video" }]);
    setVideoUrl("");
    setVideoTitle("");
  };

  if (isLoading || !event) {
    return (
      <AdminLayout>
        <AdminPageHeader title="Edit Event" backHref="/admin/events" />
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader title="Edit Event" backHref="/admin/events" />

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  <Label>Event Type *</Label>
                  <Select
                    value={watch("eventType")}
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
                </div>

                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input type="date" {...register("date")} />
                </div>

                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input {...register("time")} />
                </div>
              </div>

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

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="published"
                    defaultChecked={event.published}
                    onCheckedChange={(v) => setValue("published", !!v)}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="featured"
                    defaultChecked={event.featured}
                    onCheckedChange={(v) => setValue("featured", !!v)}
                  />
                  <Label htmlFor="featured">Featured</Label>
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

        {/* Photos */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Event Photos</h3>
              <input
                type="file"
                accept="image/*"
                id="event-photo"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadPhoto(f);
                }}
              />
              <Button asChild variant="outline">
                <label htmlFor="event-photo" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Uploading..." : "Upload"}
                </label>
              </Button>
            </div>

            {event.photos?.length ? (
              <ul className="text-sm space-y-1">
                {event.photos.map((p, i) => (
                  <li key={i} className="truncate">{i + 1}. {p.url}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No photos</p>
            )}
          </CardContent>
        </Card>

        {/* Videos */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold">Event Videos</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <Label>Video URL</Label>
                <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
              </div>
              <div>
                <Label>Title</Label>
                <Input value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
              </div>
            </div>

            <Button variant="outline" onClick={addVideo}>
              <Plus className="h-4 w-4 mr-2" />
              Add Video
            </Button>

            {event.videos?.length ? (
              <ul className="text-sm space-y-1">
                {event.videos.map((v, i) => (
                  <li key={i} className="truncate">{i + 1}. {v.title || "Video"} — {v.url}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No videos</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}