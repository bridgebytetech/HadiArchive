"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Heart,
  User,
  Mail,
  MapPin,
  MessageSquare,
  Upload,
  CheckCircle,
  ArrowLeft,
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
import { tributeService } from "@/services/tributeService";
import { useLanguage } from "@/hooks/useLanguage";
import { TRIBUTE_TYPES } from "@/lib/constants";
import { toast } from "sonner";

const tributeSchema = z.object({
  authorName: z.string().min(2, "নাম অবশ্যই দিতে হবে"),
  authorEmail: z.string().email("সঠিক ইমেইল দিন").optional().or(z.literal("")),
  authorLocation: z.string().optional(),
  authorRelation: z.string().optional(),
  tributeType: z.string().optional(),
  contentBn: z.string().min(20, "অন্তত ২০ অক্ষর লিখুন"),
  contentEn: z.string().optional(),
});

type TributeFormData = z.infer<typeof tributeSchema>;

export default function SubmitTributePage() {
  const router = useRouter();
  const { t, language, isBangla } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TributeFormData>({
    resolver: zodResolver(tributeSchema),
  });

  const onSubmit = async (data: TributeFormData) => {
    setIsSubmitting(true);
    try {
      await tributeService.submit(data);
      setIsSuccess(true);
      toast.success(t(
        "শ্রদ্ধাঞ্জলি সফলভাবে জমা হয়েছে",
        "Tribute submitted successfully"
      ));
    } catch (error: any) {
      toast.error(error.message || t("কিছু ভুল হয়েছে", "Something went wrong"));
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
                "আপনার শ্রদ্ধাঞ্জলি সফলভাবে জমা হয়েছে। অনুমোদনের পর এটি প্রকাশিত হবে।",
                "Your tribute has been submitted successfully. It will be published after approval."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/tributes">
                  {t("শ্রদ্ধাঞ্জলি দেখুন", "View Tributes")}
                </Link>
              </Button>
              <Button asChild className="bg-memorial-green hover:bg-memorial-green/90">
                <Link href="/">
                  {t("হোমে যান", "Go Home")}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        titleBn="শ্রদ্ধাঞ্জলি জানান"
        titleEn="Pay Tribute"
        descriptionBn="শহীদ ওসমান হাদির প্রতি আপনার শ্রদ্ধা ও ভালোবাসার বার্তা শেয়ার করুন"
        descriptionEn="Share your message of respect and love for Shaheed Osman Hadi"
        breadcrumbs={[
          { labelBn: "শ্রদ্ধাঞ্জলি", labelEn: "Tributes", href: "/tributes" },
          { labelBn: "জমা দিন", labelEn: "Submit" },
        ]}
      />

      <section className="py-8 md:py-12">
        <div className="container-memorial">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-memorial-green" />
                  {t("শ্রদ্ধাঞ্জলি ফর্ম", "Tribute Form")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="authorName">
                      {t("আপনার নাম", "Your Name")} *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="authorName"
                        placeholder={t("পূর্ণ নাম লিখুন", "Enter your full name")}
                        className="pl-10"
                        {...register("authorName")}
                      />
                    </div>
                    {errors.authorName && (
                      <p className="text-sm text-red-500">
                        {errors.authorName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="authorEmail">
                      {t("ইমেইল (ঐচ্ছিক)", "Email (Optional)")}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="authorEmail"
                        type="email"
                        placeholder={t("ইমেইল ঠিকানা", "Email address")}
                        className="pl-10"
                        {...register("authorEmail")}
                      />
                    </div>
                    {errors.authorEmail && (
                      <p className="text-sm text-red-500">
                        {errors.authorEmail.message}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="authorLocation">
                      {t("অবস্থান (ঐচ্ছিক)", "Location (Optional)")}
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="authorLocation"
                        placeholder={t("শহর, দেশ", "City, Country")}
                        className="pl-10"
                        {...register("authorLocation")}
                      />
                    </div>
                  </div>

                  {/* Relation */}
                  <div className="space-y-2">
                    <Label htmlFor="authorRelation">
                      {t("সম্পর্ক (ঐচ্ছিক)", "Relation (Optional)")}
                    </Label>
                    <Input
                      id="authorRelation"
                      placeholder={t(
                        "যেমন: বন্ধু, সহকর্মী, সমর্থক",
                        "e.g., Friend, Colleague, Supporter"
                      )}
                      {...register("authorRelation")}
                    />
                  </div>

                  {/* Tribute Type */}
                  <div className="space-y-2">
                    <Label>{t("শ্রদ্ধাঞ্জলির ধরন", "Tribute Type")}</Label>
                    <Select onValueChange={(value) => setValue("tributeType", value)}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("ধরন নির্বাচন করুন", "Select type")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {TRIBUTE_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {isBangla ? type.labelBn : type.labelEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Content (Bangla) */}
                  <div className="space-y-2">
                    <Label htmlFor="contentBn">
                      {t("আপনার বার্তা (বাংলায়)", "Your Message (in Bangla)")} *
                    </Label>
                    <Textarea
                      id="contentBn"
                      placeholder={t(
                        "আপনার স্মৃতি, শ্রদ্ধা বা বার্তা লিখুন...",
                        "Write your memory, tribute or message..."
                      )}
                      rows={6}
                      {...register("contentBn")}
                    />
                    {errors.contentBn && (
                      <p className="text-sm text-red-500">
                        {errors.contentBn.message}
                      </p>
                    )}
                  </div>

                  {/* Content (English - Optional) */}
                  <div className="space-y-2">
                    <Label htmlFor="contentEn">
                      {t(
                        "ইংরেজি অনুবাদ (ঐচ্ছিক)",
                        "English Translation (Optional)"
                      )}
                    </Label>
                    <Textarea
                      id="contentEn"
                      placeholder="English translation of your message..."
                      rows={4}
                      {...register("contentEn")}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="sm:flex-1"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t("বাতিল", "Cancel")}
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="sm:flex-1 bg-memorial-green hover:bg-memorial-green/90"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          {t("জমা হচ্ছে...", "Submitting...")}
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4 mr-2" />
                          {t("শ্রদ্ধাঞ্জলি জমা দিন", "Submit Tribute")}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Note */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {t(
                "আপনার শ্রদ্ধাঞ্জলি অনুমোদনের পর প্রকাশিত হবে।",
                "Your tribute will be published after approval."
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}