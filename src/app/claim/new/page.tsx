"use client";

import React from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
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

export default function NewClaim() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [language, setLanguage] = React.useState("ES");
  
  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

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
            <h1 className="text-base font-normal flex-1 text-center pr-6 tracking-wide">New Claim</h1>
          </div>
        </div>

        {/* Bottom Sheet style container */}
        <div className="flex-1 mt-4 bg-white/[0.88] backdrop-blur-xl rounded-t-[32px] p-6 flex flex-col relative overflow-y-auto no-scrollbar shadow-[0_-8px_32px_rgba(0,0,0,0.1)]">
          {/* Form Container */}
          <div className="flex flex-col gap-5 pb-24">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Invoice #</label>
              <select className="w-full bg-[#f4f5f7]/90 border border-white rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] appearance-none shadow-sm">
                <option value="">Select Invoice Number</option>
                <option value="INV-00123">INV-00123</option>
                <option value="INV-00145">INV-00145</option>
                <option value="INV-00987">INV-00987</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Claim Date/time</label>
              <input type="datetime-local" className="w-full bg-[#f4f5f7]/90 border border-white rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] placeholder-gray-400 shadow-sm" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Write Claim</label>
              <textarea 
                placeholder="" 
                rows={4} 
                className="w-full bg-[#f4f5f7]/90 border border-white rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] placeholder-gray-400 resize-none shadow-sm"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Attach Image</label>
              <div className="w-full bg-[#f4f5f7]/90 border border-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm cursor-pointer active:bg-gray-200 transition-colors">
                <span className="text-gray-400 font-medium"></span>
                <Upload size={18} className="text-[#eb5b27]" />
              </div>
            </div>

            {/* Submit Button */}
            <button className="bg-[#eb5b27] hover:bg-[#d94d1f] text-white font-extrabold text-[15px] py-3.5 rounded-full mt-4 shadow-md active:scale-95 transition-transform w-full">
              Submit Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


