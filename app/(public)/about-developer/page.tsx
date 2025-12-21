"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Globe, 
  Mail,
  Heart,
  Code,
  Shield,
  ExternalLink,
  MapPin
} from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

// Developer Company Info
const developerInfo = {
  name: "Bridge Byte Tech",
  taglineBn: "নতুন কিছু শুরু করি!",
  taglineEn: "Let's introduce something new!",
  descriptionBn: "Bridge Byte Tech একটি সফটওয়্যার কোম্পানি যা ওয়েব অ্যাপ্লিকেশন, মোবাইল অ্যাপ এবং কাস্টম সফটওয়্যার ডেভেলপ করে। আমরা শহীদ শরীফ ওসমান বিন হাদি ভাইয়ের স্মৃতিকে চিরস্থায়ী রাখতে এই মেমোরিয়াল আর্কাইভ তৈরি করেছি। জুলাই গণঅভ্যুত্থানের এই বীর শহীদকে সবসময় স্মরণ করা হবে।",
  descriptionEn: "Bridge Byte Tech is a software company that develops web applications, mobile apps, and custom software. We have created this memorial archive to keep the memory of Shaheed Sharif Osman Bin Hadi alive for eternity. This hero of the July uprising will always be remembered.",
  noteBn: "যদি কোনো তথ্য ভুল বা অমিল লক্ষ্য করেন, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন। আপনার সহায়তা আর্কাইভকে সঠিক ও সম্মানজনক রাখতে সাহায্য করবে।",
  noteEn: "If you notice any incorrect or mismatched information, please feel free to contact us. Your help ensures the archive remains accurate and respectful.",
  logo: "/images/bridgebytetech-logo.png",
  location: "Sylhet, Bangladesh",
  website: "https://www.bridgebytetech.com",
  email: "support@bridgebytetech.com",
  socials: [
    { 
      name: "Website", 
      href: "https://www.bridgebytetech.com", 
      icon: Globe,
      color: "hover:bg-memorial-green"
    },
    { 
      name: "Facebook", 
      href: "https://www.facebook.com/bridgebytetech", 
      icon: Facebook,
      color: "hover:bg-blue-600"
    },
    { 
      name: "Instagram", 
      href: "https://www.instagram.com/bridgebytetech", 
      icon: Instagram,
      color: "hover:bg-pink-600"
    },
    { 
      name: "YouTube", 
      href: "https://www.youtube.com/@bridgebytetech", 
      icon: Youtube,
      color: "hover:bg-red-600"
    },
    { 
      name: "LinkedIn", 
      href: "https://www.linkedin.com/company/108645484", 
      icon: Linkedin,
      color: "hover:bg-blue-700"
    },
  ],
};

// Collaborator Info
const collaboratorInfo = {
  name: "Dangerous Force",
  taglineBn: "সাইবার নিরাপত্তা ও ডিজিটাল সুরক্ষা",
  taglineEn: "Cybersecurity & Digital Protection",
  descriptionBn: "Dangerous Force একটি বিশ্বস্ত IT ও সাইবার নিরাপত্তা সেবা প্রদানকারী প্রতিষ্ঠান। তারা ব্যবসা ও ব্যক্তিদের ডিজিটাল ঝুঁকি থেকে রক্ষা করতে কাজ করে। সামাজিক মাধ্যমে অন্যায় ও অশ্লীলতার বিরুদ্ধে তারা সক্রিয়ভাবে কাজ করছে।",
  descriptionEn: "Dangerous Force is a trusted provider of IT and cybersecurity solutions, dedicated to protecting businesses and individuals from the ever-growing risks of the digital world. They actively work against injustice and obscenity on social media platforms.",
  logo: "/images/dangerousforce-logo.png",
  location: "Buffalo, NY, United States",
  website: "https://www.dangerousforce.com",
  socials: [
    { 
      name: "Website", 
      href: "https://www.dangerousforce.com", 
      icon: Globe,
      color: "hover:bg-memorial-green"
    },
    { 
      name: "Facebook", 
      href: "https://www.facebook.com/DangerousForce.Official", 
      icon: Facebook,
      color: "hover:bg-blue-600"
    },
  ],
};

export default function AboutDeveloperPage() {
  const { t, isBangla } = useLanguage();

  return (
    <>
      <PageHeader
        titleBn="ডেভেলপার সম্পর্কে"
        titleEn="About Developer"
        descriptionBn="যারা এই স্মৃতি সংগ্রহশালা তৈরি করেছে"
        descriptionEn="The team behind this memorial archive"
        breadcrumbs={[
          { labelBn: "ডেভেলপার সম্পর্কে", labelEn: "About Developer" },
        ]}
      />

      <section className="py-10">
        <div className="container-memorial max-w-4xl">
          
          {/* Introduction */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-memorial-green/10 to-memorial-gold/10 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-memorial-green/20 flex items-center justify-center">
                  <Code className="h-6 w-6 text-memorial-green" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-memorial-green">
                    {t("এই প্রজেক্ট সম্পর্কে", "About This Project")}
                  </h2>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t(
                  "শহীদ শরীফ ওসমান বিন হাদি ভাইয়ের স্মৃতিকে চিরস্থায়ী রাখতে আমরা এই মেমোরিয়াল আর্কাইভ তৈরি করেছি। জুলাই গণঅভ্যুত্থানের এই বীর শহীদ সবসময় আমাদের মাঝে স্মরণীয় হয়ে থাকবেন।",
                  "We have created this memorial archive to keep the memory of Shaheed Sharif Osman Bin Hadi alive for eternity. This hero of the July uprising will always be remembered among us."
                )}
              </p>
              <div className="p-4 bg-white/50 rounded-lg border border-memorial-gold/20">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-memorial-green">📝 </span>
                  {t(
                    developerInfo.noteBn,
                    developerInfo.noteEn
                  )}
                </p>
              </div>
            </div>
          </Card>

          {/* Developer Company */}
          <Card className="mb-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-memorial-green/20 to-memorial-gold/20 flex items-center justify-center overflow-hidden border-2 border-memorial-green/20">
                    <Image
                      src={developerInfo.logo}
                      alt={developerInfo.name}
                      width={80}
                      height={80}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '<span class="text-3xl font-bold text-memorial-green">BBT</span>';
                      }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-memorial-green/10 text-memorial-green text-xs font-medium rounded-full">
                      {t("ডেভেলপার", "Developer")}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {t("সফটওয়্যার কোম্পানি", "Software Company")}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {developerInfo.name}
                  </h2>
                  
                  <p className="text-sm text-memorial-gold font-medium mb-3">
                    {isBangla ? developerInfo.taglineBn : developerInfo.taglineEn}
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {isBangla ? developerInfo.descriptionBn : developerInfo.descriptionEn}
                  </p>

                  {/* Location & Contact */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {developerInfo.location}
                    </div>
                    <a 
                      href={`mailto:${developerInfo.email}`}
                      className="flex items-center gap-1 hover:text-memorial-green transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {developerInfo.email}
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-wrap items-center gap-2">
                    {developerInfo.socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:text-white transition-all ${social.color}`}
                      >
                        <social.icon className="h-4 w-4" />
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collaborator */}
          <Card className="mb-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center overflow-hidden border-2 border-red-500/20">
                    <Image
                      src={collaboratorInfo.logo}
                      alt={collaboratorInfo.name}
                      width={80}
                      height={80}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '<span class="text-3xl font-bold text-red-600">DF</span>';
                      }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      {t("সহযোগী", "Collaborator")}
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {t("সাইবার নিরাপত্তা", "Cybersecurity")}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {collaboratorInfo.name}
                  </h2>
                  
                  <p className="text-sm text-red-600 font-medium mb-3">
                    {isBangla ? collaboratorInfo.taglineBn : collaboratorInfo.taglineEn}
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {isBangla ? collaboratorInfo.descriptionBn : collaboratorInfo.descriptionEn}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    {collaboratorInfo.location}
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-wrap items-center gap-2">
                    {collaboratorInfo.socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:text-white transition-all ${social.color}`}
                      >
                        <social.icon className="h-4 w-4" />
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Thanks */}
          <Card className="mb-8 border-memorial-gold/30 bg-memorial-gold/5">
            <CardContent className="p-6 md:p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-memorial-gold/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-memorial-gold" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("বিশেষ কৃতজ্ঞতা", "Special Thanks")}
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t(
                  "শহীদ ওসমান হাদির পরিবার এবং সকল শুভাকাঙ্ক্ষীদের প্রতি বিশেষ কৃতজ্ঞতা যারা এই প্রজেক্টে তথ্য ও সহযোগিতা প্রদান করেছেন। তাঁর স্মৃতি চিরজাগ্রত থাকুক।",
                  "Special thanks to the family of Shaheed Osman Hadi and all well-wishers who provided information and support for this project. May his memory live forever."
                )}
              </p>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t("যোগাযোগ করুন", "Get In Touch")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(
                      "কোনো প্রশ্ন, পরামর্শ বা তথ্য সংশোধনের জন্য আমাদের সাথে যোগাযোগ করুন",
                      "Contact us for any questions, suggestions, or information corrections"
                    )}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="outline">
                    <a 
                      href={`mailto:${developerInfo.email}`}
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      {t("ইমেইল করুন", "Send Email")}
                    </a>
                  </Button>
                  <Button asChild className="bg-memorial-green hover:bg-memorial-green/90">
                    <a 
                      href={developerInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      {t("ওয়েবসাইট দেখুন", "Visit Website")}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>
    </>
  );
}
