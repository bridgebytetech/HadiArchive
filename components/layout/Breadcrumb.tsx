"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  labelBn: string;
  labelEn: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  const { language } = useLanguage();

  return (
    <nav className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center flex-wrap gap-1">
        {/* Home */}
        <li>
          <Link
            href="/"
            className="flex items-center text-muted-foreground hover:text-memorial-green transition-colors"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-memorial-green transition-colors"
              >
                {language === "bn" ? item.labelBn : item.labelEn}
              </Link>
            ) : (
              <span className="text-foreground font-medium">
                {language === "bn" ? item.labelBn : item.labelEn}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}