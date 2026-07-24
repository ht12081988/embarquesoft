'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth';

const IconWhatsapp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

export default function InvoicePaymentPage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = params.id as string;
  const { isLoggedIn } = useAuth();
  const [language, setLanguage] = useState("ES");
  
  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  // Mock Invoice Details based on reference image
  const subtotal = 1210.00;
  const insurance = 0.00;
  const tax = 0.00;
  const discount = 0.00;
  const total = subtotal + insurance + tax - discount;

  // Payment Form State
  const [referenceNumber, setReferenceNumber] = useState("");
  const [amountToPay, setAmountToPay] = useState(total.toString());
  const [pointsApplied, setPointsApplied] = useState("");
  
  const earnedPoints = 1000;
  const pointValue = 1; // 1 point = $1
  
  const pointsAppliedNum = parseInt(pointsApplied) || 0;
  const amountToPayNum = parseFloat(amountToPay) || 0;
  
  const remainingBalance = Math.max(0, total - amountToPayNum - (pointsAppliedNum * pointValue));

  const handleProceed = () => {
    // Navigate to checkout passing the final amount via query param
    router.push(`/invoices/${invoiceId}/checkout?amount=${amountToPayNum}&points=${pointsAppliedNum}`);
  };

  return (
    <div className="flex flex-col flex-1 h-full relative font-sans">
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
            <h1 className="text-base font-normal flex-1 text-center pr-8 tracking-wide">Pay Invoice {invoiceId}</h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-5 pt-4 pb-24 flex flex-col gap-4 overflow-y-auto no-scrollbar relative z-10">
          
          {/* Invoice Summary Card */}
          <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <h2 className="text-[#eb5b27] font-bold text-[14px] mb-3">Total</h2>
            
            <div className="flex flex-col gap-2 text-[12px] font-medium text-gray-700">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span>Subtotal:</span>
                <span className="text-[#eb5b27] font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span>Insurance:</span>
                <span className="text-[#eb5b27] font-bold">${insurance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span>Tax:</span>
                <span className="text-[#eb5b27] font-bold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span>Discount:</span>
                <span className="text-[#eb5b27] font-bold">${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-1 text-[13px] text-[#2C3258] font-bold">
                <span>Total:</span>
                <span className="text-[#eb5b27]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col gap-4">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[11px]">Reference Number</label>
              <div className="bg-white rounded-xl h-12 flex items-center px-4 shadow-sm border border-gray-200">
                <input 
                  type="text" 
                  placeholder="Enter Ref Number"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  className="flex-1 bg-transparent outline-none font-medium placeholder-gray-400 w-full text-gray-900 text-[12px]" 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[11px]">Amount to Pay ($)</label>
              <div className="bg-white rounded-xl h-12 flex items-center px-4 shadow-sm border border-[#eb5b27]/30 focus-within:border-[#eb5b27]">
                <input 
                  type="number" 
                  value={amountToPay}
                  onChange={(e) => setAmountToPay(e.target.value)}
                  className="flex-1 bg-transparent outline-none font-bold text-[#eb5b27] w-full text-[13px]" 
                />
              </div>
            </div>

            {/* Points Application */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between items-end">
                <label className="text-[#2C3258] font-bold text-[11px]">Apply Points</label>
                <span className="text-gray-500 text-[10px] font-medium">Earned: <span className="font-bold text-[#eb5b27]">{earnedPoints}</span></span>
              </div>
              <div className="flex gap-2">
                <div className="bg-white rounded-xl h-12 flex items-center px-4 shadow-sm border border-gray-200 flex-1">
                  <input 
                    type="number" 
                    placeholder="Points to apply"
                    value={pointsApplied}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val > earnedPoints) {
                        setPointsApplied(earnedPoints.toString());
                      } else {
                        setPointsApplied(e.target.value);
                      }
                    }}
                    className="flex-1 bg-transparent outline-none font-medium placeholder-gray-400 w-full text-gray-900 text-[12px]" 
                  />
                </div>
              </div>
            </div>

            {/* Remaining Balance Summary */}
            <div className="bg-[#eb5b27] rounded-full p-3 px-5 flex justify-between items-center text-white mt-1 shadow-sm min-h-[48px]">
              <span className="font-bold text-[12px]">Remaining Balance</span>
              <span className="font-bold text-[14px]">${remainingBalance.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleProceed}
              className="w-full bg-[#eb5b27] text-white rounded-xl h-12 flex items-center justify-center text-[13px] font-bold hover:bg-[#d94d1f] active:scale-95 transition-all shadow-[0_4px_14px_rgba(235,91,39,0.35)] border border-white mt-2"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
