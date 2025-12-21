"use client";

import React from "react";
import { Quote as QuoteIcon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function FeaturedQuote() {
  const { t, isBangla } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-memorial-green/5">
      <div className="container-memorial">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote Icon */}
          <div className="w-16 h-16 rounded-full bg-memorial-green/10 flex items-center justify-center mx-auto mb-6">
            <QuoteIcon className="h-8 w-8 text-memorial-green" />
          </div>

          {/* Quote Text */}
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-800 leading-relaxed mb-6">
            {t(
              '"গত ১৪-১৫ বছর ধরে বাংলাদেশে ফ্যাসিবাদ প্রতিষ্ঠিত হয়েছে। আমরা ন্যায়ভিত্তিক রাষ্ট্র গঠনের স্বপ্ন দেখি।"',
              '"Fascism has been established in Bangladesh for the last 14-15 years. We dream of building a justice-based state."'
            )}
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-memorial-green/30" />
            <p className="text-memorial-green font-semibold">
              {t("শহীদ ওসমান হাদি", "Shaheed Osman Hadi")}
            </p>
            <div className="h-px w-12 bg-memorial-green/30" />
          </div>
        </div>
      </div>
    </section>
  );
}