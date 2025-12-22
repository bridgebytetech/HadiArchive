"use client";

import React from "react";
import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ExternalLink,
  Code,
  Shield
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { OSMAN_HADI_INFO, SITE_CONFIG } from "@/lib/constants";

const footerLinks = {
  media: [
    { href: "/videos", labelBn: "ভিডিও", labelEn: "Videos" },
    { href: "/photos", labelBn: "ছবি", labelEn: "Photos" },
    { href: "/audios", labelBn: "অডিও", labelEn: "Audios" },
  ],
  content: [
    { href: "/speeches", labelBn: "বক্তৃতা", labelEn: "Speeches" },
    { href: "/writings", labelBn: "লেখালেখি", labelEn: "Writings" },
    { href: "/poems", labelBn: "কবিতা", labelEn: "Poems" },
    { href: "/quotes", labelBn: "উক্তি", labelEn: "Quotes" },
  ],
  explore: [
    { href: "/about", labelBn: "জীবনী", labelEn: "Biography" },
    { href: "/timeline", labelBn: "টাইমলাইন", labelEn: "Timeline" },
    { href: "/events", labelBn: "ইভেন্ট", labelEn: "Events" },
    { href: "/locations", labelBn: "স্থান", labelEn: "Locations" },
  ],
  others: [
    { href: "/tributes", labelBn: "শ্রদ্ধাঞ্জলি", labelEn: "Tributes" },
    { href: "/news", labelBn: "সংবাদ", labelEn: "News" },
    { href: "/contact", labelBn: "যোগাযোগ", labelEn: "Contact" },
    { href: "/documents", labelBn: "ডকুমেন্টস", labelEn: "Documents" },
    { href: "/social-posts", labelBn: "সোশ্যাল পোস্ট", labelEn: "Social Posts" },
    { href: "/requests", labelBn: "রিকোয়েস্ট", labelEn: "Requests" },
  ],
};

const socialLinks = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
];

const developerInfo = {
  name: "Bridge Byte Tech",
  website: "https://www.bridgebytetech.com",
  facebook: "https://www.facebook.com/bridgebytetech",
  instagram: "https://www.instagram.com/bridgebytetech",
  youtube: "https://www.youtube.com/@bridgebytetech",
  linkedin: "https://www.linkedin.com/company/108645484",
};

const collaboratorInfo = {
  name: "Dangerous Force",
  website: "https://www.dangerousforce.com",
  facebook: "https://www.facebook.com/DangerousForce.Official",
};

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-memorial-dark text-white">
      {/* Main Footer */}
      <div className="container-memorial py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-2xl">🕊️</span>
              </div>
              <div>
                <h2 className="font-bold text-xl">
                  {t("ওসমান হাদি", "Osman Hadi")}
                </h2>
                <p className="text-sm text-white/60">
                  {t("স্মৃতি সংগ্রহশালা", "Memorial Archive")}
                </p>
              </div>
            </Link>
            
            <p className="text-white/70 mb-6 max-w-md">
              {t(
                "শহীদ শরীফ ওসমান বিন হাদির জীবন, কর্ম ও আদর্শের ডিজিটাল সংগ্রহশালা। তাঁর স্মৃতি চিরজাগ্রত থাকুক।",
                "Digital archive preserving the life, work and ideals of Shaheed Sharif Osman Bin Hadi. May his memory live forever."
              )}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-memorial-green transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold mb-4 text-memorial-gold">
              {t("মিডিয়া", "Media")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.media.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {language === "bn" ? link.labelBn : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-memorial-gold">
              {t("লেখনী", "Writings")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {language === "bn" ? link.labelBn : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-memorial-gold">
              {t("আরও দেখুন", "Explore")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {language === "bn" ? link.labelBn : link.labelEn}
                  </Link>
                </li>
              ))}
              {footerLinks.others.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {language === "bn" ? link.labelBn : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tribute CTA */}
        <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-1">
                {t("তাঁর স্মৃতিতে শ্রদ্ধাঞ্জলি জানান", "Pay Tribute to His Memory")}
              </h3>
              <p className="text-white/60">
                {t(
                  "আপনার স্মৃতি ও শ্রদ্ধাঞ্জলি শেয়ার করুন",
                  "Share your memories and tributes"
                )}
              </p>
            </div>
            <Link
              href="/tributes/submit"
              className="flex items-center gap-2 px-6 py-3 bg-memorial-green text-white rounded-lg font-medium hover:bg-memorial-green/90 transition-colors"
            >
              <Heart className="h-5 w-5" />
              {t("শ্রদ্ধাঞ্জলি দিন", "Submit Tribute")}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-memorial py-6">
          <div className="flex flex-col gap-6 text-sm">
            
            {/* Developer & Collaborator Section */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 py-4 px-6 bg-white/5 rounded-xl">
              {/* Developer */}
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-memorial-gold" />
                <span className="text-white/60">
                  {t("ডেভেলপার:", "Developed by:")}
                </span>
                <a
                  href={developerInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-memorial-gold transition-colors"
                >
                  {developerInfo.name}
                </a>
                <div className="flex items-center gap-1 ml-2">
                  <a
                    href={developerInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors"
                    aria-label="Bridge Byte Tech Facebook"
                  >
                    <Facebook className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={developerInfo.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors"
                    aria-label="Bridge Byte Tech YouTube"
                  >
                    <Youtube className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={developerInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors"
                    aria-label="Bridge Byte Tech Instagram"
                  >
                    <span className="text-[10px] font-bold">IG</span>
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-6 bg-white/20"></div>
              <div className="block lg:hidden w-full h-px bg-white/20"></div>

              {/* Collaborator */}
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-400" />
                <span className="text-white/60">
                  {t("সহযোগী:", "Collaborator:")}
                </span>
                <a
                  href={collaboratorInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-red-400 transition-colors"
                >
                  {collaboratorInfo.name}
                </a>
                <a
                  href={collaboratorInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors ml-2"
                  aria-label="Dangerous Force Facebook"
                >
                  <Facebook className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Copyright & Links */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-white/60">
              <p className="text-center lg:text-left">
                © {currentYear} {t("Bridge Byte Tech", "Bridge Byte Tech")} • {t("সর্বস্বত্ব সংরক্ষিত", "All rights reserved")}
              </p>

              <p className="text-center">
                {t("শহীদ ওসমান হাদির স্মরণে", "In memory of Shaheed Osman Hadi")} 🕊️
              </p>

              {/* Policy links */}
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t("গোপনীয়তা নীতি", "Privacy Policy")}
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {t("শর্তাবলী", "Terms")}
                </Link>
                <Link href="/about-developer" className="hover:text-white transition-colors flex items-center gap-1">
                  <Code className="h-3 w-3" />
                  {t("ডেভেলপার", "Developer")}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
