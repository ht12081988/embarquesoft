"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, MapPin, Map } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LocationsList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section */}
      <div className="bg-primary pt-16 md:pt-10 pb-6 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 relative">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-8">Locations</h1>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white/10 rounded-xl h-10 flex items-center px-3 shadow-sm text-white border border-white/20 text-[14px]">
          <Search size={18} className="text-white/70 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none font-medium placeholder-white/70 w-full text-white"
          />
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3 relative z-0 overflow-y-auto no-scrollbar">
        {/* Location Cards */}
        <div className="flex flex-col gap-3">
          {filteredLocations.map((loc) => (
            <div key={loc.id} className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden shrink-0">
              <div className="bg-[#EDEAFD] px-3 py-2.5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#2C3258]" />
                  <h2 className="text-[#2C3258] font-bold text-[14px]">{loc.branchName}</h2>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${loc.address1} ${loc.city} ${loc.state} ${loc.zip} ${loc.country}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2C3258] active:scale-95 transition-transform"
                >
                  <MapPin size={18} />
                </a>
              </div>
              <div className="p-3.5 flex flex-col gap-1.5">
                <p className="text-gray-600 font-medium text-[13px] leading-snug">
                  {loc.address1} {loc.address2}
                </p>
                <p className="text-gray-600 font-medium text-[13px] leading-snug mb-3">
                  {loc.city}, {loc.state} {loc.zip}, {loc.country}
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500 font-bold w-16">Cell:</span>
                    <span className="text-gray-900 font-bold text-right flex-1">{loc.cell || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500 font-bold w-16">Phone:</span>
                    <span className="text-gray-900 font-bold text-right flex-1">{loc.phone || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500 font-bold w-16">Office:</span>
                    <span className="text-gray-900 font-bold text-right flex-1">{loc.office || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


