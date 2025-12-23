// app/admin/posters/new/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

export default function NewPosterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PosterFormData>({
    resolver: zodResolver(posterSchema),
    defaultValues: {
      published: true,
      featured: false,
      posterType: "POSTER",
      thumbnailUrl: "",
    },
  });

  const imageUrl = watch("imageUrl");
  const thumbUrl = watch("thumbnailUrl");
  const posterType = watch("posterType");

  const onSubmit = async (data: PosterFormData) => {
    try {
      await posterService.create({
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

      toast.success("Poster added successfully");
      router.push("/admin/posters");
    } catch (error: any) {
      toast.error(error.message || "Failed to add poster");
    }
  };

  return (
    <AdminLayout>
      <AdminPageHeader title="Add New Poster" backHref="/admin/posters" />

      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Card */}
          <Card className="lg:col-span-1 h-fit sticky top-6">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-memorial-green" />
                <h3 className="font-semibold">Preview</h3>
              </div>

              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border bg-gray-50">
                {imageUrl ? (
                  <Image
                    src={thumbUrl || imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-sm text-muted-foreground gap-2">
                    <Palette className="w-8 h-8" />
                    <span>Paste URL to preview</span>
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

              <p className="text-xs text-muted-foreground text-center">
                Recommended: 1080×1350px or 3:4 ratio
              </p>
            </CardContent>
          </Card>

          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Basic Info
                  </h4>
                  
                  <div className="space-y-2">
                    <Label>Title (Bangla) *</Label>
                    <Input {...register("titleBn")} placeholder="পোস্টারের শিরোনাম" />
                    {errors.titleBn && (
                      <p className="text-sm text-red-500">{errors.titleBn.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Title (English)</Label>
                    <Input {...register("titleEn")} placeholder="Poster Title" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type *</Label>
                      <Select
                        onValueChange={(val) => setValue("posterType", val)}
                        defaultValue="POSTER"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {POSTER_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.labelEn} ({type.labelBn})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.posterType && (
                        <p className="text-sm text-red-500">{errors.posterType.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Designer</Label>
                      <Input {...register("designer")} placeholder="Designer name" />
                    </div>
                  </div>
                </div>

                {/* Image URLs */}
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Image URLs
                  </h4>

                  <div className="space-y-2">
                    <Label>Image URL *</Label>
                    <Input
                      {...register("imageUrl")}
                      placeholder="https://example.com/poster.jpg"
                    />
                    {errors.imageUrl && (
                      <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Thumbnail URL (optional)</Label>
                    <Input
                      {...register("thumbnailUrl")}
                      placeholder="https://example.com/poster-thumb.jpg"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Description (Optional)
                  </h4>

                  <div className="space-y-2">
                    <Label>Description (Bangla)</Label>
                    <Textarea
                      {...register("descriptionBn")}
                      placeholder="পোস্টার সম্পর্কে বিবরণ..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description (English)</Label>
                    <Textarea
                      {...register("descriptionEn")}
                      placeholder="Description about the poster..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Input {...register("source")} placeholder="Source name or link" />
                  </div>
                </div>

                {/* Publish Options */}
                <div className="flex flex-col gap-4 pt-4 border-t">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Publish Options
                  </h4>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="published"
                      defaultChecked
                      onCheckedChange={(checked) => setValue("published", checked as boolean)}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      onCheckedChange={(checked) => setValue("featured", checked as boolean)}
                    />
                    <Label htmlFor="featured">Mark as featured (show on homepage)</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-memorial-green hover:bg-memorial-green/90"
              >
                {isSubmitting ? "Saving..." : "Save Poster"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
