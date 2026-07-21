"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TrackingStatus() {
  const router = useRouter();

  const mockData = [
    { barcode: "20600029411001", date: "03-07-2026", status: "WH", packages: "11", container: "-" },
    { barcode: "20600029411002", date: "03-07-2026", status: "WH", packages: "11", container: "-" },
    { barcode: "20600029411003", date: "03-07-2026", status: "WH", packages: "11", container: "-" },
    { barcode: "20600029411004", date: "03-07-2026", status: "WH", packages: "11", container: "-" },
    { barcode: "20600029411005", date: "03-07-2026", status: "WH", packages: "11", container: "-" },
  ];

  return (
    <div className="flex flex-col flex-1 bg-[#F9F9FB] min-h-full">
      {/* Header Section */}
      <div className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] pt-16 md:pt-10 pb-4 px-5 flex flex-col shrink-0 text-white shadow-md z-10 sticky top-0 rounded-b-[24px]">
        <div className="flex items-center mb-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[20px] font-bold ml-2 tracking-wide">Tracking Status Table</h1>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar pt-6">
        
        {/* Table Headers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 shrink-0 grid grid-cols-[auto_auto_auto_auto_auto_auto_auto] items-center justify-between text-[#2C3258] font-bold text-[14px]">
          <div>Date</div>
          <div className="text-gray-300">|</div>
          <div>Status</div>
          <div className="text-gray-300">|</div>
          <div>Packages</div>
          <div className="text-gray-300">|</div>
          <div>Container</div>
        </div>

        {/* Tracking Cards */}
        <div className="flex flex-col gap-3 pb-8">
          {mockData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
              <div className="bg-[#EDEAFD] px-4 py-3 border-b border-gray-100">
                <span className="text-gray-400 font-bold text-[15px] tracking-wide">Barcode: </span>
                <span className="text-[#2C3258] font-bold text-[15px] tracking-wide">{item.barcode}</span>
              </div>
              <div className="px-4 py-4 grid grid-cols-[auto_auto_auto_auto_auto_auto_auto] items-center justify-between text-[#2C3258] font-bold text-[14px]">
                <div>{item.date}</div>
                <div className="text-gray-300">|</div>
                <div>{item.status}</div>
                <div className="text-gray-300">|</div>
                <div className="text-center">{item.packages}</div>
                <div className="text-gray-300">|</div>
                <div className="text-center pr-4">{item.container}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
