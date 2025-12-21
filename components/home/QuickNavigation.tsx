"use client";

import React from "react";
import Link from "next/link";
import {
  Video,
  Image,
  FileText,
  Calendar,
  MapPin,
  Heart,
  Clock,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/videos",
    icon: Video,
    labelBn: "ভিডিও",
    labelEn: "Videos",
    descBn: "বক্তৃতা ও সাক্ষাৎকার",
    descEn: "Speeches & Interviews",
    color: "bg-red-500",
  },
  {
    href: "/photos",
    icon: Image,
    labelBn: "ছবি",
    labelEn: "Photos",
    descBn: "ফটো গ্যালারি",
    descEn: "Photo Gallery",
    color: "bg-blue-500",
  },
  {
    href: "/speeches",
    icon: FileText,
    labelBn: "বক্তৃতা",
    labelEn: "Speeches",
    descBn: "লিখিত বক্তৃতা",
    descEn: "Written Speeches",
    color: "bg-purple-500",
  },
  {
    href: "/timeline",
    icon: Clock,
    labelBn: "টাইমলাইন",
    labelEn: "Timeline",
    descBn: "জীবনের গুরুত্বপূর্ণ মুহূর্ত",
    descEn: "Life Events",
    color: "bg-orange-500",
  },
  {
    href: "/events",
    icon: Calendar,
    labelBn: "ইভেন্ট",
    labelEn: "Events",
    descBn: "জানাযা ও স্মরণসভা",
    descEn: "Janaza & Memorials",
    color: "bg-teal-500",
  },
  {
    href: "/locations",
    icon: MapPin,
    labelBn: "স্থান",
    labelEn: "Locations",
    descBn: "গুরুত্বপূর্ণ স্থান",
    descEn: "Important Places",
    color: "bg-green-500",
  },
  {
    href: "/writings",
    icon: BookOpen,
    labelBn: "লেখালেখি",
    labelEn: "Writings",
    descBn: "প্রবন্ধ ও কবিতা",
    descEn: "Articles & Poems",
    color: "bg-indigo-500",
  },
  {
    href: "/tributes",
    icon: Heart,
    labelBn: "শ্রদ্ধাঞ্জলি",
    labelEn: "Tributes",
    descBn: "শ্রদ্ধাঞ্জলি জানান",
    descEn: "Pay Tribute",
    color: "bg-pink-500",
  },
];

export default function QuickNavigation() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 md:py-20">
      <div className="container-memorial">
        {/* Section Title */}
        <h2 className="section-title-memorial">
          {t("সংগ্রহশালা ঘুরে দেখুন", "Explore the Archive")}
        </h2>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative bg-white rounded-2xl p-6 border shadow-sm card-hover"
            >
              {/* Icon */}
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                  item.color
                )}
              >
                <item.icon className="h-7 w-7 text-white" />
              </div>

              {/* Text */}
              <h3 className="font-bold text-lg mb-1">
                {language === "bn" ? item.labelBn : item.labelEn}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "bn" ? item.descBn : item.descEn}
              </p>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-memorial-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}