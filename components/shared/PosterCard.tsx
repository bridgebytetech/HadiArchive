"use client";

import React from "react";
import Image from "next/image";
import { Poster } from "@/services/posterService";
import { Download, ExternalLink } from "lucide-react";

interface PosterCardProps {
  poster: Poster;
}

const PosterCard: React.FC<PosterCardProps> = ({ poster }) => {
  return (
    <div className="group relative break-inside-avoid mb-6 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image Wrapper */}
      <div className="relative">
        <img
          src={poster.imageUrl || poster.thumbnailUrl || "https://placehold.co/400x600?text=No+Image"}
          alt={poster.titleBn}
          className="w-full h-auto object-cover display-block"
          loading="lazy"
        />
        
        {/* Premium Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
          <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <button className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors">
              <Download className="w-4 h-4" />
              DOWNLOAD
            </button>
            <div className="p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white hover:bg-memorial-gold transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 bg-white dark:bg-slate-900">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2">
            {poster.titleBn}
          </h3>
        </div>
        {poster.designer && (
          <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-medium">
            Designed by {poster.designer}
          </p>
        )}
      </div>
    </div>
  );
};

export default PosterCard;
