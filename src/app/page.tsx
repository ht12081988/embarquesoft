"use client";

import React, { useState, useRef } from "react";
import { MapPinArea, Receipt, CalendarCheck, ShieldWarning, Package, Globe, Hexagon, CaretLeft, CaretRight, Bell, PhoneCall, WhatsappLogo, Info, Tag } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, setIsPopupOpen } = useAuth();
  const [language, setLanguage] = useState("Spanish");
  const [showContactModal, setShowContactModalState] = useState(false);
  const setShowContactModal = (val: boolean) => {
    setShowContactModalState(val);
    setIsPopupOpen(val);
  };
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // Contact Form States
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    comments: ""
  });

  const carouselRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "Spanish" ? "English" : "Spanish"));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.85; // approx one card width
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const row1Items = [
    { id: 'Contact', label: 'Contact Us', imageSrc: '/images/hdr_contact.png', isProtected: false, action: () => setShowContactModal(true) },
    { id: 'C', label: 'Locations', imageSrc: '/images/locations.png', href: '/locations', isProtected: false },
    { id: 'A', label: 'My Invoices', imageSrc: '/images/invoices.png', href: '/invoices', isProtected: true },
  ];

  const row2Items = [
    { id: 'B', label: 'Schedule Pickup', imageSrc: '/images/pickup.png', href: '/schedule', isProtected: true },
    { id: 'G', label: 'Quote', imageSrc: '/images/quote.png', href: '/quote', isProtected: false },
    { id: 'F', label: 'My ShipTo', imageSrc: '/images/shipto.png', href: '/shiptos', isProtected: true },
    { id: 'D', label: 'File A Claim', imageSrc: '/images/claim.png', href: '/claim', isProtected: true },
  ];

  const row2Ref = useRef<HTMLDivElement>(null);
  const gridItemRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [itemWidth, setItemWidth] = useState<number | null>(null);

  React.useEffect(() => {
    if (!gridItemRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        // Use bounding client rect to get the full width including padding and borders
        const width = (entries[0].target as HTMLElement).offsetWidth;
        setItemWidth(width);
      }
    });
    observer.observe(gridItemRef.current);
    return () => observer.disconnect();
  }, []);

  const startDragging = (e: React.MouseEvent) => {
    if (!row2Ref.current) return;
    setIsDragging(true);
    setDragMoved(false);
    setStartX(e.pageX - row2Ref.current.offsetLeft);
    setScrollLeftState(row2Ref.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e: React.MouseEvent) => {
    if (!isDragging || !row2Ref.current) return;
    e.preventDefault();
    const x = e.pageX - row2Ref.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Slightly faster scroll
    if (Math.abs(walk) > 10) {
      setDragMoved(true);
    }
    row2Ref.current.scrollLeft = scrollLeftState - walk;
  };

  const renderItem = (item: any, idx?: number) => {
    const isProtected = item.isProtected;
    const isBlurred = isProtected && !isLoggedIn;

    const content = (
      <>
        <div className="w-16 h-16 flex items-center justify-center shrink-0">
          <img src={item.imageSrc} alt={item.label} className="w-full h-full object-contain pointer-events-none" />
        </div>
        <span className="text-[11px] font-bold text-[#2C3258] leading-tight pointer-events-none">{item.label}</span>
      </>
    );

    const className = `bg-white rounded-2xl p-3.5 shadow-md border border-gray-100 flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer min-h-[105px] w-full ${
      isBlurred 
        ? 'opacity-65 blur-[0.5px] saturate-75 scale-[0.98]' 
        : 'active:scale-95 shadow-md hover:shadow-lg'
    }`;

    if (item.action) {
      return (
        <button 
          ref={idx === 0 ? (gridItemRef as any) : null}
          key={item.id} 
          onClick={(e) => {
            if (dragMoved) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            if (isProtected && !isLoggedIn) {
              router.push("/login");
            } else {
              item.action();
            }
          }}
          className={className}
        >
          {content}
        </button>
      );
    }

    return (
      <a 
        ref={idx === 0 ? (gridItemRef as any) : null}
        key={item.id} 
        href={item.href}
        onClick={(e) => {
          if (dragMoved) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          if (isProtected && !isLoggedIn) {
            e.preventDefault();
            router.push("/login");
          }
        }}
        className={className}
      >
        {content}
      </a>
    );
  };

  return (
    <div className="flex flex-col flex-1 bg-white min-h-full relative">
      {/* Header Section */}
      <div className="bg-primary pt-16 md:pt-10 pb-6 px-6 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-bold text-lg tracking-tight bg-white px-4 py-1 rounded-full text-primary shadow-sm">
              <Hexagon size={18} className="text-primary fill-primary/20" />
              Salcedo
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            
            {/* WhatsApp Icon */}
            <a 
              href="https://wa.me/12124448574?text=Hello%20Salcedo%20Support%2C%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="active:scale-95 transition-transform hover:opacity-90"
              title="WhatsApp Chat"
            >
              <img src="/images/hdr_whatsapp.png" alt="WhatsApp" className="w-8 h-8 object-contain" />
            </a>

            {/* Bell Icon - Restricted to Logged In users */}
            {isLoggedIn && (
              <Link href="/notifications" className="relative active:scale-95 transition-transform hover:opacity-90">
                <img src="/images/hdr_bell.png" alt="Notifications" className="w-8 h-8 object-contain" />
                <span className="absolute -top-1 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-primary"></span>
              </Link>
            )}

            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full text-sm font-bold active:scale-95"
            >
              <span>{language}</span>
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-xs font-medium text-white bg-[#2C3258] p-3 rounded-xl shadow-sm mt-2">
          <p className="flex items-center gap-1.5">
            <span className="text-white/80">US:</span>
            <a href="tel:212-444-8574" className="font-bold tracking-wider text-white active:opacity-70">212-444-8574</a>
          </p>
          <div className="w-[1px] h-4 bg-white/30"></div>
          <p className="flex items-center gap-1.5">
            <span className="text-white/80">RD:</span>
            <a href="tel:809-222-2123" className="font-bold tracking-wider text-white active:opacity-70">809-222-2123</a>
          </p>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-6 relative z-0 overflow-y-auto no-scrollbar pb-24">
        
        {/* Create Account Banner for Non-Logged-In Users */}
        {!isLoggedIn && (
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-2 text-primary">
              <Info size={20} />
              <h3 className="font-bold text-sm tracking-wide">Welcome to Salcedo!</h3>
            </div>
            <p className="text-gray-500 text-xs font-medium leading-relaxed">
              Create an account or log in to manage your shipments, schedule pickups, view invoices, and file claims.
            </p>
            <div className="flex gap-3 mt-1">
              <Link 
                href="/login?register=true" 
                className="flex-1 text-center bg-primary text-white font-bold text-xs py-2.5 rounded-xl shadow-md active:scale-95 transition-transform"
              >
                Create Account
              </Link>
              <Link 
                href="/login" 
                className="flex-1 text-center bg-white border border-gray-200 text-[#2C3258] font-bold text-xs py-2.5 rounded-xl active:scale-95 transition-transform"
              >
                Log In
              </Link>
            </div>
          </div>
        )}

        {/* Menu Row 1 (3 Columns) */}
        <div className="grid grid-cols-3 gap-3">
          {row1Items.map((item, idx) => renderItem(item, idx))}
        </div>

        {/* Menu Row 2 (Scrollable) */}
        <div 
          ref={row2Ref}
          onMouseDown={startDragging}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={onDrag}
          className={`flex overflow-x-auto items-stretch gap-3 no-scrollbar py-2 -mx-5 px-5 min-h-[115px] ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab scroll-smooth'}`}
        >
          {row2Items.map((item) => (
            <div 
              key={item.id} 
              className="shrink-0 flex transition-transform duration-300 ease-out"
              style={{ width: itemWidth ? `${itemWidth}px` : '104px' }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>

        {/* Deals Section */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="text-orange-600 font-bold">
              <span className="tracking-wide uppercase text-sm">Deals</span>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 active:scale-95 transition-transform border border-orange-200 shadow-sm">
                <CaretLeft size={18} />
              </button>
              <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 active:scale-95 transition-transform border border-orange-200 shadow-sm">
                <CaretRight size={18} />
              </button>
            </div>
          </div>
          
          {/* Swipable Carousel */}
          <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4 -mx-5 px-5">
            {[1, 2, 3, 4, 5].map((deal) => (
              <a 
                key={deal} 
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    router.push("/login");
                  } else {
                    router.push("/deals");
                  }
                }}
                className="snap-center shrink-0 w-[85%] bg-white rounded-2xl border border-gray-200 shadow-md flex flex-col active:scale-[0.98] transition-transform cursor-pointer overflow-hidden"
              >
                {/* Text Section at the Top */}
                <div className="p-4 flex flex-col gap-1">
                  <h3 className="text-[#2C3258] font-bold text-lg leading-tight">
                    Get 20% off your next pickup
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    Expire: 12/31/2026 11:59 PM
                  </p>
                </div>
                
                {/* Image Section below */}
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center relative">
                  <img 
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600&h=200"
                    alt="Special Deal Placeholder"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Contact Us Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col shadow-xl transform transition-all max-h-[85vh] overflow-y-auto no-scrollbar animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#2C3258] text-lg font-bold">Contact Us</h3>
              <button 
                onClick={() => {
                  setShowContactModal(false);
                  setContactSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-1 font-bold text-lg"
              >
                ✕
              </button>
            </div>
            
            {contactSuccess ? (
              <div className="flex flex-col items-center text-center py-6 gap-3">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                  <Globe size={30} />
                </div>
                <h4 className="font-bold text-gray-800 text-lg">Thank You!</h4>
                <p className="text-gray-500 text-sm font-medium">Your inquiry has been submitted. Our team will get back to you shortly.</p>
                <button 
                  onClick={() => {
                    setShowContactModal(false);
                    setContactSuccess(false);
                  }}
                  className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-xl shadow-md active:scale-95 transition-transform"
                >
                  Close
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSuccess(true);
                }}
                className="flex flex-col gap-4"
              >
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-gray-600 font-bold text-xs">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                      placeholder="John" 
                      className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-gray-600 font-bold text-xs">Last Name</label>
                    <input 
                      type="text" 
                      required
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                      placeholder="Doe" 
                      className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-600 font-bold text-xs">Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    value={contactForm.mobile}
                    onChange={(e) => setContactForm({ ...contactForm, mobile: e.target.value })}
                    placeholder="212-444-8574" 
                    className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-600 font-bold text-xs">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="john.doe@example.com" 
                    className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-600 font-bold text-xs">Comments</label>
                  <textarea 
                    required
                    rows={3}
                    value={contactForm.comments}
                    onChange={(e) => setContactForm({ ...contactForm, comments: e.target.value })}
                    placeholder="Enter your query details..." 
                    className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-2 shadow-md active:scale-95 transition-transform"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
