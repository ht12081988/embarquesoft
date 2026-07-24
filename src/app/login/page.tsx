"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, Hexagon } from "lucide-react";
import { useAuth } from "@/components/auth";

type Step = "login" | "forgot_phone" | "forgot_otp" | "forgot_reset" | "register_details" | "register_otp" | "register_password";

const countries = {
  US: { flag: "🇺🇸", code: "+1" },
  DO: { flag: "🇩🇴", code: "+1" },
  IN: { flag: "🇮🇳", code: "+91" }
};
type CountryKey = keyof typeof countries;

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<Step>("login");
  const [loginCountry, setLoginCountry] = useState<CountryKey>("US");
  const [forgotCountry, setForgotCountry] = useState<CountryKey>("US");
  const [regCellCountry, setRegCellCountry] = useState<CountryKey>("US");
  const [regTelCountry, setRegTelCountry] = useState<CountryKey>("US");
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Check query params to load register screen directly
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("register") === "true") {
        setStep("register_details");
      }
    }
  }, []);

  // Registration states
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regError, setRegError] = useState("");
  const [isMatched, setIsMatched] = useState(false);

  // For OTP countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if ((step === "forgot_otp" || step === "register_otp") && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, countdown]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    router.push("/");
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("forgot_otp");
    setCountdown(60);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("forgot_reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("login");
  };

  const handleRegisterDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    
    if (!isMatched) {
      if (regFirstName.toLowerCase() === "ricardo" && regMobile === "9999999999") {
        setIsMatched(true);
      } else {
        setRegError("Details do not match our records. Please contact Salcedo admin.");
      }
    } else {
      setStep("register_otp");
      setCountdown(60);
    }
  };

  const handleVerifyRegOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("register_password");
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // Log user in immediately upon successful registration
    router.push("/");
  };

  return (
    <div 
      className="flex flex-col min-h-[100dvh] bg-cover bg-center font-sans relative"
      style={{ backgroundImage: "url('/App_Background.png')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] z-0 pointer-events-none"></div>
      
      {/* Top Header Section */}
      <div className="flex flex-col px-6 pt-12 pb-12 min-h-[260px] text-white shrink-0 relative z-10">
        <div className="flex items-center justify-between w-full mb-8 relative">
          <button onClick={() => {
              if (step === "login") {
                router.back();
              } else if (step === "forgot_phone") {
                setStep("login");
              } else if (step === "forgot_otp") {
                setStep("forgot_phone");
              } else if (step === "forgot_reset") {
                setStep("login");
              } else if (step === "register_details") {
                setStep("login");
              } else if (step === "register_otp") {
                setStep("register_details");
              } else if (step === "register_password") {
                setStep("register_details");
              }
            }} 
            className="p-1 -ml-1 text-white relative z-10"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="font-normal text-[11px] tracking-[0.08em] uppercase text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">Salcedo</span>
          {step === "login" ? (
            <button 
              onClick={() => {
                setRegError("");
                setIsMatched(false);
                setStep("register_details");
              }} 
              className="text-white text-[11px] font-normal relative z-10"
            >
              Register
            </button>
          ) : (
            <div className="w-[60px]"></div>
          )}
        </div>

        <div className="flex flex-col flex-1 justify-center mt-2">
          {step === "login" && (
            <>
              <h1 className="text-[28px] font-normal mb-1 leading-tight text-white">Log In</h1>
              <p className="text-white/90 font-medium text-[13px]">Please log in to start your session</p>
            </>
          )}
          {step === "forgot_phone" && (
            <>
              <h1 className="text-[28px] font-normal mb-1 leading-tight text-white">Forgot Password</h1>
              <p className="text-white/90 font-medium text-[13px]">Enter your mobile number to receive an OTP.</p>
            </>
          )}
          {step === "forgot_otp" && (
            <>
              <h1 className="text-[28px] font-normal mb-1 leading-tight text-white">Verify OTP</h1>
              <p className="text-white/90 font-medium text-[13px]">Enter the 4-digit code sent to your mobile number.</p>
            </>
          )}
          {step === "forgot_reset" && (
            <>
              <h1 className="text-[28px] font-normal mb-1 leading-tight text-white">Reset Password</h1>
              <p className="text-white/90 font-medium text-[13px]">Create a new secure password.</p>
            </>
          )}
          {step === "register_details" && (
            <>
              <h1 className="text-[28px] font-normal mb-1 leading-tight text-white">Create Account</h1>
              <p className="text-white/90 font-medium text-[13px]">
                {isMatched ? "Complete your details below." : "Enter your details to register."}
              </p>
            </>
          )}
          {step === "register_otp" && (
            <>
              <h1 className="text-[28px] font-normal mb-1 leading-tight text-white">Verify OTP</h1>
              <p className="text-white/90 font-medium text-[13px]">Enter the 4-digit code sent to your mobile number.</p>
            </>
          )}
          {step === "register_password" && (
            <>
              <h1 className="text-[28px] font-normal mb-1 leading-tight text-white">Set Password</h1>
              <p className="text-white/90 font-medium text-[13px]">Create a password for your new account.</p>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area - White Card */}
      <div className="flex-1 bg-white/[0.90] backdrop-blur-xl rounded-t-[32px] px-6 pt-8 pb-8 flex flex-col z-20 overflow-hidden shadow-[0_-8px_24px_rgba(0,0,0,0.1)]">
        {step === "login" && (
          <form onSubmit={handleLogin} className="flex flex-col flex-1 mt-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Mobile Number</label>
                <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border border-white shadow-sm focus-within:border-[#eb5b27] focus-within:ring-1 focus-within:ring-[#eb5b27]">
                  <div className="relative bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-black border-r border-gray-200">
                    <span>{countries[loginCountry].flag}</span>
                    <span>{countries[loginCountry].code}</span>
                    <select 
                      value={loginCountry} 
                      onChange={(e) => setLoginCountry(e.target.value as CountryKey)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    >
                      <option value="US">🇺🇸 USA (+1)</option>
                      <option value="DO">🇩🇴 Dominican Republic (+1)</option>
                      <option value="IN">🇮🇳 India (+91)</option>
                    </select>
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Mobile number" 
                    className="flex-1 px-4 py-3.5 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none"
                    required 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] pr-12"
                    required 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 mb-6">
              <button 
                type="button"
                onClick={() => setStep("forgot_phone")}
                className="text-[#1A1A1A] font-semibold text-[11px]"
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="w-full bg-[#eb5b27] text-white font-semibold text-[12px] h-12 rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Log In
            </button>
          </form>
        )}

        {step === "forgot_phone" && (
          <form onSubmit={handleSendOTP} className="flex flex-col flex-1 mt-6">
            <div className="flex flex-col gap-4">
              <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border border-white shadow-sm focus-within:border-[#eb5b27] focus-within:ring-1 focus-within:ring-[#eb5b27]">
                <div className="relative bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-black border-r border-gray-200">
                  <span>{countries[forgotCountry].flag}</span>
                  <span>{countries[forgotCountry].code}</span>
                  <select 
                    value={forgotCountry} 
                    onChange={(e) => setForgotCountry(e.target.value as CountryKey)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="US">🇺🇸 USA (+1)</option>
                    <option value="DO">🇩🇴 Dominican Republic (+1)</option>
                    <option value="IN">🇮🇳 India (+91)</option>
                  </select>
                </div>
                <input 
                  type="tel" 
                  placeholder="Mobile Number" 
                  className="flex-1 px-4 py-3.5 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none"
                  required 
                />
              </div>
            </div>
            <button type="submit" className="w-full mt-8 bg-[#eb5b27] text-white font-semibold text-[12px] h-12 rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Send OTP
            </button>
          </form>
        )}

        {step === "forgot_otp" && (
          <form onSubmit={handleVerifyOTP} className="flex flex-col flex-1 mt-6">
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="----" 
                maxLength={4}
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-bold text-center tracking-[0.8em] text-[20px] placeholder-gray-300 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                required 
              />
            </div>
            <div className="flex justify-center mt-4 mb-4">
              {countdown > 0 ? (
                <p className="text-gray-500 font-medium text-[14px]">Resend OTP in <span className="font-bold text-[#eb5b27]">{countdown}s</span></p>
              ) : (
                <button type="button" onClick={() => setCountdown(60)} className="text-[#eb5b27] font-bold text-[14px]">
                  Resend OTP
                </button>
              )}
            </div>
            <button type="submit" className="w-full mt-4 bg-[#eb5b27] text-white font-semibold text-[12px] h-12 rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Verify Code
            </button>
          </form>
        )}

        {step === "forgot_reset" && (
          <form onSubmit={handleResetPassword} className="flex flex-col flex-1 mt-6">
            <div className="flex flex-col gap-4">
              <input 
                type="password" 
                placeholder="New Password" 
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                required 
              />
              <input 
                type="password" 
                placeholder="Confirm Password" 
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                required 
              />
            </div>
            <button type="submit" className="w-full mt-8 bg-[#eb5b27] text-white font-semibold text-[12px] h-12 rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Reset & Log In
            </button>
          </form>
        )}

        {step === "register_details" && (
          <form onSubmit={handleRegisterDetails} className="flex flex-col flex-1 overflow-y-auto no-scrollbar pb-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">First Name</label>
                  <input 
                    type="text" 
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    placeholder="First Name" 
                    className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] disabled:opacity-50"
                    required 
                    disabled={isMatched}
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-black font-normal text-[13px] ml-1">Last Name</label>
                  <input 
                    type="text" 
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    placeholder="Last Name" 
                    className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] disabled:opacity-50"
                    required 
                    disabled={isMatched}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Cell Number</label>
                <div className={`flex bg-[#F4F5F7] rounded-xl overflow-hidden border border-white shadow-sm focus-within:border-[#eb5b27] focus-within:ring-1 focus-within:ring-[#eb5b27] ${isMatched ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className="relative bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-black border-r border-gray-200">
                    <span>{countries[regCellCountry].flag}</span>
                    <span>{countries[regCellCountry].code}</span>
                    {!isMatched && (
                      <select 
                        value={regCellCountry} 
                        onChange={(e) => setRegCellCountry(e.target.value as CountryKey)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      >
                        <option value="US">🇺🇸 USA (+1)</option>
                        <option value="DO">🇩🇴 Dominican Republic (+1)</option>
                        <option value="IN">🇮🇳 India (+91)</option>
                      </select>
                    )}
                  </div>
                  <input 
                    type="tel" 
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    placeholder="Cell Number" 
                    className="flex-1 px-4 py-3.5 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none"
                    required 
                    disabled={isMatched}
                  />
                </div>
              </div>

              {isMatched && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-black font-normal text-[13px] ml-1">Address 1</label>
                    <input type="text" placeholder="Address 1" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" required />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label className="text-black font-normal text-[13px] ml-1">City</label>
                      <input type="text" placeholder="City" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" required />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label className="text-black font-normal text-[13px] ml-1">State</label>
                      <input type="text" placeholder="State" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" required />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-black font-normal text-[13px] ml-1">Zip Code</label>
                    <input 
                      type="text" 
                      placeholder="Zip Code" 
                      className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" 
                      required 
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-black font-normal text-[13px] ml-1">Email Id</label>
                    <input type="email" placeholder="Email ID" className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]" required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-black font-normal text-[13px] ml-1">Telephone Number</label>
                    <div className="flex bg-[#F4F5F7] rounded-xl overflow-hidden border border-white shadow-sm focus-within:border-[#eb5b27] focus-within:ring-1 focus-within:ring-[#eb5b27]">
                      <div className="relative bg-[#EAEAEE] px-3.5 py-3.5 flex items-center gap-1.5 text-sm font-bold text-black border-r border-gray-200">
                        <span>{countries[regTelCountry].flag}</span>
                        <span>{countries[regTelCountry].code}</span>
                        <select 
                          value={regTelCountry} 
                          onChange={(e) => setRegTelCountry(e.target.value as CountryKey)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        >
                          <option value="US">🇺🇸 USA (+1)</option>
                          <option value="DO">🇩🇴 Dominican Republic (+1)</option>
                          <option value="IN">🇮🇳 India (+91)</option>
                        </select>
                      </div>
                      <input 
                        type="tel" 
                        placeholder="Telephone Number" 
                        className="flex-1 px-4 py-3.5 text-sm text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent border-none" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-black font-normal text-[13px] ml-1">Country</label>
                    <select className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27] appearance-none" required defaultValue="">
                      <option value="" disabled>Select Country</option>
                      <option value="USA">USA</option>
                      <option value="DOM">Dominican Republic</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {regError && (
              <div className="mt-4 bg-red-50 text-red-600 font-medium text-sm p-4 rounded-xl border border-red-100">
                {regError}
              </div>
            )}

            <button type="submit" className="w-full mt-8 shrink-0 bg-[#eb5b27] text-white font-semibold text-[12px] h-12 rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Continue
            </button>
          </form>
        )}

        {step === "register_otp" && (
          <form onSubmit={handleVerifyRegOTP} className="flex flex-col flex-1 mt-6">
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="----" 
                maxLength={4}
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-bold text-center tracking-[0.8em] text-[20px] placeholder-gray-300 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                required 
              />
            </div>
            <div className="flex justify-center mt-4 mb-4">
              {countdown > 0 ? (
                <p className="text-gray-500 font-medium text-[14px]">Resend OTP in <span className="font-bold text-[#eb5b27]">{countdown}s</span></p>
              ) : (
                <button type="button" onClick={() => setCountdown(60)} className="text-[#eb5b27] font-bold text-[14px]">
                  Resend OTP
                </button>
              )}
            </div>
            <button type="submit" className="w-full mt-4 bg-[#eb5b27] text-white font-semibold text-[12px] h-12 rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Verify Code
            </button>
          </form>
        )}

        {step === "register_password" && (
          <form onSubmit={handleCreateAccount} className="flex flex-col flex-1 mt-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Password</label>
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                  required 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-black font-normal text-[13px] ml-1">Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-xl px-4 h-12 text-sm outline-none font-medium placeholder-gray-400 border border-white shadow-sm focus:border-[#eb5b27] focus:ring-1 focus:ring-[#eb5b27]"
                  required 
                />
              </div>
            </div>
            <button type="submit" className="w-full mt-8 bg-[#eb5b27] text-white font-semibold text-[12px] h-12 rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(235,91,39,0.35)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Complete Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
}