"use client";

import React, { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
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

const countries = {
  US: { flag: "🇺🇸", code: "+1" },
  DO: { flag: "🇩🇴", code: "+1" },
  IN: { flag: "🇮🇳", code: "+91" }
};
type CountryKey = keyof typeof countries;

export default function NewReferralPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [language, setLanguage] = useState("ES");
  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");
  const [phoneCountry, setPhoneCountry] = useState<CountryKey>("US");
  
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setSuccess(true);
  };

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

        {/* Page Title */}
        <div className="pt-4 pb-4 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-normal flex-1 text-center pr-8 tracking-wide">New Referral</h1>
          </div>
        </div>

        {/* Main Content Area - White Card */}
        <div className="flex-1 bg-white/[0.88] backdrop-blur-xl rounded-t-[32px] px-6 pt-8 pb-8 flex flex-col z-20 overflow-y-auto no-scrollbar shadow-[0_-8px_24px_rgba(0,0,0,0.1)]">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-10">
              <div className="w-16 h-16 bg-[#eb5b27]/10 rounded-full flex items-center justify-center text-[#eb5b27]">
                <CheckCircle size={32} />
              </div>
              <div>
                <h2 className="text-[#1A1A1A] font-bold text-xl mb-2">Referral Sent!</h2>
                <p className="text-black font-medium text-sm px-4">
                  We have sent an email and SMS invitation to your friend.
                </p>
              </div>
              <button 
                onClick={() => router.push("/refer")}
                className="mt-6 bg-[#eb5b27] hover:bg-[#d94d1f] text-white font-semibold py-3.5 px-8 rounded-full shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform"
              >
                Back to Referrals
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-black font-medium text-[13px] ml-1">First Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                  placeholder="John"
                />
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-black font-medium text-[13px] ml-1">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                  placeholder="Doe"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-medium text-[13px] ml-1">Telephone</label>
                <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border border-white shadow-sm focus-within:border-[#eb5b27] focus-within:ring-1 focus-within:ring-[#eb5b27]">
                  <div className="relative bg-[#EAEAEE] px-3.5 py-3 flex items-center gap-1.5 text-sm font-bold text-black border-r border-gray-200">
                    <span>{countries[phoneCountry].flag}</span>
                    <span>{countries[phoneCountry].code}</span>
                    <select 
                      value={phoneCountry} 
                      onChange={(e) => setPhoneCountry(e.target.value as CountryKey)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    >
                      <option value="US">🇺🇸 USA (+1)</option>
                      <option value="DO">🇩🇴 Dominican Republic (+1)</option>
                      <option value="IN">🇮🇳 India (+91)</option>
                    </select>
                  </div>
                  <input 
                    type="tel" 
                    required
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    placeholder="Telephone"
                    className="flex-1 px-4 py-3 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-black font-medium text-[13px] ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                  placeholder="john.doe@example.com"
                />
              </div>

              <button 
                type="submit"
                className="mt-4 bg-[#eb5b27] hover:bg-[#d94d1f] text-white font-semibold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform"
              >
                Send Referral
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
