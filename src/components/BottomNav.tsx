"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth";

// ── Inline SVG line icons ──────────────────────────────────────────────────
const NavHome = ({ active, isLight }: { active: boolean, isLight: boolean }) => {
  const color = active ? "#eb5b27" : (isLight ? "#061246" : "#ffffff");
  const doorColor = isLight && !active ? "#ffffff" : "#061246";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 10.5L12 3L21 10.5V20A1.5 1.5 0 0 1 19.5 21H15V14H9V21H4.5A1.5 1.5 0 0 1 3 20V10.5Z"
            fill={color} opacity={active ? 1 : (isLight ? 1 : 0.85)} />
      <path d="M9 14H15V21H9V14Z" fill={doorColor} opacity={isLight && !active ? 1 : 0.5}/>
    </svg>
  );
};

const NavInvoice = ({ active, isLight }: { active: boolean, isLight: boolean }) => {
  const color = active ? "#eb5b27" : (isLight ? "#061246" : "#ffffff");
  const linesColor = active ? (isLight ? "#ffffff" : "white") : (isLight ? "#ffffff" : "#061246");
  
  if (active && isLight) {
    // When active on light mode, render an orange outline style per user screenshot
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2" fill="#fff5f2" stroke="#eb5b27" strokeWidth="2" />
        <line x1="8" y1="8" x2="16" y2="8" stroke="#eb5b27" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="8" y1="12" x2="16" y2="12" stroke="#eb5b27" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="8" y1="16" x2="13" y2="16" stroke="#eb5b27" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" fill={color} opacity={active ? 1 : (isLight ? 1 : 0.85)}/>
      <line x1="8" y1="8" x2="16" y2="8" stroke={linesColor} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="8" y1="12" x2="16" y2="12" stroke={linesColor} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="8" y1="16" x2="13" y2="16" stroke={linesColor} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
};

const NavPickup = ({ active, isLight }: { active: boolean, isLight: boolean }) => {
  const color = active ? "#eb5b27" : (isLight ? "#061246" : "#ffffff");
  const wheelsColor = active ? "white" : (isLight ? "white" : "#061246");
  const wheelsStroke = active ? "#eb5b27" : (isLight ? "#061246" : "white");
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M2 7H13V16H2V7Z" fill={color} opacity={active ? 1 : (isLight ? 1 : 0.85)}/>
      <path d="M13 10H17.5L20 13V16H13V10Z" fill={color} opacity={active ? 1 : (isLight ? 1 : 0.85)}/>
      <circle cx="6" cy="18" r="2" fill={wheelsColor} stroke={wheelsStroke} strokeWidth="1"/>
      <circle cx="17" cy="18" r="2" fill={wheelsColor} stroke={wheelsStroke} strokeWidth="1"/>
    </svg>
  );
};

const NavShipTo = ({ active, isLight }: { active: boolean, isLight: boolean }) => {
  const color = active ? "#eb5b27" : (isLight ? "#061246" : "#ffffff");
  const windowColor = active ? "#ffffff" : (isLight ? "#ffffff" : "#061246");
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 13L5 18H19L21 13H3Z" fill={color} opacity={active ? 1 : (isLight ? 1 : 0.85)}/>
      <path d="M7 13V9H17V13" fill={color} opacity={active ? 0.7 : (isLight ? 0.8 : 0.6)}/>
      <rect x="10" y="5" width="4" height="4" fill={windowColor} opacity={0.9}/>
    </svg>
  );
};

const NavProfile = ({ active, isLight }: { active: boolean, isLight: boolean }) => {
  const color = active ? "#eb5b27" : (isLight ? "#061246" : "#ffffff");
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="7" r="4" fill={color} opacity={active ? 1 : (isLight ? 1 : 0.85)}/>
      <path d="M4 21V18A5 5 0 0 1 9 13H15A5 5 0 0 1 20 18V21" fill={color} opacity={active ? 1 : (isLight ? 1 : 0.85)}/>
    </svg>
  );
};

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, isPopupOpen } = useAuth();

  const isLight = false; // Force dark mode navigation across all screens

  const tabs = [
    { name: "Home",    href: "/",            NavIcon: NavHome,    protected: false },
    { name: "Invoice", href: "/invoices",    NavIcon: NavInvoice, protected: true  },
    { name: "Pickup",  href: "/schedule/new",NavIcon: NavPickup,  protected: true  },
    { name: "Ship To", href: "/shiptos",     NavIcon: NavShipTo,  protected: true  },
    { name: "Profile", href: "/profile",     NavIcon: NavProfile, protected: true  },
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, tab: typeof tabs[0]) => {
    if (tab.protected && !isLoggedIn) {
      e.preventDefault();
      router.push("/login");
    }
  };

  return (
    <div
      className="shrink-0 px-2 pb-[env(safe-area-inset-bottom,12px)] pt-2 z-50 transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, #061246 0%, #1a40b4 100%)",
        borderTop: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 -4px 20px rgba(6,18,70,0.5)",
      }}
    >
      <div className="flex justify-between items-center h-14">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/" && pathname.startsWith(tab.href));
          const NavIcon = tab.NavIcon;
          return (
            <a
              key={tab.name}
              href={tab.href}
              onClick={(e) => handleNavigation(e, tab)}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 cursor-pointer transition-all active:scale-90"
              style={{ opacity: isActive ? 1 : (isLight ? 1 : 0.5) }}
            >
              <NavIcon active={isActive} isLight={isLight} />
              <span
                className="text-[7.5px] font-bold tracking-widest uppercase"
                style={{ color: isActive ? "#eb5b27" : (isLight ? "#061246" : "white") }}
              >
                {tab.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
