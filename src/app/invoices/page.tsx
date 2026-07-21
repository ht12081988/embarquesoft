"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InvoiceList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const invoices = [
    {
      id: "TIV-000294",
      name: "Ricardo Sinha",
      province: "MO",
      amount: "$ 1500.00",
      balance: "$ 1207.00",
      date: "Oct 12, 2026",
    },
    {
      id: "TIV-000293",
      name: "John Doe",
      province: "NY",
      amount: "$ 9.00",
      balance: "$ 9.00",
      date: "Oct 10, 2026",
    },
    {
      id: "TIV-000292",
      name: "Jane Smith",
      province: "CA",
      amount: "$ 50.00",
      balance: "$ 0.00",
      date: "Oct 08, 2026",
    }
  ];

  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section */}
      <div className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] pt-16 md:pt-10 pb-6 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 relative">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold">Invoice List</h1>
          <div className="w-8"></div>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-xl h-10 flex items-center px-4 shadow-sm text-gray-800">
          <Search size={18} className="text-gray-400 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none font-medium placeholder-gray-400 w-full"
          />
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar">
        
        {/* Invoice Cards */}
        <div className="flex flex-col gap-4">
          {filteredInvoices.map((invoice) => (
            <Link href={`/invoices/${invoice.id}`} key={invoice.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col relative active:bg-gray-50 transition-colors cursor-pointer block">
              <div className="bg-[#E8EDFC] -mx-5 -mt-5 mb-4 px-5 py-3 rounded-t-2xl flex items-center justify-between border-b border-[#E2E8F8]">
                <div className="flex items-center gap-2">
                  <div className="text-[#2C3258]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <span className="text-[#2C3258] font-bold text-[14px]">{invoice.id}</span>
                </div>
                <span className="bg-[#FFE4CD] text-[#D95D16] px-2.5 py-0.5 rounded-md text-[11px] font-bold">Unpaid</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 font-bold text-lg"><span className="text-gray-500 font-medium">Ship to:</span> {invoice.name}</span>
                <span className="text-gray-500 font-medium text-[13px]">{invoice.date}</span>
              </div>
              
              <div className="flex justify-between items-end mb-3">
                <p className="text-gray-400 font-bold text-[13px] leading-snug">
                  <span className="text-gray-500 font-medium">Province:</span> {invoice.province}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-1">
                <div className="flex items-center text-[13px] font-bold text-gray-800">
                  <span>Amt: {invoice.amount}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span>Bal: {invoice.balance}</span>
                </div>
                
                <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                  <ChevronRight size={14} strokeWidth={3} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


