"use client";

import React, { useState } from "react";
import { ArrowLeft, Bell, CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
};

export default function Notifications() {
  const router = useRouter();

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
        <div className="pt-12 pb-4 px-5 flex flex-col shrink-0 text-white">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="w-16 flex justify-start p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-semibold flex-1 text-center tracking-wide">Notifications</h1>
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
