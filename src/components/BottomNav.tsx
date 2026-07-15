"use client";

import React from "react";
import { Home, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Pickup", href: "/schedule/new", icon: Plus },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="shrink-0 bg-white shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)] border-t border-gray-100 px-2 pb-[env(safe-area-inset-bottom,16px)] md:pb-6 pt-2 z-50">
      <div className="flex justify-between items-center h-12">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 ${isActive ? 'text-primary' : 'text-gray-400'}`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-medium">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
