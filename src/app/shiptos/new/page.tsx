"use client";

import React from "react";
import { ArrowLeft, Image as ImageIcon, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewShipTo() {
  const router = useRouter();

  const selectStyle = {
    backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" viewBox="0 0 24 24" stroke="%239ca3af" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center",
    backgroundSize: "16px"
  };

  return (
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section */}
      <div className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] pt-16 md:pt-10 pb-4 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-8">Add Ship To</h1>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-5 relative z-0 overflow-y-auto no-scrollbar pt-6">
        
        {/* Form Container */}
        <div className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Country <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <select 
                style={selectStyle}
                className="flex-1 bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none appearance-none"
              >
                <option>🇺🇸 USA</option>
                <option>🇩🇴 Dominican Republic</option>
              </select>
              <button className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] text-white font-bold px-5 py-3.5 rounded-xl shadow-sm active:scale-95 transition-transform text-sm">
                Location
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Company</label>
            <input type="text" placeholder="Enter Company Name" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[#2C3258] font-bold text-[13px] ml-1">First Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter First Name" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[#2C3258] font-bold text-[13px] ml-1">Last Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter Last Name" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Cellphone <span className="text-red-500">*</span></label>
            <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border-none">
              <div className="bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-[#2C3258]">
                <span>🇺🇸</span>
                <span>+1</span>
              </div>
              <input type="tel" placeholder="201-555-0123" className="flex-1 px-4 py-3.5 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Telephone</label>
            <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border-none">
              <div className="bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-[#2C3258]">
                <span>🇺🇸</span>
                <span>+1</span>
              </div>
              <input type="tel" placeholder="201-555-0123" className="flex-1 px-4 py-3.5 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Address <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Select Address 1" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Address 2</label>
            <input type="text" placeholder="Enter address 2" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Apartment</label>
            <input type="text" placeholder="Enter Apartment" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Language</label>
            <select 
              style={selectStyle}
              className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none appearance-none"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>Bolivia - Castilian</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Email ID</label>
            <input type="email" placeholder="Enter Email" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Id Type</label>
            <select 
              style={selectStyle}
              className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none appearance-none"
            >
              <option value="">Select ID Type</option>
              <option>Passport</option>
              <option>Driver's License</option>
              <option>State ID</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">License ID</label>
            <input type="text" placeholder="Enter License ID" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">License Picture</label>
            <div className="w-full bg-[#F4F5F7] border-2 border-dashed border-gray-300 rounded-2xl h-32 flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-2 bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] text-white font-bold text-xs py-2 px-5 rounded-full shadow-sm">
                <Upload size={14} />
                <span>Upload Picture</span>
              </div>
            </div>
          </div>

        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 mb-4">
          <button 
            onClick={() => router.back()}
            className="flex-1 bg-[#F4F5F7] text-[#2C3258] font-bold text-[14px] py-3.5 rounded-full active:scale-95 transition-transform"
          >
            Cancel
          </button>
          <button className="flex-1 bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] text-white font-bold text-[14px] py-3.5 rounded-full shadow-[0_4px_14px_rgba(6,18,70,0.25)] active:scale-95 transition-transform hover:opacity-95">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
