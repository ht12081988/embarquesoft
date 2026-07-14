"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, Hexagon } from "lucide-react";

type Step = "login" | "forgot_phone" | "forgot_otp" | "forgot_reset" | "register_details" | "register_otp" | "register_password";

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState(60);

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
    // After creating account, go to login
    setStep("login");
  };

  return (
    <div className="flex flex-col flex-1 bg-white min-h-full">
      {/* Top Header Section */}
      <div className="bg-primary pt-16 md:pt-10 pb-8 px-5 flex flex-col items-center justify-center shrink-0 rounded-b-[24px] text-white shadow-md z-10 relative">
        <div className="bg-white px-8 py-3 rounded-full flex items-center justify-center gap-2 shadow-sm">
          <Hexagon size={24} className="text-[#990000] fill-[#990000]/20" />
          <span className="text-[#990000] font-black text-2xl tracking-tight">Salcedo</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-5 pt-8 pb-10 flex flex-col">
        {step === "login" && (
          <div className="flex flex-col flex-1">
            <h1 className="text-[#2C3258] text-[28px] font-bold mb-1">Log In</h1>
            <p className="text-gray-400 font-medium text-[15px] mb-8">Please log in to start your session</p>

            <form onSubmit={handleLogin} className="flex flex-col gap-5 flex-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-medium text-[13px]">Mobile Number</label>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-[#F9F9FB]">
                  <div className="bg-gray-100 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                    <span className="text-[#2C3258] font-bold">+1</span>
                  </div>
                  <input type="tel" placeholder="Enter mobile number" className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent" required />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-medium text-[13px]">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                    className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400 pr-12"
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
                <div className="flex justify-end mt-1">
                  <button 
                    type="button"
                    onClick={() => setStep("forgot_phone")}
                    className="text-primary font-bold text-[13px]"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" className="w-full bg-primary text-white font-bold text-[15px] py-3 rounded-full shadow-md active:scale-95 transition-transform">
                  Log In
                </button>
              </div>
              
              <div className="flex justify-center mt-2">
                <p className="text-gray-500 font-medium text-[14px]">
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => {
                      setRegError("");
                      setIsMatched(false);
                      setStep("register_details");
                    }}
                    className="text-primary font-bold"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>
          </div>
        )}

        {step === "forgot_phone" && (
          <div className="flex flex-col flex-1">
            <button onClick={() => setStep("login")} className="self-start p-2 -ml-2 mb-4 text-[#2C3258]">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[#2C3258] text-[28px] font-bold mb-1">Forgot Password</h1>
            <p className="text-gray-400 font-medium text-[15px] mb-8">Enter your mobile number to receive an OTP.</p>

            <form onSubmit={handleSendOTP} className="flex flex-col gap-5 flex-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-medium text-[13px]">Mobile Number</label>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-[#F9F9FB]">
                  <div className="bg-gray-100 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                    <span className="text-[#2C3258] font-bold">+1</span>
                  </div>
                  <input type="tel" placeholder="Enter mobile number" className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent" required />
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" className="w-full bg-primary text-white font-bold text-[15px] py-3 rounded-full shadow-md active:scale-95 transition-transform">
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "forgot_otp" && (
          <div className="flex flex-col flex-1">
            <button onClick={() => setStep("forgot_phone")} className="self-start p-2 -ml-2 mb-4 text-[#2C3258]">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[#2C3258] text-[28px] font-bold mb-1">Verify OTP</h1>
            <p className="text-gray-400 font-medium text-[15px] mb-8">Enter the 4-digit code sent to your mobile number.</p>

            <form onSubmit={handleVerifyOTP} className="flex flex-col gap-5 flex-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-medium text-[13px]">OTP Code</label>
                <input 
                  type="text" 
                  placeholder="----" 
                  maxLength={4}
                  className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-3.5 text-center text-[24px] tracking-[1em] text-gray-900 font-bold outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-300"
                  required 
                />
              </div>

              <div className="flex justify-center mt-2">
                {countdown > 0 ? (
                  <p className="text-gray-500 font-medium text-[14px]">Resend OTP in <span className="font-bold text-primary">{countdown}s</span></p>
                ) : (
                  <button type="button" onClick={() => setCountdown(60)} className="text-primary font-bold text-[14px]">
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="mt-4">
                <button type="submit" className="w-full bg-primary text-white font-bold text-[15px] py-3 rounded-full shadow-md active:scale-95 transition-transform">
                  Verify Code
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "forgot_reset" && (
          <div className="flex flex-col flex-1">
            <button onClick={() => setStep("login")} className="self-start p-2 -ml-2 mb-4 text-[#2C3258]">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[#2C3258] text-[28px] font-bold mb-1">Reset Password</h1>
            <p className="text-gray-400 font-medium text-[15px] mb-8">Create a new secure password.</p>

            <form onSubmit={handleResetPassword} className="flex flex-col gap-5 flex-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-medium text-[13px]">New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password" 
                  className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400"
                  required 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-medium text-[13px]">Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm new password" 
                  className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400"
                  required 
                />
              </div>

              <div className="mt-4">
                <button type="submit" className="w-full bg-primary text-white font-bold text-[15px] py-3 rounded-full shadow-md active:scale-95 transition-transform">
                  Reset & Log In
                </button>
              </div>
            </form>
          </div>
        )}

        {/* REGISTRATION FLOW */}
        {step === "register_details" && (
          <div className="flex flex-col flex-1">
            <button onClick={() => setStep("login")} className="self-start p-2 -ml-2 mb-4 text-[#2C3258]">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[#2C3258] text-[28px] font-bold mb-1">Create Account</h1>
            <p className="text-gray-400 font-medium text-[15px] mb-6">
              {isMatched ? "Complete your details below." : "Enter your details to register."}
            </p>

            <form onSubmit={handleRegisterDetails} className="flex flex-col gap-5 flex-1">
              
              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-medium text-[13px]">First Name</label>
                  <input 
                    type="text" 
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    placeholder="First Name" 
                    className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400 disabled:opacity-50 disabled:bg-gray-100"
                    required 
                    disabled={isMatched}
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#2C3258] font-medium text-[13px]">Last Name</label>
                  <input 
                    type="text" 
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    placeholder="Last Name" 
                    className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400 disabled:opacity-50 disabled:bg-gray-100"
                    required 
                    disabled={isMatched}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-medium text-[13px]">Cell Number <span className="text-red-500">*</span></label>
                <div className={`flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary ${isMatched ? 'bg-gray-100 opacity-50' : 'bg-[#F9F9FB]'}`}>
                  <div className="bg-gray-100 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                    <span className="text-[#2C3258] font-bold">+1</span>
                  </div>
                  <input 
                    type="tel" 
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    placeholder="9999999999" 
                    className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent disabled:bg-transparent" 
                    required 
                    disabled={isMatched}
                  />
                </div>
              </div>

              {isMatched && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#2C3258] font-medium text-[13px]">Address 1 <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Address 1" className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" required />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label className="text-[#2C3258] font-medium text-[13px]">City <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="City" className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" required />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label className="text-[#2C3258] font-medium text-[13px]">State <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="State" className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" required />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#2C3258] font-medium text-[13px]">Zip <span className="text-red-500">*</span></label>
                    <select className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none" required>
                      <option value="USA">USA</option>
                      <option value="DOM">Dominican Republic</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#2C3258] font-medium text-[13px]">Email ID <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="Enter Email" className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400" required />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#2C3258] font-medium text-[13px]">Telephone Number <span className="text-red-500">*</span></label>
                    <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-[#F9F9FB]">
                      <div className="bg-gray-100 border-r border-gray-200 px-3 py-2.5 flex items-center gap-2">
                        <span className="text-[#2C3258] font-bold">+1</span>
                      </div>
                      <input type="tel" placeholder="9999999999" className="flex-1 px-4 py-2.5 text-gray-900 font-medium outline-none placeholder-gray-400 bg-transparent" required />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#2C3258] font-medium text-[13px]">Country <span className="text-red-500">*</span></label>
                    <select className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none" required>
                      <option value="USA">USA</option>
                      <option value="DOM">Dominican Republic</option>
                    </select>
                  </div>
                </>
              )}

              {regError && (
                <div className="bg-red-50 text-red-600 font-medium text-sm p-4 rounded-xl border border-red-100">
                  {regError}
                </div>
              )}

              <div className="mt-4">
                <button type="submit" className="w-full bg-primary text-white font-bold text-[15px] py-3 rounded-full shadow-md active:scale-95 transition-transform">
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "register_otp" && (
          <div className="flex flex-col flex-1">
            <button onClick={() => setStep("register_details")} className="self-start p-2 -ml-2 mb-4 text-[#2C3258]">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[#2C3258] text-[28px] font-bold mb-1">Verify OTP</h1>
            <p className="text-gray-400 font-medium text-[15px] mb-8">Enter the 4-digit code sent to your mobile number.</p>

            <form onSubmit={handleVerifyRegOTP} className="flex flex-col gap-5 flex-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-medium text-[13px]">OTP Code</label>
                <input 
                  type="text" 
                  placeholder="----" 
                  maxLength={4}
                  className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-3.5 text-center text-[24px] tracking-[1em] text-gray-900 font-bold outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-300"
                  required 
                />
              </div>

              <div className="flex justify-center mt-2">
                {countdown > 0 ? (
                  <p className="text-gray-500 font-medium text-[14px]">Resend OTP in <span className="font-bold text-primary">{countdown}s</span></p>
                ) : (
                  <button type="button" onClick={() => setCountdown(60)} className="text-primary font-bold text-[14px]">
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="mt-4">
                <button type="submit" className="w-full bg-primary text-white font-bold text-[15px] py-3 rounded-full shadow-md active:scale-95 transition-transform">
                  Verify Code
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "register_password" && (
          <div className="flex flex-col flex-1">
            <button onClick={() => setStep("register_details")} className="self-start p-2 -ml-2 mb-4 text-[#2C3258]">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[#2C3258] text-[28px] font-bold mb-1">Set Password</h1>
            <p className="text-gray-400 font-medium text-[15px] mb-8">Create a password for your new account.</p>

            <form onSubmit={handleCreateAccount} className="flex flex-col gap-5 flex-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-medium text-[13px]">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter password" 
                  className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400"
                  required 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#2C3258] font-medium text-[13px]">Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm password" 
                  className="w-full bg-[#F9F9FB] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400"
                  required 
                />
              </div>

              <div className="mt-4">
                <button type="submit" className="w-full bg-primary text-white font-bold text-[15px] py-3 rounded-full shadow-md active:scale-95 transition-transform">
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

