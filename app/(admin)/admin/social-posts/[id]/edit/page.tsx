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

import { toast } from "sonner";
import { socialPostService } from "@/services/socialPostService";

const schema = z.object({
  platform: z.string().min(1),
  contentBn: z.string().optional(),
  contentEn: z.string().optional(),
  originalUrl: z.string().optional(),
  screenshotUrl: z.string().optional(),
  postDate: z.string().optional(),
  likes: z.coerce.number().optional(),
  comments: z.coerce.number().optional(),
  shares: z.coerce.number().optional(),
  published: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function EditSocialPostPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["adminSocialPost", id],
    queryFn: () => socialPostService.adminGetById(id),
  });

  const { register, handleSubmit, setValue, reset, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { published: false },
  });

  React.useEffect(() => {
    if (data) {
      reset({
        platform: data.platform || "",
        contentBn: data.contentBn || "",
        contentEn: data.contentEn || "",
        originalUrl: data.originalUrl || "",
        screenshotUrl: data.screenshotUrl || "",
        postDate: data.postDate || "",
        likes: data.likes ?? 0,
        comments: data.comments ?? 0,
        shares: data.shares ?? 0,
        published: !!data.published,
      });
    }
  }, [data, reset]);

  const updateMutation = useMutation({
    mutationFn: (payload: any) => socialPostService.update(id, payload),
    onSuccess: () => {
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: ["adminSocialPosts"] });
      qc.invalidateQueries({ queryKey: ["adminSocialPost", id] });
    },
    onError: (e: any) => toast.error(e.message || "Update failed"),
  });

  if (isLoading || !data) {
    return (
      <AdminLayout>
        <AdminPageHeader title="Edit Social Post" backHref="/admin/social-posts" />
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader title="Edit Social Post" backHref="/admin/social-posts" />
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit((f) => updateMutation.mutate({ ...data, ...f }))} className="space-y-6">
              <div className="space-y-2">
                <Label>Platform *</Label>
                <Input {...register("platform")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Content (BN)</Label>
                  <Textarea rows={6} {...register("contentBn")} />
                </div>
                <div className="space-y-2">
                  <Label>Content (EN)</Label>
                  <Textarea rows={6} {...register("contentEn")} />
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
                <Label>Post Date</Label>
                <Input type="datetime-local" {...register("postDate")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Likes</Label>
                  <Input type="number" {...register("likes")} />
                </div>
                <div className="space-y-2">
                  <Label>Comments</Label>
                  <Input type="number" {...register("comments")} />
                </div>
                <div className="space-y-2">
                  <Label>Shares</Label>
                  <Input type="number" {...register("shares")} />
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