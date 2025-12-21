"use client";

import React from "react";
import Link from "next/link";
import { Heart, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export default function CallToAction() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-memorial-green">
      <div className="container-memorial">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🕊️</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t(
              "তাঁর স্মৃতি রক্ষায় অংশ নিন",
              "Join Us in Preserving His Memory"
            )}
          </h2>

          {/* Description */}
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t(
              "আপনার কাছে যদি শহীদ ওসমান হাদির কোনো ছবি, ভিডিও বা স্মৃতি থাকে, আমাদের সাথে শেয়ার করুন।",
              "If you have any photos, videos or memories of Shaheed Osman Hadi, please share with us."
            )}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-memorial-green hover:bg-white/90"
            >
              <Link href="/tributes/submit">
                <Heart className="h-5 w-5 mr-2" />
                {t("শ্রদ্ধাঞ্জলি জানান", "Pay Tribute")}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/contact">
                <Mail className="h-5 w-5 mr-2" />
                {t("যোগাযোগ করুন", "Contact Us")}
              </Link>
            </Button>
          </div>

          {/* Social/Contact */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/60 mb-4">
              {t("সামাজিক মাধ্যমে আমাদের অনুসরণ করুন", "Follow us on social media")}
            </p>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                Facebook
              </a>
              <span className="text-white/30">•</span>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <span className="text-white/30">•</span>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}