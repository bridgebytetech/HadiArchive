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
  published: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

export default function NewSocialPostPage() {
  const router = useRouter();

  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { published: true, likes: 0, comments: 0, shares: 0 },
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => socialPostService.create(payload),
    onSuccess: () => {
      toast.success("Post created");
      router.push("/admin/social-posts");
    },
    onError: (e: any) => toast.error(e.message || "Create failed"),
  });

  return (
    <AdminLayout>
      <AdminPageHeader title="Add Social Post" backHref="/admin/social-posts" />
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit((d) => createMutation.mutate(d))} className="space-y-6">
              <div className="space-y-2">
                <Label>Platform *</Label>
                <Input {...register("platform")} placeholder="FACEBOOK / TWITTER / YOUTUBE ..." />
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
                <Checkbox id="published" defaultChecked onCheckedChange={(v) => setValue("published", !!v)} />
                <Label htmlFor="published">Publish now</Label>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button className="bg-memorial-green hover:bg-memorial-green/90" type="submit" disabled={isSubmitting}>
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