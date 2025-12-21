"use client";

import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">কিছু একটা সমস্যা হয়েছে</h1>
        <p className="text-muted-foreground mb-6">
          দুঃখিত, একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={reset} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            আবার চেষ্টা করুন
          </Button>
          <Button asChild className="bg-memorial-green hover:bg-memorial-green/90">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              হোমে যান
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}