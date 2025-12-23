// app/(admin)/admin/posters/[id]/edit/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { posterService } from "@/services/posterService";
import { POSTER_TYPES } from "@/lib/constants";
import { toast } from "sonner";
import Image from "next/image";
import { Palette } from "lucide-react";

const posterSchema = z.object({
  titleBn: z.string().min(1, "Bangla title is required"),
  titleEn: z.string().optional(),
  descriptionBn: z.string().optional(),
  descriptionEn: z.string().optional(),
  posterType: z.string().min(1, "Type is required"),
  imageUrl: z.string().url("Valid Image URL is required"),
  thumbnailUrl: z.string().url("Valid Thumbnail URL").optional().or(z.literal("")),
  designer: z.string().optional(),
  source: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

type PosterFormData = z.infer<typeof posterSchema>;

export default function EditPosterPage() {
  const router = useRouter();
  const params = useParams();
  const posterId = params.id as string;

  const { data: poster, isLoading: loadingPoster } = useQuery({
    queryKey: ["adminPoster", posterId],
    queryFn: () => posterService.getById(posterId),
    enabled: !!posterId,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PosterFormData>({
    resolver: zodResolver(posterSchema),
  });

  useEffect(() => {
    if (poster) {
      reset({
        titleBn: poster.titleBn,
        titleEn: poster.titleEn || "",
        descriptionBn: poster.descriptionBn || "",
        descriptionEn: poster.descriptionEn || "",
        posterType: poster.posterType,
        imageUrl: poster.imageUrl,
        thumbnailUrl: poster.thumbnailUrl || "",
        designer: poster.designer || "",
        source: poster.source || "",
        featured: poster.featured,
        published: poster.published,
      });
    }
  }, [poster, reset]);

  const imageUrl = watch("imageUrl");
  const thumbUrl = watch("thumbnailUrl");
  const posterType = watch("posterType");

  const onSubmit = async (data: PosterFormData) => {
    try {
      await posterService.update(posterId, {
        titleBn: data.titleBn,
        titleEn: data.titleEn || undefined,
        descriptionBn: data.descriptionBn || undefined,
        descriptionEn: data.descriptionEn || undefined,
        posterType: data.posterType,
        imageUrl: data.imageUrl,
        thumbnailUrl: data.thumbnailUrl || undefined,
        designer: data.designer || undefined,
        source: data.source || undefined,
        featured: data.featured,
        published: data.published,
      });

      toast.success("Poster updated successfully");
      router.push("/admin/posters");
    } catch (error: any) {
      toast.error(error.message || "Failed to update poster");
    }
  };

  if (loadingPoster) {
    return (
      <AdminLayout>
        <AdminPageHeader title="Edit Poster" backHref="/admin/posters" />
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="h-[400px] rounded-xl" />
          <div className="lg:col-span-2">
            <Skeleton className="h-[600px] rounded-xl" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader title="Edit Poster" backHref="/admin/posters" />

      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview */}
          <Card className="lg:col-span-1 h-fit sticky top-6">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-memorial-green" />
                <h3 className="font-semibold">Preview</h3>
              </div>

              <div className="relative w-full rounded-lg overflow-hidden border bg-gray-50 flex items-center justify-center min-h-[200px]">
                {imageUrl ? (
                  <Image
                    src={thumbUrl || imageUrl}
                    alt="Preview"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "400px" }}
                  />
                ) : (
                  <div className="w-full py-20 flex items-center justify-center text-sm text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              {posterType && (
                <div className="text-center">
                  <span className="text-xs bg-memorial-green/10 text-memorial-green px-3 py-1 rounded-full">
                    {POSTER_TYPES.find((t) => t.value === posterType)?.labelEn || posterType}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label>Title (Bangla) *</Label>
                  <Input {...register("titleBn")} />
                  {errors.titleBn && (
                    <p className="text-sm text-red-500">{errors.titleBn.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Title (English)</Label>
                  <Input {...register("titleEn")} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type *</Label>
                    <Select
                      value={posterType}
                      onValueChange={(val) => setValue("posterType", val)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {POSTER_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.labelEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Designer</Label>
                    <Input {...register("designer")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Image URL *</Label>
                  <Input {...register("imageUrl")} />
                  {errors.imageUrl && (
                    <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Thumbnail URL</Label>
                  <Input {...register("thumbnailUrl")} />
                </div>

                <div className="space-y-2">
                  <Label>Description (Bangla)</Label>
                  <Textarea {...register("descriptionBn")} rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Description (English)</Label>
                  <Textarea {...register("descriptionEn")} rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Source</Label>
                  <Input {...register("source")} />
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="published"
                      checked={watch("published")}
                      onCheckedChange={(checked) => setValue("published", checked as boolean)}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={watch("featured")}
                      onCheckedChange={(checked) => setValue("featured", checked as boolean)}
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-memorial-green hover:bg-memorial-green/90"
              >
                {isSubmitting ? "Updating..." : "Update Poster"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
