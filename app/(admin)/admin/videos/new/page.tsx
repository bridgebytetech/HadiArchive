"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AdminLayout, AdminPageHeader } from "@/components/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { videoService } from "@/services/videoService";
import { VIDEO_TYPES } from "@/lib/constants";
import { toast } from "sonner";
import { getYouTubeThumbnail, getYouTubeId } from "@/lib/utils";

const videoSchema = z.object({
  titleBn: z.string().min(1, "Bangla title is required"),
  titleEn: z.string().optional(),
  descriptionBn: z.string().optional(),
  descriptionEn: z.string().optional(),
  videoUrl: z.string().url("Valid URL required"),
  videoType: z.string().min(1, "Type is required"),
  date: z.string().optional(),
  duration: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

type VideoFormData = z.infer<typeof videoSchema>;

export default function NewVideoPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      published: true,
      featured: false,
      videoType: "SPEECH",
    },
  });

  const videoUrl = watch("videoUrl");
  const thumbnailUrl = videoUrl ? getYouTubeThumbnail(videoUrl, "hq") : null;

  const onSubmit = async (data: VideoFormData) => {
    try {
      await videoService.create({
        ...data,
        thumbnailUrl: thumbnailUrl || undefined,
        source: getYouTubeId(data.videoUrl) ? "YouTube" : "Other",
      });
      toast.success("Video created successfully");
      router.push("/admin/videos");
    } catch (error: any) {
      toast.error(error.message || "Failed to create video");
    }
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Add New Video"
        backHref="/admin/videos"
      />

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Title (Bangla) *</Label>
                  <Input {...register("titleBn")} placeholder="ভিডিও শিরোনাম" />
                  {errors.titleBn && (
                    <p className="text-sm text-red-500">{errors.titleBn.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Title (English)</Label>
                  <Input {...register("titleEn")} placeholder="Video Title" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Description (Bangla)</Label>
                  <Textarea {...register("descriptionBn")} rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Description (English)</Label>
                  <Textarea {...register("descriptionEn")} rows={4} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Details */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label>Video URL *</Label>
                <Input {...register("videoUrl")} placeholder="https://youtube.com/watch?v=..." />
                {errors.videoUrl && (
                  <p className="text-sm text-red-500">{errors.videoUrl.message}</p>
                )}
                {thumbnailUrl && (
                  <div className="mt-4 w-64 rounded-lg overflow-hidden border">
                    <img src={thumbnailUrl} alt="Preview" className="w-full h-auto" />
                    <p className="text-xs text-muted-foreground p-2 text-center bg-gray-50">
                      Thumbnail Preview
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Type *</Label>
                  <Select
                    onValueChange={(val) => setValue("videoType", val)}
                    defaultValue="SPEECH"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {VIDEO_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.labelEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" {...register("date")} />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input {...register("duration")} placeholder="e.g. 15:30" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="published"
                    onCheckedChange={(checked) => setValue("published", checked as boolean)}
                    defaultChecked={true}
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    onCheckedChange={(checked) => setValue("featured", checked as boolean)}
                  />
                  <Label htmlFor="featured">Mark as featured</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-memorial-green hover:bg-memorial-green/90">
              {isSubmitting ? "Creating..." : "Create Video"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}