"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { cn, toBanglaNumber } from "@/lib/utils";

const timelineEvents = [
  {
    year: "1993",
    titleBn: "জন্ম",
    titleEn: "Birth",
    descBn: "নলছিটি, ঝালকাঠিতে জন্মগ্রহণ",
    descEn: "Born in Nalchiti, Jhalokati",
    color: "bg-green-500",
  },
  {
    year: "2010",
    titleBn: "ঢাবিতে ভর্তি",
    titleEn: "DU Admission",
    descBn: "ঢাকা বিশ্ববিদ্যালয়ে রাষ্ট্রবিজ্ঞান বিভাগে ভর্তি",
    descEn: "Admitted to DU Political Science",
    color: "bg-blue-500",
  },
  {
    year: "2024",
    titleBn: "জুলাই বিপ্লব",
    titleEn: "July Revolution",
    descBn: "জুলাই গণঅভ্যুত্থানে সক্রিয় ভূমিকা",
    descEn: "Active role in July uprising",
    color: "bg-orange-500",
  },
  {
    year: "2024",
    titleBn: "ইনকিলাব মঞ্চ",
    titleEn: "Inqilab Moncho",
    descBn: "ইনকিলাব মঞ্চের মুখপাত্র হিসেবে দায়িত্ব গ্রহণ",
    descEn: "Became spokesperson of Inqilab Moncho",
    color: "bg-purple-500",
  },
  {
    year: "2025",
    titleBn: "শাহাদাত",
    titleEn: "Martyrdom",
    descBn: "১৮ ডিসেম্বর গুপ্তহত্যায় শহীদ",
    descEn: "Martyred on December 18",
    color: "bg-red-500",
  },
];

export default function TimelineSummary() {
  const { t, language, isBangla } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-memorial-dark text-white">
      <div className="container-memorial">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {t("জীবনের টাইমলাইন", "Life Timeline")}
          </h2>
          <p className="text-white/60">
            {t(
              "একটি সংক্ষিপ্ত জীবনের দীর্ঘ পথচলা",
              "A long journey of a brief life"
            )}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={cn(
                  "relative md:w-1/2 md:pr-12",
                  index % 2 === 0 ? "md:ml-auto md:pl-12 md:pr-0" : ""
                )}
              >
                {/* Connector Dot */}
                <div
                  className={cn(
                    "hidden md:block absolute top-4 w-4 h-4 rounded-full border-4 border-memorial-dark",
                    event.color,
                    index % 2 === 0 ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
                  )}
                />

                {/* Card */}
                <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    {/* Mobile Dot */}
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full mt-2 flex-shrink-0 md:hidden",
                        event.color
                      )}
                    />

                    <div>
                      {/* Year */}
                      <span className="text-memorial-gold font-bold text-lg">
                        {isBangla ? toBanglaNumber(event.year) : event.year}
                      </span>

                      {/* Title */}
                      <h3 className="font-semibold text-xl mt-1">
                        {language === "bn" ? event.titleBn : event.titleEn}
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 mt-2">
                        {language === "bn" ? event.descBn : event.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-memorial-green hover:bg-memorial-green/90"
          >
            <Link href="/timeline">
              {t("সম্পূর্ণ টাইমলাইন দেখুন", "View Full Timeline")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}