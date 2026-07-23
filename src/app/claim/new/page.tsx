"use client";

import React from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewClaim() {
  const router = useRouter();

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
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-semibold text-center tracking-wide flex-1 pr-6">New Claim</h1>
          </div>
        </div>

        {/* Bottom Sheet style container */}
        <div className="flex-1 mt-4 bg-white/[0.88] backdrop-blur-xl rounded-t-[32px] p-6 flex flex-col relative overflow-y-auto no-scrollbar shadow-[0_-8px_32px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#1A1A1A] font-extrabold text-[16px] text-center flex-1">Claim Details</h2>
            <button onClick={() => router.back()} className="text-[#1A1A1A] font-extrabold text-sm absolute right-6 top-6">x</button>
          </div>
          
          {/* Form Container */}
          <div className="flex flex-col gap-5 pb-24">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Invoice #</label>
              <select className="w-full bg-[#f4f5f7]/90 border border-white rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] appearance-none shadow-sm">
                <option value="">Select Invoice Number</option>
                <option value="INV-00123">INV-00123</option>
                <option value="INV-00145">INV-00145</option>
                <option value="INV-00987">INV-00987</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Claim Date/time</label>
              <input type="datetime-local" className="w-full bg-[#f4f5f7]/90 border border-white rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] placeholder-gray-400 shadow-sm" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Write Claim</label>
              <textarea 
                placeholder="" 
                rows={4} 
                className="w-full bg-[#f4f5f7]/90 border border-white rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] placeholder-gray-400 resize-none shadow-sm"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Attach Image</label>
              <div className="w-full bg-[#f4f5f7]/90 border border-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm cursor-pointer active:bg-gray-200 transition-colors">
                <span className="text-gray-400 font-medium"></span>
                <Upload size={18} className="text-[#eb5b27]" />
              </div>
            </div>

            {/* Submit Button */}
            <button className="bg-[#eb5b27] hover:bg-[#d94d1f] text-white font-extrabold text-[15px] py-3.5 rounded-full mt-4 shadow-md active:scale-95 transition-transform w-full">
              Submit Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


