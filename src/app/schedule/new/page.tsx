"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, MapPin, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewSchedulePickup() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"pickup" | "shipto" | "customer">("pickup");

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
        <div className="flex bg-white/15 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab("pickup")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'pickup' ? 'bg-white text-[#061246] shadow-sm' : 'text-white/80 hover:text-white'}`}
          >
            Pickup
          </button>
          <button 
            onClick={() => setActiveTab("customer")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'customer' ? 'bg-white text-[#061246] shadow-sm' : 'text-white/80 hover:text-white'}`}
          >
            Customer
          </button>
          <button 
            onClick={() => setActiveTab("shipto")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'shipto' ? 'bg-white text-[#061246] shadow-sm' : 'text-white/80 hover:text-white'}`}
          >
            ShipTo
          </button>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-5 relative z-0 overflow-y-auto no-scrollbar pt-6">
        
        {/* Form Container */}
        <div className="flex flex-col gap-4">

          {activeTab === "pickup" ? (
            /* PICKUP TAB FIELDS */
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Select Category</label>
                <select 
                  style={selectStyle}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none appearance-none"
                >
                  <option value="Supply">Supply</option>
                  <option value="Move">Move</option>
                  <option value="AI pickup">AI pickup</option>
                </select>
              </div>

              <div className="flex gap-3 flex-wrap">
                <div className="flex flex-col gap-1.5 flex-1 min-w-[45%]">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Item 1</label>
                  <input type="text" placeholder="Item 1" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[45%]">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Item 2</label>
                  <input type="text" placeholder="Item 2" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[45%]">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Box</label>
                  <input type="text" placeholder="Box" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[45%]">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Barrel</label>
                  <input type="text" placeholder="Barrel" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[100%]">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Tap</label>
                  <input type="text" placeholder="Tap" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Tentative Pickup Date & Time</label>
                <input type="datetime-local" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium border-none" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Comments</label>
                <textarea placeholder="Enter Comments here." rows={3} className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none resize-none"></textarea>
              </div>
            </>
          ) : activeTab === "customer" ? (
            /* CUSTOMER TAB FIELDS */
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Country <span className="text-red-500">*</span></label>
                <select 
                  style={selectStyle}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none appearance-none"
                >
                  <option value="USA">🇺🇸 USA</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Select Address from the list</label>
                <div className="flex items-center gap-2">
                  <select 
                    style={selectStyle}
                    className="flex-1 bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none appearance-none"
                  >
                    <option>12 avenue, NY, 2156</option>
                  </select>
                  <button className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] text-white p-3.5 rounded-xl shadow-sm active:scale-95 transition-transform flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">First Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Hardik" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Trivedi" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Pick up Address 1 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Address 1" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Pick up Address 2</label>
                <input type="text" placeholder="Address 2" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Apartment</label>
                  <input type="text" placeholder="Apt" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">City</label>
                  <input type="text" placeholder="City" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">State</label>
                  <input type="text" placeholder="State" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Zip</label>
                  <input type="text" placeholder="Zip Code" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Latitude</label>
                  <input type="text" readOnly placeholder="Latitude" className="w-full bg-[#EAEAEE] text-gray-500 rounded-xl px-4 py-3.5 text-sm outline-none font-medium border-none cursor-not-allowed" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Longitude</label>
                  <input type="text" readOnly placeholder="Longitude" className="w-full bg-[#EAEAEE] text-gray-500 rounded-xl px-4 py-3.5 text-sm outline-none font-medium border-none cursor-not-allowed" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Cell Number <span className="text-red-500">*</span></label>
                <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border-none">
                  <div className="bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-[#2C3258]">
                    <span>🇺🇸</span>
                    <span>+1</span>
                  </div>
                  <input type="tel" placeholder="201-555-0123" className="flex-1 px-4 py-3.5 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Telephone Number <span className="text-red-500">*</span></label>
                <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border-none">
                  <div className="bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-[#2C3258]">
                    <span>🇺🇸</span>
                    <span>+1</span>
                  </div>
                  <input type="tel" placeholder="201-555-0123" className="flex-1 px-4 py-3.5 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Email ID <span className="text-red-500">*</span></label>
                <input type="email" placeholder="gregory@yahoo.com" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
              </div>

            </>
          ) : (
            /* SHIPTO TAB FIELDS */
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Country <span className="text-red-500">*</span></label>
                <select 
                  style={selectStyle}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none appearance-none"
                >
                  <option value="Dominican Republic">🇩🇴 Dominican Republic</option>
                  <option value="USA">🇺🇸 USA</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Location</label>
                <select 
                  style={selectStyle}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none appearance-none"
                >
                  <option value="Azua-->El dorr">Azua--&gt;El dorr</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Select Address from the list</label>
                <div className="flex items-center gap-2">
                  <select 
                    style={selectStyle}
                    className="flex-1 bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm font-medium outline-none border-none appearance-none"
                  >
                    <option>12 avenue, NY, 2156</option>
                  </select>
                  <button className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] text-white p-3.5 rounded-xl shadow-sm active:scale-95 transition-transform flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">First Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Gregory" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Strickland" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Drop off Address 1 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Address 1" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Drop off Address 2</label>
                <input type="text" placeholder="Enter Address 2" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Province</label>
                  <input type="text" placeholder="Province" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Municipality</label>
                  <input type="text" placeholder="Municipality" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Sector</label>
                <input type="text" placeholder="Sector" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Latitude</label>
                  <input type="text" readOnly placeholder="Latitude" className="w-full bg-[#EAEAEE] text-gray-500 rounded-xl px-4 py-3.5 text-sm outline-none font-medium border-none cursor-not-allowed" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-bold text-[13px] ml-1">Longitude</label>
                  <input type="text" readOnly placeholder="Longitude" className="w-full bg-[#EAEAEE] text-gray-500 rounded-xl px-4 py-3.5 text-sm outline-none font-medium border-none cursor-not-allowed" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Cell Number <span className="text-red-500">*</span></label>
                <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border-none">
                  <div className="bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-[#2C3258]">
                    <span>🇩🇴</span>
                    <span>+1</span>
                  </div>
                  <input type="tel" placeholder="809-555-0123" className="flex-1 px-4 py-3.5 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Telephone Number <span className="text-red-500">*</span></label>
                <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border-none">
                  <div className="bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-[#2C3258]">
                    <span>🇩🇴</span>
                    <span>+1</span>
                  </div>
                  <input type="tel" placeholder="809-555-0123" className="flex-1 px-4 py-3.5 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">Email ID <span className="text-red-500">*</span></label>
                <input type="email" placeholder="smith@gmail.com" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">License ID</label>
                <input type="text" placeholder="132141414" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3.5 text-sm outline-none font-medium placeholder-gray-400 border-none" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-bold text-[13px] ml-1">License ID Upload</label>
                <div className="w-full bg-[#F4F5F7] border-2 border-dashed border-gray-300 rounded-2xl h-32 flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-[0.99] transition-transform">
                  <div className="flex items-center gap-2 bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] text-white font-bold text-xs py-2 px-5 rounded-full shadow-sm">
                    <Upload size={14} />
                    <span>Upload Document</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Submit Button */}
        <button className="w-full bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] text-white font-bold text-[14px] py-3.5 rounded-full shadow-[0_4px_14px_rgba(6,18,70,0.25)] active:scale-95 transition-transform hover:opacity-95 mt-4 mb-4">
          Submit Pickup
        </button>

      </div>
    </div>
  );
}
