"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { requestService } from "@/services/requestService";
import { toast } from "sonner";

const schema = z.object({
  requestType: z.string().min(1),
  contentType: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  description: z.string().min(10),
  reference: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function RequestsPage() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { requestType: "CONTENT" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await requestService.submit(data);
      toast.success("Request submitted");
    } catch (e: any) {
      toast.error(e.message || "Submit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        titleBn="পাবলিক রিকোয়েস্ট"
        titleEn="Public Request"
        descriptionBn="কন্টেন্ট যোগ, সংশোধন বা তথ্য অনুরোধ পাঠান"
        descriptionEn="Send content/correction/info requests"
        breadcrumbs={[{ labelBn: "রিকোয়েস্ট", labelEn: "Requests" }]}
      />

      <section className="py-10">
        <div className="container-memorial max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Request Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label>Request Type *</Label>
                  <Input {...register("requestType")} placeholder="CONTENT / CORRECTION / GENERAL" />
                  {errors.requestType && <p className="text-sm text-red-500">{errors.requestType.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input {...register("name")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input {...register("email")} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input {...register("phone")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Content Type</Label>
                    <Input {...register("contentType")} placeholder="video/photo/document..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Subject *</Label>
                  <Input {...register("subject")} />
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea rows={6} {...register("description")} />
                </div>

                <div className="space-y-2">
                  <Label>Reference</Label>
                  <Input {...register("reference")} />
                </div>

                <Button className="bg-memorial-green hover:bg-memorial-green/90" disabled={loading} type="submit">
                  {loading ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}