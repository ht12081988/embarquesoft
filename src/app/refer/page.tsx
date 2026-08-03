"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, Plus, UserPlus, FileText } from "lucide-react";
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

export default function ReferListPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("ES");
  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const referrals = [
    {
      id: "REF-000001",
      firstName: "Alex",
      lastName: "Martinez",
      mobile: "305-123-4567",
      email: "alex.m@example.com",
      status: "Pending",
      date: "2026-07-28"
    },
    {
      id: "REF-000002",
      firstName: "Sarah",
      lastName: "Connor",
      mobile: "212-987-6543",
      email: "sarah.c@example.com",
      status: "Joined",
      date: "2026-07-20"
    }
  ];

  const filteredReferrals = referrals.filter(ref => 
    ref.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.mobile.includes(searchQuery) ||
    ref.id.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-base font-normal flex-1 text-center pl-4 tracking-wide">My Referrals</h1>
            <Link href="/refer/new" className="active:scale-95 transition-transform cursor-pointer p-1 -mr-1">
              <Plus size={24} />
            </Link>
          </div>
        </div>

        {!isLoggedIn ? (
          <div className="flex-1 px-5 flex flex-col items-center justify-center text-center pb-24">
            <div className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-md max-w-sm flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-[#eb5b27]/10 rounded-full flex items-center justify-center text-[#eb5b27]">
                <FileText size={32} />
              </div>
              <p className="text-gray-800 text-[15px] font-semibold leading-relaxed">
                You can refer a friend by clicking on the "+" icon.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Search Box */}
            <div className="px-5 pb-4 shrink-0 z-10">
              <div className="relative">
                <Search 
                  size={18} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search referrals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl pl-11 pr-4 py-3 text-[13px] text-gray-900 outline-none font-medium placeholder-gray-400 shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                />
              </div>
            </div>

            {/* Referral List */}
            <div className="flex-1 px-5 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar pb-24">
              {filteredReferrals.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {filteredReferrals.map((referral) => (
                    <Link href={`#`} key={referral.id} className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm flex flex-col p-5 shrink-0 hover:shadow-md transition-shadow active:scale-[0.99] block">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-black/5">
                        <span className="bg-[#eb5b27] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                          {referral.id}
                        </span>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${referral.status === 'Joined' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {referral.status}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-3 mb-3">
                        <div className="mt-1 text-[#eb5b27]">
                          <UserPlus size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[14px] text-gray-800 leading-relaxed font-bold">
                            {referral.firstName} {referral.lastName}
                          </p>
                          <p className="text-[13px] text-gray-600 font-medium mt-1">
                            {referral.mobile}
                          </p>
                          <p className="text-[12px] text-gray-500 mt-0.5">
                            {referral.email}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2.5 pt-3 border-t border-black/5 mt-auto">
                        <div className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1.5 text-gray-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            Referred: {referral.date}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center pt-10">
                  <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-sm text-center max-w-sm flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                      <FileText size={32} />
                    </div>
                    <p className="text-gray-600 text-[14px] font-medium leading-relaxed">
                      No referrals found.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
