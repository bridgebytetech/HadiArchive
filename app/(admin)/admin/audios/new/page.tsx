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

import { audioService } from "@/services/audioService";
import { toast } from "sonner";

const schema = z.object({
  titleBn: z.string().min(1),
  titleEn: z.string().optional(),
  descriptionBn: z.string().optional(),
  descriptionEn: z.string().optional(),
  audioUrl: z.string().min(1),
  audioType: z.string().optional(),
  duration: z.string().optional(),
  date: z.string().optional(),
  source: z.string().optional(),
  transcriptBn: z.string().optional(),
  transcriptEn: z.string().optional(),
  published: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

export default function NewAudioPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { published: true },
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => audioService.create(payload),
    onSuccess: () => {
      toast.success("Audio created");
      router.push("/admin/audios");
    },
    onError: (e: any) => toast.error(e.message || "Create failed"),
  });

  return (
    <AdminLayout>
      <AdminPageHeader title="Add Audio" backHref="/admin/audios" />
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
                <Label>Audio URL *</Label>
                <Input {...register("audioUrl")} placeholder="https://..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Audio Type</Label>
                  <Input {...register("audioType")} placeholder="SPEECH/INTERVIEW/..." />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" {...register("date")} />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input {...register("duration")} placeholder="15:30" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Description (BN)</Label>
                  <Textarea rows={4} {...register("descriptionBn")} />
                </div>
                <div className="space-y-2">
                  <Label>Description (EN)</Label>
                  <Textarea rows={4} {...register("descriptionEn")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Transcript (BN)</Label>
                  <Textarea rows={6} {...register("transcriptBn")} />
                </div>
                <div className="space-y-2">
                  <Label>Transcript (EN)</Label>
                  <Textarea rows={6} {...register("transcriptEn")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Source</Label>
                <Input {...register("source")} />
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