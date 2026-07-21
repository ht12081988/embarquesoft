"use client";

import React, { use } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SchedulePickupDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const pickupId = unwrappedParams.id;

  // Mock data for the demonstration
  const data = {
    pickup: {
      category: "Package",
      item1: "1",
      item2: "0",
      box: "2",
      barrel: "1",
      tap: "0",
      tentativeDate: "2025-12-29 10:00 AM",
      comments: "Please call 30 mins before arrival.",
    },
    customer: {
      country: "USA",
      name: "Ricardo Sinha",
      address1: "47 W 13th St",
      address2: "Apt 2B",
      city: "Caruthersville",
      state: "MO",
      zip: "63830",
      lat: "36.1881",
      lng: "-89.6542",
      cell: "+1 212-444-8574",
      phone: "+1 201-555-0123",
      email: "ricardo@example.com"
    },
    shipto: {
      country: "Dominican Republic",
      location: "Azua-->El dorr",
      name: "Gregory Strickland",
      address1: "Calle Sol 12",
      address2: "Suite 4",
      province: "Azua",
      municipality: "Azua de Compostela",
      sector: "Centro",
      lat: "18.4533",
      lng: "-70.7349",
      cell: "+1 809-555-9876",
      phone: "+1 809-555-1234",
      email: "gregory@example.com",
      license: "LIC-8982312"
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50 min-h-full">
      {/* Header Section */}
      <div className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] pt-16 md:pt-10 pb-4 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center mb-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-6">Pickup Details</h1>
        </div>
        <div className="text-center font-medium text-white/90 text-sm">
          {pickupId}
        </div>
      </div>

      <div className="flex-1 p-5 pb-24 flex flex-col gap-6 relative z-0 overflow-y-auto no-scrollbar pt-6">
        
        {/* Pickup Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden shrink-0">
          <div className="bg-[#EEF2FC] px-4 py-3 border-b border-gray-100">
            <h2 className="text-[#2C3258] font-bold text-[15px]">Pickup Information</h2>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <span className="text-gray-500 text-[12px] font-bold uppercase">Category</span>
                <span className="text-gray-900 text-[14px] font-medium">{data.pickup.category}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[12px] font-bold uppercase">Tentative Date</span>
                <span className="text-gray-900 text-[14px] font-medium">{data.pickup.tentativeDate}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-y-3 gap-x-2 border-y border-gray-100 py-3 my-1">
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-bold uppercase">Item 1</span>
                <span className="text-gray-900 text-[14px] font-medium">{data.pickup.item1}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-bold uppercase">Item 2</span>
                <span className="text-gray-900 text-[14px] font-medium">{data.pickup.item2}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-bold uppercase">Box</span>
                <span className="text-gray-900 text-[14px] font-medium">{data.pickup.box}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-bold uppercase">Barrel</span>
                <span className="text-gray-900 text-[14px] font-medium">{data.pickup.barrel}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-bold uppercase">Tap</span>
                <span className="text-gray-900 text-[14px] font-medium">{data.pickup.tap}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-[12px] font-bold uppercase">Comments</span>
              <span className="text-gray-900 text-[14px] font-medium">{data.pickup.comments || "-"}</span>
            </div>
          </div>
        </div>

        {/* Customer Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden shrink-0">
          <div className="bg-[#EEF2FC] px-4 py-3 border-b border-gray-100">
            <h2 className="text-[#2C3258] font-bold text-[15px]">Customer Details</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div>
              <h3 className="text-gray-900 font-bold text-[15px]">{data.customer.name}</h3>
              <p className="text-gray-600 font-medium text-[13px]">{data.customer.email}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex flex-col gap-1">
              <span className="text-gray-900 text-[13px] font-medium">{data.customer.address1} {data.customer.address2}</span>
              <span className="text-gray-900 text-[13px] font-medium">{data.customer.city}, {data.customer.state} {data.customer.zip}</span>
              <span className="text-gray-500 text-[12px] mt-1">{data.customer.country}</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col border border-gray-100 rounded-lg p-2.5">
                <span className="text-gray-500 text-[11px] font-bold uppercase mb-0.5">Cell</span>
                <span className="text-gray-900 text-[13px] font-bold">{data.customer.cell}</span>
              </div>
              <div className="flex flex-col border border-gray-100 rounded-lg p-2.5">
                <span className="text-gray-500 text-[11px] font-bold uppercase mb-0.5">Phone</span>
                <span className="text-gray-900 text-[13px] font-bold">{data.customer.phone || "-"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-bold uppercase">Lat</span>
                <span className="text-gray-500 text-[13px]">{data.customer.lat}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-bold uppercase">Lng</span>
                <span className="text-gray-500 text-[13px]">{data.customer.lng}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ShipTo Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden shrink-0 mb-8">
          <div className="bg-[#EEF2FC] px-4 py-3 border-b border-gray-100">
            <h2 className="text-[#2C3258] font-bold text-[15px]">ShipTo Details</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div>
              <h3 className="text-gray-900 font-bold text-[15px]">{data.shipto.name}</h3>
              <p className="text-gray-600 font-medium text-[13px]">{data.shipto.email}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex flex-col gap-1">
              <span className="text-gray-900 text-[13px] font-medium">{data.shipto.address1} {data.shipto.address2}</span>
              <span className="text-gray-900 text-[13px] font-medium">{data.shipto.sector}, {data.shipto.municipality}, {data.shipto.province}</span>
              <span className="text-gray-500 text-[12px] mt-1">{data.shipto.location} &bull; {data.shipto.country}</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col border border-gray-100 rounded-lg p-2.5">
                <span className="text-gray-500 text-[11px] font-bold uppercase mb-0.5">Cell</span>
                <span className="text-gray-900 text-[13px] font-bold">{data.shipto.cell}</span>
              </div>
              <div className="flex flex-col border border-gray-100 rounded-lg p-2.5">
                <span className="text-gray-500 text-[11px] font-bold uppercase mb-0.5">Phone</span>
                <span className="text-gray-900 text-[13px] font-bold">{data.shipto.phone || "-"}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-bold uppercase">License ID</span>
                <span className="text-gray-900 text-[13px] font-medium">{data.shipto.license || "-"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-bold uppercase">Lat</span>
                <span className="text-gray-500 text-[13px]">{data.shipto.lat}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[11px] font-bold uppercase">Lng</span>
                <span className="text-gray-500 text-[13px]">{data.shipto.lng}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
