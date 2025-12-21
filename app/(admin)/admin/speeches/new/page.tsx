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

import { speechService } from "@/services/speechService";
import { toast } from "sonner";

const schema = z.object({
  titleBn: z.string().min(1),
  titleEn: z.string().optional(),
  contentBn: z.string().min(1),
  contentEn: z.string().optional(),
  date: z.string().optional(),
  occasion: z.string().optional(),
  venue: z.string().optional(),
  videoId: z.string().optional(),
  audioId: z.string().optional(),
  source: z.string().optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function NewSpeechPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { published: true, featured: false },
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => speechService.create(payload),
    onSuccess: () => {
      toast.success("Speech created");
      router.push("/admin/speeches");
    },
    onError: (e: any) => toast.error(e.message || "Create failed"),
  });

  return (
    <AdminLayout>
      <AdminPageHeader title="Add Speech" backHref="/admin/speeches" />
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit((d) => createMutation.mutate(d))} className="space-y-6">
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

              <div className="space-y-2">
                <Label>Content (BN) *</Label>
                <Textarea rows={10} {...register("contentBn")} />
              </div>

              <div className="space-y-2">
                <Label>Content (EN)</Label>
                <Textarea rows={10} {...register("contentEn")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" {...register("date")} />
                </div>
                <div className="space-y-2">
                  <Label>Occasion</Label>
                  <Input {...register("occasion")} />
                </div>
                <div className="space-y-2">
                  <Label>Venue</Label>
                  <Input {...register("venue")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Video ID (optional)</Label>
                  <Input {...register("videoId")} placeholder="video UUID" />
                </div>
                <div className="space-y-2">
                  <Label>Audio ID (optional)</Label>
                  <Input {...register("audioId")} placeholder="audio UUID" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Source</Label>
                <Input {...register("source")} />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="published" defaultChecked onCheckedChange={(v) => setValue("published", !!v)} />
                  <Label htmlFor="published">Publish now</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="featured" onCheckedChange={(v) => setValue("featured", !!v)} />
                  <Label htmlFor="featured">Featured</Label>
                </div>
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