"use client";

import React from "react";
import { PageHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/useLanguage";

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        titleBn="শর্তাবলী"
        titleEn="Terms & Conditions"
        descriptionBn="এই ওয়েবসাইট ব্যবহারের নিয়মাবলি"
        descriptionEn="Rules and conditions for using this website"
        breadcrumbs={[{ labelBn: "শর্তাবলী", labelEn: "Terms" }]}
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
                  {t("১) ওয়েবসাইটের উদ্দেশ্য", "1) Purpose of the Website")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "এই ওয়েবসাইটটি শহীদ ওসমান হাদির স্মৃতি সংরক্ষণ ও জনসাধারণের জন্য তথ্য প্রদানের উদ্দেশ্যে পরিচালিত।",
                    "This website is maintained to preserve the memory of Shaheed Osman Hadi and provide information to the public."
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  {t("২) কনটেন্ট ব্যবহারের নিয়ম", "2) Content Usage")}
                </h2>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>
                    {t(
                      "এই ওয়েবসাইটের কনটেন্ট শুধুমাত্র শিক্ষামূলক/স্মৃতিচর্চার কাজে ব্যবহারের জন্য।",
                      "Content is intended for educational/memorial purposes."
                    )}
                  </li>
                  <li>
                    {t(
                      "অনুমতি ছাড়া কনটেন্ট বাণিজ্যিকভাবে ব্যবহার করা যাবে না।",
                      "Do not use content commercially without permission."
                    )}
                  </li>
                  <li>
                    {t(
                      "কনটেন্ট কপি করলে উৎস উল্লেখ করতে অনুরোধ করা হচ্ছে।",
                      "If you copy content, please credit the source."
                    )}
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  {t("৩) ইউজার সাবমিশন", "3) User Submissions")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "আপনি যদি শ্রদ্ধাঞ্জলি বা রিকোয়েস্ট জমা দেন, তবে তা পর্যালোচনা ও অনুমোদনের পর প্রকাশিত হতে পারে। অশালীন/ঘৃণামূলক/ভুল তথ্যপূর্ণ কনটেন্ট প্রকাশ না করার অধিকার কর্তৃপক্ষ সংরক্ষণ করে।",
                    "If you submit a tribute or request, it may be reviewed and published after approval. We reserve the right not to publish abusive/hateful/misleading content."
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  {t("৪) দায়বদ্ধতা সীমাবদ্ধতা", "4) Limitation of Liability")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "এই ওয়েবসাইটের তথ্য যথাসম্ভব যাচাই করে প্রকাশ করা হয়। তবুও কোনো ভুল/অসঙ্গতি থাকলে কর্তৃপক্ষ দায়বদ্ধ থাকবে না।",
                    "We aim to publish verified information, but we are not liable for errors or inaccuracies."
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  {t("৫) পরিবর্তন", "5) Changes")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "প্রয়োজনে এই শর্তাবলী যেকোনো সময় আপডেট করা হতে পারে। আপডেট হলে এই পৃষ্ঠায় প্রকাশ করা হবে।",
                    "We may update these terms at any time. Updates will be posted on this page."
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  {t("৬) যোগাযোগ", "6) Contact")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "যোগাযোগ: support@bridgebytetech.com",
                    "Contact: support@bridgebytetech.com"
                  )}
                </p>
              </div>

              <Separator />

              <p className="text-xs text-muted-foreground">
                {t(
                  "নোট: এটি একটি সাধারণ টেমপ্লেট। প্রয়োজনে আইনগত পরামর্শ নিয়ে শর্তাবলী আপডেট করুন।",
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