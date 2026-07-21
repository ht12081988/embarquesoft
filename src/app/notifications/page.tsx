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
    <div className="flex flex-col flex-1 bg-[#F4F6FD] min-h-full relative">
      {/* Header Section */}
      <div className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] pt-16 md:pt-10 pb-6 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 relative">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center">Notifications</h1>
          <button 
            onClick={markAllAsRead}
            className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
          >
            Read All
          </button>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-3 relative z-0 overflow-y-auto no-scrollbar pt-6">
        {notifications.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Bell size={48} className="mb-4 opacity-20" />
            <p className="font-medium">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-2xl flex gap-4 transition-colors border shadow-sm ${
                notif.isRead 
                  ? "bg-white border-gray-100" 
                  : "bg-white border-primary/20"
              }`}
            >
              <div className="pt-1">
                <button 
                  onClick={() => toggleReadStatus(notif.id)}
                  className="active:scale-90 transition-transform cursor-pointer"
                >
                  {notif.isRead ? (
                    <CheckCircle2 size={24} className="text-gray-300" />
                  ) : (
                    <div className="relative">
                      <Circle size={24} className="text-primary" />
                      <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-primary rounded-full"></div>
                    </div>
                  )}
                </button>
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-[15px] ${notif.isRead ? "text-gray-700" : "text-[#2C3258]"}`}>
                    {notif.title}
                  </h3>
                  <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap ml-2">
                    {notif.time}
                  </span>
                </div>
                <p className={`text-[13px] leading-snug ${notif.isRead ? "text-gray-500" : "text-gray-600 font-medium"}`}>
                  {notif.message}
                </p>
                
                <div className="mt-3 flex justify-end">
                  <button 
                    onClick={() => toggleReadStatus(notif.id)}
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      notif.isRead 
                        ? "text-gray-500 border-gray-200 active:bg-gray-50" 
                        : "text-primary border-primary/20 bg-primary/5 active:bg-primary/10"
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
  );
}


