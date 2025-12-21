"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/layout";
import { useLanguage } from "@/hooks/useLanguage";
import { OSMAN_HADI_INFO } from "@/lib/constants";
import { toBanglaNumber } from "@/lib/utils";

export default function AboutPage() {
  const { t, isBangla } = useLanguage();

  return (
    <>
      <PageHeader
        titleBn="জীবনী"
        titleEn="Biography"
        descriptionBn="শহীদ শরীফ ওসমান বিন হাদির জীবন ও কর্ম"
        descriptionEn="Life and work of Shaheed Sharif Osman Bin Hadi"
        breadcrumbs={[{ labelBn: "জীবনী", labelEn: "Biography" }]}
      />

      <section className="py-8 md:py-12">
        <div className="container-memorial">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Portrait */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/osman-hadi-portrait.jpg"
                    alt="শহীদ ওসমান হাদি"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Quick Info */}
                <Card className="mt-6">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-memorial-green mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("জন্ম", "Birth")}
                        </p>
                        <p className="font-medium">
                          {isBangla
                            ? `${toBanglaNumber(30)} জুন ${toBanglaNumber(1993)}`
                            : "30 June 1993"}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-memorial-green mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("জন্মস্থান", "Birthplace")}
                        </p>
                        <p className="font-medium">
                          {t(
                            OSMAN_HADI_INFO.birthPlace.bn,
                            OSMAN_HADI_INFO.birthPlace.en
                          )}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-memorial-red mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("শাহাদাত", "Martyrdom")}
                        </p>
                        <p className="font-medium text-memorial-red">
                          {isBangla
                            ? `${toBanglaNumber(18)} ডিসেম্বর ${toBanglaNumber(2025)}`
                            : "18 December 2025"}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-memorial-green mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("সমাধি", "Burial")}
                        </p>
                        <p className="font-medium">
                          {t(
                            OSMAN_HADI_INFO.burialPlace.bn,
                            OSMAN_HADI_INFO.burialPlace.en
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Biography Content */}
            <div className="lg:col-span-2">
              {/* Name & Title */}
              <div className="mb-8">
                <Badge variant="memorial" className="mb-3">
                  {t("শহীদ", "Shaheed")}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-memorial-green mb-2">
                  {t(
                    OSMAN_HADI_INFO.fullName.bn,
                    OSMAN_HADI_INFO.fullName.en
                  )}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {t(OSMAN_HADI_INFO.role.bn, OSMAN_HADI_INFO.role.en)}
                </p>
              </div>

              {/* Introduction */}
              <div className="prose prose-gray max-w-none mb-10">
                <p className="text-lg leading-relaxed">
                  {t(
                    `শরীফ ওসমান বিন হাদি, যিনি ওসমান গণি নামেও পরিচিত, ছিলেন একজন বাংলাদেশি রাজনীতিবিদ, শিক্ষক ও সমাজকর্মী। তিনি ইনকিলাব মঞ্চের মুখপাত্র এবং ২০২৪ সালের জুলাই গণঅভ্যুত্থানের অন্যতম সংগঠক হিসেবে পরিচিত ছিলেন। ২০২৫ সালের ১২ই ডিসেম্বর তিনি ঢাকার পল্টনে গুপ্তহত্যার শিকার হন এবং ১৮ই ডিসেম্বর সিঙ্গাপুর জেনারেল হাসপাতালে শেষ নিঃশ্বাস ত্যাগ করেন।`,
                    `Sharif Osman Bin Hadi, also known as Osman Goni, was a Bangladeshi politician, teacher, and social activist. He was known as the spokesperson of Inqilab Moncho and one of the key organizers of the July 2024 mass uprising. On December 12, 2025, he was assassinated in Paltan, Dhaka, and breathed his last at Singapore General Hospital on December 18.`
                  )}
                </p>
              </div>

              {/* Early Life */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-memorial-green" />
                  {t("প্রারম্ভিক জীবন ও শিক্ষা", "Early Life & Education")}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    {t(
                      `ওসমান হাদি ১৯৯৩ সালের ৩০শে জুন ঝালকাঠি জেলার নলছিটি উপজেলায় জন্মগ্রহণ করেন। তাঁর পিতা ছিলেন একজন মাদ্রাসা শিক্ষক ও স্থানীয় ইমাম। ছয় ভাইবোনের মধ্যে তিনি ছিলেন সর্বকনিষ্ঠ। ধর্মীয় পরিবেশে বেড়ে ওঠা ওসমান হাদি ঝালকাঠি এন এস কামিল মাদ্রাসা থেকে আলিম পরীক্ষায় উত্তীর্ণ হন। পরবর্তীতে তিনি ২০১০-২০১১ শিক্ষাবর্ষে ঢাকা বিশ্ববিদ্যালয়ের রাষ্ট্রবিজ্ঞান বিভাগে ভর্তি হন।`,
                      `Osman Hadi was born on June 30, 1993, in Nalchiti Upazila of Jhalokati District. His father was a madrasa teacher and local imam. He was the youngest of six siblings. Growing up in a religious environment, Osman Hadi passed the Alim examination from Jhalokati NS Kamil Madrasa. He later enrolled in the Political Science Department of Dhaka University in the 2010-2011 academic year.`
                    )}
                  </p>
                </div>
              </div>

              {/* Career */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-memorial-green" />
                  {t("পেশাগত জীবন", "Professional Life")}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    {t(
                      `ঢাকা বিশ্ববিদ্যালয় থেকে পড়াশোনা শেষ করার পর তিনি ইউনিভার্সিটি অব স্কলার্সে বিজনেস স্টাডিজ বিভাগে প্রভাষক হিসেবে যোগদান করেন। শিক্ষকতার পাশাপাশি তিনি সামাজিক ও রাজনৈতিক কর্মকাণ্ডে সক্রিয় ছিলেন।`,
                      `After completing his studies at Dhaka University, he joined the University of Scholars as a lecturer in the Business Studies Department. Alongside teaching, he was actively involved in social and political activities.`
                    )}
                  </p>
                </div>
              </div>

              {/* Political Life */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6 text-memorial-green" />
                  {t("রাজনৈতিক জীবন", "Political Life")}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    {t(
                      `২০২৪ সালের জুলাই বিপ্লবের সময় তিনি রামপুরা এলাকার সমন্বয়কারী হিসেবে গুরুত্বপূর্ণ ভূমিকা পালন করেন। ৫ই আগস্ট শেখ হাসিনার পতনের পর তিনি ইনকিলাব মঞ্চের অন্যতম প্রতিষ্ঠাতা হিসেবে আত্মপ্রকাশ করেন এবং ১৩ই আগস্ট থেকে সংগঠনের মুখপাত্র হিসেবে দায়িত্ব পালন শুরু করেন। তিনি আওয়ামী লীগকে সাংবিধানিকভাবে রাজনীতি থেকে নিষিদ্ধ করার দাবিতে সোচ্চার ছিলেন এবং ২০২৬ সালের জাতীয় নির্বাচনে ঢাকা-৮ আসন থেকে স্বতন্ত্র প্রার্থী হিসেবে প্রতিদ্বন্দ্বিতা করার ঘোষণা দিয়েছিলেন।`,
                      `During the July 2024 revolution, he played an important role as the coordinator of the Rampura area. After the fall of Sheikh Hasina on August 5, he emerged as one of the founders of Inqilab Moncho and began serving as the spokesperson of the organization from August 13. He was vocal in demanding the constitutional ban of Awami League from politics and had announced his candidacy as an independent candidate from Dhaka-8 constituency in the 2026 national election.`
                    )}
                  </p>
                </div>
              </div>

              {/* Martyrdom */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-memorial-red">
                  <Heart className="h-6 w-6" />
                  {t("শাহাদাত", "Martyrdom")}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    {t(
                      `২০২৫ সালের ১২ই ডিসেম্বর বিকেল ২:২৫ মিনিটে ঢাকার বিজয়নগর/পল্টনের বক্স কালভার্ট এলাকায় মসজিদ থেকে বের হওয়ার সময় মোটরসাইকেলে আগত দুই আততায়ীর গুলিতে তিনি মারাত্মকভাবে আহত হন। মাথায় গুলিবিদ্ধ হওয়ায় তাঁকে প্রথমে ঢাকা মেডিকেল কলেজ হাসপাতালে, পরে এভারকেয়ার হাসপাতালে এবং সবশেষে ১৫ই ডিসেম্বর এয়ার অ্যাম্বুলেন্সে সিঙ্গাপুর জেনারেল হাসপাতালে স্থানান্তর করা হয়। মারাত্মক মস্তিষ্কের আঘাতের কারণে ১৮ই ডিসেম্বর তিনি সিঙ্গাপুরে শেষ নিঃশ্বাস ত্যাগ করেন।`,
                      `On December 12, 2025, at 2:25 PM, he was seriously injured when two assailants on a motorcycle shot him near the Box Culvert area of Bijoynagar/Paltan, Dhaka, as he was leaving a mosque. Due to a gunshot wound to the head, he was first taken to Dhaka Medical College Hospital, then to Evercare Hospital, and finally transferred to Singapore General Hospital by air ambulance on December 15. Due to massive brain injury, he breathed his last in Singapore on December 18.`
                    )}
                  </p>
                </div>
              </div>

              {/* Janaza & Burial */}
              <div className="p-6 bg-memorial-green/5 rounded-2xl border border-memorial-green/20 mb-10">
                <h3 className="text-xl font-bold mb-4">
                  {t("জানাযা ও দাফন", "Janaza & Burial")}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t(
                    `২০শে ডিসেম্বর ২০২৫ তারিখে জাতীয় সংসদ ভবনের দক্ষিণ প্লাজায় (মানিক মিয়া এভিনিউ) যোহরের নামাজের পর তাঁর জানাযার নামাজ অনুষ্ঠিত হয়, যেখানে লক্ষ লক্ষ মানুষ অংশগ্রহণ করেন। তাঁকে জাতীয় কবি কাজী নজরুল ইসলামের সমাধিস্থলের পাশে ঢাকা বিশ্ববিদ্যালয় কেন্দ্রীয় মসজিদ প্রাঙ্গণে সমাহিত করা হয়।`,
                    `On December 20, 2025, his Janaza prayer was held at the South Plaza of the National Parliament (Manik Mia Avenue) after Zuhr prayers, attended by millions of people. He was buried next to the tomb of National Poet Kazi Nazrul Islam at the Dhaka University Central Mosque premises.`
                  )}
                </p>
                <Button asChild variant="outline">
                  <Link href="/events">
                    {t("জানাযার ছবি ও ভিডিও দেখুন", "View Janaza Photos & Videos")}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-memorial-green hover:bg-memorial-green/90">
                  <Link href="/timeline">
                    {t("সম্পূর্ণ টাইমলাইন দেখুন", "View Full Timeline")}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/videos">
                    {t("ভিডিও দেখুন", "Watch Videos")}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/tributes/submit">
                    {t("শ্রদ্ধাঞ্জলি জানান", "Pay Tribute")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}