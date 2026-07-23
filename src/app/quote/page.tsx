"use client";

import React, { useState } from "react";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuotePage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setSuccess(true);
  };

  return (
    <div className="flex flex-col flex-1 h-full relative overflow-hidden font-sans">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/App_Background.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Header Section */}
      <div className="pt-12 pb-6 px-5 flex flex-col shrink-0 text-white relative z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-base font-semibold flex-1 text-center pr-8 tracking-wide">Request Quote</h1>
        </div>
      </div>

      {/* Main Content Area - White Card */}
      <div className="flex-1 bg-white/[0.88] backdrop-blur-xl rounded-t-[32px] px-6 pt-8 pb-8 flex flex-col z-20 overflow-y-auto no-scrollbar shadow-[0_-8px_24px_rgba(0,0,0,0.1)]">
        {success ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-10">
            <div className="w-16 h-16 bg-[#eb5b27]/10 rounded-full flex items-center justify-center text-[#eb5b27]">
              <CheckCircle size={32} />
            </div>
            <div>
              <h2 className="text-[#1A1A1A] font-bold text-xl mb-2">Quote Requested</h2>
              <p className="text-black font-medium text-sm px-4">
                We have received your quote request and will get back to you shortly.
              </p>
            </div>
            <button 
              onClick={() => router.push("/")}
              className="mt-6 bg-[#eb5b27] hover:bg-[#d94d1f] text-white font-semibold py-3.5 px-8 rounded-full shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-black font-medium text-[13px] ml-1">First Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-black font-medium text-[13px] ml-1">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-medium text-[13px] ml-1">Telephone</label>
              <input 
                type="tel" 
                required
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-medium text-[13px] ml-1">Quote Description</label>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-black font-medium text-[13px] ml-1">Attach Image</label>
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload"
                  className="w-full flex items-center justify-between bg-[#F4F5F7] border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] rounded-xl px-4 py-3 text-sm font-medium cursor-pointer active:scale-[0.99] transition-transform"
                >
                  <span className={file ? "text-[#eb5b27] font-bold" : "text-gray-400"}>
                    {file ? file.name : "Choose an image..."}
                  </span>
                  <Upload size={18} className="text-[#1A1A1A]" />
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full mt-2 bg-[#eb5b27] hover:bg-[#d94d1f] text-white font-semibold text-[13px] py-3.5 rounded-full shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform"
            >
              Submit Quote
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
