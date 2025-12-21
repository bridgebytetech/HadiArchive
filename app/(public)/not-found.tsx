import React from "react";
import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-memorial-green/20 mb-4">404</div>
        <h1 className="text-2xl font-bold mb-2">পৃষ্ঠা পাওয়া যায়নি</h1>
        <p className="text-muted-foreground mb-6">
          আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে।
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild variant="outline">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4 mr-2" />
              পেছনে যান
            </Link>
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