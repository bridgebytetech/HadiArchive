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
  published: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

export default function NewNewsPage() {
  const router = useRouter();

  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { published: true },
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => newsService.create(payload),
    onSuccess: () => {
      toast.success("News created");
      router.push("/admin/news");
    },
    onError: (e: any) => toast.error(e.message || "Create failed"),
  });

  return (
    <AdminLayout>
      <AdminPageHeader title="Add News" backHref="/admin/news" />
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form
              onSubmit={handleSubmit((data) => createMutation.mutate(data))}
              className="space-y-6"
            >
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