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

import { quoteService } from "@/services/quoteService";
import { toast } from "sonner";

const schema = z.object({
  quoteBn: z.string().min(1),
  quoteEn: z.string().optional(),
  contextBn: z.string().optional(),
  contextEn: z.string().optional(),
  date: z.string().optional(),
  source: z.string().optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function NewQuotePage() {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { published: true, featured: false },
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => quoteService.create(payload),
    onSuccess: () => {
      toast.success("Quote created");
      router.push("/admin/quotes");
    },
    onError: (e: any) => toast.error(e.message || "Create failed"),
  });

  return (
    <AdminLayout>
      <AdminPageHeader title="Add Quote" backHref="/admin/quotes" />
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit((d) => createMutation.mutate(d))} className="space-y-6">
              <div className="space-y-2">
                <Label>Quote (BN) *</Label>
                <Textarea rows={4} {...register("quoteBn")} />
              </div>
              <div className="space-y-2">
                <Label>Quote (EN)</Label>
                <Textarea rows={4} {...register("quoteEn")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Context (BN)</Label>
                  <Input {...register("contextBn")} />
                </div>
                <div className="space-y-2">
                  <Label>Context (EN)</Label>
                  <Input {...register("contextEn")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" {...register("date")} />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Input {...register("source")} />
                </div>
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