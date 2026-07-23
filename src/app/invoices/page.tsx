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
        <div className="pt-12 pb-4 px-5 flex flex-col shrink-0 text-white">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-semibold flex-1 text-center pr-8 tracking-wide">Invoice List</h1>
          </div>
          
          {/* Search Bar */}
          <div className="bg-white rounded-full h-11 flex items-center px-4 shadow-sm border border-transparent">
            <Search size={18} className="text-gray-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search Invoice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none font-medium placeholder-gray-400 w-full text-gray-900 text-[14px]"
            />
          </div>
        </div>

        {/* Content Section - scrollable list */}
        <div className="flex-1 p-5 pt-2 pb-24 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          {filteredInvoices.map((invoice) => {
            const isPaid = invoice.balance === "$ 0.00";
            return (
              <Link href={`/invoices/${invoice.id}`} key={invoice.id} className="bg-white/[0.88] backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col relative active:scale-[0.98] transition-transform cursor-pointer block">
                
                {/* Top Icon and Chevron */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 flex justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2C3258" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <div className="absolute right-4 top-4 bg-[#eb5b27] w-5 h-5 rounded-full flex items-center justify-center text-white">
                    <ChevronRight size={14} strokeWidth={3} />
                  </div>
                </div>
                
                {/* Invoice Details */}
                <div className="flex justify-between items-end mb-4">
                  <div className="flex flex-col">
                    <span className="text-[#eb5b27] font-bold text-sm mb-0.5">{invoice.id}</span>
                    <span className="text-[11px] mb-0.5">
                      <span className="text-gray-700 font-bold">Ship to: </span>
                      <span className="text-[#eb5b27] font-medium">{invoice.name}</span>
                    </span>
                    <span className="text-[11px]">
                      <span className="text-gray-700 font-bold">Province: </span>
                      <span className="text-[#eb5b27] font-medium">{invoice.province}</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className={`font-bold text-[11px] mb-0.5 ${isPaid ? 'text-green-600' : 'text-[#eb5b27]'}`}>
                      {isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                    <span className="text-gray-700 font-medium text-[11px] whitespace-nowrap">
                      {invoice.date.replace(',', ' -')}
                    </span>
                  </div>
                </div>
                
                {/* Amounts Pill */}
                <div className="bg-[#eb5b27] rounded-full flex justify-between items-center px-6 py-2.5 shadow-sm">
                  <span className="text-white font-bold text-[12px] flex-1 text-center">Amt: {invoice.amount}</span>
                  <div className="w-[1px] h-3 bg-white/40 shrink-0"></div>
                  <span className="text-white font-bold text-[12px] flex-1 text-center">Bal: {invoice.balance}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}


