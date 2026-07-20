"use client";

import React from "react";
import { ArrowLeft, Edit, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InvoiceDetails() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section */}
      <div className="bg-primary pt-16 md:pt-10 pb-4 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center mb-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[22px] font-bold ml-2">Invoice Details</h1>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar pt-6">
        
        {/* Invoice Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
          <div className="bg-[#EDEAFD] px-4 py-3 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-[#2C3258] font-bold text-[15px]">Invoice Info</h2>
            <Link 
              href={`/invoices/1/tracking`}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-primary px-2.5 py-1 rounded-full shadow-sm active:scale-95 transition-transform"
            >
              <Truck size={14} />
              <span>Tracking</span>
            </Link>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-gray-500 font-bold">Invoice #</span>
              <span className="text-gray-900 font-bold">TIV-000294</span>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-gray-500 font-bold">Created</span>
              <span className="text-gray-900 font-bold">Oct 12, 2026 10:30 AM</span>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-gray-500 font-bold">Due</span>
              <span className="text-orange-600 font-bold">Oct 20, 2026</span>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-gray-500 font-bold">Driver Name</span>
              <span className="text-gray-900 font-bold">Michael Scott</span>
            </div>
          </div>
        </div>

        {/* Customer Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
          <div className="bg-[#EDEAFD] px-4 py-3 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-[#2C3258] font-bold text-[15px]">Customer Details</h2>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <h3 className="text-gray-900 font-bold text-[17px]">Ricardo Sinha</h3>
            <p className="text-gray-500 font-bold text-[15px] leading-snug max-w-[90%]">
              47 W 13th St Caruthersville MO 63830
            </p>
            <p className="text-gray-900 font-bold text-[15px]">
              +1 212-444-8574
            </p>
          </div>
        </div>

        {/* Ship To Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
          <div className="bg-[#EDEAFD] px-4 py-3 border-b border-gray-100">
            <h2 className="text-[#2C3258] font-bold text-[15px]">Ship To</h2>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <h3 className="text-gray-900 font-bold text-[17px]">Rupali1212 Test</h3>
            <p className="text-gray-500 font-bold text-[15px] leading-snug">
              47 W 13th St 47 W 13th St JapanMunicipal JapanProvinceann
            </p>
            <p className="text-gray-900 font-bold text-[15px]">
              +1 201-555-0123
            </p>
          </div>
        </div>

        {/* Items Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
          <div className="bg-[#EDEAFD] px-4 py-3 border-b border-gray-100">
            <h2 className="text-[#2C3258] font-bold text-[15px]">Items</h2>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <p className="text-gray-900 font-bold text-[15px] leading-snug">
              ESTUFA DE 30" NUEVA COLOR BLANCO O NEGRA EN CAJA DE FAB...
            </p>
            <div className="flex items-center gap-4 text-[15px] font-bold">
              <span className="text-gray-800">Qty: 11</span>
              <span className="text-gray-800">Ins: 0.00</span>
              <span className="text-gray-800">Price: $110.00</span>
            </div>
          </div>
        </div>

        {/* Total Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
          <div className="bg-[#EDEAFD] px-4 py-3 border-b border-gray-100">
            <h2 className="text-[#2C3258] font-bold text-[15px]">Total</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center text-[15px] font-bold text-gray-800">
              <span>Subtotal</span>
              <span>$1210.00</span>
            </div>
            <div className="flex justify-between items-center text-[15px] font-bold text-gray-800">
              <span>Insurance</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between items-center text-[15px] font-bold text-gray-800">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between items-center text-[15px] font-bold text-gray-800">
              <span>Discount</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between items-center text-[15px] font-bold text-gray-800 pt-2">
              <span>Total</span>
              <span>$1210.00</span>
            </div>
          </div>
        </div>

        {/* Comment Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
          <div className="bg-[#EDEAFD] px-4 py-3 border-b border-gray-100">
            <h2 className="text-[#2C3258] font-bold text-[15px]">Comment</h2>
          </div>
          <div className="p-4">
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-gray-800 font-bold text-sm leading-relaxed">
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. It is typically a corrupted version of De finibus bonorum et
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
