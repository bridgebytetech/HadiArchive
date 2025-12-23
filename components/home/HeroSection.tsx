"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Calendar, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { OSMAN_HADI_INFO } from "@/lib/constants";
import { toBanglaNumber } from "@/lib/utils";

export default function HeroSection() {
  const { t, isBangla } = useLanguage();

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-memorial-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-memorial-dark via-memorial-dark/95 to-memorial-dark" />

      {/* Content */}
      <div className="relative z-10 container-memorial text-center text-white py-20">
        {/* Portrait */}
        <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-memorial-green to-memorial-gold opacity-50 blur-xl" />
          <div className="relative w-full h-full rounded-full border-4 border-white/20 overflow-hidden">
            <Image
              // যদি আপনার লোকাল ফোল্ডারে ছবি থাকে (public/images/osman-hadi-portrait.jpg):
              src="/images/osman-hadi-portrait.jpg" 
              // যদি লোকাল ছবি কাজ না করে, নিচের লাইনটি আনকমেন্ট করুন এবং উপরেরটি কমেন্ট করুন:
              // src="https://placehold.co/600x600/006a4e/ffffff?text=Osman+Hadi"
              alt="শহীদ ওসমান হাদি"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Decorative Ring */}
          <div className="absolute -inset-3 rounded-full border border-white/10 animate-pulse" />
        </div>

        {/* Name */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-white">
            {t("শহীদ", "Shaheed")}
          </span>{" "}
          <span className="text-gradient">
            {t(
              OSMAN_HADI_INFO.fullName.bn,
              OSMAN_HADI_INFO.fullName.en
            )}
          </span>
        </h1>

        {/* Role */}
        <p className="text-xl md:text-2xl text-white/80 mb-6">
          {t(OSMAN_HADI_INFO.role.bn, OSMAN_HADI_INFO.role.en)}
        </p>

        {/* Dates */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white/70 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>
              {isBangla
                ? `${toBanglaNumber(30)} জুন ${toBanglaNumber(1993)}`
                : "30 June 1993"}
            </span>
          </div>
          <span className="hidden md:block">—</span>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-memorial-red" />
            <span className="text-memorial-red">
              {isBangla
                ? `${toBanglaNumber(18)} ডিসেম্বর ${toBanglaNumber(2025)}`
                : "18 December 2025"}
            </span>
          </div>
        </div>

        {/* Burial Place */}
        <div className="flex items-center justify-center gap-2 text-white/60 mb-10">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">
            {t(
              "সমাধি: ঢাকা বিশ্ববিদ্যালয় কেন্দ্রীয় মসজিদ প্রাঙ্গণ",
              "Burial: Dhaka University Central Mosque"
            )}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-memorial-green hover:bg-memorial-green/90 text-white"
          >
            <Link href="/about">
              {t("জীবনী পড়ুন", "Read Biography")}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline-light"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Link href="/videos" className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              {t("ভিডিও দেখুন", "Watch Videos")}
            </Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-white/5 rounded-full" />
      <div className="absolute bottom-40 right-20 w-32 h-32 border border-white/5 rounded-full" />
    </section>
  );
}
