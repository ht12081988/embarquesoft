"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, Plus, MapPin, Edit, Trash2 } from "lucide-react";
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

export default function ShipToList() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("ES");
  
  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const shiptos = [
    {
      id: "1",
      firstName: "Sneha",
      lastName: "C",
      address1: "47 W 13th St",
      address2: "47 W 13th St",
      province: "",
      municipal: "",
      cel: "201-555-0123",
      tel: "",
    },
    {
      id: "2",
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      address2: "Apt 4B",
      province: "NY",
      municipal: "New York",
      cel: "212-555-9876",
      tel: "212-555-1234",
    }
  ];

  const filteredShiptos = shiptos.filter(shipto => 
    `${shipto.firstName} ${shipto.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipto.address1.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-base font-normal flex-1 text-center pl-4 tracking-wide">My ShipTo</h1>
            <Link href="/shiptos/new" className="active:scale-95 transition-transform cursor-pointer p-1 -mr-1">
              <Plus size={24} />
            </Link>
          </div>
        </div>

        <div className="flex-1 px-3 py-5 flex flex-col gap-5 relative z-0 overflow-y-auto no-scrollbar pb-24">
        {/* Ship To Cards */}
        <div className="flex flex-col gap-4">
          {filteredShiptos.map((shipto) => (
            <div key={shipto.id} className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-sm flex flex-col p-5 shrink-0 border border-white/40">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5">
                <h2 className="text-[#eb5b27] font-bold text-sm">Ship to</h2>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#eb5b27" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              
              <div className="flex justify-between gap-4 mb-4">
                <h3 className="text-[#eb5b27] font-bold text-sm shrink-0">
                  {shipto.firstName} {shipto.lastName}
                </h3>
                <p className="text-gray-700 font-medium text-[11px] leading-tight text-right flex-1 break-words max-w-[65%]">
                  {shipto.address1} {shipto.address2}
                  {shipto.municipal || shipto.province ? <br /> : null}
                  {shipto.municipal}{shipto.municipal && shipto.province ? ', ' : ''}{shipto.province}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-700 font-bold">Cel:</span>
                  <span className="text-[#eb5b27] font-medium">{shipto.cel || '-'}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-700 font-bold">Tel:</span>
                  <span className="text-[#eb5b27] font-medium">{shipto.tel || '-'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}


