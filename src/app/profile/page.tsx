"use client";

import React, { useState } from "react";
import { ArrowLeft, User, Lock, LogOut, ChevronRight, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<"menu" | "profile" | "password">("menu");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here
    setShowLogoutModal(false);
    router.push("/login"); // Assuming there's a login page
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50 min-h-full relative">
      
      {/* Header Section */}
      <div className="bg-primary pt-[env(safe-area-inset-top,44px)] md:pt-10 pb-6 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 relative">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => activeView === "menu" ? router.back() : setActiveView("menu")} 
            className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center">
            {activeView === "menu" && "My Profile"}
            {activeView === "profile" && "User Profile"}
            {activeView === "password" && "Change Password"}
          </h1>
          {activeView !== "menu" ? (
            <button className="p-2 -mr-2 active:scale-95 transition-transform cursor-pointer" title="Save">
              <Save size={22} />
            </button>
          ) : (
            <div className="w-10"></div> /* spacer */
          )}
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar pt-6">
        
        {/* Main Menu View */}
        {activeView === "menu" && (
          <div className="flex flex-col gap-6">
            
            {/* Profile Summary Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <User size={40} strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <h2 className="text-[#2C3258] text-lg font-bold">Strickland</h2>
                <p className="text-gray-500 text-sm font-medium">gragory.stricland@yahoo.com</p>
              </div>
            </div>

            {/* Options List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <button 
                onClick={() => setActiveView("profile")}
                className="flex items-center justify-between p-5 border-b border-gray-50 active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <User size={20} />
                  </div>
                  <span className="text-[#2C3258] font-bold text-[15px]">User Profile</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              
              <button 
                onClick={() => setActiveView("password")}
                className="flex items-center justify-between p-5 border-b border-gray-50 active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                    <Lock size={20} />
                  </div>
                  <span className="text-[#2C3258] font-bold text-[15px]">Change Password</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>

              <button 
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center justify-between p-5 active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                    <LogOut size={20} />
                  </div>
                  <span className="text-red-600 font-bold text-[15px]">Logout</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* User Profile Form View */}
        {activeView === "profile" && (
          <div className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[13px]">Customer Name <span className="text-red-500">*</span></label>
              <input type="text" defaultValue="Strickland" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[13px]">Email ID <span className="text-red-500">*</span></label>
              <input type="email" defaultValue="gragory.stricland@yahoo.com" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[13px]">Address 1 <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter Address 1" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[#2C3258] font-bold text-[13px]">City <span className="text-red-500">*</span></label>
                <input type="text" placeholder="City" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[#2C3258] font-bold text-[13px]">State <span className="text-red-500">*</span></label>
                <input type="text" placeholder="State" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[13px]">Zip <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Zip Code" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[13px]">Cell Number <span className="text-red-500">*</span></label>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-gray-100 cursor-not-allowed">
                <div className="bg-gray-100 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                  <span className="text-gray-500 font-bold">+91</span>
                </div>
                <input type="tel" readOnly defaultValue="9755534799" className="flex-1 px-4 py-2.5 text-gray-500 font-medium outline-none placeholder-gray-400 bg-transparent cursor-not-allowed" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[13px]">Telephone Number <span className="text-red-500">*</span></label>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white">
                <div className="bg-gray-50 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                  <span className="text-[#2C3258] font-bold">+91</span>
                </div>
                <input type="tel" defaultValue="9755534799" className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[13px]">Country <span className="text-red-500">*</span></label>
              <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                <option value="USA">USA</option>
                <option value="Dominican Republic">Dominican Republic</option>
              </select>
            </div>

            <button className="bg-[#5c85eb] text-white font-bold text-[15px] py-3 rounded-xl mt-4 shadow-md active:scale-95 transition-transform mb-4">
              Update Profile
            </button>

          </div>
        )}

        {/* Change Password View */}
        {activeView === "password" && (
          <div className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[13px]">Old Password <span className="text-red-500">*</span></label>
              <input type="password" placeholder="Enter old password" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[13px]">New Password <span className="text-red-500">*</span></label>
              <input type="password" placeholder="Enter new password" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#2C3258] font-bold text-[13px]">Confirm Password <span className="text-red-500">*</span></label>
              <input type="password" placeholder="Confirm new password" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" />
            </div>

            <button className="bg-[#5c85eb] text-white font-bold text-[15px] py-3 rounded-xl mt-4 shadow-md active:scale-95 transition-transform mb-4">
              Change Password
            </button>

          </div>
        )}

      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow-xl transform transition-all">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4">
              <LogOut size={28} />
            </div>
            <h3 className="text-[#2C3258] text-lg font-bold mb-2">Logout</h3>
            <p className="text-gray-500 font-medium mb-8">Are you sure you want to log out of your account?</p>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 py-3.5 bg-red-500 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
