"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // ইমেজ ইম্পোর্ট করা হয়েছে
import { usePathname } from "next/navigation";
import { 
  Menu, 
  Search, 
  ChevronDown,
  Video,
  Image as ImageIcon,
  FileText,
  Heart,
  BookOpen,
  Mic,
  Quote
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUIStore } from "@/store/uiStore";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import SearchDialog from "./SearchDialog";

const navItems = [
  { href: "/", labelBn: "হোম", labelEn: "Home" },
  { href: "/about", labelBn: "জীবনী", labelEn: "Biography" },
  { 
    labelBn: "মিডিয়া", 
    labelEn: "Media",
    children: [
      { href: "/videos", labelBn: "ভিডিও", labelEn: "Videos", icon: Video },
      { href: "/photos", labelBn: "ছবি", labelEn: "Photos", icon: ImageIcon },
      { href: "/audios", labelBn: "অডিও", labelEn: "Audios", icon: Mic },
    ]
  },
  { 
    labelBn: "লেখনী", 
    labelEn: "Writings",
    children: [
      { href: "/speeches", labelBn: "বক্তৃতা", labelEn: "Speeches", icon: Mic },
      { href: "/writings", labelBn: "প্রবন্ধ", labelEn: "Articles", icon: FileText },
      { href: "/poems", labelBn: "কবিতা", labelEn: "Poems", icon: BookOpen },
      { href: "/quotes", labelBn: "উক্তি", labelEn: "Quotes", icon: Quote },
    ]
  },
    { href: "/documents", labelBn: "ডকুমেন্টস", labelEn: "Documents" },
  { href: "/social-posts", labelBn: "সোশ্যাল পোস্ট", labelEn: "Social Posts" },
  { href: "/requests", labelBn: "রিকোয়েস্ট", labelEn: "Requests" },
  { href: "/timeline", labelBn: "টাইমলাইন", labelEn: "Timeline" },
  { href: "/events", labelBn: "ইভেন্ট", labelEn: "Events" },
  { href: "/locations", labelBn: "স্থান", labelEn: "Locations" },
  { href: "/tributes", labelBn: "শ্রদ্ধাঞ্জলি", labelEn: "Tributes" },
];

export default function Header() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const { mobileMenuOpen, setMobileMenuOpen, searchOpen, setSearchOpen } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isChildActive = (children: any[]) => {
    return children.some((child) => isActive(child.href));
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
        )}
      >
        {/* Top Bar */}
        <div className="bg-memorial-green text-white py-1.5 text-sm hidden md:block">
          <div className="container-memorial flex justify-between items-center">
            <p className="text-white/90">
              {t("🕊️ শহীদ শরীফ ওসমান বিন হাদির স্মৃতি সংগ্রহশালা", "🕊️ Shaheed Sharif Osman Bin Hadi Memorial Archive")}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-white/80">{t("৩০ জুন ১৯৯৩ - ১৮ ডিসেম্বর ২০২৫", "30 June 1993 - 18 December 2025")}</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container-memorial">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with Image instead of Emoji */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-memorial-green overflow-hidden flex-shrink-0 transition-transform group-hover:scale-105">
                <Image
                  src="/images/osman-hadi-portrait.jpg" // এখানে ইমেজের পাথ
                  alt="শহীদ ওসমান হাদি"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-memorial-green text-lg md:text-xl leading-tight">
                  {t("ওসমান হাদি", "Osman Hadi")}
                </h1>
                <p className="text-xs text-muted-foreground">{t("স্মৃতি সংগ্রহশালা", "Memorial Archive")}</p>
              </div>
            </Link>

            {/* Desktop Navigation (Fixed Dropdowns) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.labelBn} className="relative">
                  {item.children ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={cn(
                            "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors outline-none focus:outline-none",
                            isChildActive(item.children)
                              ? "text-memorial-green bg-memorial-green/5"
                              : "text-gray-700 hover:bg-gray-100 hover:text-memorial-green"
                          )}
                        >
                          {language === "bn" ? item.labelBn : item.labelEn}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48 mt-2">
                        {item.children.map((child) => (
                          <DropdownMenuItem key={child.href} asChild>
                            <Link
                              href={child.href}
                              className={cn(
                                "flex items-center gap-2 cursor-pointer w-full p-2.5",
                                isActive(child.href) && "text-memorial-green bg-memorial-green/5 font-semibold"
                              )}
                            >
                              <child.icon className="h-4 w-4 opacity-70" />
                              <span>{language === "bn" ? child.labelBn : child.labelEn}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive(item.href!)
                          ? "bg-memorial-green text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-memorial-green"
                      )}
                    >
                      {language === "bn" ? item.labelBn : item.labelEn}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="text-gray-600 hover:text-memorial-green"
              >
                <Search className="h-5 w-5" />
              </Button>
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-[calc(5rem+2.5rem)]" />

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navItems={navItems} />
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}