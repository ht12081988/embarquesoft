"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth";

// ─── Inline SVG Line Icons ────────────────────────────────────────────────────
const IconMenu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconWhatsapp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconTag = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const IconShoppingBag = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const ICON_BLUE = "#3b7cf4";

const IconContact = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 4C11.58 4 8 7.58 8 12v3c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-3c0-2.76 2.24-5 5-5s5 2.24 5 5v3c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-3c0-4.42-3.58-8-8-8z" fill="#eb5b27"/>
    <circle cx="16" cy="13" r="3.5" fill="#061246"/>
    <path d="M9 24c0-3.5 3.1-6 7-6s7 2.5 7 6" fill="#061246"/>
    <path d="M22 15v2c0 1.1-.9 2-2 2h-2" stroke="#eb5b27" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconLocation = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M6 18l6-4 8 4 6-4" stroke="#061246" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14v10M20 18v6" stroke="#061246" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 4c-3.3 0-6 2.7-6 6 0 4.5 6 11 6 11s6-6.5 6-11c0-3.3-2.7-6-6-6z" fill="#eb5b27"/>
    <circle cx="18" cy="10" r="2.2" fill="white"/>
  </svg>
);
const IconInvoice = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="7" y="4" width="18" height="24" rx="3" stroke="#061246" strokeWidth="2.5" fill="white"/>
    <line x1="11" y1="10" x2="21" y2="10" stroke="#061246" strokeWidth="2" strokeLinecap="round"/>
    <line x1="11" y1="14" x2="21" y2="14" stroke="#061246" strokeWidth="2" strokeLinecap="round"/>
    <line x1="11" y1="18" x2="16" y2="18" stroke="#061246" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="19" cy="20" r="4" fill="#eb5b27"/>
    <path d="M19 18v4M17.8 19.2h2.4M17.8 20.8h2.4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IconPickup = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M3 12h14v11H3z" fill="#061246"/>
    <path d="M17 15h6l3 4v4h-9v-8z" fill="#061246"/>
    <circle cx="8" cy="23" r="3" fill="#061246" stroke="white" strokeWidth="1.5"/>
    <circle cx="21" cy="23" r="3" fill="#061246" stroke="white" strokeWidth="1.5"/>
    <circle cx="9" cy="10" r="4.5" fill="#eb5b27"/>
    <polyline points="9 7.5 9 10 11 10" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IconQuote = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M6 10l10-5 10 5v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10z" fill="#061246"/>
    <path d="M6 10l10 5 10-5" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"/>
    <line x1="16" y1="15" x2="16" y2="24" stroke="#ffffff" strokeWidth="1.5"/>
    <path d="M12 6.5l8 4" stroke="#eb5b27" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);
const IconShipTo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="8" width="24" height="16" rx="2" fill="#eb5b27"/>
    <line x1="9" y1="8" x2="9" y2="24" stroke="#061246" strokeWidth="2.5"/>
    <line x1="14" y1="8" x2="14" y2="24" stroke="#061246" strokeWidth="2.5"/>
    <line x1="19" y1="8" x2="19" y2="24" stroke="#061246" strokeWidth="2.5"/>
    <line x1="24" y1="8" x2="24" y2="24" stroke="#061246" strokeWidth="2.5"/>
  </svg>
);
const IconClaim = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="7" y="4" width="18" height="24" rx="3" fill="#061246"/>
    <polyline points="18 4 18 10 25 10" fill="#1a40b4"/>
    <circle cx="16" cy="18" r="4.5" fill="#eb5b27"/>
    <polyline points="14 18 15.5 19.5 18 16.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPrice = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="11" fill="#061246"/>
    <line x1="16" y1="8" x2="16" y2="24" stroke="#eb5b27" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M19.5 11H14a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-5.5" stroke="#eb5b27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l1.62-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);


// ─── Deals Data ───────────────────────────────────────────────────────────────
const deals = [
  { id: 1, pct: "20%", text: "off your next pickup", expiry: "12/31/2026 11:59 PM" },
  { id: 2, pct: "15%", text: "off your next shipment", expiry: "06/30/2026 11:59 PM" },
  { id: 3, pct: "10%", text: "off your next quote", expiry: "09/30/2026 11:59 PM" },
];

// ─── Menu Items ───────────────────────────────────────────────────────────────
const row1Items = [
  { id: "contact", label: "Contact Us",     Icon: IconContact,  action: "contact",    isProtected: false },
  { id: "location", label: "Location",      Icon: IconLocation, href: "/locations",   isProtected: false },
  { id: "invoices", label: "My Invoices",   Icon: IconInvoice,  href: "/invoices",    isProtected: true  },
];

const row2Items = [
  { id: "pickup",   label: "Schedule\nPickup", Icon: IconPickup, href: "/schedule",  isProtected: true  },
  { id: "quote",    label: "Quote",         Icon: IconQuote,    href: "/quote",       isProtected: false },
  { id: "shipto",   label: "My ShipTo",     Icon: IconShipTo,   href: "/shiptos",     isProtected: true  },
];

const row3Items = [
  { id: "claim",    label: "File\nClaim",   Icon: IconClaim,    href: "/claim",       isProtected: true  },
  { id: "price",    label: "Price",         Icon: IconPrice,    href: "/price",       isProtected: false },
];

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, setIsPopupOpen } = useAuth();
  const [language, setLanguage] = useState("ES");
  const [showContactModal, setShowContactModalState] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [activeDeal, setActiveDeal] = useState(0);
  const [contactForm, setContactForm] = useState({
    firstName: "", lastName: "", mobile: "", email: "", comments: ""
  });

  const setShowContactModal = (val: boolean) => {
    setShowContactModalState(val);
    setIsPopupOpen(val);
  };

  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");


  return (
    <div className="flex flex-col flex-1 h-full min-h-0 overflow-hidden font-sans" style={{ background: "linear-gradient(180deg, #061246 0%, #1438a0 100%)" }}>

      {/* ── Header ───────────────────────────────────────── */}
      <div className="shrink-0 px-5 pt-9 pb-3 flex flex-col gap-2 z-10" style={{ background: "linear-gradient(135deg, #061246 0%, #1a40b4 100%)" }}>
        <div className="flex items-center justify-between">
          {/* Left: Hamburger + Brand */}
          <div className="flex items-center gap-2.5">
            <button onClick={() => router.push(isLoggedIn ? "/profile" : "/login")} className="text-white active:scale-90 transition-transform">
              <IconMenu />
            </button>
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
            <a href="https://wa.me/12124448574?text=Hello" target="_blank" rel="noopener noreferrer"
               className="text-white active:scale-90 transition-transform">
              <IconWhatsapp />
            </a>
            <button onClick={toggleLanguage}
                    className="relative text-white active:scale-90 transition-transform flex items-center">
              <IconGlobe />
              <span className="absolute -top-1 -right-2 text-[8px] font-black bg-white text-[#061246] rounded-full px-[3px] leading-[12px]">
                {language}
              </span>
            </button>
          </div>
        </div>

        {/* User Greeting Info (when logged in) */}
        {isLoggedIn && (
          <div className="flex flex-col pt-0.5">
            <h2 className="text-[14px] font-normal text-white leading-tight">Ricardo Guerrero</h2>
          </div>
        )}
      </div>

      {/* ── Scrollable Portion between Header and Bottom Nav ── */}
      <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar flex flex-col">

        {/* ── Deals Carousel ─────────────────────────────────── */}
        <div className="shrink-0 relative" style={{ background: "transparent" }}>
        <div
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
          onScroll={(e) => {
            const el = e.currentTarget;
            const idx = Math.round(el.scrollLeft / el.offsetWidth);
            setActiveDeal(idx);
          }}
        >
          {deals.map((deal, i) => (
            <div key={deal.id} className="snap-center shrink-0 w-full relative overflow-hidden">
              {/* Dark Charcoal matte deal card */}
              <div className="flex items-center justify-between px-5 pt-7 pb-12 relative overflow-hidden"
                   style={{ background: "linear-gradient(135deg, #141416 0%, #1c1c20 50%, #141416 100%)" }}>
                
                {/* Background decorative orange rings */}
                <svg className="absolute -top-6 -right-6 opacity-30 pointer-events-none" width="120" height="120" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="30" stroke="#eb5b27" strokeWidth="1.5"/>
                  <circle cx="65" cy="50" r="22" stroke="#eb5b27" strokeWidth="1.2"/>
                </svg>
                <svg className="absolute -bottom-8 right-16 opacity-30 pointer-events-none" width="120" height="120" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="35" stroke="#eb5b27" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="20" stroke="#eb5b27" strokeWidth="1"/>
                </svg>

                {/* Left: discount icon + text */}
                <div className="flex items-center gap-3.5 z-10">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg"
                       style={{ background: "linear-gradient(135deg, #eb5b27 0%, #d04e1f 100%)", boxShadow: "0 4px 14px rgba(235,91,39,0.4)" }}>
                    <IconTag />
                  </div>
                  <div>
                    <p className="text-white font-black text-[21px] leading-tight">
                      Get <span style={{ color: "#eb5b27" }}>{deal.pct}</span> off
                    </p>
                    <p className="text-white/85 font-semibold text-[12.5px]">{deal.text}</p>
                    <p className="text-white/50 text-[10.5px] font-medium mt-1 flex items-center gap-1">
                      <IconClock /> Expires: {deal.expiry}
                    </p>
                  </div>
                </div>

                {/* Right: decorative bags visual */}
                <div className="shrink-0 flex items-center relative z-10 pl-2">
                  <div className="relative flex items-end">
                    {/* Dark Shopping Bag */}
                    <div className="w-8 h-10 bg-[#28282c] rounded-t-md border border-white/10 relative shadow-md">
                      <div className="absolute -top-2 left-1.5 right-1.5 h-2.5 border-2 border-[#28282c] rounded-t-full" />
                    </div>
                    {/* Orange Shopping Bag */}
                    <div className="w-9 h-12 bg-[#eb5b27] rounded-t-md -ml-3 mb-0 relative shadow-lg z-10 flex items-center justify-center">
                      <div className="absolute -top-2.5 left-2 right-2 h-3 border-2 border-[#eb5b27] rounded-t-full" />
                    </div>
                  </div>
                  {/* Arrow Indicator Circle */}
                  <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-[10px] font-bold ml-1.5 shadow">
                    ›
                  </div>
                </div>

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                  {deals.map((_, di) => (
                    <div key={di} className="rounded-full transition-all duration-300"
                         style={{
                           width: di === activeDeal ? 18 : 6,
                           height: 6,
                           background: di === activeDeal ? "#eb5b27" : "rgba(255,255,255,0.35)"
                         }}/>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gap between deals and content ── */}
      <div style={{ height: "8px", background: "transparent", flexShrink: 0 }} />

      {/* ── Main White Area ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-white">

        {/* Welcome card for guests */}
        {!isLoggedIn && (
          <div className="mx-4 mt-4 mb-1 rounded-2xl p-4 flex flex-col gap-2.5"
               style={{ background: "linear-gradient(135deg, #061246 0%, #1438a0 100%)", boxShadow: "0 4px 24px rgba(6,18,70,0.45)" }}>
            <div>
              <h3 className="text-white font-black text-[17px] tracking-wide uppercase leading-tight">WELCOME</h3>
              <span className="font-bold text-[11px]" style={{ color: "#eb5b27" }}>to Salcedo</span>
            </div>
            <p className="text-white/75 text-[10.5px] font-medium leading-relaxed">
              Create an account or log in to manage your shipments, schedule pickups, view invoices, and file claims.
            </p>
            <div className="flex gap-2.5 mt-0.5">
              <Link href="/login?register=true"
                    className="flex-1 text-center text-white font-bold text-[12px] py-2 rounded-full active:scale-95 transition-transform"
                    style={{ background: "#eb5b27" }}>
                Create Account
              </Link>
              <Link href="/login"
                    className="flex-1 text-center font-bold text-[12px] py-2 rounded-full active:scale-95 transition-transform"
                    style={{ background: "white", color: "#061246" }}>
                Log In
              </Link>
            </div>
          </div>
        )}

        {/* Card renderer helper */}
        {(() => {
          const renderCardItem = (item: typeof row1Items[0]) => {
            const isProtected = item.isProtected;
            const isBlurred = isProtected && !isLoggedIn;
            const Icon = item.Icon;

            const cardClass = `
              flex flex-col items-center justify-center gap-1.5 rounded-2xl aspect-[1.05/1] w-full py-2.5 px-1
              transition-all duration-200 cursor-pointer select-none
              ${isBlurred
                ? "opacity-60 scale-[0.98] saturate-50"
                : "active:scale-95 hover:shadow-xl hover:-translate-y-0.5"}
            `;

            const cardStyle = {
              background: "#ffffff",
              boxShadow: "0 8px 24px rgba(6,18,70,0.12), 0 2px 6px rgba(0,0,0,0.04)",
              border: "1px solid rgba(6,18,70,0.06)",
            };

            const label = item.label.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br/>}</span>
            ));

            const content = (
              <>
                <div className="flex items-center justify-center pointer-events-none mb-0.5">
                  <Icon />
                </div>
                <span className="text-[9.5px] font-bold text-center leading-tight pointer-events-none"
                      style={{ color: "#061246" }}>
                  {label}
                </span>
              </>
            );

            if (item.action === "contact") {
              return (
                <button key={item.id} onClick={() => setShowContactModal(true)}
                        className={cardClass} style={cardStyle}>
                  {content}
                </button>
              );
            }
            return (
              <a key={item.id} href={item.href}
                 onClick={(e) => {
                   if (isProtected && !isLoggedIn) {
                     e.preventDefault();
                     router.push("/login");
                   }
                 }}
                 className={cardClass} style={cardStyle}>
                {content}
              </a>
            );
          };

          return (
            <>
              {/* Row 1 Grid */}
              <div className={`grid grid-cols-3 gap-3 px-6 pt-3 pb-1.5 ${isLoggedIn ? "mt-2" : "mt-2"}`}>
                {row1Items.map(renderCardItem)}
              </div>

              {/* Row 2 Grid */}
              <div className="grid grid-cols-3 gap-3 px-6 py-1.5">
                {row2Items.map(renderCardItem)}
              </div>

              {/* Row 3 Grid */}
              <div className="grid grid-cols-3 gap-3 px-6 pt-1.5 pb-3">
                {row3Items.map(renderCardItem)}
              </div>
            </>
          );
        })()}

        </div>
      </div>

      {/* ── Sticky Phone Pills Bar (Fixed right above BottomNav) ── */}
      <div className="shrink-0 flex justify-center items-center gap-2 py-2 px-4 bg-white border-t border-gray-100/80 z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <a href="tel:2124448574"
           className="flex items-center gap-1.5 text-white text-[10px] font-bold px-3.5 py-2 rounded-full active:scale-95 transition-transform whitespace-nowrap"
           style={{ background: "linear-gradient(135deg, #061246 0%, #1a40b4 100%)", boxShadow: "0 2px 10px rgba(6,18,70,0.45)" }}>
          <IconPhone /> US: 212-444-8574
        </a>
        <a href="tel:2124448574"
           className="flex items-center gap-1.5 text-white text-[10px] font-bold px-3.5 py-2 rounded-full active:scale-95 transition-transform whitespace-nowrap"
           style={{ background: "linear-gradient(135deg, #061246 0%, #1a40b4 100%)", boxShadow: "0 2px 10px rgba(6,18,70,0.45)" }}>
          <IconPhone /> RD: 212-444-8574
        </a>
      </div>

      {/* ── Contact Modal ────────────────────────────────────── */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 backdrop-blur-sm"
             style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar"
               style={{ animation: "slideUp 0.3s ease" }}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-black text-[18px]" style={{ color: "#0A1533" }}>Contact Us</h3>
              <button onClick={() => { setShowContactModal(false); setContactSuccess(false); }}
                      className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-lg font-bold">
                ✕
              </button>
            </div>

            {contactSuccess ? (
              <div className="flex flex-col items-center text-center py-8 gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                     style={{ background: "rgba(26,86,219,0.1)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h4 className="font-black text-gray-800 text-lg">Thank You!</h4>
                <p className="text-gray-500 text-sm font-medium">Our team will get back to you shortly.</p>
                <button onClick={() => { setShowContactModal(false); setContactSuccess(false); }}
                        className="w-full mt-2 text-white font-bold py-3 rounded-xl active:scale-95 transition-transform"
                        style={{ background: "#eb5b27" }}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setContactSuccess(true); }} className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-gray-500 font-bold text-xs uppercase tracking-wide">First Name</label>
                    <input type="text" required value={contactForm.firstName}
                           onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                           placeholder="John"
                           className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm font-medium outline-none transition-all"
                           style={{ focusBorderColor: "#1a56db" } as React.CSSProperties}
                           onFocus={e => e.target.style.borderColor = "#1a56db"}
                           onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-gray-500 font-bold text-xs uppercase tracking-wide">Last Name</label>
                    <input type="text" required value={contactForm.lastName}
                           onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                           placeholder="Doe"
                           className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm font-medium outline-none transition-all"
                           onFocus={e => e.target.style.borderColor = "#1a56db"}
                           onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 font-bold text-xs uppercase tracking-wide">Mobile Number</label>
                  <input type="tel" required value={contactForm.mobile}
                         onChange={(e) => setContactForm({ ...contactForm, mobile: e.target.value })}
                         placeholder="212-444-8574"
                         className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm font-medium outline-none transition-all"
                         onFocus={e => e.target.style.borderColor = "#1a56db"}
                         onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 font-bold text-xs uppercase tracking-wide">Email Address</label>
                  <input type="email" required value={contactForm.email}
                         onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                         placeholder="john.doe@example.com"
                         className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm font-medium outline-none transition-all"
                         onFocus={e => e.target.style.borderColor = "#1a56db"}
                         onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 font-bold text-xs uppercase tracking-wide">Comments</label>
                  <textarea required rows={3} value={contactForm.comments}
                            onChange={(e) => setContactForm({ ...contactForm, comments: e.target.value })}
                            placeholder="Enter your query details..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm font-medium outline-none transition-all resize-none"
                            onFocus={e => e.target.style.borderColor = "#1a56db"}
                            onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                </div>
                <button type="submit"
                        className="w-full text-white font-bold py-3.5 rounded-xl mt-1 active:scale-95 transition-transform shadow-lg"
                        style={{ background: "linear-gradient(135deg, #061246 0%, #1a40b4 100%)" }}>
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
