"use client";

import React from "react";
import { ArrowLeft, Edit, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InvoiceDetails() {
  const router = useRouter();

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
        <div className="pt-12 pb-4 px-5 flex flex-col shrink-0 text-white">
          <div className="flex items-center mb-2">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-semibold flex-1 text-center pr-8 tracking-wide">Invoice Details</h1>
          </div>
        </div>

        <div className="flex-1 px-2 pt-2 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-24">
          
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
              <div className="flex justify-between items-center text-[12px] pb-3 border-b border-gray-300">
                <span className="text-[#1A1A1A] font-extrabold">INVOICE #:</span>
                <span className="text-gray-700 font-medium">TIV-000294</span>
              </div>
              <div className="flex justify-between items-center text-[12px] py-3 border-b border-gray-300">
                <span className="text-[#1A1A1A] font-extrabold">Created:</span>
                <span className="text-gray-700 font-medium">Oct - 12 - 2026 / 10:30 AM</span>
              </div>
              <div className="flex justify-between items-center text-[12px] py-3 border-b border-gray-300">
                <span className="text-[#1A1A1A] font-extrabold">Due:</span>
                <span className="text-[#eb5b27] font-extrabold">Oct - 20 - 2026</span>
              </div>
              <div className="flex justify-between items-center text-[12px] pt-3">
                <span className="text-[#1A1A1A] font-extrabold">Driver Name</span>
                <span className="text-gray-700 font-medium">Michael Scott</span>
              </div>
            </div>
          </div>

          {/* Customer Details Card */}
          <div className="bg-white/[0.88] backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative shrink-0">
            <h2 className="text-[#eb5b27] font-extrabold text-[15px] mb-4 border-b border-gray-200/60 pb-3">Customer Details</h2>
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-[12px] pb-3 border-b border-gray-300">
                <span className="text-[#1A1A1A] font-extrabold">Ricardo Sinha</span>
                <span className="text-[#1A1A1A] font-extrabold">Ricardo Sinha</span>
              </div>
              <div className="flex justify-between text-[12px] py-3 border-b border-gray-300">
                <span className="text-[#1A1A1A] font-extrabold w-20 shrink-0">Address:</span>
                <span className="text-gray-700 font-medium text-right leading-snug">47 w 13th st Caruthersville MO 63830</span>
              </div>
              <div className="flex justify-between items-center text-[12px] pt-3">
                <span className="text-[#1A1A1A] font-extrabold">Mobile:</span>
                <span className="text-[#eb5b27] font-bold">+1 212-444-8574</span>
              </div>
            </div>
          </div>

          {/* Ship To Card */}
          <div className="bg-white/[0.88] backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative shrink-0">
            <h2 className="text-[#eb5b27] font-extrabold text-[15px] mb-4 border-b border-gray-200/60 pb-3">Ship to</h2>
            <div className="flex flex-col">
              <div className="flex justify-between text-[12px] pb-3 border-b border-gray-300">
                <span className="text-[#1A1A1A] font-extrabold w-20 shrink-0">Address:</span>
                <span className="text-gray-700 font-medium text-right leading-snug">
                  47 W 13th St 47 W 13 St, JapanMunicipal, JapanProvinceann
                </span>
              </div>
              <div className="flex justify-between items-center text-[12px] pt-3">
                <span className="text-[#1A1A1A] font-extrabold">Mobile:</span>
                <span className="text-[#eb5b27] font-bold">+1 201-555-0123</span>
              </div>
            </div>
          </div>

          {/* Items Card */}
          <div className="bg-white/[0.88] backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative shrink-0">
            <h2 className="text-[#eb5b27] font-extrabold text-[15px] mb-4 border-b border-gray-200/60 pb-3">Items</h2>
            <div className="flex flex-col gap-4">
              <p className="text-[#1A1A1A] font-extrabold text-[12px] leading-relaxed">
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
              <div className="flex justify-between items-center text-[12px] pb-3 border-b border-gray-300">
                <span className="text-[#1A1A1A] font-extrabold">Subtotal</span>
                <span className="text-gray-700 font-medium">$1210.00</span>
              </div>
              <div className="flex justify-between items-center text-[12px] py-3 border-b border-gray-300">
                <span className="text-[#1A1A1A] font-extrabold">Insurance</span>
                <span className="text-gray-700 font-medium">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-[12px] py-3 border-b border-gray-300">
                <span className="text-[#1A1A1A] font-extrabold">Tax</span>
                <span className="text-gray-700 font-medium">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-[12px] py-3 border-b-2 border-gray-300">
                <span className="text-[#1A1A1A] font-extrabold">Discount</span>
                <span className="text-gray-700 font-medium">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-[14px] pt-3">
                <span className="text-[#1A1A1A] font-extrabold">Total</span>
                <span className="text-[#eb5b27] font-extrabold">$1210.00</span>
              </div>
            </div>
          </div>

          {/* Comment Card */}
          <div className="bg-white/[0.88] backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative shrink-0">
            <h2 className="text-[#eb5b27] font-extrabold text-[15px] mb-3">Comment</h2>
            <div className="bg-black/5 rounded-xl p-3 border border-black/5">
              <p className="text-gray-700 font-medium text-[12px] leading-relaxed">
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. It is typically a corrupted version of De finibus bonorum et
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
