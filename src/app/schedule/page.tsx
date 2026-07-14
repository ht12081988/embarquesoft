"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, Plus, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SchedulePickupList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const pickups = [
    {
      id: "PUA-007988",
      customerName: "Ricardo Sinha",
      address: "47 W 13th St, Caruthersville, MO 63830",
      cell: "+1 212-444-8574",
      phone: "+1 201-555-0123",
      notes: "Please call 30 mins before arrival.",
      pickupDate: "2025-12-29",
      status: "Not Done"
    },
    {
      id: "PUA-007989",
      customerName: "Jane Doe",
      address: "123 Main St, New York, NY 10001",
      cell: "+1 212-555-1234",
      phone: "-",
      notes: "Leave at front desk if not available.",
      pickupDate: "2025-12-30",
      status: "Done"
    }
  ];

  const filteredPickups = pickups.filter(pickup => 
    pickup.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pickup.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section */}
      <div className="bg-primary pt-[env(safe-area-inset-top,44px)] md:pt-10 pb-6 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 relative">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center">Schedule Pickup</h1>
          <Link href="/schedule/new" className="font-bold text-sm active:scale-95 transition-transform cursor-pointer flex items-center gap-1">
            <Plus size={18} />
            <span>New</span>
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white/10 rounded-xl h-10 flex items-center px-4 shadow-sm text-white border border-white/20">
          <Search size={18} className="text-white/70 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search pickups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none font-medium placeholder-white/70 w-full text-white"
          />
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar">
        {/* Pickup Cards */}
        <div className="flex flex-col gap-4">
          {filteredPickups.map((pickup) => (
            <div key={pickup.id} className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden shrink-0">
              <div className="bg-[#EDEAFD] px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#2C3258]" />
                  <h2 className="text-[#2C3258] font-bold text-[15px]">{pickup.id}</h2>
                </div>
                <div>
                  <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${
                    pickup.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {pickup.status}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-1.5">
                <h3 className="text-gray-900 font-bold text-[15px] mb-1">
                  {pickup.customerName}
                </h3>
                <p className="text-gray-600 font-medium text-[14px] leading-snug mb-2">
                  {pickup.address}
                </p>
                <div className="flex flex-col gap-1 border-b border-gray-100 pb-3 mb-2">
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-gray-500 font-bold w-16">Cell:</span>
                    <span className="text-gray-900 font-bold text-right flex-1">{pickup.cell || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-gray-500 font-bold w-16">Phone:</span>
                    <span className="text-gray-900 font-bold text-right flex-1">{pickup.phone || '-'}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-gray-500 font-bold w-16">Date:</span>
                  <span className="text-gray-900 font-bold text-right flex-1">{pickup.pickupDate}</span>
                </div>
                {pickup.notes && (
                  <div className="mt-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <span className="text-gray-500 font-bold text-[12px] block mb-1 uppercase tracking-wide">Notes</span>
                    <p className="text-gray-800 text-[13px] font-medium leading-snug">{pickup.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
