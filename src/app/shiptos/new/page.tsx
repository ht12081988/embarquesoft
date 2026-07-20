"use client";

import React from "react";
import { ArrowLeft, Save, X, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewShipTo() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section */}
      <div className="bg-primary pt-16 md:pt-10 pb-4 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center">Add Ship To</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-5 relative z-0 overflow-y-auto no-scrollbar pt-6">
        
        {/* Form Container */}
        <div className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Country <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <select className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                <option>USA</option>
                <option>Dominican Republic</option>
              </select>
              <button className="bg-[#2C3258] text-white font-bold px-4 rounded-xl shadow-sm active:scale-95 transition-transform">
                Location
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Company</label>
            <input type="text" placeholder="Enter Company Name" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[#2C3258] font-bold text-[13px]">First Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter First Name" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[#2C3258] font-bold text-[13px]">Last Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter Last Name" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Cellphone <span className="text-red-500">*</span></label>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white">
              <div className="bg-gray-50 border-r border-gray-200 px-2 py-2.5 flex items-center gap-1 cursor-pointer">
                <span>🇺🇸</span>
                <span className="text-[#2C3258] font-bold text-sm">+1</span>
                <span className="text-gray-400 text-[9px]">▼</span>
              </div>
              <input type="tel" placeholder="201-555-0123" className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Telephone</label>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white">
              <div className="bg-gray-50 border-r border-gray-200 px-2 py-2.5 flex items-center gap-1 cursor-pointer">
                <span>🇺🇸</span>
                <span className="text-[#2C3258] font-bold text-sm">+1</span>
                <span className="text-gray-400 text-[9px]">▼</span>
              </div>
              <input type="tel" placeholder="201-555-0123" className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Address <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Select Address 1" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Address2</label>
            <input type="text" placeholder="Enter address2" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Apartment</label>
            <input type="text" placeholder="Enter Apartment" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
          </div>

          <div className="hidden gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[#2C3258] font-bold text-[13px]">Latitude</label>
              <input type="text" readOnly placeholder="Enter latitude" className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-500 cursor-not-allowed font-medium outline-none placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[#2C3258] font-bold text-[13px]">Longitude</label>
              <input type="text" readOnly placeholder="Enter longitude" className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-500 cursor-not-allowed font-medium outline-none placeholder-gray-400" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Language</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
              <option>Bolivia, Plurinational State Of - Castilian</option>
              <option>English</option>
              <option>Spanish</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Email ID</label>
            <input type="email" placeholder="Enter Email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">Id Type</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
              <option value="">Search Id Type</option>
              <option>Passport</option>
              <option>Driver's License</option>
              <option>State ID</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px]">License Id</label>
            <input type="text" placeholder="Enter License Id" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-[#2C3258] font-bold text-[13px]">License Picture</label>
            <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 relative group cursor-pointer active:bg-gray-200 transition-colors">
              <ImageIcon size={40} className="text-gray-400 group-hover:text-primary transition-colors" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex gap-1">
                 {/* Mocking the red target and upload icon from screenshot */}
                 <div className="w-6 h-6 bg-white shadow-md rounded-full flex items-center justify-center text-red-500">
                   <div className="w-3 h-3 border-2 border-red-500 rounded-full flex items-center justify-center">
                     <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                   </div>
                 </div>
                 <div className="w-6 h-6 bg-white shadow-md rounded-full flex items-center justify-center text-[#2C3258]">
                   <ImageIcon size={14} />
                 </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Save and Cancel Buttons at the bottom */}
        <div className="flex gap-3 mt-8 mb-4">
          <button 
            onClick={() => router.back()}
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold text-[15px] py-3 rounded-xl shadow-sm active:scale-95 transition-transform"
          >
            Cancel
          </button>
          <button className="flex-1 bg-[#2C3258] text-white font-bold text-[15px] py-3 rounded-xl shadow-md active:scale-95 transition-transform">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}


