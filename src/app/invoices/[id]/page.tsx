"use client";

import React, { useState } from "react";
import { ArrowLeft, Edit, Truck } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
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

export default function InvoiceDetails() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = params.id as string || "TIV-000294";
  const { isLoggedIn } = useAuth();
  const [language, setLanguage] = useState("ES");

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

        <div className="flex-1 px-4 pt-4 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-24">
          {/* Page Title with Back Button */}
          <div className="flex items-center justify-center relative mb-1 w-full text-white shrink-0">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer absolute left-0">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-normal tracking-wide">
              Invoice Details
            </h1>
          </div>
          
          {/* Invoice Info Card */}
          <div className="bg-white/[0.88] backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative shrink-0">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[#eb5b27] font-extrabold text-[15px]">Invoice Info</h2>
              <div className="absolute left-1/2 -translate-x-1/2 top-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2C3258" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <Link 
                href={`/invoices/1/tracking`}
                className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#eb5b27] hover:bg-[#d94d1f] px-4 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform"
              >
                <Truck size={14} />
                <span>Tracking</span>
              </Link>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-[11px] pb-3 border-b border-gray-300">
                <span className="text-gray-700 font-bold">INVOICE #:</span>
                <span className="text-[#eb5b27] font-bold text-sm">TIV-000294</span>
              </div>
              <div className="flex justify-between items-center text-[11px] py-3 border-b border-gray-300">
                <span className="text-gray-700 font-bold">Created:</span>
                <span className="text-[#eb5b27] font-medium">Oct - 12 - 2026 / 10:30 AM</span>
              </div>
              <div className="flex justify-between items-center text-[11px] py-3 border-b border-gray-300">
                <span className="text-gray-700 font-bold">Due:</span>
                <span className="text-[#eb5b27] font-bold">Oct - 20 - 2026</span>
              </div>
              <div className="flex justify-between items-center text-[11px] pt-3">
                <span className="text-gray-700 font-bold">Driver Name:</span>
                <span className="text-[#eb5b27] font-medium">Michael Scott</span>
              </div>
            </div>
          </div>

          {/* Ship To Card */}
          <div className="bg-white/[0.88] backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative shrink-0">
            <h2 className="text-[#eb5b27] font-extrabold text-[15px] mb-4 border-b border-gray-200/60 pb-3">Ship to</h2>
            <div className="flex flex-col">
              <div className="flex justify-between text-[11px] pb-3 border-b border-gray-300">
                <span className="text-gray-700 font-bold w-20 shrink-0">Address:</span>
                <span className="text-[#eb5b27] font-medium text-right leading-snug">
                  47 W 13th St 47 W 13 St, JapanMunicipal, JapanProvinceann
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] pt-3">
                <span className="text-gray-700 font-bold">Mobile:</span>
                <span className="text-[#eb5b27] font-medium">+1 201-555-0123</span>
              </div>
            </div>
          </div>

          {/* Items Card */}
          <div className="bg-white/[0.88] backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative shrink-0">
            <h2 className="text-[#eb5b27] font-extrabold text-[15px] mb-4 border-b border-gray-200/60 pb-3">Items</h2>
            <div className="flex flex-col gap-4">
              <p className="text-gray-800 font-bold text-[12px] leading-relaxed">
                Estufa de 30" Nueva de color blanco o negra en caja de fab...
              </p>
              <div className="flex items-center gap-2">
                <span className="bg-[#eb5b27] text-white font-bold text-[11px] rounded-full px-4 py-1.5 flex-1 text-center">Qty: 11</span>
                <span className="bg-[#eb5b27] text-white font-bold text-[11px] rounded-full px-4 py-1.5 flex-1 text-center">Ins: 0.00</span>
                <span className="bg-[#eb5b27] text-white font-bold text-[11px] rounded-full px-4 py-1.5 flex-1 text-center">Price: $110.00</span>
              </div>
            </div>
          </div>

          {/* Total Card */}
          <div className="bg-white/[0.88] backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative shrink-0">
            <h2 className="text-[#eb5b27] font-extrabold text-[15px] mb-4 border-b border-gray-200/60 pb-3">Total</h2>
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-[11px] pb-3 border-b border-gray-300">
                <span className="text-gray-700 font-bold">Subtotal:</span>
                <span className="text-[#eb5b27] font-medium">$1210.00</span>
              </div>
              <div className="flex justify-between items-center text-[11px] py-3 border-b border-gray-300">
                <span className="text-gray-700 font-bold">Insurance:</span>
                <span className="text-[#eb5b27] font-medium">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-[11px] py-3 border-b border-gray-300">
                <span className="text-gray-700 font-bold">Tax:</span>
                <span className="text-[#eb5b27] font-medium">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-[11px] py-3 border-b-2 border-gray-300">
                <span className="text-gray-700 font-bold">Discount:</span>
                <span className="text-[#eb5b27] font-medium">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-[12px] pt-3">
                <span className="text-gray-700 font-bold">Total:</span>
                <span className="text-[#eb5b27] font-bold text-sm">$1210.00</span>
              </div>
            </div>
          </div>

          {/* Comment Card */}
          <div className="bg-white/[0.88] backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative shrink-0">
            <h2 className="text-[#eb5b27] font-extrabold text-[15px] mb-3">Comment</h2>
            <div className="bg-black/5 rounded-xl p-3 border border-black/5">
              <p className="text-[#eb5b27] font-medium text-[11px] leading-relaxed">
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. It is typically a corrupted version of De finibus bonorum et
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => router.push(`/invoices/${invoiceId}/pay`)}
            className="w-full bg-[#eb5b27] text-white font-bold text-[13px] py-2.5 rounded-full mt-2 shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f]"
          >
            Pay Now
          </button>
          
        </div>
      </div>
    </div>
  );
}
