"use client";

import React from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewClaim() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section */}
      <div className="bg-primary pt-16 md:pt-10 pb-4 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center">New Claim</h1>
          <button className="p-2 -mr-2 active:scale-95 transition-transform cursor-pointer" title="Save">
            <Save size={22} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-5 relative z-0 overflow-y-auto no-scrollbar pt-6">
        
        {/* Form Container */}
        <div className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Invoice # <span className="text-red-500">*</span></label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
              <option value="">Select Invoice Number</option>
              <option value="INV-00123">INV-00123</option>
              <option value="INV-00145">INV-00145</option>
              <option value="INV-00987">INV-00987</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Claim Date/Time <span className="text-red-500">*</span></label>
            <input type="datetime-local" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Write claim <span className="text-red-500">*</span></label>
            <textarea 
              placeholder="Describe your claim in detail..." 
              rows={6} 
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400 resize-none"
            ></textarea>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Attach Image</label>
            <div className="w-full bg-[#E5E7EB] border-2 border-dashed border-gray-300 rounded-xl h-32 flex items-center justify-center cursor-pointer active:bg-gray-300 transition-colors">
              <span className="bg-[#5c85eb] text-white font-bold py-2 px-6 rounded-lg shadow-sm">Upload</span>
            </div>
          </div>

        </div>
        
        {/* Submit Button */}
        <button className="bg-[#5c85eb] text-white font-bold text-[15px] py-3 rounded-xl mt-4 shadow-md active:scale-95 transition-transform mb-4">
          Submit Claim
        </button>

      </div>
    </div>
  );
}


