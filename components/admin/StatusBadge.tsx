"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "published" | "draft" | "pending" | "approved" | "rejected" | boolean;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  // Handle boolean (published/draft)
  if (typeof status === "boolean") {
    return (
      <Badge
        className={cn(
          status
            ? "bg-green-100 text-green-700 hover:bg-green-100"
            : "bg-gray-100 text-gray-700 hover:bg-gray-100",
          className
        )}
      >
        {status ? "Published" : "Draft"}
      </Badge>
    );
  }

  // Handle string status
  const statusConfig = {
    published: { bg: "bg-green-100", text: "text-green-700", label: "Published" },
    draft: { bg: "bg-gray-100", text: "text-gray-700", label: "Draft" },
    pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
    approved: { bg: "bg-green-100", text: "text-green-700", label: "Approved" },
    rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <Badge
      className={cn(config.bg, config.text, "hover:" + config.bg, className)}
    >
      {config.label}
    </Badge>
  );
}