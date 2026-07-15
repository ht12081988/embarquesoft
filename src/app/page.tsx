"use client";

import React, { useState, useRef } from "react";
import { FileText, Calendar, MapPin, ShieldAlert, Truck, UserPlus, Tag, Globe, Hexagon, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [language, setLanguage] = useState("Sp");
  const carouselRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "Sp" ? "En" : "Sp"));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.85; // approx one card width
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { id: 'A', label: 'My Invoices', icon: FileText, href: '/invoices', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'B', label: 'Schedule Pickup', icon: Calendar, href: '/schedule', color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'C', label: 'Locations', icon: MapPin, href: '/locations', color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'D', label: 'File A Claim', icon: ShieldAlert, href: '/claim', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { id: 'F', label: 'My ShipTo', icon: Truck, href: '/shiptos', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section (from wireframe) */}
      <div className="bg-primary pt-16 md:pt-10 pb-6 px-6 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-bold text-lg tracking-tight bg-white px-4 py-1 rounded-full text-primary shadow-sm">
              <Hexagon size={18} className="text-primary fill-primary/20" />
              Salecedo
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/notifications" className="text-white/90 hover:text-white active:scale-95 transition-transform relative">
              <Bell size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-primary"></span>
            </Link>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full text-sm font-bold active:scale-95"
            >
              <Globe size={16} />
              <span>{language}</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5 text-sm font-medium text-white bg-[#2C3258] p-3 rounded-xl shadow-sm mt-2">
          <p className="flex justify-between items-center">
            <span>US Phone:</span>
            <a href="tel:212-444-8574" className="font-bold tracking-wider text-white active:opacity-70">212-444-8574</a>
          </p>
          <div className="h-[1px] w-full bg-white/20 my-0.5"></div>
          <p className="flex justify-between items-center">
            <span>RD Phone:</span>
            <a href="tel:809-222-2123" className="font-bold tracking-wider text-white active:opacity-70">809-222-2123</a>
          </p>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-6 relative z-0">
        
        {/* Menu Grid (3 Columns) */}
        <div className="grid grid-cols-3 gap-3">
          {menuItems.map((item) => (
            <Link 
              key={item.id} 
              href={item.href}
              className="bg-white rounded-2xl p-3 shadow-md border border-gray-100 flex flex-col items-center justify-start gap-2 text-center active:scale-95 transition-transform"
            >
              <div className={`w-12 h-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center mb-1 shrink-0`}>
                <item.icon size={22} strokeWidth={2.5} />
              </div>
              <span className="text-[11px] font-semibold text-gray-800 leading-tight">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Deals Section */}
        <div className="mt-2 pb-24">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2 text-orange-600 font-bold">
              <Tag size={18} fill="currentColor" className="text-orange-500" />
              <span className="tracking-wide uppercase text-sm">Deals</span>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 active:scale-95 transition-transform border border-orange-200 shadow-sm">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 active:scale-95 transition-transform border border-orange-200 shadow-sm">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          {/* Swipable Carousel */}
          <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4 -mx-5 px-5">
            {[1, 2, 3, 4, 5].map((deal) => (
              <Link 
                key={deal} 
                href="/deals" 
                className="snap-center shrink-0 w-[85%] bg-white rounded-2xl border border-gray-200 shadow-md flex flex-col active:scale-[0.98] transition-transform cursor-pointer overflow-hidden"
              >
                {/* Text Section at the Top */}
                <div className="p-4 flex flex-col gap-1">
                  <h3 className="text-[#2C3258] font-bold text-lg leading-tight">
                    Get 20% off your next pickup
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    Expire: 12/31/2026 11:59 PM
                  </p>
                </div>
                
                {/* Image Section below */}
                <div className="w-full h-24 bg-gray-100 flex items-center justify-center relative">
                  <img 
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600&h=200"
                    alt="Special Deal Placeholder"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}


