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
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Header Section */}
      <div className="bg-primary pt-16 md:pt-10 pb-6 px-5 flex flex-col shrink-0 rounded-b-[24px] text-white shadow-md z-10 relative">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-8">Request Quote</h1>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col relative z-0 overflow-y-auto no-scrollbar pb-24">
        {success ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center mt-10">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
              <CheckCircle size={32} />
            </div>
            <div>
              <h2 className="text-[#2C3258] font-bold text-xl mb-2">Quote Requested</h2>
              <p className="text-gray-500 font-medium text-sm px-4">
                We have received your quote request and will get back to you shortly.
              </p>
            </div>
            <button 
              onClick={() => router.push("/")}
              className="mt-6 bg-primary text-white font-bold py-3 px-8 rounded-xl shadow-md active:scale-95 transition-transform"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-gray-600 font-bold text-xs">First Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John" 
                  className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-gray-600 font-bold text-xs">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe" 
                  className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-bold text-xs">Telephone</label>
              <input 
                type="tel" 
                required
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                placeholder="212-444-8574" 
                className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-bold text-xs">Quote Description</label>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your needs..." 
                className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-bold text-xs">Attach Image</label>
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
                  className="w-full flex items-center justify-between bg-[#F9F9FB] border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium cursor-pointer active:scale-[0.99] transition-transform"
                >
                  <span className={file ? "text-primary font-bold" : "text-gray-400"}>
                    {file ? file.name : "Choose an image..."}
                  </span>
                  <Upload size={16} className="text-gray-400" />
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl mt-4 shadow-md active:scale-95 transition-transform"
            >
              Submit Quote
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
