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

import { poemService } from "@/services/poemService";
import { toast } from "sonner";

const schema = z.object({
  titleBn: z.string().min(1),
  titleEn: z.string().optional(),
  contentBn: z.string().min(1),
  contentEn: z.string().optional(),
  date: z.string().optional(),
  dedicatedTo: z.string().optional(),
  source: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function EditPoemPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["adminPoem", id],
    queryFn: () => poemService.adminGetById(id),
  });

  const { register, handleSubmit, setValue, reset, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { published: false, featured: false },
  });

  React.useEffect(() => {
    if (data) {
      reset({
        titleBn: data.titleBn,
        titleEn: data.titleEn || "",
        contentBn: data.contentBn || "",
        contentEn: data.contentEn || "",
        date: data.date || "",
        dedicatedTo: data.dedicatedTo || "",
        source: data.source || "",
        published: !!data.published,
        featured: !!data.featured,
      });
    }
  }, [data, reset]);

  const updateMutation = useMutation({
    mutationFn: (payload: any) => poemService.update(id, payload),
    onSuccess: () => {
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: ["adminPoems"] });
      qc.invalidateQueries({ queryKey: ["adminPoem", id] });
    },
    onError: (e: any) => toast.error(e.message || "Update failed"),
  });

  if (isLoading || !data) {
    return (
      <AdminLayout>
        <AdminPageHeader title="Edit Poem" backHref="/admin/poems" />
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader title="Edit Poem" backHref="/admin/poems" />
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit((f) => updateMutation.mutate({ ...data, ...f }))} className="space-y-6">
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
                  <Label>Dedicated To</Label>
                  <Input {...register("dedicatedTo")} />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Input {...register("source")} />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="published" defaultChecked={data.published} onCheckedChange={(v) => setValue("published", !!v)} />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="featured" defaultChecked={data.featured} onCheckedChange={(v) => setValue("featured", !!v)} />
                  <Label htmlFor="featured">Featured</Label>
                </div>
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