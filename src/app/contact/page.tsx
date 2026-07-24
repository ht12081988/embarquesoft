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
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

export default function ContactUs() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [language, setLanguage] = useState("ES");
  
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    comments: ""
  });

  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      router.back();
    }, 2000);
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

        {/* Page Title & Back */}
        <div className="pt-2 pb-2 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-normal flex-1 text-center pr-2 tracking-wide">Contact Us</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 pb-24 z-10 relative">
          <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-[24px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            
            {contactSuccess ? (
              <div className="flex flex-col items-center text-center py-8 gap-4">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle size={40} strokeWidth={2.5} />
                </div>
                <h4 className="font-bold text-[#1A1A1A] text-xl">Thank You!</h4>
                <p className="text-[#2C3258] text-[14px] font-medium">Our team will get back to you shortly.</p>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-green-500 animate-[progress_2s_ease-in-out_forwards]"></div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-black font-medium text-[13px] ml-1">First Name</label>
                    <input type="text" required value={contactForm.firstName}
                           onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                           className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-black font-medium text-[13px] ml-1">Last Name</label>
                    <input type="text" required value={contactForm.lastName}
                           onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                           className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-black font-medium text-[13px] ml-1">Mobile Number</label>
                  <input type="tel" required value={contactForm.mobile}
                         onChange={(e) => setContactForm({ ...contactForm, mobile: e.target.value })}
                         className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-black font-medium text-[13px] ml-1">Email Address</label>
                  <input type="email" required value={contactForm.email}
                         onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                         className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-black font-medium text-[13px] ml-1">Comments</label>
                  <textarea required rows={4} value={contactForm.comments}
                            onChange={(e) => setContactForm({ ...contactForm, comments: e.target.value })}
                            className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] resize-none" />
                </div>
                
                <button type="submit"
                        className="w-full mt-4 bg-[#eb5b27] text-white font-bold text-[13px] h-12 rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}} />
    </div>
  );
}
