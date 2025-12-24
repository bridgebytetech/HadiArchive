"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { quoteService } from "@/services/quoteService";
import { toast } from "sonner";

const schema = z.object({
  quoteBn: z.string().min(1, "উক্তিটি বাংলায় লিখুন"),
  quoteEn: z.string().optional(),
  contextBn: z.string().optional(),
  contextEn: z.string().optional(),
  date: z.string().optional(),
  source: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export default function EditQuotePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const qc = useQueryClient();

  // ডাটা লোড করা
  const { data: quote, isLoading } = useQuery({
    queryKey: ["adminQuote", id],
    queryFn: () => quoteService.adminGetById(id),
  });

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  // ডাটা আসার পর ফর্ম রিসেট
  useEffect(() => {
    if (quote) reset(quote);
  }, [quote, reset]);

  // আপডেট মিউটেশন
  const updateMutation = useMutation({
    mutationFn: (data: any) => quoteService.update(id, data),
    onSuccess: () => {
      toast.success("উক্তিটি আপডেট হয়েছে");
      qc.invalidateQueries({ queryKey: ["adminQuotes"] });
      router.push("/admin/quotes");
    },
    onError: (error: any) => toast.error(error.message),
  });

  if (isLoading || !quote) return <AdminLayout><div className="p-6">লোড হচ্ছে...</div></AdminLayout>;

  return (
    <AdminLayout>
      <AdminPageHeader title="উক্তি এডিট করুন" backHref="/admin/quotes" />
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-6">
              <div className="space-y-2">
                <Label>Quote (বাংলা) *</Label>
                <Textarea {...register("quoteBn")} rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Quote (English)</Label>
                <Textarea {...register("quoteEn")} rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>প্রেক্ষাপট (বাংলা)</Label><Input {...register("contextBn")} /></div>
                <div className="space-y-2"><Label>তারিখ</Label><Input type="date" {...register("date")} /></div>
              </div>
              <div className="space-y-2"><Label>উৎস</Label><Input {...register("source")} /></div>
              
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="published" checked={quote.published} onCheckedChange={(v) => setValue("published", !!v)} />
                  <Label htmlFor="published">পাবলিশ করুন</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="featured" checked={quote.featured} onCheckedChange={(v) => setValue("featured", !!v)} />
                  <Label htmlFor="featured">ফিচারড করুন</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>বাতিল</Button>
                <Button disabled={isSubmitting} className="bg-memorial-green">সেভ করুন</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
