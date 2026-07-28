"use client";

import React, { useState } from "react";
import { ArrowLeft, Upload, Camera, Send, ChevronDown } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth";

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

export default function ClaimDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const { isLoggedIn } = useAuth();
  const [language, setLanguage] = useState("ES");
  const [claimExpanded, setClaimExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentImage, setCommentImage] = useState<File | null>(null);

  const [comments, setComments] = useState([
    {
      id: "cc1",
      userName: "Tenant Admin",
      comment: "We have received your claim and are reviewing it.",
      timestamp: "2026-08-16 10:00 AM",
      images: [] as string[],
    },
    {
      id: "cc2",
      userName: "John Doe",
      comment: "Please let me know the timeline for resolution.",
      timestamp: "2026-08-16 11:30 AM",
      images: [
        "https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG",
        "https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG",
      ],
    },
  ]);

  const toggleLanguage = () => setLanguage(l => l === "ES" ? "EN" : "ES");

  const claim = {
    id: id || "CLM-9021",
    invoiceNumber: "INV-00123",
    claimDate: "2026-08-15 14:30",
    writeClaim: "Box arrived damaged and contents were broken. Missing 2 items from the original packing list.",
    status: "Open",
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    const images = commentImage ? [URL.createObjectURL(commentImage)] : [];

    const newComment = {
      id: `cc${Date.now()}`,
      userName: "John Doe",
      comment: commentText.trim(),
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric", month: "short", day: "numeric",
        hour: "numeric", minute: "numeric", hour12: true,
      }),
      images,
    };

    setComments(prev => [newComment, ...prev]);
    setCommentText("");
    setCommentImage(null);
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

      <div className="relative z-10 flex flex-col flex-1 h-full">
        {/* Header Section */}
        <div className="shrink-0 px-5 pt-9 pb-4.5 z-10" style={{ background: "linear-gradient(135deg, #061246 0%, #1a40b4 100%)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-[12px] tracking-[0.14em] uppercase text-white">
                SALCEDO
              </span>
            </div>
            <div className="flex items-center gap-3.5">
              {isLoggedIn && (
                <Link href="/notifications" className="relative text-white active:scale-90 transition-transform flex items-center">
                  <IconBell />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#eb5b27] rounded-full animate-pulse" />
                </Link>
              )}
              <a href="https://wa.me/12015550123" target="_blank" rel="noopener noreferrer" className="text-white active:scale-90 transition-transform flex items-center">
                <IconWhatsapp />
              </a>
              <button onClick={toggleLanguage} className="text-white active:scale-90 transition-transform flex items-center">
                <IconGlobe />
              </button>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="pt-4 pb-4 px-5 flex flex-col shrink-0 text-white z-10">
          <div className="flex items-center justify-between">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base font-normal flex-1 text-center pr-8 tracking-wide">Claim Details</h1>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 px-5 py-4 flex flex-col gap-4 relative z-0 overflow-y-auto no-scrollbar pb-8">

          {/* Claim Card — collapsible */}
          <div className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm">
            {/* Header / toggle row — always visible */}
            <button
              onClick={() => setClaimExpanded(prev => !prev)}
              className="w-full flex items-center justify-between px-5 py-4 active:bg-gray-50 transition-colors rounded-2xl"
            >
              <div className="flex items-center gap-2.5">
                <span className="bg-[#eb5b27] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {claim.id}
                </span>
                <span className="text-gray-700 font-semibold text-[13px]">
                  Claim #{claim.id}
                </span>
              </div>
              <ChevronDown
                size={18}
                className="text-[#eb5b27] transition-transform duration-300"
                style={{ transform: claimExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {/* Collapsible body */}
            <div
              style={{
                maxHeight: claimExpanded ? "600px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.35s ease",
              }}
            >
              <div className="px-5 pb-5 flex flex-col gap-4 border-t border-black/5">

                <div className="flex flex-col gap-2 pt-4">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-700 font-bold">Invoice #:</span>
                    <span className="text-[#eb5b27] font-medium">{claim.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-700 font-bold">Claim Date/Time:</span>
                    <span className="text-[#eb5b27] font-medium">{claim.claimDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-700 font-bold">Status:</span>
                    <span className={`font-bold ${
                      claim.status === "Closed" ? "text-[#10b981]" :
                      claim.status === "Processing" ? "text-[#f8a379]" :
                      "text-[#eb5b27]"
                    }`}>{claim.status}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-3 border-t border-gray-200">
                  <span className="text-gray-700 text-[11px] font-bold uppercase tracking-wide">Write claim</span>
                  <div className="bg-black/5 rounded-xl p-3 border-none">
                    <p className="text-gray-700 font-medium text-[11px] leading-relaxed">
                      {claim.writeClaim}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm p-5">
            {/* Header row — Comments + View All */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#eb5b27]">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <h3 className="text-[#eb5b27] font-bold text-sm">Comments</h3>
              </div>
              <button className="text-[#eb5b27] text-[12px] font-semibold active:opacity-70 transition-opacity">
                View All
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                    {/* Name + timestamp inline */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[12px] font-bold text-[#1a2b5e]">{comment.userName}</span>
                      <span className="text-gray-400 text-[10px]">·</span>
                      <span className="text-gray-400 text-[10px]">{comment.timestamp}</span>
                    </div>
                    {/* Comment text */}
                    <p className="text-[12px] text-gray-700 leading-snug mb-2.5">{comment.comment}</p>
                    {/* Image thumbnails strip */}
                    {comment.images && comment.images.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {comment.images.map((src, idx) => (
                          <div
                            key={idx}
                            className="w-[72px] h-[72px] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shrink-0"
                          >
                            <img
                              src={src}
                              alt={`attachment-${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 text-[11px]">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
          </div>

          {/* ── Add Comment Form (inline) ── */}
          <div className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#eb5b27]">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <h3 className="text-[#eb5b27] font-bold text-sm">Add Comment</h3>
            </div>

            {/* Text area */}
            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Your Comment</label>
              <textarea
                placeholder="Type your comment here..."
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-[#f4f5f7]/90 border border-white rounded-xl px-4 py-3 text-gray-900 font-medium text-[13px] outline-none focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] placeholder-gray-400 resize-none shadow-sm"
              />
            </div>

            {/* Image attach */}
            <div className="flex flex-col gap-1.5">
              <label className="text-black font-normal text-[13px]">Attach Image <span className="text-gray-400 font-normal">(optional)</span></label>
              <div className="w-full bg-[#f8f9fa] border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-3">
                <span className="text-gray-500 text-[13px] font-medium">Choose an option</span>
                <div className="flex gap-3 w-full">
                  {/* Take Picture */}
                  <div className="relative flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      id="comment-camera-upload"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setCommentImage(e.target.files[0]);
                        }
                      }}
                    />
                    <label
                      htmlFor="comment-camera-upload"
                      className="w-full flex items-center justify-center gap-2 bg-white text-[#1a2b5e] border border-gray-200 font-bold text-sm py-3 px-4 rounded-xl shadow-sm cursor-pointer active:scale-95 transition-all hover:bg-gray-50"
                    >
                      <Camera size={18} className="text-[#eb5b27]" />
                      <span className="whitespace-nowrap">Take Picture</span>
                    </label>
                  </div>
                  {/* Upload */}
                  <div className="relative flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="comment-file-upload"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setCommentImage(e.target.files[0]);
                        }
                      }}
                    />
                    <label
                      htmlFor="comment-file-upload"
                      className="w-full flex items-center justify-center gap-2 bg-[#1a2b5e] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-sm cursor-pointer active:scale-95 transition-all hover:bg-[#15234d]"
                    >
                      <Upload size={18} />
                      <span className="whitespace-nowrap">Upload</span>
                    </label>
                  </div>
                </div>
              </div>
              {/* Image preview / selected name */}
              {commentImage && (
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[12px] font-medium text-[#eb5b27] truncate flex-1">{commentImage.name}</span>
                  <button
                    onClick={() => setCommentImage(null)}
                    className="text-gray-400 hover:text-gray-600 text-[11px] font-bold shrink-0"
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmitComment}
              disabled={!commentText.trim()}
              className={`w-full h-12 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-95 ${
                commentText.trim()
                  ? "bg-[#eb5b27] hover:bg-[#d94d1f] text-white shadow-[0_4px_14px_rgba(235,91,39,0.35)]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send size={16} />
              Add Comment
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
