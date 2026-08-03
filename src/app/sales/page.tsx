"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, ShoppingBag, Filter, X } from "lucide-react";
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

export default function SalesListPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [language, setLanguage] = useState("ES");
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  
  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  // Mock Active Data
  const salesItems = [
    {
      id: "SALE-001",
      category: "Electronics",
      description: "Used iPhone 13 Pro - 256GB, excellent condition. Comes with case and charger.",
      price: "$650.00",
      image: "https://placehold.co/120x120/e2e8f0/94a3b8?text=IMG"
    },
    {
      id: "SALE-002",
      category: "Furniture",
      description: "Wooden Dining Table with 6 chairs. Minor scratches, robust build.",
      price: "$200.00",
      image: "https://placehold.co/120x120/e2e8f0/94a3b8?text=IMG"
    }
  ];

  const categories = ["All", ...Array.from(new Set(salesItems.map(item => item.category)))];

  const filteredSales = salesItems.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <h1 className="text-base font-normal flex-1 text-center pr-8 tracking-wide">Sale</h1>
          </div>
        </div>

        {/* Search & Filter Box */}
        <div className="px-5 pb-4 shrink-0 z-10 flex gap-3">
          <div className="relative flex-1">
            <Search 
              size={18} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl pl-11 pr-4 py-3 text-[13px] text-gray-900 outline-none font-medium placeholder-gray-400 shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
            />
          </div>
          <div className="relative shrink-0">
            <button 
              onClick={() => setIsFilterPopupOpen(true)}
              className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl w-[44px] h-[44px] flex items-center justify-center text-gray-700 shadow-sm active:scale-95 transition-all focus:ring-1 focus:ring-[#eb5b27]"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Sales List */}
        <div className="flex-1 px-5 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar pb-24">
          {filteredSales.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredSales.map((item) => (
                <div key={item.id} className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm flex flex-col p-5 shrink-0 block">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-black/5">
                    <span className="bg-[#eb5b27] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {item.id}
                    </span>
                    <span className="text-[14px] font-bold text-gray-900">
                      {item.price}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="shrink-0 w-[60px] h-[60px] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 mt-1">
                      <img src={item.image} alt={item.category} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#eb5b27] font-bold text-sm mb-1">{item.category}</h3>
                      <p className="text-gray-600 text-[11px] font-medium leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-md max-w-sm flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <ShoppingBag size={32} />
                </div>
                <p className="text-gray-800 text-[15px] font-semibold leading-relaxed">
                  No items found matching your search.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Popup Bottom Sheet */}
      {isFilterPopupOpen && (
        <div className="absolute inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full sm:w-[400px] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transform transition-transform animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[17px] font-bold text-gray-900">Filter by Category</h3>
              <button 
                onClick={() => setIsFilterPopupOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 active:scale-95 transition-transform"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto no-scrollbar pb-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsFilterPopupOpen(false);
                  }}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.98] ${
                    selectedCategory === category 
                      ? "border-[#eb5b27] bg-[#eb5b27]/5 text-[#eb5b27] font-bold" 
                      : "border-gray-100 bg-white text-gray-700 hover:bg-gray-50 font-medium shadow-sm"
                  }`}
                >
                  <span className="text-[14px]">{category}</span>
                  {selectedCategory === category && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#eb5b27]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
