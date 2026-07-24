'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
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

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const invoiceId = params.id as string;
  const amountToPay = searchParams.get('amount') || '0.00';
  
  const { isLoggedIn } = useAuth();
  const [language, setLanguage] = useState("ES");
  
  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const [paymentType, setPaymentType] = useState('manual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call for payment
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Auto redirect back to invoices after 2 seconds
      setTimeout(() => {
        router.push('/invoices');
      }, 2000);
    }, 1500);
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

        {/* Page Title & Actions */}
        <div className="pt-4 pb-2 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-normal flex-1 text-center pr-8 tracking-wide">Checkout</h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-5 pt-4 pb-24 flex flex-col gap-4 overflow-y-auto no-scrollbar relative z-10">
          
          <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center">
            <span className="text-gray-500 font-medium text-[12px] mb-1">Amount to Pay</span>
            <span className="text-[#061246] font-black text-3xl">${Number(amountToPay).toFixed(2)}</span>
            <span className="text-[#eb5b27] font-bold text-[11px] mt-1">Invoice: {invoiceId}</span>
          </div>

          <form onSubmit={handlePayment} className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col gap-4">
            <h2 className="text-[#2C3258] font-bold text-[13px] border-b border-gray-100 pb-2">Payment Details</h2>
            
            <div className="flex gap-4 -mt-1 mb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="paymentType" 
                  value="manual"
                  checked={paymentType === 'manual'}
                  onChange={() => setPaymentType('manual')}
                  className="w-4 h-4 text-[#eb5b27] focus:ring-[#eb5b27] border-gray-300"
                />
                <span className="text-[#2C3258] font-bold text-[12px]">Manual</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="paymentType" 
                  value="nfc"
                  checked={paymentType === 'nfc'}
                  onChange={() => setPaymentType('nfc')}
                  className="w-4 h-4 text-[#eb5b27] focus:ring-[#eb5b27] border-gray-300"
                />
                <span className="text-[#2C3258] font-bold text-[12px]">NFC</span>
              </label>
            </div>

            {paymentType === 'manual' ? (
              <>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#2C3258] font-bold text-[11px]">Cardholder Name</label>
                  <div className="bg-white rounded-xl h-12 flex items-center px-4 shadow-sm border border-gray-200 focus-within:border-[#eb5b27]">
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className="flex-1 bg-transparent outline-none font-medium placeholder-gray-400 w-full text-gray-900 text-[12px]" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[#2C3258] font-bold text-[11px]">Card Number</label>
                  <div className="bg-white rounded-xl h-12 flex items-center px-4 shadow-sm border border-gray-200 focus-within:border-[#eb5b27]">
                    <input 
                      type="text" 
                      required
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                      placeholder="0000 0000 0000 0000"
                      className="flex-1 bg-transparent outline-none font-medium placeholder-gray-400 w-full text-gray-900 text-[12px]" 
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[#2C3258] font-bold text-[11px]">Expiry Date</label>
                    <div className="bg-white rounded-xl h-12 flex items-center px-4 shadow-sm border border-gray-200 focus-within:border-[#eb5b27]">
                      <input 
                        type="text" 
                        required
                        maxLength={5}
                        value={formData.expiry}
                        onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                        placeholder="MM/YY"
                        className="flex-1 bg-transparent outline-none font-medium placeholder-gray-400 w-full text-gray-900 text-[12px]" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[#2C3258] font-bold text-[11px]">CVV</label>
                    <div className="bg-white rounded-xl h-12 flex items-center px-4 shadow-sm border border-gray-200 focus-within:border-[#eb5b27]">
                      <input 
                        type="password" 
                        required
                        maxLength={4}
                        value={formData.cvv}
                        onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                        placeholder="123"
                        className="flex-1 bg-transparent outline-none font-medium placeholder-gray-400 w-full text-gray-900 text-[12px]" 
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 gap-3">
                <div className="w-16 h-16 bg-[#eb5b27]/10 rounded-full flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#eb5b27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <span className="text-[#2C3258] font-bold text-[14px]">Tap your card to pay</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#eb5b27] text-white font-bold text-[13px] py-2.5 rounded-xl mt-2 shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f] disabled:opacity-70 disabled:active:scale-100"
            >
              {isProcessing ? 'Processing...' : 'Confirm Payment'}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-5 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-sm flex flex-col items-center justify-center shadow-2xl animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-5">
              <CheckCircle size={40} strokeWidth={2.5} />
            </div>
            <h2 className="text-[#061246] font-black text-2xl mb-2 text-center">Payment Successful!</h2>
            <p className="text-gray-500 text-center text-[14px] font-medium mb-6">
              Your payment of ${Number(amountToPay).toFixed(2)} has been processed.
            </p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 animate-[progress_2s_ease-in-out_forwards]"></div>
            </div>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}} />
    </div>
  );
}
