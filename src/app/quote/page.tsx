"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, Plus, Upload, Camera, CheckCircle, FileText } from "lucide-react";
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

export default function QuoteListPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("ES");
  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const quotes = [
    {
      id: "QTA-000001",
      firstName: "John",
      lastName: "Doe",
      telephone: "212-444-8574",
      description: "Need a quote for shipping a 20ft container to Santo Domingo. Please include insurance options.",
      date: "2026-07-16",
      estimatedShipping: "2026-07-25 09:00 AM",
      comments: [
        {
          id: "c1",
          userId: "admin1",
          userName: "Tenant Admin",
          comment: "Yes, insurance can be added. The cost would be $50.",
          timestamp: "2026-07-17 2:45 PM",
          images: [] as string[],
        },
        {
          id: "c2",
          userId: "user1",
          userName: "John Doe",
          comment: "Thank you for the quote.",
          timestamp: "2026-07-17 10:30 AM",
          images: [] as string[],
        },
      ]
    },
    {
      id: "QTA-000002",
      firstName: "Maria",
      lastName: "Gonzalez",
      telephone: "809-555-1234",
      description: "Looking to ship a refrigerator and 3 medium boxes. Image attached for reference.",
      date: "2026-07-15",
      estimatedShipping: "",
      comments: [
        {
          id: "c3",
          userId: "user2",
          userName: "Maria Gonzalez",
          comment: "I need this by Friday.",
          timestamp: "2026-07-16 9:15 AM",
          images: [
            "https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG",
            "https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG",
            "https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG",
          ] as string[],
        },
      ]
    },
    {
      id: "QTA-000003",
      firstName: "Carlos",
      lastName: "Smith",
      telephone: "305-999-8888",
      description: "Moving household items from Miami to Santiago. Need competitive rates.",
      date: "2026-07-14",
      estimatedShipping: "2026-07-20 02:30 PM",
      comments: []
    }
  ];

  const filteredQuotes = quotes.filter(quote => 
    quote.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.description.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-base font-normal flex-1 text-center pl-4 tracking-wide">My Quotes</h1>
            <Link href="/quote/new" className="active:scale-95 transition-transform cursor-pointer p-1 -mr-1">
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
                You can create and submit a Quote by clicking on the "+" icon.
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
                  placeholder="Search quotes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl pl-11 pr-4 py-3 text-[13px] text-gray-900 outline-none font-medium placeholder-gray-400 shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                />
              </div>
            </div>

            {/* Quote List */}
            <div className="flex-1 px-5 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar pb-24">
              {filteredQuotes.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {filteredQuotes.map((quote) => (
                    <Link href={`/quote/${quote.id}`} key={quote.id} className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm flex flex-col p-5 shrink-0 hover:shadow-md transition-shadow active:scale-[0.99] block">
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-black/5">
                        <span className="bg-[#eb5b27] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                          {quote.id}
                        </span>
                      </div>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="mt-1 text-[#eb5b27]">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[#eb5b27] font-bold text-sm mb-1">Quote #{quote.id}</h3>
                          <p className="text-gray-600 text-[11px] font-medium leading-snug line-clamp-2">
                            {quote.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-gray-700 font-bold">Submitted:</span>
                          <span className="text-[#eb5b27] font-medium">{quote.date}</span>
                        </div>
                        {quote.estimatedShipping && (
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-gray-700 font-bold">Est. Shipping:</span>
                            <span className="text-[#eb5b27] font-medium">{quote.estimatedShipping}</span>
                          </div>
                        )}

                        {/* Comments Section */}
                        {quote.comments && quote.comments.length > 0 && (
                          <div className="mt-3 border-t border-gray-200 pt-3">
                            {/* Header: Comments title + View All */}
                            <div className="flex items-center justify-between mb-2.5">
                              <div className="flex items-center gap-1.5">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#eb5b27]">
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                                <span className="text-gray-700 font-bold text-[11px]">Comments</span>
                              </div>
                              <button
                                onClick={(e) => { e.preventDefault(); router.push(`/quote/${quote.id}`); }}
                                className="text-[#eb5b27] text-[11px] font-semibold active:opacity-70 transition-opacity"
                              >
                                View All
                              </button>
                            </div>

                            {/* Latest comment */}
                            <div className="bg-gray-100/80 rounded-xl p-3">
                              {/* Name · timestamp inline */}
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-[11px] font-bold text-[#1a2b5e]">{quote.comments[0].userName}</span>
                                <span className="text-gray-400 text-[10px]">·</span>
                                <span className="text-gray-400 text-[10px]">{quote.comments[0].timestamp}</span>
                              </div>
                              {/* Comment text */}
                              <p className="text-gray-700 text-[11px] font-medium leading-snug line-clamp-2 mb-2">
                                {quote.comments[0].comment}
                              </p>
                              {/* Image thumbnail strip */}
                              {quote.comments[0].images && quote.comments[0].images.length > 0 && (
                                <div className="flex gap-2 flex-wrap">
                                  {quote.comments[0].images.map((src: string, idx: number) => (
                                    <div
                                      key={idx}
                                      className="w-[60px] h-[60px] rounded-xl overflow-hidden border border-gray-200 bg-gray-200 shrink-0"
                                    >
                                      <img
                                        src={src}
                                        alt={`attachment-${idx + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Add Comment Button */}
                        <div className="mt-3">
                          <button
                            onClick={(e) => { e.preventDefault(); router.push(`/quote/${quote.id}`); }}
                            className="w-full bg-[#eb5b27]/10 hover:bg-[#eb5b27]/20 text-[#eb5b27] font-medium text-[12px] py-2.5 rounded-xl border border-[#eb5b27]/20 active:scale-98 transition-all"
                          >
                            + Add Comment
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                  </div>
                  <h3 className="text-white font-medium text-[15px] mb-2">No quotes found</h3>
                  <p className="text-white/80 text-[13px] px-8">
                    {searchQuery ? "Try adjusting your search criteria." : "You haven't created any quotes yet."}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
