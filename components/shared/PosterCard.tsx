"use client";

import React from "react";
import Image from "next/image";
import { Poster } from "@/services/posterService";

interface PosterCardProps {
  poster: Poster;
}

const PosterCard: React.FC<PosterCardProps> = ({ poster }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl border border-slate-100 dark:border-slate-800 h-full flex flex-col">
      {/* Image Container */}
      <div className="aspect-[3/4] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={poster.imageUrl || poster.thumbnailUrl || "https://placehold.co/400x600?text=No+Image"}
          alt={poster.titleBn || "Poster"}
          fill
          sizes="(max-width: 768px) 50vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          // ✅ Vercel 402 Error সমাধান করতে এই লাইনটি যোগ করা হয়েছে
          unoptimized={true} 
        />
      </div>

      {/* Info */}
      <div className="p-3 text-center mt-auto">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
          {poster.titleBn}
        </h3>
      </div>
    </div>
  );
};

export default PosterCard;
