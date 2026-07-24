"use client";

import React, { useState } from "react";
import { ArrowLeft, Bell, CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth";

const IconWhatsapp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
};

export default function Notifications() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [language, setLanguage] = useState("ES");
  
  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Pickup Scheduled",
      message: "Your pickup for tomorrow at 10:00 AM has been confirmed.",
      time: "10 mins ago",
      isRead: false,
    },
    {
      id: "2",
      title: "Claim Update",
      message: "Your claim for invoice #INV-1002 is now processing.",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: "3",
      title: "Account Created",
      message: "Welcome to Salcedo! Your account has been successfully created.",
      time: "1 day ago",
      isRead: true,
    },
  ]);

  const toggleReadStatus = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
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
            {/* Left: Brand */}
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-[12px] tracking-[0.14em] uppercase text-white">
                SALCEDO
              </span>
            </div>
            {/* Right: Bell (if logged in) + WhatsApp + Globe */}
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

        {/* Page Title & Actions */}
        <div className="pt-4 pb-2 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="w-16 flex justify-start p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-normal flex-1 text-center tracking-wide">Notifications</h1>
            <div className="w-16 flex justify-end">
              <button 
                onClick={markAllAsRead}
                className="text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-full active:scale-95 transition-all whitespace-nowrap"
              >
                Read All
              </button>
            </div>
          </div>
        </div>

        {/* Content Section - scrollable list */}
        <div className="flex-1 p-4 pt-2 pb-24 flex flex-col gap-3 overflow-y-auto no-scrollbar">
          {notifications.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-white/40">
              <Bell size={48} className="mb-4 opacity-25 animate-pulse" />
              <p className="font-medium">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`backdrop-blur-xl border rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex gap-4 p-4 shrink-0 transition-all duration-200 ${
                  notif.isRead 
                    ? "bg-white/70 border-white/40" 
                    : "bg-white/90 border-primary/30"
                }`}
              >
                <div className="pt-1">
                  <button 
                    onClick={() => toggleReadStatus(notif.id)}
                    className="active:scale-90 transition-transform cursor-pointer"
                  >
                    {notif.isRead ? (
                      <CheckCircle2 size={22} className="text-gray-300" />
                    ) : (
                      <div className="relative">
                        <Circle size={22} className="text-primary" strokeWidth={2.5} />
                        <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-primary rounded-full"></div>
                      </div>
                    )}
                  </button>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-[14px] ${notif.isRead ? "text-gray-600" : "text-[#2C3258]"}`}>
                      {notif.title}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap ml-2">
                      {notif.time}
                    </span>
                  </div>
                  <p className={`text-[12px] leading-snug ${notif.isRead ? "text-gray-500 font-medium" : "text-gray-700 font-semibold"}`}>
                    {notif.message}
                  </p>
                  
                  <div className="mt-3 flex justify-end">
                    <button 
                      onClick={() => toggleReadStatus(notif.id)}
                      className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-all ${
                        notif.isRead 
                          ? "text-gray-500 border-gray-200 hover:bg-gray-50 active:scale-95" 
                          : "text-primary border-primary/20 bg-primary/5 hover:bg-primary/10 active:scale-95"
                      }`}
                    >
                      {notif.isRead ? "Mark as unread" : "Mark as read"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
