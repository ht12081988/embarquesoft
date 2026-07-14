"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, Plus, MapPin, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ShipToList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section */}
      <div className="bg-primary pt-16 md:pt-10 pb-6 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 relative">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center">My ShipTo</h1>
          <Link href="/shiptos/new" className="font-bold text-sm active:scale-95 transition-transform cursor-pointer flex items-center gap-1">
            <Plus size={18} />
            <span>New</span>
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white/10 rounded-xl h-10 flex items-center px-4 shadow-sm text-white border border-white/20">
          <Search size={18} className="text-white/70 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search ship tos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none font-medium placeholder-white/70 w-full text-white"
          />
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar">
        {/* Ship To Cards */}
        <div className="flex flex-col gap-4">
          {filteredShiptos.map((shipto) => (
            <div key={shipto.id} className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden shrink-0">
              <div className="bg-[#EDEAFD] px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <MapPin size={16} className="text-[#2C3258]" />
                <h2 className="text-[#2C3258] font-bold text-[15px]">Ship To</h2>
              </div>
              <div className="p-4 flex flex-col gap-1.5">
                <h3 className="text-gray-900 font-bold text-[15px] mb-1">
                  {shipto.firstName} {shipto.lastName}
                </h3>
                <p className="text-gray-600 font-medium text-[14px] leading-snug">
                  {shipto.address1} {shipto.address2}
                </p>
                <p className="text-gray-600 font-medium text-[14px] leading-snug mb-2">
                  {shipto.municipal}{shipto.municipal && shipto.province ? ', ' : ''}{shipto.province}
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-[14px]">
                    <span className="text-gray-500 font-bold w-12">Cel:</span>
                    <span className="text-gray-900 font-bold">{shipto.cel || '-'}</span>
                  </div>
                  <div className="flex items-center text-[14px]">
                    <span className="text-gray-500 font-bold w-12">Tel:</span>
                    <span className="text-gray-900 font-bold">{shipto.tel || '-'}</span>
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


