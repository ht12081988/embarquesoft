"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, Plus } from "lucide-react";
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

const claims = [
  {
    id: "CLM-9021",
    invoiceNumber: "INV-00123",
    claimDate: "2026-08-15 14:30",
    writeClaim: "Box arrived damaged and contents were broken. Missing 2 items from the original packing list.",
    status: "Open",
    comments: [
      {
        id: "cc1",
        userName: "Tenant Admin",
        comment: "We have received your claim and are reviewing it.",
        timestamp: "2026-08-16 10:00 AM",
        images: [] as string[],
      },
      {
        id: "cc2",
        userName: "John Doe",
        comment: "Please let me know the timeline for resolution.",
        timestamp: "2026-08-16 11:30 AM",
        images: [
          "https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG",
          "https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG",
        ] as string[],
      },
    ],
  },
  {
    id: "CLM-9022",
    invoiceNumber: "INV-00145",
    claimDate: "2026-09-02 09:15",
    writeClaim: "Delivery was delayed by 3 weeks past the guaranteed arrival date without any notification.",
    status: "Closed",
    comments: [
      {
        id: "cc3",
        userName: "Tenant Admin",
        comment: "Claim resolved. Compensation issued.",
        timestamp: "2026-09-10 3:00 PM",
        images: [] as string[],
      },
    ],
  },
  {
    id: "CLM-9023",
    invoiceNumber: "INV-00199",
    claimDate: "2026-09-10 11:20",
    writeClaim: "Items are missing from the barrel.",
    status: "Processing",
    comments: [],
  },
];

export default function ClaimsList() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("ES");

  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

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
        {/* Header */}
        <div className="shrink-0 px-5 pt-9 pb-4.5 z-10" style={{ background: "linear-gradient(135deg, #061246 0%, #1a40b4 100%)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-[12px] tracking-[0.14em] uppercase text-white">SALCEDO</span>
            </div>
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

        {/* Search */}
        <div className="px-5 pb-4 shrink-0 z-10">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search claims..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl pl-11 pr-4 py-3 text-[13px] text-gray-900 outline-none font-medium placeholder-gray-400 shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
            />
          </div>
        </div>

        {/* Claims List */}
        <div className="flex-1 px-5 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar pb-24">
          {filteredClaims.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredClaims.map((claim) => (
                <Link
                  href={`/claim/${claim.id}`}
                  key={claim.id}
                  className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm flex flex-col p-5 shrink-0 hover:shadow-md transition-shadow active:scale-[0.99] block"
                >
                  {/* Claim ID + Status */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/5">
                    <span className="bg-[#eb5b27] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {claim.id}
                    </span>
                    <span className={`font-bold text-[11px] ${
                      claim.status === "Closed" ? "text-[#10b981]" :
                      claim.status === "Processing" ? "text-[#f8a379]" :
                      "text-[#eb5b27]"
                    }`}>
                      {claim.status}
                    </span>
                  </div>

                  {/* Invoice + Date */}
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-gray-700 font-bold">Invoice #:</span>
                      <span className="text-[#eb5b27] font-medium">{claim.invoiceNumber}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-gray-700 font-bold">Claim Date/Time:</span>
                      <span className="text-[#eb5b27] font-medium">{claim.claimDate}</span>
                    </div>
                  </div>

                  {/* Claim description */}
                  <div className="bg-black/5 rounded-xl p-3 mb-3">
                    <p className="text-gray-700 font-medium text-[11px] leading-relaxed line-clamp-2">
                      {claim.writeClaim}
                    </p>
                  </div>

                  {/* Comments section */}
                  {claim.comments && claim.comments.length > 0 && (
                    <div className="border-t border-gray-200 pt-3">
                      {/* Header row */}
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#eb5b27]">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                          </svg>
                          <span className="text-gray-700 font-bold text-[11px]">Comments</span>
                        </div>
                        <button
                          onClick={(e) => { e.preventDefault(); router.push(`/claim/${claim.id}`); }}
                          className="text-[#eb5b27] text-[11px] font-semibold active:opacity-70 transition-opacity"
                        >
                          View All
                        </button>
                      </div>

                      {/* Latest comment */}
                      <div className="bg-gray-100/80 rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[11px] font-bold text-[#1a2b5e]">{claim.comments[0].userName}</span>
                          <span className="text-gray-400 text-[10px]">·</span>
                          <span className="text-gray-400 text-[10px]">{claim.comments[0].timestamp}</span>
                        </div>
                        <p className="text-gray-700 text-[11px] font-medium leading-snug line-clamp-2 mb-2">
                          {claim.comments[0].comment}
                        </p>
                        {claim.comments[0].images && claim.comments[0].images.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {claim.comments[0].images.map((src: string, idx: number) => (
                              <div key={idx} className="w-[60px] h-[60px] rounded-xl overflow-hidden border border-gray-200 bg-gray-200 shrink-0">
                                <img src={src} alt={`attachment-${idx + 1}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Add Comment button */}
                  <div className="mt-3">
                    <button
                      onClick={(e) => { e.preventDefault(); router.push(`/claim/${claim.id}`); }}
                      className="w-full bg-[#eb5b27]/10 hover:bg-[#eb5b27]/20 text-[#eb5b27] font-medium text-[12px] py-2.5 rounded-xl border border-[#eb5b27]/20 active:scale-98 transition-all"
                    >
                      + Add Comment
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-white font-medium text-[15px] mb-2">No claims found</h3>
              <p className="text-white/80 text-[13px] px-8">
                {searchQuery ? "Try adjusting your search criteria." : "You haven't filed any claims yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
