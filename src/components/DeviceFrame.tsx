"use client";

import React from "react";
import BottomNav from "./BottomNav";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function DeviceFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Exclude admin routes from the device frame completely
  if (pathname.startsWith('/tenentadmin')) {
    return <>{children}</>;
  }

  const hideBottomNav = pathname === "/login";

  return (
    <div className="bg-background w-full h-[100dvh] relative flex flex-col overflow-hidden md:h-[min(844px,95vh)] md:w-auto md:aspect-[390/844] md:rounded-[32px] md:shadow-2xl md:border-[8px] md:border-black">
      {/* Top Safe Area (StatusBar / Dynamic Island simulation on desktop) */}
      <div className="hidden md:flex h-12 w-full justify-center pt-2 pb-2 shrink-0 bg-transparent z-50 absolute top-0 left-0 right-0 pointer-events-none">
        <div className="w-[120px] h-[30px] bg-black rounded-full"></div>
      </div>
      
      {/* Content Area with Animation */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative w-full flex flex-col bg-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col flex-1 min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
