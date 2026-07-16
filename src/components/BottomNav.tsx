"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, isPopupOpen } = useAuth();

  const tabs = [
    { name: "Home", href: "/", imageSrc: "/images/nav_home.png", protected: false },
    { name: "Pickup", href: "/schedule/new", imageSrc: "/images/nav_pickup.png", protected: true },
    { name: "Profile", href: "/profile", imageSrc: "/images/nav_profile.png", protected: true },
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, tab: typeof tabs[0]) => {
    if (tab.protected && !isLoggedIn) {
      e.preventDefault();
      router.push("/login");
    }
  };

  return (
    <div className={`shrink-0 bg-white shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)] border-t border-gray-100 px-2 pb-[env(safe-area-inset-bottom,16px)] md:pb-6 pt-2 z-50 transition-all duration-300 ${isPopupOpen ? 'blur-[3px] opacity-40 pointer-events-none saturate-50' : ''}`}>
      <div className="flex justify-between items-center h-16">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
          return (
            <a 
              key={tab.name} 
              href={tab.href}
              onClick={(e) => handleNavigation(e, tab)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 cursor-pointer transition-all ${
                isActive ? 'scale-105 saturate-100 opacity-100' : 'opacity-55 saturate-50 hover:opacity-75'
              }`}
            >
              <img src={tab.imageSrc} alt={tab.name} className="w-12 h-12 object-contain" />
              <span className={`text-[11px] font-bold ${isActive ? 'text-primary' : 'text-gray-500'}`}>{tab.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

