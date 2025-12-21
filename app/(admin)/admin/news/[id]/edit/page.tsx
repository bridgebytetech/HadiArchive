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

import { newsService } from "@/services/newsService";
import { toast } from "sonner";

const schema = z.object({
  headlineBn: z.string().min(1),
  headlineEn: z.string().optional(),
  summaryBn: z.string().optional(),
  summaryEn: z.string().optional(),
  fullContentBn: z.string().optional(),
  fullContentEn: z.string().optional(),
  mediaName: z.string().optional(),
  mediaType: z.string().optional(),
  journalist: z.string().optional(),
  originalUrl: z.string().optional(),
  screenshotUrl: z.string().optional(),
  publishDate: z.string().optional(),
  published: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function EditNewsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["adminNewsItem", id],
    queryFn: () => newsService.getById(id),
  });

  const { register, handleSubmit, setValue, reset, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { published: false },
  });

  React.useEffect(() => {
    if (data) {
      reset({
        headlineBn: data.headlineBn,
        headlineEn: data.headlineEn || "",
        summaryBn: data.summaryBn || "",
        summaryEn: data.summaryEn || "",
        fullContentBn: data.fullContentBn || "",
        fullContentEn: data.fullContentEn || "",
        mediaName: data.mediaName || "",
        mediaType: data.mediaType || "",
        journalist: data.journalist || "",
        originalUrl: data.originalUrl || "",
        screenshotUrl: data.screenshotUrl || "",
        publishDate: data.publishDate || "",
        published: !!data.published,
      });
    }
  }, [data, reset]);

  const updateMutation = useMutation({
    mutationFn: (payload: any) => newsService.update(id, payload),
    onSuccess: () => {
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: ["adminNews", 0] });
      qc.invalidateQueries({ queryKey: ["adminNewsItem", id] });
    },
    onError: (e: any) => toast.error(e.message || "Update failed"),
  });

  if (isLoading || !data) {
    return (
      <AdminLayout>
        <AdminPageHeader title="Edit News" backHref="/admin/news" />
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader title="Edit News" backHref="/admin/news" />
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit((form) => updateMutation.mutate({ ...data, ...form }))} className="space-y-6">
              {/* same fields as new */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Headline (BN) *</Label>
                  <Input {...register("headlineBn")} />
                </div>
                <div className="space-y-2">
                  <Label>Headline (EN)</Label>
                  <Input {...register("headlineEn")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Summary (BN)</Label>
                  <Textarea rows={3} {...register("summaryBn")} />
                </div>
                <div className="space-y-2">
                  <Label>Summary (EN)</Label>
                  <Textarea rows={3} {...register("summaryEn")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Content (BN)</Label>
                  <Textarea rows={8} {...register("fullContentBn")} />
                </div>
                <div className="space-y-2">
                  <Label>Full Content (EN)</Label>
                  <Textarea rows={8} {...register("fullContentEn")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Media Name</Label>
                  <Input {...register("mediaName")} />
                </div>
                <div className="space-y-2">
                  <Label>Media Type</Label>
                  <Input {...register("mediaType")} />
                </div>
                <div className="space-y-2">
                  <Label>Journalist</Label>
                  <Input {...register("journalist")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Original URL</Label>
                  <Input {...register("originalUrl")} />
                </div>
                <div className="space-y-2">
                  <Label>Screenshot URL</Label>
                  <Input {...register("screenshotUrl")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Publish Date</Label>
                <Input type="date" {...register("publishDate")} />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="published"
                  defaultChecked={data.published}
                  onCheckedChange={(v) => setValue("published", !!v)}
                />
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