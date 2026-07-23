import React from 'react';
import { X } from 'lucide-react';

interface ContactUsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactUsPopup({ isOpen, onClose }: ContactUsPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Dark overlay behind the popup */}
      <div 
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>

      {/* Popup Content */}
      <div className="relative bg-white/70 backdrop-blur-xl rounded-t-[32px] px-6 pt-6 pb-8 flex flex-col z-20 shadow-[0_-8px_24px_rgba(0,0,0,0.1)] w-full max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-center mb-6 relative">
          <h2 className="text-[#1A1A1A] font-bold text-[16px]">Contact Us</h2>
          <button 
            onClick={onClose}
            className="absolute right-0 text-[#1A1A1A] hover:bg-black/5 p-1 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          
          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[#2C3258] font-bold text-[13px] ml-1">First Name</label>
              <input 
                type="text" 
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border-none"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[#2C3258] font-bold text-[13px] ml-1">Last Name</label>
              <input 
                type="text" 
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Mobile Number</label>
            <input 
              type="tel" 
              className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#2C3258] font-bold text-[13px] ml-1">Comments</label>
            <textarea 
              rows={4}
              className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 py-3 text-sm outline-none font-medium placeholder-gray-400 border-none resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 bg-[#eb5b27] text-white font-semibold text-[13px] py-3.5 rounded-xl shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f]"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
