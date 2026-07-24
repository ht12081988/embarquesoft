"use client";

import React, { useState } from "react";
import { ArrowLeft, MapPin, Upload } from "lucide-react";
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

export default function NewSchedulePickup() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<"pickup" | "shipto" | "customer">("shipto");
  const [language, setLanguage] = useState("ES");

  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const selectStyle = {
    backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" viewBox="0 0 24 24" stroke="%239ca3af" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center",
    backgroundSize: "16px"
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

        {/* Page Title & Tabs */}
        <div className="pt-2 pb-2 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-normal flex-1 text-center pr-2 tracking-wide">Create Pickup</h1>
            <div className="w-10"></div>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-white/40 p-1 rounded-full mx-1 shadow-sm border border-white/20 backdrop-blur-md">
            <button 
              onClick={() => setActiveTab("shipto")}
              className={`flex-1 py-1.5 text-[12px] font-bold rounded-full transition-all ${activeTab === 'shipto' ? 'bg-[#eb5b27] text-white shadow-md' : 'text-black hover:bg-white/20'}`}
            >
              ShipTo
            </button>
            <button 
              onClick={() => setActiveTab("pickup")}
              className={`flex-1 py-1.5 text-[12px] font-bold rounded-full transition-all ${activeTab === 'pickup' ? 'bg-[#eb5b27] text-white shadow-md' : 'text-black hover:bg-white/20'}`}
            >
              Pickup
            </button>
            <button 
              onClick={() => setActiveTab("customer")}
              className={`flex-1 py-1.5 text-[12px] font-bold rounded-full transition-all ${activeTab === 'customer' ? 'bg-[#eb5b27] text-white shadow-md' : 'text-black hover:bg-white/20'}`}
            >
              Customer
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white/[0.88] backdrop-blur-xl rounded-t-[32px] p-5 flex flex-col gap-5 relative z-0 overflow-y-auto no-scrollbar pb-24 shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {/* Form Container */}
        <div className="flex flex-col gap-4">

          {activeTab === "pickup" ? (
            /* PICKUP TAB FIELDS */
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Select Category</label>
                <input 
                  type="text" 
                  readOnly 
                  value="mobile pickup" 
                  className="w-full bg-[#EAEAEE] text-gray-500 rounded-xl px-4 h-12 text-sm outline-none font-medium border-none cursor-not-allowed" 
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <div className="flex flex-col gap-1.5 flex-1 min-w-[45%]">
                  <label className="text-black font-normal text-[13px] ml-1">Item 1</label>
                  <input type="text" placeholder="Item 1" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[45%]">
                  <label className="text-black font-normal text-[13px] ml-1">Item 2</label>
                  <input type="text" placeholder="Item 2" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[45%]">
                  <label className="text-black font-normal text-[13px] ml-1">Box</label>
                  <input type="text" placeholder="Box" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[45%]">
                  <label className="text-black font-normal text-[13px] ml-1">Barrel</label>
                  <input type="text" placeholder="Barrel" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[100%]">
                  <label className="text-black font-normal text-[13px] ml-1">Tap</label>
                  <input type="text" placeholder="Tap" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Tentative Pickup Date & Time</label>
                <input type="datetime-local" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Comments</label>
                <textarea placeholder="Enter Comments here." rows={3} className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] resize-none"></textarea>
              </div>
            </>
          ) : activeTab === "customer" ? (
            /* CUSTOMER TAB FIELDS */
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Country <span className="text-red-500">*</span></label>
                <select 
                  style={selectStyle}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm font-medium outline-none border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] appearance-none"
                >
                  <option value="USA">🇺🇸 USA</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Select Address From The List</label>
                <div className="flex items-center gap-2">
                  <select 
                    style={selectStyle}
                    className="flex-1 bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm font-medium outline-none border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] appearance-none"
                  >
                    <option>12 avenue, NY, 2156</option>
                  </select>
                  <button className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] text-white p-3.5 rounded-xl shadow-sm active:scale-95 transition-transform flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">First Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Hardik" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Trivedi" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Pick Up Address 1 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Address 1" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Pick Up Address 2</label>
                <input type="text" placeholder="Address 2" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">Apartment</label>
                  <input type="text" placeholder="Apt" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">City</label>
                  <input type="text" placeholder="City" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">State</label>
                  <input type="text" placeholder="State" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">Zip</label>
                  <input type="text" placeholder="Zip Code" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">Latitude</label>
                  <input type="text" readOnly placeholder="Latitude" className="w-full bg-[#EAEAEE] text-gray-500 rounded-xl px-4 h-12 text-sm outline-none font-medium border-none cursor-not-allowed" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">Longitude</label>
                  <input type="text" readOnly placeholder="Longitude" className="w-full bg-[#EAEAEE] text-gray-500 rounded-xl px-4 h-12 text-sm outline-none font-medium border-none cursor-not-allowed" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Cell Number <span className="text-red-500">*</span></label>
                <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]">
                  <div className="bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-black">
                    <span>🇺🇸</span>
                    <span>+1</span>
                  </div>
                  <input type="tel" placeholder="201-555-0123" className="flex-1 px-4 h-12 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Telephone Number <span className="text-red-500">*</span></label>
                <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]">
                  <div className="bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-black">
                    <span>🇺🇸</span>
                    <span>+1</span>
                  </div>
                  <input type="tel" placeholder="201-555-0123" className="flex-1 px-4 h-12 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Email Id <span className="text-red-500">*</span></label>
                <input type="email" placeholder="gregory@yahoo.com" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
              </div>

            </>
          ) : (
            /* SHIPTO TAB FIELDS */
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Country <span className="text-red-500">*</span></label>
                <select 
                  style={selectStyle}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm font-medium outline-none border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] appearance-none"
                >
                  <option value="Dominican Republic">🇩🇴 Dominican Republic</option>
                  <option value="USA">🇺🇸 USA</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Location</label>
                <select 
                  style={selectStyle}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm font-medium outline-none border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] appearance-none"
                >
                  <option value="Azua-->El dorr">Azua--&gt;El dorr</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Select Address From The List</label>
                <div className="flex items-center gap-2">
                  <select 
                    style={selectStyle}
                    className="flex-1 bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm font-medium outline-none border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] appearance-none"
                  >
                    <option>12 avenue, NY, 2156</option>
                  </select>
                  <button className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] text-white p-3.5 rounded-xl shadow-sm active:scale-95 transition-transform flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">First Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Gregory" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Strickland" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Drop Off Address 1 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Address 1" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Drop Off Address 2</label>
                <input type="text" placeholder="Enter Address 2" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">Province</label>
                  <input type="text" placeholder="Province" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">Municipality</label>
                  <input type="text" placeholder="Municipality" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Sector</label>
                <input type="text" placeholder="Sector" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">Latitude</label>
                  <input type="text" readOnly placeholder="Latitude" className="w-full bg-[#EAEAEE] text-gray-500 rounded-xl px-4 h-12 text-sm outline-none font-medium border-none cursor-not-allowed" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">Longitude</label>
                  <input type="text" readOnly placeholder="Longitude" className="w-full bg-[#EAEAEE] text-gray-500 rounded-xl px-4 h-12 text-sm outline-none font-medium border-none cursor-not-allowed" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Cell Number <span className="text-red-500">*</span></label>
                <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]">
                  <div className="bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-black">
                    <span>🇩🇴</span>
                    <span>+1</span>
                  </div>
                  <input type="tel" placeholder="809-555-0123" className="flex-1 px-4 h-12 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Telephone Number <span className="text-red-500">*</span></label>
                <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]">
                  <div className="bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-black">
                    <span>🇩🇴</span>
                    <span>+1</span>
                  </div>
                  <input type="tel" placeholder="809-555-0123" className="flex-1 px-4 h-12 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Email Id <span className="text-red-500">*</span></label>
                <input type="email" placeholder="smith@gmail.com" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">License Id</label>
                <input type="text" placeholder="132141414" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">License Id Upload</label>
                <div className="w-full bg-[#F4F5F7] border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] border-2 border-dashed border-gray-300 rounded-2xl h-32 flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-[0.99] transition-transform">
                  <div className="flex items-center gap-2 bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] text-white font-bold text-xs py-2 px-5 rounded-full shadow-sm">
                    <Upload size={14} />
                    <span>Upload Document</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Submit Button */}
        <button className="w-full bg-[#eb5b27] text-white font-bold text-[14px] h-12 rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f] mt-2 mb-4 shrink-0">
          Submit Pickup
        </button>

        </div>
      </div>
    </div>
  );
}
