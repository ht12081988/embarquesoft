"use client";

import React, { useState } from "react";
import { ArrowLeft, ChevronRight, Menu, Bell, User, Lock, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth";

export default function Profile() {
  const router = useRouter();
  const { logout } = useAuth();
  const [activeView, setActiveView] = useState<"menu" | "profile" | "password">("menu");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    router.push("/login"); // Assuming there's a login page
  };


  return (
    <div className="flex flex-col flex-1 relative min-h-full font-sans bg-[#061246]">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/App_Background.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-1 h-full">
        {/* Header Section */}
        <div className="pt-12 pb-2 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={() => activeView === "menu" ? router.back() : setActiveView("menu")} 
              className="w-10 flex justify-start p-2 -ml-2 active:scale-95 transition-transform cursor-pointer"
            >
              <ArrowLeft size={24} />
            </button>
            
            <h1 className="text-base font-semibold flex-1 text-center tracking-wide">
              {activeView === "menu" && "My Profile"}
              {activeView === "profile" && "User Profile"}
              {activeView === "password" && "Change Password"}
            </h1>
            
            <div className="w-10"></div>
          </div>
        </div>

        {/* The profile summary has been moved into the white container to overlap the top */}
        {activeView === "menu" && (
          <div className="flex justify-center -mb-[55px] z-20">
            <div className="w-[110px] h-[110px] rounded-full border-4 border-white bg-[#061246] shadow-lg flex items-center justify-center">
              <User size={55} className="text-white" strokeWidth={1.5} />
            </div>
          </div>
        )}

        {/* Main White Transparent Section */}
        <div className="flex-1 bg-white/[0.88] backdrop-blur-xl border-t border-white/40 rounded-t-[32px] p-6 flex flex-col gap-6 relative z-10 overflow-y-auto no-scrollbar pb-32 shadow-[0_-8px_32px_rgba(0,0,0,0.15)] mt-2">
          
          {/* Main Menu View */}
          {activeView === "menu" && (
            <div className="flex flex-col items-center w-full pt-12">


              {/* Name and Email */}
              <h2 className="text-[#eb5b27] font-bold text-[22px] mb-0.5 leading-tight tracking-wide">Strickland</h2>
              <p className="text-[#2C3258] text-[13px] font-medium mb-8">gragory.stricland@yahoo.com</p>

              {/* Buttons Stack */}
              <div className="flex flex-col gap-4.5 w-full px-2">
                <button 
                  onClick={() => setActiveView("profile")}
                  className="flex items-center justify-center gap-3 w-full bg-[#f4f5f8] hover:bg-[#ebedf2] rounded-[18px] py-[15px] active:scale-[0.98] transition-all duration-200 border border-black/[0.02]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#eb5b27"/>
                    <path d="M12 14.5C7.5 14.5 4 17.8 4 22H20C20 17.8 16.5 14.5 12 14.5Z" fill="#eb5b27"/>
                  </svg>
                  <span className="text-[#2C3258] font-bold text-[15px] tracking-wide">User Profile</span>
                </button>
                
                <button 
                  onClick={() => setActiveView("password")}
                  className="flex items-center justify-center gap-3 w-full bg-[#f4f5f8] hover:bg-[#ebedf2] rounded-[18px] py-[15px] active:scale-[0.98] transition-all duration-200 border border-black/[0.02]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 5V11C4 16.5 7.5 21.3 12 22.5C16.5 21.3 20 16.5 20 11V5L12 2Z" fill="#eb5b27"/>
                    <path d="M12 8.5C10.9 8.5 10 9.4 10 10.5V12H9v4h6v-4h-1v-1.5C14 9.4 13.1 8.5 12 8.5zm0 1.5C12.4 10 12.8 10.4 12.8 10.9V12h-1.6v-1.1C11.2 10.4 11.6 10 12 10z" fill="white"/>
                  </svg>
                  <span className="text-[#2C3258] font-bold text-[15px] tracking-wide">Change Password</span>
                </button>
  
                <button 
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center justify-center w-full bg-[#eb5b27] hover:bg-[#d94d1f] rounded-[18px] py-[15px] mt-1.5 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_14px_rgba(235,91,39,0.25)]"
                >
                  <span className="text-white font-bold text-[15px] tracking-wide">Logout</span>
                </button>
              </div>
            </div>
          )}

        {/* User Profile Form View */}
        {activeView === "profile" && (
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Customer Name <span className="text-red-500">*</span></label>
              <input type="text" defaultValue="Strickland" className="w-full bg-[#f4f5f7]/90 border border-white shadow-sm rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Email Id <span className="text-red-500">*</span></label>
              <input type="email" defaultValue="gragory.stricland@yahoo.com" className="w-full bg-[#f4f5f7]/90 border border-white shadow-sm rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Address 1 <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter Address 1" className="w-full bg-[#f4f5f7]/90 border border-white shadow-sm rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-black font-normal text-[13px]">City <span className="text-red-500">*</span></label>
                <input type="text" placeholder="City" className="w-full bg-[#f4f5f7]/90 border border-white shadow-sm rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-black font-normal text-[13px]">State <span className="text-red-500">*</span></label>
                <input type="text" placeholder="State" className="w-full bg-[#f4f5f7]/90 border border-white shadow-sm rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Zip <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Zip Code" className="w-full bg-[#f4f5f7]/90 border border-white shadow-sm rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Cell Number <span className="text-red-500">*</span></label>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-gray-100 cursor-not-allowed">
                <div className="bg-gray-100 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                  <span className="text-gray-500 font-bold">+91</span>
                </div>
                <input type="tel" readOnly defaultValue="9755534799" className="flex-1 px-4 py-2.5 text-gray-500 font-medium outline-none placeholder-gray-400 bg-transparent cursor-not-allowed" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Telephone Number <span className="text-red-500">*</span></label>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white">
                <div className="bg-gray-50 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                  <span className="text-[#2C3258] font-bold">+91</span>
                </div>
                <input type="tel" defaultValue="9755534799" className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Country <span className="text-red-500">*</span></label>
              <select className="w-full bg-[#f4f5f7]/90 border border-white shadow-sm rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                <option value="USA">USA</option>
                <option value="Dominican Republic">Dominican Republic</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">License Id</label>
              <input type="text" defaultValue="132141414" className="w-full bg-[#f4f5f7]/90 border border-white shadow-sm rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">License Id Upload</label>
              <div className="w-full h-24 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 relative cursor-pointer active:bg-gray-200 transition-colors">
                <button className="bg-[linear-gradient(135deg,#061246_0%,#1a40b4_100%)] text-white font-bold text-[14px] px-6 py-2 rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                  Upload
                </button>
              </div>
            </div>

            <button className="w-full bg-[#eb5b27] text-white font-semibold text-[13px] py-3.5 rounded-full mt-4 shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f] mb-4">
              Update Profile
            </button>

          </div>
        )}

        {/* Change Password View */}
        {activeView === "password" && (
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Old Password <span className="text-red-500">*</span></label>
              <input type="password" placeholder="Enter old password" className="w-full bg-[#f4f5f7]/90 border border-white shadow-sm rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">New Password <span className="text-red-500">*</span></label>
              <input type="password" placeholder="Enter new password" className="w-full bg-[#f4f5f7]/90 border border-white shadow-sm rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Confirm Password <span className="text-red-500">*</span></label>
              <input type="password" placeholder="Confirm new password" className="w-full bg-[#f4f5f7]/90 border border-white shadow-sm rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <button className="w-full bg-[#eb5b27] text-white font-semibold text-[13px] py-3.5 rounded-full mt-4 shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f] mb-4">
              Change Password
            </button>

          </div>
        )}

        </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow-xl transform transition-all">
            <div className="w-16 h-16 flex items-center justify-center mb-4 shrink-0 rounded-full bg-red-50">
              <LogOut size={32} className="text-red-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#2C3258] text-lg font-bold mb-2">Logout</h3>
            <p className="text-gray-500 font-medium mb-8">Are you sure you want to log out of your account?</p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-full active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3.5 bg-red-500 text-white font-bold rounded-full shadow-md active:scale-95 transition-all"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}


