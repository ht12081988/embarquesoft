"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
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

export default function TrackingStatus() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [language, setLanguage] = useState("ES");

  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const mockData = [
    { barcode: "20600029411001", date: "03-07-2026", status: "WH", packages: "11", container: "-" },
    { barcode: "20600029411002", date: "03-07-2026", status: "WH", packages: "11", container: "-" },
    { barcode: "20600029411003", date: "03-07-2026", status: "WH", packages: "11", container: "-" },
    { barcode: "20600029411004", date: "03-07-2026", status: "WH", packages: "11", container: "-" },
    { barcode: "20600029411005", date: "03-07-2026", status: "WH", packages: "11", container: "-" },
  ];

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

        <div className="flex-1 px-4 pt-4 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-24">
          
          {/* Page Title with Back Button */}
          <div className="flex items-center justify-center relative mb-1 w-full text-white shrink-0">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer absolute left-0">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-normal tracking-wide">
              Tracking Status
            </h1>
          </div>

          {/* Tracking Cards */}
          <div className="flex flex-col gap-4 pb-8">
            {mockData.map((item, index) => (
              <div key={index} className="bg-white/[0.88] backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[#eb5b27] font-extrabold text-[15px]">Barcode</h2>
                  <span className="text-[#eb5b27] font-bold text-sm">{item.barcode}</span>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex justify-between items-center text-[11px] pb-3 border-b border-gray-300">
                    <span className="text-gray-700 font-bold">Date:</span>
                    <span className="text-[#eb5b27] font-medium">{item.date}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-[11px] py-3 border-b border-gray-300">
                    <span className="text-gray-700 font-bold">Status:</span>
                    <span className="text-[#eb5b27] font-medium">{item.status}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-[11px] py-3 border-b border-gray-300">
                    <span className="text-gray-700 font-bold">Packages:</span>
                    <span className="text-[#eb5b27] font-medium">{item.packages}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-[11px] pt-3">
                    <span className="text-gray-700 font-bold">Container:</span>
                    <span className="text-[#eb5b27] font-medium">{item.container}</span>
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
