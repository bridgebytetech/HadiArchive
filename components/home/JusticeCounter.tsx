"use client";

import React, { useState, useEffect } from "react";
import { Scale, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { toBanglaNumber } from "@/lib/utils";

export default function JusticeCounter() {
  const { t, isBangla } = useLanguage();
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    // লক্ষ্যমাত্রা: ১২ ডিসেম্বর ২০২৫, দুপুর ২:০০ টা
    const targetDate = new Date("2025-12-12T14:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - targetDate;

      if (diff > 0) {
        setTime({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const n = (num: number) => (isBangla ? toBanglaNumber(num) : num);

  return (
    <section className="py-12 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="container-memorial">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
          
          {/* Left Side: Title */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-memorial-red font-bold text-xs uppercase tracking-widest mb-2">
              <Scale className="w-4 h-4" />
              <span>{t("বিচারের দাবি", "Justice Demand")}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
              {t("শহীদ ওসমান হাদি হত্যার বিচারহীনতার সময়কাল", "Justice pending for Shaheed Osman Hadi")}
            </h2>
          </div>

          {/* Right Side: Simple Ticking Numbers */}
          <div className="flex items-center gap-3 md:gap-6 text-slate-900 dark:text-white">
            <TimeUnit value={n(time.days)} label={t("দিন", "Days")} />
            <span className="text-2xl font-light text-slate-300">:</span>
            <TimeUnit value={n(time.hours)} label={t("ঘণ্টা", "Hrs")} />
            <span className="text-2xl font-light text-slate-300">:</span>
            <TimeUnit value={n(time.mins)} label={t("মিনিট", "Min")} />
            <span className="text-2xl font-light text-slate-300">:</span>
            <TimeUnit value={n(time.secs)} label={t("সেকেন্ড", "Sec")} isRed />
          </div>

        </div>
      </div>
    </section>
  );
}

function TimeUnit({ value, label, isRed = false }: { value: string | number, label: string, isRed?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span className={`text-2xl md:text-4xl font-black tabular-nums ${isRed ? 'text-memorial-red' : ''}`}>
        {value}
      </span>
      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">
        {label}
      </span>
    </div>
  );
}
