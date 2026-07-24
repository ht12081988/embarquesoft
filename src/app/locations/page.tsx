"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, MapPin, Map } from "lucide-react";
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

export default function LocationsList() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("ES");

  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const locations = [
    {
      id: "1",
      branchName: "Headquarters",
      address1: "123 Business Pkwy",
      address2: "Suite 100",
      city: "New York",
      state: "NY",
      country: "USA",
      zip: "10001",
      cell: "+1 212-555-1234",
      phone: "+1 212-555-5678",
      office: "+1 212-555-9000",
    },
    {
      id: "2",
      branchName: "West Coast Hub",
      address1: "456 Logistics Blvd",
      address2: "",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      zip: "90001",
      cell: "+1 310-555-2345",
      phone: "+1 310-555-6789",
      office: "+1 310-555-0101",
    }
  ];

  const filteredLocations = locations.filter(location => 
    location.branchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.state.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="flex-1 p-4 pt-4 pb-24 flex flex-col gap-3 overflow-y-auto no-scrollbar">
          {/* Page Title with Back Button */}
          <div className="flex items-center justify-center relative mb-1 w-full text-white">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer absolute left-0">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-normal tracking-wide">
              Locations
            </h1>
          </div>

          {/* Search Bar */}
          <div className="bg-white/90 backdrop-blur-md rounded-full h-11 flex items-center px-4 shadow-sm border border-white/20 mb-1 shrink-0">
            <Search size={18} className="text-gray-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search Locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none font-medium placeholder-gray-400 w-full text-gray-900 text-[14px]"
            />
          </div>

          {filteredLocations.map((loc) => (
            <div key={loc.id} className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col p-4 shrink-0">
              
              {/* Card Header (Icon, Title, Address) */}
              <div className="flex flex-col items-center text-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#eb5b27" xmlns="http://www.w3.org/2000/svg" className="mb-1">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <h2 className="text-[#eb5b27] font-bold text-sm mb-0.5">{loc.branchName}</h2>
                <p className="text-gray-700 font-medium text-[11px] leading-snug px-2">
                  {loc.address1}{loc.address2 ? ` ${loc.address2}` : ''}, {loc.city}, {loc.state} {loc.zip}, {loc.country}
                </p>
              </div>

              {/* Contact Pills */}
              <div className="flex flex-col gap-1.5">
                {loc.cell && (
                  <a href={`tel:${loc.cell.replace(/[^0-9+]/g, '')}`} className="bg-[#eb5b27] hover:bg-[#d94d1f] active:scale-[0.98] transition-all rounded-full flex justify-between items-center px-4 py-1.5">
                    <span className="text-white font-bold text-[11px]">Cell:</span>
                    <span className="text-white font-medium text-[11px]">{loc.cell}</span>
                  </a>
                )}
                
                {loc.phone && (
                  <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="bg-[#eb5b27] hover:bg-[#d94d1f] active:scale-[0.98] transition-all rounded-full flex justify-between items-center px-4 py-1.5">
                    <span className="text-white font-bold text-[11px]">Phone:</span>
                    <span className="text-white font-medium text-[11px]">{loc.phone}</span>
                  </a>
                )}

                {loc.office && (
                  <a href={`tel:${loc.office.replace(/[^0-9+]/g, '')}`} className="bg-[#eb5b27] hover:bg-[#d94d1f] active:scale-[0.98] transition-all rounded-full flex justify-between items-center px-4 py-1.5">
                    <span className="text-white font-bold text-[11px]">Office:</span>
                    <span className="text-white font-medium text-[11px]">{loc.office}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


