"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  FileText,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout";
import { requestService } from "@/services/requestService";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "নাম অবশ্যই দিতে হবে"),
  email: z.string().email("সঠিক ইমেইল দিন"),
  phone: z.string().optional(),
  requestType: z.string().min(1, "ধরন নির্বাচন করুন"),
  subject: z.string().min(5, "বিষয় অবশ্যই দিতে হবে"),
  description: z.string().min(20, "অন্তত ২০ অক্ষর লিখুন"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const requestTypes = [
  { value: "GENERAL", labelBn: "সাধারণ জিজ্ঞাসা", labelEn: "General Inquiry" },
  { value: "CONTENT", labelBn: "কন্টেন্ট জমা", labelEn: "Content Submission" },
  { value: "CORRECTION", labelBn: "সংশোধন", labelEn: "Correction" },
  { value: "MEDIA", labelBn: "মিডিয়া অনুরোধ", labelEn: "Media Request" },
  { value: "COLLABORATION", labelBn: "সহযোগিতা", labelEn: "Collaboration" },
  { value: "OTHER", labelBn: "অন্যান্য", labelEn: "Other" },
];

export default function ContactPage() {
  const { t, language, isBangla } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await requestService.submit(data);
      setIsSuccess(true);
      toast.success(
        t("বার্তা সফলভাবে পাঠানো হয়েছে", "Message sent successfully")
      );
    } catch (error: any) {
      toast.error(
        error.message || t("কিছু ভুল হয়েছে", "Something went wrong")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-10 pb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {t("ধন্যবাদ!", "Thank You!")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t(
                "আপনার বার্তা আমাদের কাছে পৌঁছেছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
                "Your message has reached us. We will contact you soon."
              )}
            </p>
            <Button asChild className="bg-memorial-green hover:bg-memorial-green/90">
              <Link href="/">
                {t("হোমে যান", "Go Home")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        titleBn="যোগাযোগ"
        titleEn="Contact Us"
        descriptionBn="আমাদের সাথে যোগাযোগ করুন অথবা কন্টেন্ট শেয়ার করুন"
        descriptionEn="Contact us or share content with the archive"
        breadcrumbs={[{ labelBn: "যোগাযোগ", labelEn: "Contact" }]}
      />

      <section className="py-8 md:py-12">
        <div className="container-memorial">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Info Cards */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    {t("যোগাযোগের তথ্য", "Contact Information")}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-memorial-green mt-1" />
                      <div>
                        <p className="font-medium">{t("ইমেইল", "Email")}</p>
                        <a
                          href="mailto:support@bridgebytetech.com"
                          className="text-sm text-muted-foreground hover:text-memorial-green"
                        >
                          support@bridgebytetech.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-memorial-green mt-1" />
                      <div>
                        <p className="font-medium">{t("ফোন", "Phone")}</p>
                        <p className="text-sm text-muted-foreground">
                          +33 749797394
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-memorial-green mt-1" />
                      <div>
                        <p className="font-medium">{t("ঠিকানা", "Address")}</p>
                        <p className="text-sm text-muted-foreground">
                          {t("ঢাকা, বাংলাদেশ", "Dhaka, Bangladesh")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    {t("সামাজিক মাধ্যম", "Social Media")}
                  </h3>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://www.facebook.com/bridgebytetech"
                      className="text-muted-foreground hover:text-memorial-green transition-colors"
                    >
                      Facebook Page
                    </a>
                    <a
                      href="https://www.youtube.com/@bridgebytetech"
                      className="text-muted-foreground hover:text-memorial-green transition-colors"
                    >
                      YouTube Channel
                    </a>
                    <a
                      href="https://www.instagram.com/bridgebytetech/"
                      className="text-muted-foreground hover:text-memorial-green transition-colors"
                    >
                      Instagram
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-memorial-green" />
                    {t("বার্তা পাঠান", "Send Message")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {t("আপনার নাম", "Your Name")} *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder={t("পূর্ণ নাম", "Full Name")}
                            className="pl-10"
                            {...register("name")}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-sm text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {t("ইমেইল", "Email")} *
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="example@mail.com"
                            className="pl-10"
                            {...register("email")}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {t("ফোন (ঐচ্ছিক)", "Phone (Optional)")}
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            placeholder="+880..."
                            className="pl-10"
                            {...register("phone")}
                          />
                        </div>
                      </div>

                      {/* Request Type */}
                      <div className="space-y-2">
                        <Label>{t("বিষয় ধরন", "Subject Type")} *</Label>
                        <Select
                          onValueChange={(value) => setValue("requestType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("নির্বাচন করুন", "Select")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {requestTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {isBangla ? type.labelBn : type.labelEn}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.requestType && (
                          <p className="text-sm text-red-500">
                            {errors.requestType.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        {t("বিষয়", "Subject")} *
                      </Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="subject"
                          placeholder={t("বার্তার বিষয়", "Message Subject")}
                          className="pl-10"
                          {...register("subject")}
                        />
                      </div>
                      {errors.subject && (
                        <p className="text-sm text-red-500">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        {t("বিস্তারিত বার্তা", "Detailed Message")} *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder={t("আপনার বার্তা লিখুন...", "Write your message...")}
                        rows={6}
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className="text-sm text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-memorial-green hover:bg-memorial-green/90"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          {t("পাঠানো হচ্ছে...", "Sending...")}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t("বার্তা পাঠান", "Send Message")}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}