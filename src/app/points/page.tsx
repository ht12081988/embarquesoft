"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Calendar, Gift, Star, ArrowLeft } from "lucide-react";

// Scalloped Gold Medal Badge
const GoldBadge = () => (
  <svg width="85" height="85" viewBox="0 0 100 100" className="drop-shadow-lg">
    {/* Scalloped edge simulation using a dashed thick stroke */}
    <circle cx="50" cy="50" r="44" fill="none" stroke="#d97706" strokeWidth="6" strokeDasharray="6,3" />
    <circle cx="50" cy="50" r="42" fill="#ca8a04" />
    <circle cx="50" cy="50" r="40" fill="#eab308" />
    <circle cx="50" cy="50" r="37" fill="#ca8a04" />
    <circle cx="50" cy="50" r="34" fill="#0f172a" />
    
    {/* Stars */}
    <path d="M50 20 l1.5 3.5 3.5.5-2.5 2.5 1 3.5-3.5-2-3.5 2 1-3.5-2.5-2.5 3.5-.5Z" fill="#eab308" />
    <path d="M38 24 l1 2.5 2.5.3-1.8 1.8.5 2.5-2.2-1.3-2.2 1.3.5-2.5-1.8-1.8 2.5-.3Z" fill="#eab308" />
    <path d="M62 24 l1 2.5 2.5.3-1.8 1.8.5 2.5-2.2-1.3-2.2 1.3.5-2.5-1.8-1.8 2.5-.3Z" fill="#eab308" />
    
    {/* Text */}
    <text x="50" y="52" fill="#eab308" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">GOLD</text>
    <text x="50" y="62" fill="#eab308" fontSize="7.5" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">MEMBER</text>
    <text x="50" y="73" fill="#eab308" fontSize="10" fontWeight="950" textAnchor="middle" letterSpacing="0.05em">VIP</text>
  </svg>
);

// Scalloped Silver Medal Badge
const PlatinumBadge = () => (
  <svg width="65" height="65" viewBox="0 0 100 100" className="drop-shadow-md">
    {/* Scalloped edge simulation using a dashed thick stroke */}
    <circle cx="50" cy="50" r="44" fill="none" stroke="#475569" strokeWidth="5" strokeDasharray="5,2.5" />
    <circle cx="50" cy="50" r="42" fill="#94a3b8" />
    <circle cx="50" cy="50" r="40" fill="#cbd5e1" />
    <circle cx="50" cy="50" r="37" fill="#94a3b8" />
    <circle cx="50" cy="50" r="34" fill="#0f172a" />
    
    {/* Stars */}
    <path d="M50 20 l1.5 3.5 3.5.5-2.5 2.5 1 3.5-3.5-2-3.5 2 1-3.5-2.5-2.5 3.5-.5Z" fill="#cbd5e1" />
    <path d="M38 24 l1 2.5 2.5.3-1.8 1.8.5 2.5-2.2-1.3-2.2 1.3.5-2.5-1.8-1.8 2.5-.3Z" fill="#cbd5e1" />
    <path d="M62 24 l1 2.5 2.5.3-1.8 1.8.5 2.5-2.2-1.3-2.2 1.3.5-2.5-1.8-1.8 2.5-.3Z" fill="#cbd5e1" />
    
    {/* Text */}
    <text x="50" y="52" fill="#cbd5e1" fontSize="7" fontWeight="950" textAnchor="middle" letterSpacing="0.03em">PLATINUM</text>
    <text x="50" y="62" fill="#cbd5e1" fontSize="7.5" fontWeight="800" textAnchor="middle" letterSpacing="0.03em">MEMBER</text>
    <text x="50" y="73" fill="#cbd5e1" fontSize="10" fontWeight="950" textAnchor="middle" letterSpacing="0.03em">VIP</text>
  </svg>
);

export default function MyPoints() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 relative font-sans">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/App_Background.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header Section */}
        <div className="pt-12 pb-4 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-semibold flex-1 text-center pr-8 tracking-wide">My Points</h1>
          </div>
        </div>

        {/* Year Selector Area (Top section) */}
        <div className="px-6 pt-2 pb-6 flex justify-end z-10">
          <div className="relative">
            <select className="w-36 appearance-none bg-black/35 backdrop-blur-sm border border-white/20 pl-10 pr-8 py-2 rounded-full text-white text-[11px] font-bold outline-none cursor-pointer focus:ring-1 focus:ring-[#eb5b27]">
              <option value="2026">Year 2026</option>
              <option value="2025">Year 2025</option>
              <option value="2024">Year 2024</option>
            </select>
            <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#eb5b27] pointer-events-none" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Main Glass Section */}
        <div className="flex-1 bg-white/85 backdrop-blur-md border-t border-white/40 rounded-t-[32px] p-6 flex flex-col gap-6 relative z-0 pb-32 shadow-[0_-8px_32px_rgba(0,0,0,0.15)]">
          {/* Gold Member & Points Earned */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex justify-center">
              <GoldBadge />
            </div>
            
            {/* Vertical Line divider */}
            <div className="w-[1px] h-16 bg-gray-200"></div>
            
            <div className="flex-1 flex flex-col pl-4">
              <span className="text-[#061246] text-xs font-bold leading-tight">You have</span>
              <span className="text-[#eb5b27] text-[34px] font-black leading-tight tracking-tight my-0.5 drop-shadow-sm">12,450</span>
              <span className="text-[#061246] text-[15px] font-extrabold leading-tight">Points</span>
            </div>
          </div>

          {/* Platinum Progress Bar */}
          <div className="flex items-center justify-between gap-3 bg-white/60 rounded-2xl p-4 border border-white/50 shadow-inner relative overflow-visible">
            <div className="flex-1 flex flex-col gap-1.5">
              <span className="text-[#eb5b27] font-black text-[11px]">
                5,550 <span className="text-gray-500 font-bold">points to reach Platinum</span>
              </span>
              <div className="w-full bg-gray-200/80 rounded-full h-3.5 relative overflow-hidden border border-black/5">
                <div 
                  className="bg-gradient-to-r from-[#eab308] to-[#eb5b27] h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500 shadow-sm" 
                  style={{ width: "69%" }}
                >
                  <span className="text-[8px] font-black text-white leading-none">69%</span>
                </div>
              </div>
            </div>
            <div className="shrink-0 relative -top-1 -right-2">
              <PlatinumBadge />
            </div>
          </div>

          {/* Earning Tip Banner */}
          <div className="bg-white/60 border border-white/50 rounded-xl p-3.5 flex items-center gap-3 shadow-sm backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-[#eb5b27]/10 flex items-center justify-center shrink-0">
              <Gift size={18} className="text-[#eb5b27]" />
            </div>
            <p className="text-[#061246] text-[11px] font-bold leading-relaxed">
              Keep earning points and unlock bigger rewards!
            </p>
          </div>

          {/* Points Summary Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#061246] font-black text-[13px] tracking-wide">Points Summary</h3>
            
            <div className="grid grid-cols-3 gap-2">
              {/* Column 1: Total */}
              <div className="flex flex-col items-center text-center p-2 bg-white/60 rounded-xl border border-white/50 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#061246]/10 flex items-center justify-center mb-2">
                  <Star size={16} fill="#061246" className="text-[#061246]" />
                </div>
                <span className="text-gray-500 text-[8px] font-bold leading-tight">Total Points</span>
                <span className="text-[#eb5b27] text-[14px] font-black mt-1">12,450</span>
              </div>
              
              {/* Column 2: Earned */}
              <div className="flex flex-col items-center text-center p-2 bg-white/60 rounded-xl border border-white/50 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
                  <Star size={16} fill="#10b981" className="text-[#10b981]" />
                </div>
                <span className="text-gray-500 text-[8px] font-bold leading-tight">Points Earned</span>
                <span className="text-[#eb5b27] text-[14px] font-black mt-1">3,250</span>
                <span className="text-gray-400 text-[7px] font-bold mt-0.5">(This Year)</span>
              </div>

              {/* Column 3: Redeemed */}
              <div className="flex flex-col items-center text-center p-2 bg-white/60 rounded-xl border border-white/50 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mb-2">
                  <Star size={16} fill="#eb5b27" className="text-[#eb5b27]" />
                </div>
                <span className="text-gray-500 text-[8px] font-bold leading-tight">Points Redeemed</span>
                <span className="text-[#eb5b27] text-[14px] font-black mt-1">1,200</span>
                <span className="text-gray-400 text-[7px] font-bold mt-0.5">(This Year)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
