"use client";

import React from "react";
import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(t("লিংক কপি হয়েছে", "Link copied"));
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error(t("কপি করা যায়নি", "Failed to copy"));
    }
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareLinks.facebook)}
        className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareLinks.twitter)}
        className="hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareLinks.linkedin)}
        className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={copyLink}
        className={copied ? "bg-green-50 text-green-600 border-green-200" : ""}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </Button>
    </div>
  );
}