"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/hooks/useLanguage";

interface NavItem {
  href?: string;
  labelBn: string;
  labelEn: string;
  icon?: any;
  children?: NavItem[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-[300px] bg-white z-50 lg:hidden shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-memorial-green flex items-center justify-center">
              <span className="text-white text-lg">🕊️</span>
            </div>
            <div>
              <h2 className="font-bold text-memorial-green">
                {t("ওসমান হাদি", "Osman Hadi")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t("মেমোরিয়াল", "Memorial")}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100%-80px)]">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.labelBn}>
                {item.children ? (
                  // Expandable Item
                  <div>
                    <button
                      onClick={() => toggleExpand(item.labelBn)}
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-3 rounded-lg text-left font-medium transition-colors",
                        expandedItems.includes(item.labelBn)
                          ? "bg-memorial-green/10 text-memorial-green"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <span>{language === "bn" ? item.labelBn : item.labelEn}</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform",
                          expandedItems.includes(item.labelBn) && "rotate-180"
                        )}
                      />
                    </button>

                    {expandedItems.includes(item.labelBn) && (
                      <div className="mt-1 ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href!}
                            onClick={onClose}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors",
                              isActive(child.href!)
                                ? "bg-memorial-green text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            )}
                          >
                            {child.icon && <child.icon className="h-4 w-4" />}
                            {language === "bn" ? child.labelBn : child.labelEn}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular Link
                  <Link
                    href={item.href!}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors",
                      isActive(item.href!)
                        ? "bg-memorial-green text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <span>{language === "bn" ? item.labelBn : item.labelEn}</span>
                    <ChevronRight className="h-5 w-5 opacity-50" />
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t mt-4">
            <Link
              href="/tributes/submit"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 bg-memorial-green text-white rounded-lg font-medium hover:bg-memorial-green/90 transition-colors"
            >
              <span>💐</span>
              {t("শ্রদ্ধাঞ্জলি দিন", "Pay Tribute")}
            </Link>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}