"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth";

// ── Inline SVG line icons ──────────────────────────────────────────────────
const NavHome = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 10.5L12 3L21 10.5V20A1.5 1.5 0 0 1 19.5 21H15V14H9V21H4.5A1.5 1.5 0 0 1 3 20V10.5Z"
          fill={active ? "#eb5b27" : "#ffffff"} opacity={active ? 1 : 0.85} />
    <path d="M9 14H15V21H9V14Z" fill="#061246" opacity={0.5}/>
  </svg>
);
const NavInvoice = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" fill={active ? "#eb5b27" : "#ffffff"} opacity={active ? 1 : 0.85}/>
    <line x1="8" y1="8" x2="16" y2="8" stroke={active ? "white" : "#061246"} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="8" y1="12" x2="16" y2="12" stroke={active ? "white" : "#061246"} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="8" y1="16" x2="13" y2="16" stroke={active ? "white" : "#061246"} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const NavPickup = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M2 7H13V16H2V7Z" fill={active ? "#eb5b27" : "#ffffff"} opacity={active ? 1 : 0.85}/>
    <path d="M13 10H17.5L20 13V16H13V10Z" fill={active ? "#eb5b27" : "#ffffff"} opacity={active ? 1 : 0.85}/>
    <circle cx="6" cy="18" r="2" fill={active ? "white" : "#061246"} stroke={active ? "#eb5b27" : "white"} strokeWidth="1"/>
    <circle cx="17" cy="18" r="2" fill={active ? "white" : "#061246"} stroke={active ? "#eb5b27" : "white"} strokeWidth="1"/>
  </svg>
);
const NavShipTo = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 13L5 18H19L21 13H3Z" fill={active ? "#eb5b27" : "#ffffff"} opacity={active ? 1 : 0.85}/>
    <path d="M7 13V9H17V13" fill={active ? "#eb5b27" : "#ffffff"} opacity={active ? 0.7 : 0.6}/>
    <rect x="10" y="5" width="4" height="4" fill={active ? "#ffffff" : "#061246"} opacity={0.9}/>
  </svg>
);
const NavProfile = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="4" fill={active ? "#eb5b27" : "#ffffff"} opacity={active ? 1 : 0.85}/>
    <path d="M4 21V18A5 5 0 0 1 9 13H15A5 5 0 0 1 20 18V21" fill={active ? "#eb5b27" : "#ffffff"} opacity={active ? 1 : 0.85}/>
  </svg>
);

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, isPopupOpen } = useAuth();

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
      className={`shrink-0 px-2 pb-[env(safe-area-inset-bottom,12px)] pt-2 z-50 transition-all duration-300 ${
        isPopupOpen ? "blur-[3px] opacity-40 pointer-events-none saturate-50" : ""
      }`}
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
              style={{ opacity: isActive ? 1 : 0.5 }}
            >
              <NavIcon active={isActive} />
              <span
                className="text-[7.5px] font-bold tracking-widest uppercase"
                style={{ color: isActive ? "#eb5b27" : "white" }}
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
