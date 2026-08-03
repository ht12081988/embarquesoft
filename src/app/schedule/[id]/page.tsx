"use client";

import React, { use } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth";

const IconWhatsapp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export default function SchedulePickupDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const pickupId = unwrappedParams.id;
  const { isLoggedIn } = useAuth();
  const [language, setLanguage] = React.useState("ES");

  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

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
    driver: {
      name: "John Smith",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
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
      email: "ricardo@example.com",
      idType: "Passport",
      license: "LIC-1234567",
      licenseImage: "/placeholder.png",
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
        <div className="shrink-0 px-5 pt-9 pb-4.5 z-10" style={{ background: "linear-gradient(135deg, #061246 0%, #1a40b4 100%)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-[12px] tracking-[0.14em] uppercase text-white">
                SALCEDO
              </span>
            </div>
            <div className="flex items-center gap-3.5">
              {isLoggedIn && (
                <Link href="/notifications" className="relative text-white active:scale-90 transition-transform flex items-center">
                  <IconBell />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#eb5b27] rounded-full animate-pulse" />
                </Link>
              )}
              <a href="https://wa.me/12015550123" target="_blank" rel="noopener noreferrer" className="text-white active:scale-90 transition-transform flex items-center">
                <IconWhatsapp />
              </a>
              <button onClick={toggleLanguage} className="text-white active:scale-90 transition-transform flex items-center">
                <IconGlobe />
              </button>
            </div>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="pt-4 pb-2 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between mb-1">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-normal flex-1 text-center pr-6 tracking-wide">Pickup Details</h1>
          </div>
          <div className="text-center text-xs font-semibold text-white/80 pb-2">
            {pickupId}
          </div>
        </div>

        {/* Main scrollable body container matching app style (white rounded glass card) */}
        <div className="flex-1 bg-white/[0.88] backdrop-blur-xl rounded-t-[32px] p-5 flex flex-col relative overflow-y-auto no-scrollbar shadow-[0_-8px_32px_rgba(0,0,0,0.1)] gap-5 pb-24">

          {/* Pickup Section */}
          <div className="bg-white/95 border border-white/60 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
            <h2 className="text-[#eb5b27] font-bold text-sm border-b border-black/5 pb-2">Pickup Information</h2>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase">Category</span>
                <span className="text-gray-900 font-medium">{data.pickup.category}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase">Tentative Date</span>
                <span className="text-gray-900 font-medium">{data.pickup.tentativeDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-y-3 gap-x-2 border-y border-black/5 py-2.5 my-1 text-[11px]">
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase">Item 1</span>
                <span className="text-gray-900 font-medium">{data.pickup.item1}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase">Item 2</span>
                <span className="text-gray-900 font-medium">{data.pickup.item2}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase">Box</span>
                <span className="text-gray-900 font-medium">{data.pickup.box}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase">Barrel</span>
                <span className="text-gray-900 font-medium">{data.pickup.barrel}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase">Tap</span>
                <span className="text-gray-900 font-medium">{data.pickup.tap}</span>
              </div>
            </div>

            <div className="flex flex-col text-[11px]">
              <span className="text-gray-500 font-bold uppercase">Comments</span>
              <span className="text-gray-900 font-medium leading-relaxed">{data.pickup.comments || "-"}</span>
            </div>
            
            {data.driver && (
              <div className="mt-2 flex items-center gap-3 bg-[#eb5b27]/10 rounded-xl p-3 border border-[#eb5b27]/30">
                {data.driver.image ? (
                  <img src={data.driver.image} alt={data.driver.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#eb5b27]/20 flex items-center justify-center">
                    <span className="text-[#eb5b27] font-bold text-xs">{data.driver.name.substring(0, 2).toUpperCase()}</span>
                  </div>
                )}
                <div>
                  <span className="text-[#c24a20] font-bold text-[10px] uppercase tracking-wide block">Assigned Driver</span>
                  <span className="text-gray-900 font-bold text-sm">{data.driver.name}</span>
                </div>
              </div>
            )}
          </div>

          {/* Customer Section */}
          <div className="bg-white/95 border border-white/60 rounded-2xl shadow-sm p-4 flex flex-col gap-4">
            <h2 className="text-[#eb5b27] font-bold text-sm border-b border-black/5 pb-2">Customer Details</h2>
            <div className="text-[11px]">
              <h3 className="text-gray-900 font-bold text-[12px]">{data.customer.name}</h3>
              <p className="text-gray-500 font-medium">{data.customer.email}</p>
            </div>

            <div className="bg-black/5 p-3 rounded-xl flex flex-col gap-1 text-[11px]">
              <span className="text-gray-800 font-medium">{data.customer.address1} {data.customer.address2}</span>
              <span className="text-gray-800 font-medium">{data.customer.city}, {data.customer.state} {data.customer.zip}</span>
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mt-0.5">{data.customer.country}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase">ID Type</span>
                <span className="text-gray-900 font-medium">{data.customer.idType || "-"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase">License ID</span>
                <span className="text-gray-900 font-medium">{data.customer.license || "-"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="flex flex-col border border-black/5 rounded-xl p-2.5">
                <span className="text-gray-500 font-bold uppercase text-[9px] mb-0.5">Cell</span>
                <span className="text-gray-900 font-bold">{data.customer.cell}</span>
              </div>
              <div className="flex flex-col border border-black/5 rounded-xl p-2.5">
                <span className="text-gray-500 font-bold uppercase text-[9px] mb-0.5">Phone</span>
                <span className="text-gray-900 font-bold">{data.customer.phone || "-"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[10px] text-gray-500 border-t border-black/5 pt-2.5">
              <div><span className="font-bold">Lat:</span> {data.customer.lat}</div>
              <div><span className="font-bold">Lng:</span> {data.customer.lng}</div>
            </div>
          </div>

          {/* ShipTo Section */}
          <div className="bg-white/95 border border-white/60 rounded-2xl shadow-sm p-4 flex flex-col gap-4">
            <h2 className="text-[#eb5b27] font-bold text-sm border-b border-black/5 pb-2">ShipTo Details</h2>
            <div className="text-[11px]">
              <h3 className="text-gray-900 font-bold text-[12px]">{data.shipto.name}</h3>
              <p className="text-gray-500 font-medium">{data.shipto.email}</p>
            </div>

            <div className="bg-black/5 p-3 rounded-xl flex flex-col gap-1 text-[11px]">
              <span className="text-gray-800 font-medium">{data.shipto.address1} {data.shipto.address2}</span>
              <span className="text-gray-800 font-medium">{data.shipto.sector}, {data.shipto.municipality}, {data.shipto.province}</span>
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mt-0.5">{data.shipto.location} &bull; {data.shipto.country}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="flex flex-col border border-black/5 rounded-xl p-2.5">
                <span className="text-gray-500 font-bold uppercase text-[9px] mb-0.5">Cell</span>
                <span className="text-gray-900 font-bold">{data.shipto.cell}</span>
              </div>
              <div className="flex flex-col border border-black/5 rounded-xl p-2.5">
                <span className="text-gray-500 font-bold uppercase text-[9px] mb-0.5">Phone</span>
                <span className="text-gray-900 font-bold">{data.shipto.phone || "-"}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-[11px]">
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase">License ID</span>
                <span className="text-gray-900 font-medium">{data.shipto.license || "-"}</span>
              </div>
              <div className="flex flex-col text-[10px] text-gray-500">
                <span className="font-bold">Lat</span>
                <span>{data.shipto.lat}</span>
              </div>
              <div className="flex flex-col text-[10px] text-gray-500">
                <span className="font-bold">Lng</span>
                <span>{data.shipto.lng}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
