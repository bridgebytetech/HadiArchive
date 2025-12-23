"use client";

import React from "react";
import Image from "next/image";
import { Poster } from "@/services/posterService";

interface PosterCardProps {
  poster: Poster;
}

const PosterCard: React.FC<PosterCardProps> = ({ poster }) => {
  // 🔍 ডিবাগিং: ইমেজের সঠিক লিঙ্ক আসছে কি না তা চেক করতে
  // console.log("Poster Image URL:", poster.imageUrl);

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl border border-slate-100 dark:border-slate-800 h-full">
      <div className="aspect-[3/4] relative overflow-hidden bg-slate-100">
        <Image
          // ✅ নিশ্চিত করুন এখানে সঠিক ফিল্ড ব্যবহার করছেন
          src={poster.imageUrl || poster.thumbnailUrl || "https://placehold.co/400x600?text=No+Image"}
          alt={poster.titleBn}
          fill
          sizes="(max-width: 768px) 50vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized // 🚀 সাময়িকভাবে এটি যোগ করুন যদি ছবি লোড না হয়
        />
      </div>
      <div className="p-3 text-center">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
          {poster.titleBn}
        </h3>
      </div>
    </div>
  );
};

export default PosterCard;
