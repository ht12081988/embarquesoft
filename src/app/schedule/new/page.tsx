"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewSchedulePickup() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"pickup" | "shipto">("pickup");

  return (
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section */}
      <div className="bg-primary pt-[env(safe-area-inset-top,44px)] md:pt-10 pb-4 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center">Schedule Pickup</h1>
          <button className="p-2 -mr-2 active:scale-95 transition-transform cursor-pointer" title="Save">
            <Save size={22} />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-white/20 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab("pickup")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'pickup' ? 'bg-white text-primary shadow-sm' : 'text-white'}`}
          >
            Pickup
          </button>
          <button 
            onClick={() => setActiveTab("shipto")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'shipto' ? 'bg-white text-primary shadow-sm' : 'text-white'}`}
          >
            ShipTo
          </button>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-5 relative z-0 overflow-y-auto no-scrollbar pt-6">
        
        {/* Form Container */}
        <div className="flex flex-col gap-5">
          


          {activeTab === "pickup" ? (
            /* PICKUP TAB FIELDS */
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Country <span className="text-red-500">*</span></label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                  <option value="USA">USA</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Select Address from the list</label>
                <div className="flex items-center gap-2">
                  <select className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-red-500 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                    <option>12 avenue, NY, 2156</option>
                  </select>
                  <button className="bg-primary text-white p-3 rounded-xl shadow-sm active:scale-95 transition-transform">
                    <MapPin size={20} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">First Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="hardik" className="w-full bg-[#EEF2FC] border border-transparent rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-500" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Trivedi" className="w-full bg-[#EEF2FC] border border-transparent rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-500" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Pick up Address 1 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="213" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Pick up Address 2</label>
                <input type="text" placeholder="Address 2" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">Apartment</label>
                  <input type="text" placeholder="Apt" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">City</label>
                  <input type="text" placeholder="City" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">State</label>
                  <input type="text" placeholder="State" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">Zip</label>
                  <input type="text" placeholder="Zip Code" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">Latitude</label>
                  <input type="text" readOnly placeholder="Latitude" className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-500 cursor-not-allowed font-medium outline-none placeholder-gray-400" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">Longitude</label>
                  <input type="text" readOnly placeholder="Longitude" className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-500 cursor-not-allowed font-medium outline-none placeholder-gray-400" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Cell Number <span className="text-red-500">*</span></label>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white">
                  <div className="bg-gray-50 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                    <span>🇺🇸</span>
                    <span className="text-[#2C3258] font-bold">+1</span>
                  </div>
                  <input type="tel" placeholder="9755534799" className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Telephone Number <span className="text-red-500">*</span></label>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white">
                  <div className="bg-gray-50 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                    <span>🇺🇸</span>
                    <span className="text-[#2C3258] font-bold">+1</span>
                  </div>
                  <input type="tel" placeholder="9755534799" className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Email ID <span className="text-red-500">*</span></label>
                <input type="email" placeholder="gregory@yahoo.com" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Tentative Pickup DT/TM</label>
                <input type="datetime-local" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Select Category</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                  <option>Package</option>
                  <option>Barrel</option>
                  <option>Box</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Comments</label>
                <textarea placeholder="Enter Comments here." rows={3} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400 resize-none"></textarea>
              </div>
            </>
          ) : (
            /* SHIPTO TAB FIELDS */
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Country <span className="text-red-500">*</span></label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="USA">USA</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Location</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                  <option value="Azua-->El dorr">Azua--&gt;El dorr</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Select Address from the list</label>
                <div className="flex items-center gap-2">
                  <select className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-red-500 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                    <option>12 avenue, NY, 2156</option>
                  </select>
                  <button className="bg-primary text-white p-3 rounded-xl shadow-sm active:scale-95 transition-transform">
                    <MapPin size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">First Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Gregory" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Strickland" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Drop off Address 1 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Address 1" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Drop off Address 2</label>
                <input type="text" placeholder="Enter Address 2" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">Province</label>
                  <input type="text" placeholder="Province" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">Municipality</label>
                  <input type="text" placeholder="Municipality" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Sector</label>
                <input type="text" placeholder="Sector" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">Latitude</label>
                  <input type="text" readOnly placeholder="Latitude" className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-500 cursor-not-allowed font-medium outline-none placeholder-gray-400" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px]">Longitude</label>
                  <input type="text" readOnly placeholder="Longitude" className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-500 cursor-not-allowed font-medium outline-none placeholder-gray-400" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Cell Number <span className="text-red-500">*</span></label>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white">
                  <div className="bg-gray-50 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                    <span>🇩🇴</span>
                    <span className="text-[#2C3258] font-bold">+1</span>
                  </div>
                  <input type="tel" placeholder="9755534799" className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Telephone Number <span className="text-red-500">*</span></label>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white">
                  <div className="bg-gray-50 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                    <span>🇩🇴</span>
                    <span className="text-[#2C3258] font-bold">+1</span>
                  </div>
                  <input type="tel" placeholder="9755534799" className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">Email ID <span className="text-red-500">*</span></label>
                <input type="email" placeholder="smith@gmail.com" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">License ID</label>
                <input type="text" placeholder="132141414" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px]">License ID Upload</label>
                <div className="w-full bg-[#E5E7EB] border-2 border-dashed border-gray-300 rounded-xl h-32 flex items-center justify-center cursor-pointer active:bg-gray-300 transition-colors">
                  <span className="bg-[#5c85eb] text-white font-bold py-2 px-6 rounded-lg shadow-sm">Upload</span>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Submit Button */}
        <button className="bg-[#5c85eb] text-white font-bold text-[15px] py-3 rounded-xl mt-4 shadow-md active:scale-95 transition-transform mb-4">
          Submit
        </button>

      </div>
    </div>
  );
}
