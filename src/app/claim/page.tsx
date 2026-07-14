"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, Plus, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ClaimsList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const claims = [
    {
      id: "CLM-9021",
      invoiceNumber: "INV-00123",
      claimDate: "2026-08-15 14:30",
      writeClaim: "Box arrived damaged and contents were broken. Missing 2 items from the original packing list.",
      status: "Open"
    },
    {
      id: "CLM-9022",
      invoiceNumber: "INV-00145",
      claimDate: "2026-09-02 09:15",
      writeClaim: "Delivery was delayed by 3 weeks past the guaranteed arrival date without any notification.",
      status: "Closed"
    },
    {
      id: "CLM-9023",
      invoiceNumber: "INV-00199",
      claimDate: "2026-09-10 11:20",
      writeClaim: "Items are missing from the barrel.",
      status: "Processing"
    }
  ];

  const filteredClaims = claims.filter(claim => 
    claim.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.writeClaim.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section */}
      <div className="bg-primary pt-16 md:pt-10 pb-6 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 relative">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center">Claims</h1>
          <Link href="/claim/new" className="font-bold text-sm active:scale-95 transition-transform cursor-pointer flex items-center gap-1">
            <Plus size={18} />
            <span>New</span>
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white/10 rounded-xl h-10 flex items-center px-4 shadow-sm text-white border border-white/20">
          <Search size={18} className="text-white/70 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search claims..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none font-medium placeholder-white/70 w-full text-white"
          />
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar">
        {/* Claim Cards */}
        <div className="flex flex-col gap-4">
          {filteredClaims.map((claim) => (
            <div key={claim.id} className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden shrink-0">
              <div className="bg-[#EDEAFD] px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={16} className="text-[#2C3258]" />
                  <h2 className="text-[#2C3258] font-bold text-[15px]">{claim.invoiceNumber}</h2>
                </div>
                <div>
                  <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${
                    claim.status === 'Closed' ? 'bg-green-100 text-green-700' : 
                    claim.status === 'Processing' ? 'bg-orange-100 text-orange-700' : 
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {claim.status}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[14px] border-b border-gray-100 pb-2 mb-2">
                  <span className="text-gray-500 font-bold w-auto">Claim Date/Time:</span>
                  <span className="text-gray-900 font-bold text-right flex-1">{claim.claimDate}</span>
                </div>
                
                <span className="text-gray-500 font-bold text-[12px] block mb-1 uppercase tracking-wide mt-1">Write claim</span>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-gray-800 text-[13px] font-medium leading-relaxed">{claim.writeClaim}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


