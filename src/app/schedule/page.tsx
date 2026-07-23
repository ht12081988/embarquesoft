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
        <div className="pt-12 pb-2 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-semibold flex-1 text-center pl-4 tracking-wide">Schedule Pickup</h1>
            <Link href="/schedule/new" className="active:scale-95 transition-transform cursor-pointer">
              <span className="font-bold text-[13px]">+ New</span>
            </Link>
          </div>
        </div>

        <div className="flex-1 p-5 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar pb-24">
        {/* Pickup Cards */}
        <div className="flex flex-col gap-4">
          {filteredPickups.map((pickup) => (
            <Link href={`/schedule/${pickup.id}`} key={pickup.id} className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm flex flex-col p-5 shrink-0 hover:shadow-md transition-shadow active:scale-[0.99] block">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <h2 className="text-[#eb5b27] font-bold text-sm">{pickup.id}</h2>
                </div>
                <div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    pickup.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {pickup.status}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4 mb-4">
                <h3 className="text-[#eb5b27] font-bold text-sm shrink-0">
                  {pickup.customerName}
                </h3>
                <p className="text-gray-700 font-medium text-[11px] leading-tight text-right flex-1 break-words max-w-[65%]">
                  {pickup.address}
                </p>
              </div>
              <div className="flex flex-col gap-2 mb-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-700 font-bold">Cell:</span>
                  <span className="text-[#eb5b27] font-medium">{pickup.cell || '-'}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-700 font-bold">Phone:</span>
                  <span className="text-[#eb5b27] font-medium">{pickup.phone || '-'}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-700 font-bold">Date:</span>
                  <span className="text-[#eb5b27] font-medium">{pickup.pickupDate}</span>
                </div>
              </div>
              {pickup.notes && (
                <div className="mt-2 bg-black/5 rounded-xl p-3">
                  <span className="text-gray-700 font-bold text-[11px] block mb-1 uppercase tracking-wide">Notes</span>
                  <p className="text-gray-700 text-[11px] font-medium leading-snug">{pickup.notes}</p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}


