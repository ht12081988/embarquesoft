"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";
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

export default function InvoiceList() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("ES");

  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const invoices = [
    {
      id: "TIV-000294",
      name: "Ricardo Sinha",
      province: "MO",
      amount: "$ 1500.00",
      balance: "$ 1207.00",
      date: "Oct 12, 2026",
    },
    {
      id: "TIV-000293",
      name: "John Doe",
      province: "NY",
      amount: "$ 9.00",
      balance: "$ 9.00",
      date: "Oct 10, 2026",
    },
    {
      id: "TIV-000292",
      name: "Jane Smith",
      province: "CA",
      amount: "$ 50.00",
      balance: "$ 0.00",
      date: "Oct 08, 2026",
    }
  ];

  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.name.toLowerCase().includes(searchQuery.toLowerCase())
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

        {/* Content Section - scrollable list */}
        <div className="flex-1 p-5 pt-4 pb-24 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          {/* Page Title */}
          <div className="flex items-center justify-center mb-1 w-full text-white">
            <h1 className="text-base font-normal tracking-wide">
              Invoice List
            </h1>
          </div>

          {/* Search Bar */}
          <div className="bg-white/90 backdrop-blur-md rounded-full h-11 flex items-center px-4 shadow-sm border border-white/20 mb-1 shrink-0">
            <Search size={18} className="text-gray-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search Invoice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none font-medium placeholder-gray-400 w-full text-gray-900 text-[14px]"
            />
          </div>
          {filteredInvoices.map((invoice) => {
            const isPaid = invoice.balance === "$ 0.00";
            return (
              <Link href={`/invoices/${invoice.id}`} key={invoice.id} className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative active:scale-[0.98] transition-transform cursor-pointer block">
                
                {/* Top Row: Icon + Invoice ID + Chevron */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C3258" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <span className="text-[#eb5b27] font-bold text-[14px]">{invoice.id}</span>
                  </div>
                  <div className="bg-[#eb5b27] w-5 h-5 rounded-full flex items-center justify-center text-white">
                    <ChevronRight size={14} strokeWidth={3} />
                  </div>
                </div>
                
                {/* Invoice Details */}
                <div className="flex justify-between items-end mb-4">
                  <div className="flex flex-col border-l-2 border-[#e2e8f0] pl-2 py-0.5">
                    <span className="text-[12px] mb-0.5">
                      <span className="text-[#2C3258] font-bold">Ship to: </span>
                      <span className="text-[#eb5b27] font-medium">{invoice.name}</span>
                    </span>
                    <span className="text-[12px]">
                      <span className="text-[#2C3258] font-bold">Province: </span>
                      <span className="text-[#eb5b27] font-medium">{invoice.province}</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className={`font-bold text-[12px] mb-0.5 ${isPaid ? 'text-green-600' : 'text-[#eb5b27]'}`}>
                      {isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                    <span className="text-gray-500 font-medium text-[12px] whitespace-nowrap">
                      {invoice.date.replace(',', ' -')}
                    </span>
                  </div>
                </div>
                
                {/* Amounts Pill */}
                <div className="bg-[#eb5b27] rounded-full flex justify-between items-center px-6 py-2.5 shadow-sm mb-3">
                  <span className="text-white font-bold text-[12px] flex-1 text-center">Amt: {invoice.amount}</span>
                  <div className="w-[1px] h-3 bg-white/40 shrink-0"></div>
                  <span className="text-white font-bold text-[12px] flex-1 text-center">Bal: {invoice.balance}</span>
                </div>
                
                {/* Pay Button */}
                {!isPaid && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigating to the invoice details
                      e.stopPropagation();
                      router.push(`/invoices/${invoice.id}/pay`);
                    }}
                    className="w-full bg-[#eb5b27] text-white font-bold text-[13px] py-2.5 rounded-full mt-1 shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f]"
                  >
                    Pay Now
                  </button>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}


