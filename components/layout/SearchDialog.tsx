"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Video, Image, FileText, Clock, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/hooks/useLanguage";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickLinks = [
  { href: "/videos", labelBn: "ভিডিও", labelEn: "Videos", icon: Video },
  { href: "/photos", labelBn: "ছবি", labelEn: "Photos", icon: Image },
  { href: "/speeches", labelBn: "বক্তৃতা", labelEn: "Speeches", icon: FileText },
  { href: "/timeline", labelBn: "টাইমলাইন", labelEn: "Timeline", icon: Clock },
];

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  // Search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual search API call
      // const response = await searchService.search(searchQuery);
      // setResults(response);
      
      // Mock results for now
      setResults([
        { 
          id: "1", 
          type: "video", 
          titleBn: "শাহবাগে বক্তৃতা", 
          titleEn: "Speech at Shahbag",
          href: "/videos/1" 
        },
        { 
          id: "2", 
          type: "photo", 
          titleBn: "জুলাই বিপ্লবের ছবি", 
          titleEn: "July Revolution Photo",
          href: "/photos/2" 
        },
      ]);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
    setQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
      setQuery("");
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video;
      case "photo":
        return Image;
      default:
        return FileText;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="border-b">
          <div className="flex items-center px-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("অনুসন্ধান করুন...", "Search...")}
              className="border-0 focus-visible:ring-0 text-lg py-6"
              autoFocus
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>

        <ScrollArea className="max-h-[60vh]">
          {/* Results */}
          {query && results.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {t("ফলাফল", "Results")}
              </h3>
              <div className="space-y-2">
                {results.map((result) => {
                  const Icon = getIcon(result.type);
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleNavigate(result.href)}
                      className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted text-left transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-memorial-green/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-memorial-green" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {language === "bn" ? result.titleBn : result.titleEn}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {result.type}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Results */}
          {query && !isLoading && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">
                {t("কোনো ফলাফল পাওয়া যায়নি", "No results found")}
              </p>
            </div>
          )}

          {/* Quick Links */}
          {!query && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {t("দ্রুত লিংক", "Quick Links")}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavigate(link.href)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-left transition-colors"
                  >
                    <link.icon className="h-5 w-5 text-memorial-green" />
                    <span className="font-medium">
                      {language === "bn" ? link.labelBn : link.labelEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-3 bg-muted/50">
          <p className="text-xs text-center text-muted-foreground">
            {t(
              "Enter চাপুন অনুসন্ধান করতে",
              "Press Enter to search"
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}