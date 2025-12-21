"use client";

import React from "react";
import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  actionLabel?: string;
  actionHref?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  children?: React.ReactNode;
}

export default function AdminPageHeader({
  title,
  description,
  backHref,
  backLabel = "Back",
  actionLabel,
  actionHref,
  actionIcon = <Plus className="h-4 w-4" />,
  onAction,
  children,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-6 md:mb-8">
      {/* Back Button */}
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Title & Description */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-muted-foreground">{description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {children}
          
          {(actionLabel || actionHref) && (
            actionHref ? (
              <Button asChild className="bg-memorial-green hover:bg-memorial-green/90">
                <Link href={actionHref}>
                  {actionIcon}
                  <span className="ml-2">{actionLabel}</span>
                </Link>
              </Button>
            ) : onAction ? (
              <Button 
                onClick={onAction}
                className="bg-memorial-green hover:bg-memorial-green/90"
              >
                {actionIcon}
                <span className="ml-2">{actionLabel}</span>
              </Button>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}