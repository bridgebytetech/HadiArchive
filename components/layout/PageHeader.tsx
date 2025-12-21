"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import Breadcrumb from "./Breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  labelBn: string;
  labelEn: string;
  href?: string;
}

interface PageHeaderProps {
  titleBn: string;
  titleEn: string;
  descriptionBn?: string;
  descriptionEn?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  titleBn,
  titleEn,
  descriptionBn,
  descriptionEn,
  breadcrumbs,
  className,
  children,
}: PageHeaderProps) {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-memorial-green/5 to-transparent py-8 md:py-12",
        className
      )}
    >
      <div className="container-memorial">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} className="mb-4" />
        )}

        {/* Title & Description */}
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-memorial-green mb-3">
            {t(titleBn, titleEn)}
          </h1>
          {(descriptionBn || descriptionEn) && (
            <p className="text-lg text-muted-foreground">
              {t(descriptionBn || "", descriptionEn || "")}
            </p>
          )}
        </div>

        {/* Additional Content */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}