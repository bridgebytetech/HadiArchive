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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { photoService } from "@/services/photoService";
import { PHOTO_TYPES } from "@/lib/constants";
import { toast } from "sonner";
import Image from "next/image";

const photoSchema = z.object({
  titleBn: z.string().min(1, "Bangla title is required"),
  titleEn: z.string().optional(),
  descriptionBn: z.string().optional(),
  descriptionEn: z.string().optional(),

  imageType: z.string().min(1, "Type is required"),

  // Backend PhotoRequest requires imageUrl + titleBn
  imageUrl: z.string().url("Valid Image URL is required"),
  thumbnailUrl: z.string().url("Valid Thumbnail URL").optional().or(z.literal("")).optional(),

  date: z.string().optional(),
  location: z.string().optional(),
  photographer: z.string().optional(),
  source: z.string().optional(),

  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

type PhotoFormData = z.infer<typeof photoSchema>;

export default function NewPhotoPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PhotoFormData>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      published: true,
      featured: false,
      imageType: "POLITICAL",
      thumbnailUrl: "",
    },
  });

  const imageUrl = watch("imageUrl");
  const thumbUrl = watch("thumbnailUrl");

  const onSubmit = async (data: PhotoFormData) => {
    try {
      await photoService.create({
        titleBn: data.titleBn,
        titleEn: data.titleEn,
        descriptionBn: data.descriptionBn,
        descriptionEn: data.descriptionEn,
        imageType: data.imageType,
        imageUrl: data.imageUrl,
        thumbnailUrl: data.thumbnailUrl || undefined,
        date: data.date,
        location: data.location,
        photographer: data.photographer,
        source: data.source,
        featured: data.featured,
        published: data.published,
      });

      toast.success("Photo added successfully");
      router.push("/admin/photos");
    } catch (error: any) {
      toast.error(error.message || "Failed to add photo");
    }
  };

  return (
    <AdminLayout>
      <AdminPageHeader title="Add New Photo" backHref="/admin/photos" />

      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview */}
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Preview</h3>

              <div className="relative aspect-square rounded-lg overflow-hidden border bg-gray-50">
                {imageUrl ? (
                  <Image
                    src={thumbUrl || imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                    Paste an Image URL to preview
                  </div>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Tip: Prefer HTTPS direct image links (jpg/png/webp).
              </p>
            </CardContent>
          </Card>

          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label>Title (Bangla) *</Label>
                  <Input {...register("titleBn")} placeholder="ছবির শিরোনাম" />
                  {errors.titleBn && (
                    <p className="text-sm text-red-500">{errors.titleBn.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Title (English)</Label>
                  <Input {...register("titleEn")} placeholder="Photo Title" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Type *</Label>
                    <Select
                      onValueChange={(val) => setValue("imageType", val)}
                      defaultValue="POLITICAL"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PHOTO_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.labelEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.imageType && (
                      <p className="text-sm text-red-500">{errors.imageType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" {...register("date")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Image URL *</Label>
                  <Input
                    {...register("imageUrl")}
                    placeholder="https://example.com/photo.jpg"
                  />
                  {errors.imageUrl && (
                    <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Thumbnail URL (optional)</Label>
                  <Input
                    {...register("thumbnailUrl")}
                    placeholder="https://example.com/thumb.jpg"
                  />
                  {errors.thumbnailUrl && (
                    <p className="text-sm text-red-500">
                      {errors.thumbnailUrl.message as string}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input {...register("location")} placeholder="e.g. Shahbag, Dhaka" />
                  </div>
                  <div className="space-y-2">
                    <Label>Photographer</Label>
                    <Input {...register("photographer")} placeholder="Photographer Name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Source</Label>
                  <Input {...register("source")} placeholder="Source name / link" />
                </div>

                <div className="flex flex-col gap-4 pt-2">
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
                    <Label htmlFor="featured">Mark as featured</Label>
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
                {isSubmitting ? "Saving..." : "Save Photo"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}