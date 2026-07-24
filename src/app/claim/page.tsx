"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, Plus, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth";

const IconWhatsapp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

export default function ClaimsList() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("ES");
  
  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const claims = [
    {
      id: "CLM-9021",
      invoiceNumber: "INV-00123",
      claimDate: "2026-08-15 14:30",
      writeClaim: "Box arrived damaged and contents were broken. Missing 2 items from the original packing list.",
      status: "Open"
    },
    {
      id: "CLM-9022",
      invoiceNumber: "INV-00145",
      claimDate: "2026-09-02 09:15",
      writeClaim: "Delivery was delayed by 3 weeks past the guaranteed arrival date without any notification.",
      status: "Closed"
    },
    {
      id: "CLM-9023",
      invoiceNumber: "INV-00199",
      claimDate: "2026-09-10 11:20",
      writeClaim: "Items are missing from the barrel.",
      status: "Processing"
    }
  ];

  const filteredClaims = claims.filter(claim => 
    claim.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.writeClaim.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 h-full relative overflow-hidden font-sans">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/App_Background.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-1 h-full">
        {/* Header Section */}
        <div className="shrink-0 px-5 pt-9 pb-4.5 z-10" style={{ background: "linear-gradient(135deg, #061246 0%, #1a40b4 100%)" }}>
          <div className="flex items-center justify-between">
            {/* Left: Brand */}
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-[12px] tracking-[0.14em] uppercase text-white">
                SALCEDO
              </span>
            </div>
            {/* Right: Bell (if logged in) + WhatsApp + Globe */}
            <div className="flex items-center gap-3.5">
              {isLoggedIn && (
                <Link href="/notifications" className="relative text-white active:scale-90 transition-transform flex items-center">
                  <IconBell />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#eb5b27] rounded-full animate-pulse" />
                </Link>
              )}
              <a href="https://wa.me/12015550123" target="_blank" rel="noopener noreferrer" className="text-white active:scale-90 transition-transform flex items-center">
                <IconWhatsapp />
              </a>
              <button onClick={toggleLanguage} className="text-white active:scale-90 transition-transform flex items-center">
                <IconGlobe />
              </button>
            </div>
          </div>
        </div>

        {/* Page Title & Actions */}
        <div className="pt-4 pb-2 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-normal flex-1 text-center pl-4 tracking-wide">Claims</h1>
            <Link href="/claim/new" className="active:scale-95 transition-transform cursor-pointer p-1 -mr-1">
              <Plus size={24} />
            </Link>
          </div>
        </div>

        <div className="flex-1 p-5 pt-2 flex flex-col gap-5 overflow-y-auto no-scrollbar pb-24 relative z-0">
          <div className="flex flex-col gap-4">
            {filteredClaims.map((claim) => (
              <div key={claim.id} className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm flex flex-col p-5 shrink-0">
                {/* Icon in top center */}
                <div className="flex justify-center w-full mb-3">
                  <div className="relative flex items-center justify-center">
                    <svg width="42" height="42" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Headset Band */}
                      <path d="M7.5 20V16C7.5 9.09644 13.0964 3.5 20 3.5C26.9036 3.5 32.5 9.09644 32.5 16V20" stroke="#061246" strokeWidth="2.5" strokeLinecap="round"/>
                      {/* Microphone */}
                      <path d="M32.5 25V27C32.5 31.9706 28.4706 36 23.5 36H22" stroke="#061246" strokeWidth="2.5" strokeLinecap="round"/>
                      <circle cx="20.5" cy="36" r="2" fill="#061246"/>
                      {/* Left Earpiece */}
                      <rect x="4" y="17" width="7" height="12" rx="3.5" fill="#061246"/>
                      {/* Right Earpiece */}
                      <rect x="29" y="17" width="7" height="12" rx="3.5" fill="#061246"/>
                      {/* Orange Speech Bubble */}
                      <circle cx="20" cy="18" r="10" fill="#eb5b27" />
                      <path d="M17 25 L20 32 L23 25 Z" fill="#eb5b27" />
                      {/* White Exclamation Mark */}
                      <path d="M18.5 11 H21.5 L20.8 19 H19.2 Z" fill="white" />
                      <circle cx="20" cy="23" r="1.7" fill="white" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#eb5b27] font-bold text-sm">{claim.invoiceNumber}</span>
                    <span className={`${
                      claim.status === 'Closed' ? 'text-[#10b981]' : 
                      claim.status === 'Processing' ? 'text-[#f8a379]' : 
                      'text-[#eb5b27]'
                    } font-bold text-[11px]`}>{claim.status}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-700 font-bold">Claim Date/Time:</span>
                    <span className="text-[#eb5b27] font-medium">{claim.claimDate}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-1.5">
                  <span className="text-gray-700 text-[11px] font-bold uppercase tracking-wide">Write claim</span>
                  <div className="bg-black/5 rounded-xl p-3 border-none">
                    <p className="text-gray-700 font-medium text-[11px] leading-relaxed">
                      {claim.writeClaim}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


