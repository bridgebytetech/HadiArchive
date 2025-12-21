"use client";

import React from "react";
import { PageHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/useLanguage";

export default function PrivacyPolicyPage() {
  const { t, isBangla } = useLanguage();

  return (
    <>
      <PageHeader
        titleBn="গোপনীয়তা নীতি"
        titleEn="Privacy Policy"
        descriptionBn="এই ওয়েবসাইটে আপনার তথ্য কীভাবে সংগ্রহ ও ব্যবহার করা হয়"
        descriptionEn="How we collect and use information on this website"
        breadcrumbs={[{ labelBn: "গোপনীয়তা নীতি", labelEn: "Privacy Policy" }]}
      />

      <section className="py-10">
        <div className="container-memorial max-w-4xl">
          <Card>
            <CardContent className="p-6 md:p-8 space-y-6">
              <p className="text-sm text-muted-foreground">
                {t(
                  "সর্বশেষ আপডেট: ২১ ডিসেম্বর ২০২৫",
                  "Last updated: December 21, 2025"
                )}
              </p>

              <Separator />

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  {t("১) আমরা কী তথ্য সংগ্রহ করি", "1) Information We Collect")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "এই ওয়েবসাইটে ভিজিট করার সময় আমরা সাধারণত ব্রাউজার/ডিভাইস সংক্রান্ত কিছু নন-পার্সোনাল তথ্য সংগ্রহ করতে পারি (যেমন: IP address, ব্রাউজার টাইপ, ভিজিট করা পেজ)। আপনি যদি শ্রদ্ধাঞ্জলি বা রিকোয়েস্ট জমা দেন, তখন আপনার নাম, ইমেইল, অবস্থান এবং বার্তা সংগ্রহ করা হতে পারে।",
                    "When you visit this website, we may collect some non-personal information (e.g., IP address, browser type, visited pages). If you submit a tribute or request, we may collect your name, email, location, and message."
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  {t("২) তথ্য কীভাবে ব্যবহার করি", "2) How We Use Information")}
                </h2>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>
                    {t(
                      "শ্রদ্ধাঞ্জলি/রিকোয়েস্ট যাচাই ও প্রকাশের জন্য",
                      "To review and publish tributes/requests"
                    )}
                  </li>
                  <li>
                    {t(
                      "ওয়েবসাইট উন্নয়ন এবং কনটেন্টের মান বজায় রাখতে",
                      "To improve the website and maintain content quality"
                    )}
                  </li>
                  <li>
                    {t(
                      "প্রয়োজনে আপনার সাথে যোগাযোগ করতে",
                      "To contact you if necessary"
                    )}
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  {t("৩) কুকিজ (Cookies)", "3) Cookies")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "এই ওয়েবসাইটে কিছু ফিচারের জন্য কুকিজ ব্যবহার করা হতে পারে (যেমন: অ্যাডমিন লগইন টোকেন, ভাষা নির্বাচন)। আপনি চাইলে ব্রাউজার থেকে কুকিজ নিয়ন্ত্রণ করতে পারেন।",
                    "This website may use cookies for certain features (e.g., admin login token, language preference). You can manage cookies from your browser settings."
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  {t("৪) তৃতীয় পক্ষ (Third-party)", "4) Third-party Services")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "কিছু ক্ষেত্রে আমরা তৃতীয় পক্ষের সার্ভিস/লিংক ব্যবহার করতে পারি (যেমন: ইউটিউব ভিডিও, সোশ্যাল মিডিয়া পোস্ট, ইমেজ হোস্টিং)। এসব সার্ভিসের নিজস্ব গোপনীয়তা নীতি থাকতে পারে।",
                    "In some cases, we may use third-party services/links (e.g., YouTube videos, social media posts, image hosting). These services may have their own privacy policies."
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  {t("৫) তথ্য সুরক্ষা", "5) Data Security")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "আমরা যথাসম্ভব নিরাপত্তা ব্যবস্থা গ্রহণ করি। তবে ইন্টারনেটের মাধ্যমে কোনো তথ্য আদান-প্রদান ১০০% নিরাপদ বলে নিশ্চয়তা দেওয়া যায় না।",
                    "We take reasonable security measures, but no data transmission over the internet can be guaranteed 100% secure."
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  {t("৬) যোগাযোগ", "6) Contact")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "এই নীতি সম্পর্কে কোনো প্রশ্ন থাকলে অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন: support@bridgebytetech.com",
                    "If you have questions about this policy, contact us: support@bridgebytetech.com"
                  )}
                </p>
              </div>

              <Separator />

              <p className="text-xs text-muted-foreground">
                {t(
                  "নোট: এটি একটি সাধারণ টেমপ্লেট। প্রয়োজনে আইনগত পরামর্শ নিয়ে নীতি আপডেট করুন।",
                  "Note: This is a general template. Please update with legal guidance if needed."
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}