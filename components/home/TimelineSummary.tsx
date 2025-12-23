"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { 
  Baby, 
  GraduationCap, 
  BookOpen,
  Megaphone,
  Users,
  Flame,
  Trophy,
  Mic,
  Heart,
  Calendar,
  Building,
  Award,
  Briefcase,
  Target,
  AlertTriangle,
  Plane,
  Users2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { cn, toBanglaNumber } from "@/lib/utils";

// Icon mapping
const iconComponents: { [key: string]: React.ElementType } = {
  baby: Baby,
  education: GraduationCap,
  university: Building,
  degree: Award,
  book: BookOpen,
  job: Briefcase,
  revolution: Flame,
  victory: Trophy,
  leader: Users,
  speech: Mic,
  campaign: Target,
  attack: AlertTriangle,
  martyrdom: Heart,
  plane: Plane,
  mourning: Users2,
  default: Calendar,
};

const timelineEvents = [
  {
    year: "1993",
    date: "৩০ জুন",
    dateEn: "30 June",
    titleBn: "জন্ম",
    titleEn: "Birth",
    descBn: "ঝালকাঠি জেলার নলছিটি উপজেলায় জন্মগ্রহণ। পিতা: মাওলানা আব্দুল হাদি (মাদ্রাসা শিক্ষক ও স্থানীয় ইমাম), মাতা: তাসলিমা হাদি। ছয় ভাইবোনের মধ্যে সর্বকনিষ্ঠ।",
    descEn: "Born in Nalchity Upazila, Jhalokathi District. Father: Maulana Abdul Hadi (madrasa teacher and local imam), Mother: Taslima Hadi. Youngest of six siblings.",
    color: "bg-emerald-500",
    icon: "baby",
  },
  {
    year: "2010",
    date: "",
    dateEn: "",
    titleBn: "আলিম পাস ও ঢাবিতে ভর্তি",
    titleEn: "Alim Passed & DU Admission",
    descBn: "ঝালকাঠি এন.এস. কামিল মাদ্রাসা থেকে আলিম পরীক্ষায় উত্তীর্ণ। ঢাকা বিশ্ববিদ্যালয়ের রাষ্ট্রবিজ্ঞান বিভাগে ২০১০-২০১১ শিক্ষাবর্ষে ভর্তি।",
    descEn: "Passed Alim examination from Jhalakati N.S. Kamil Madrasa. Enrolled in Department of Political Science at University of Dhaka for 2010-2011 academic session.",
    color: "bg-blue-500",
    icon: "university",
  },
  {
    year: "2024",
    date: "ফেব্রুয়ারি",
    dateEn: "February",
    titleBn: "কাব্যগ্রন্থ প্রকাশ",
    titleEn: "Poetry Book Published",
    descBn: "'লাভায় লালশাক পূবের আকাশ' শিরোনামে প্রথম কাব্যগ্রন্থ প্রকাশ। প্রকাশক: দুয়ার পাবলিকেশন্স, ঢাকা।",
    descEn: "First poetry book 'Lavay Lalshak Puber Akash' (The Eastern Sky Turned Red Amaranth by Lava) published by Duar Publications, Dhaka.",
    color: "bg-pink-500",
    icon: "book",
  },
  {
    year: "2024",
    date: "জুলাই",
    dateEn: "July",
    titleBn: "জুলাই বিপ্লব",
    titleEn: "July Revolution",
    descBn: "জুলাই বিপ্লবে সক্রিয় অংশগ্রহণ। ঢাকার রামপুরা এলাকার সমন্বয়ক হিসেবে স্থানীয় সাংগঠনিক কার্যক্রম পরিচালনা।",
    descEn: "Active participation in July Revolution. Served as coordinator for Rampura area in Dhaka, leading local organizational activities.",
    color: "bg-orange-500",
    icon: "revolution",
  },
  {
    year: "2024",
    date: "৫ আগস্ট",
    dateEn: "5 August",
    titleBn: "বিপ্লব সফল",
    titleEn: "Revolution Successful",
    descBn: "দীর্ঘ সময়ের শেখ হাসিনা সরকারের পতন। জুলাই শহীদদের বিচার ও আওয়ামী লীগ নিষিদ্ধের দাবিতে সোচ্চার।",
    descEn: "Fall of Sheikh Hasina government. Became vocal for justice of July martyrs and demanded ban on Awami League.",
    color: "bg-orange-600",
    icon: "victory",
  },
  {
    year: "2024",
    date: "সেপ্টেম্বর",
    dateEn: "September",
    titleBn: "ইনকিলাব মঞ্চ প্রতিষ্ঠা",
    titleEn: "Inqilab Moncho Founded",
    descBn: "জুলাই বিপ্লবের ধারাবাহিকতায় 'ইনকিলাব মঞ্চ' প্রতিষ্ঠা। সহ-প্রতিষ্ঠাতা ও মুখপাত্র হিসেবে দায়িত্ব গ্রহণ।",
    descEn: "Founded 'Inqilab Moncho' as continuation of July Revolution. Took responsibility as co-founder and spokesperson.",
    color: "bg-purple-600",
    icon: "leader",
  },
  {
    year: "2025",
    date: "",
    dateEn: "",
    titleBn: "বিশ্ববিদ্যালয়ে প্রভাষক",
    titleEn: "University Lecturer",
    descBn: "ঢাকার বেসরকারি বিশ্ববিদ্যালয় 'ইউনিভার্সিটি অব স্কলার্স'-এ ইংরেজি বিভাগে প্রভাষক হিসেবে কর্মরত।",
    descEn: "Working as lecturer in Department of English at University of Scholars, a private university in Dhaka.",
    color: "bg-teal-500",
    icon: "job",
  },
  {
    year: "2025",
    date: "সেপ্টেম্বর",
    dateEn: "September",
    titleBn: "নির্বাচনী প্রচারণা",
    titleEn: "Election Campaign",
    descBn: "২০২৬ সালের জাতীয় নির্বাচনে ঢাকা-৮ আসনে স্বতন্ত্র প্রার্থী হিসেবে প্রার্থিতা ঘোষণা।",
    descEn: "Announced candidacy as independent politician for Dhaka-8 constituency in 2026 general election.",
    color: "bg-cyan-500",
    icon: "campaign",
  },
  {
    year: "2025",
    date: "১২ ডিসেম্বর",
    dateEn: "12 December",
    titleBn: "সন্ত্রাসী হামলা",
    titleEn: "Terrorist Attack",
    descBn: "বিকেল ২:২৫ মিনিটে ঢাকার পল্টন এলাকায় মসজিদ থেকে বের হওয়ার পর মোটরসাইকেলে আগত দুই আততায়ীর গুলিতে মাথায় আঘাতপ্রাপ্ত।",
    descEn: "Shot in head at approximately 2:25 PM in Paltan area after leaving mosque by two assailants on motorcycle.",
    color: "bg-red-600",
    icon: "attack",
  },
  {
    year: "2025",
    date: "১৫ ডিসেম্বর",
    dateEn: "15 December",
    titleBn: "সিঙ্গাপুরে স্থানান্তর",
    titleEn: "Transferred to Singapore",
    descBn: "উন্নত চিকিৎসার জন্য এয়ার অ্যাম্বুলেন্সে সিঙ্গাপুর জেনারেল হাসপাতালে স্থানান্তর।",
    descEn: "Airlifted to Singapore General Hospital for advanced treatment via air ambulance.",
    color: "bg-blue-600",
    icon: "plane",
  },
  {
    year: "2025",
    date: "১৮ ডিসেম্বর",
    dateEn: "18 December",
    titleBn: "শাহাদাত বরণ",
    titleEn: "Martyrdom",
    descBn: "সিঙ্গাপুর জেনারেল হাসপাতালে চিকিৎসাধীন অবস্থায় শাহাদাত বরণ। বয়স হয়েছিল মাত্র ৩২ বছর।",
    descEn: "Passed away while undergoing treatment at Singapore General Hospital. He was only 32 years old.",
    color: "bg-black",
    icon: "martyrdom",
  },
  {
    year: "2025",
    date: "২০ ডিসেম্বর",
    dateEn: "20 December",
    titleBn: "রাষ্ট্রীয় মর্যাদায় দাফন",
    titleEn: "State Funeral & Burial",
    descBn: "জাতীয় সংসদ ভবনে জানাজা। কাজী নজরুল ইসলামের সমাধিস্থলে রাষ্ট্রীয় মর্যাদায় দাফন।",
    descEn: "Funeral at National Parliament. Buried with state honor at the Mausoleum of Kazi Nazrul Islam.",
    color: "bg-gray-700",
    icon: "mourning",
  },
];

export default function TimelineSummary() {
  const { t, isBangla } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-memorial-dark via-slate-900 to-memorial-dark text-white">
      <div className="container-memorial">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-memorial-gold/20 text-memorial-gold rounded-full text-sm font-medium mb-4">
            {t("৩০ জুন ১৯৯৩ - ১৮ ডিসেম্বর ২০২৫", "30 June 1993 - 18 December 2025")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("জীবনের পথচলা", "Journey of Life")}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t(
              "মাত্র ৩২ বছরের জীবনে একজন কবি থেকে বিপ্লবী, একজন ছাত্র থেকে জাতীয় নেতা",
              "From poet to revolutionary, from student to national leader in just 32 years"
            )}
          </p>
        </div>

        {/* Timeline - Desktop Alternating */}
        <div className="relative max-w-6xl mx-auto">
          {/* Center Line - Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-orange-500 via-purple-500 to-black hidden lg:block transform -translate-x-1/2 rounded-full" />
          
          {/* Left Line - Mobile */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-orange-500 via-purple-500 to-black lg:hidden rounded-full" />

          <div className="space-y-8 lg:space-y-12">
            {timelineEvents.map((event, index) => {
              const IconComponent = iconComponents[event.icon] || iconComponents.default;
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  {/* Desktop View - Alternating */}
                  <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 items-center">
                    {/* Left Side Content */}
                    <div className={cn("flex", isLeft ? "justify-end" : "justify-end opacity-0")}>
                      {isLeft && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 max-w-md text-right">
                          <div className="flex items-center gap-3 justify-end mb-3">
                            {event.date && (
                              <span className="text-white/50 text-sm">
                                {isBangla ? event.date : event.dateEn}
                              </span>
                            )}
                            <span className={cn(
                              "px-3 py-1 rounded-full text-white text-sm font-bold",
                              event.color
                            )}>
                              {isBangla ? toBanglaNumber(event.year) : event.year}
                            </span>
                          </div>
                          <h3 className="font-bold text-xl text-white mb-2">
                            {isBangla ? event.titleBn : event.titleEn}
                          </h3>
                          <p className="text-white/70 text-sm leading-relaxed">
                            {isBangla ? event.descBn : event.descEn}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Center Icon */}
                    <div className="relative z-10">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center",
                          event.color,
                          "shadow-xl shadow-black/40 border-4 border-slate-900"
                        )}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Right Side Content */}
                    <div className={cn("flex", !isLeft ? "justify-start" : "justify-start opacity-0")}>
                      {!isLeft && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 max-w-md text-left">
                          <div className="flex items-center gap-3 justify-start mb-3">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-white text-sm font-bold",
                              event.color
                            )}>
                              {isBangla ? toBanglaNumber(event.year) : event.year}
                            </span>
                            {event.date && (
                              <span className="text-white/50 text-sm">
                                {isBangla ? event.date : event.dateEn}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-xl text-white mb-2">
                            {isBangla ? event.titleBn : event.titleEn}
                          </h3>
                          <p className="text-white/70 text-sm leading-relaxed">
                            {isBangla ? event.descBn : event.descEn}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile View - Left aligned */}
                  <div className="lg:hidden flex items-start gap-4 md:gap-6">
                    {/* Icon */}
                    <div
                      className={cn(
                        "relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0",
                        event.color,
                        "shadow-lg shadow-black/30 border-2 border-slate-900"
                      )}
                    >
                      <IconComponent className="h-4 w-4 md:h-5 md:w-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-white text-xs font-bold",
                          event.color
                        )}>
                          {isBangla ? toBanglaNumber(event.year) : event.year}
                        </span>
                        {event.date && (
                          <span className="text-white/50 text-xs">
                            {isBangla ? event.date : event.dateEn}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg text-white mb-1">
                        {isBangla ? event.titleBn : event.titleEn}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {isBangla ? event.descBn : event.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="bg-memorial-green hover:bg-memorial-green/90 text-white"
          >
            <Link href="/about" className="flex items-center gap-2">
              {t("সম্পূর্ণ জীবনী পড়ুন", "Read Full Biography")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
