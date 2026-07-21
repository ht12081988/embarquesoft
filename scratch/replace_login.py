import sys

with open('src/app/login/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_str = '  return (\n    <div className="flex flex-col flex-1 bg-white min-h-full">'
start_idx = content.find(start_str)
if start_idx == -1:
    print('Start not found')
    sys.exit(1)

end_str = '    </div>\n  );\n}'
end_idx = content.find(end_str)
if end_idx == -1:
    print('End not found')
    sys.exit(1)

new_return = '''  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#eb5b27] font-sans">
      
      {/* Top Header Section */}
      <div className="flex flex-col px-6 pt-12 pb-8 text-white shrink-0 relative z-10">
        <div className="flex items-center justify-between w-full mb-8">
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
            className="p-1 -ml-1 text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="font-extrabold text-[15px] tracking-[0.1em] uppercase text-white">Salcedo</span>
          {step === "login" ? (
            <button 
              onClick={() => {
                setRegError("");
                setIsMatched(false);
                setStep("register_details");
              }} 
              className="text-white text-[15px] font-bold"
            >
              Register
            </button>
          ) : (
            <div className="w-[60px]"></div> /* Placeholder for alignment */
          )}
        </div>

        <div>
          {step === "login" && (
            <>
              <h1 className="text-[36px] font-bold mb-2 leading-tight text-white">Log In</h1>
              <p className="text-white font-medium text-[15px]">Please log in to start your session</p>
            </>
          )}
          {step === "forgot_phone" && (
            <>
              <h1 className="text-[32px] font-bold mb-2 leading-tight text-white">Forgot Password</h1>
              <p className="text-white font-medium text-[15px]">Enter your mobile number to receive an OTP.</p>
            </>
          )}
          {step === "forgot_otp" && (
            <>
              <h1 className="text-[32px] font-bold mb-2 leading-tight text-white">Verify OTP</h1>
              <p className="text-white font-medium text-[15px]">Enter the 4-digit code sent to your mobile number.</p>
            </>
          )}
          {step === "forgot_reset" && (
            <>
              <h1 className="text-[32px] font-bold mb-2 leading-tight text-white">Reset Password</h1>
              <p className="text-white font-medium text-[15px]">Create a new secure password.</p>
            </>
          )}
          {step === "register_details" && (
            <>
              <h1 className="text-[32px] font-bold mb-2 leading-tight text-white">Create Account</h1>
              <p className="text-white font-medium text-[15px]">
                {isMatched ? "Complete your details below." : "Enter your details to register."}
              </p>
            </>
          )}
          {step === "register_otp" && (
            <>
              <h1 className="text-[32px] font-bold mb-2 leading-tight text-white">Verify OTP</h1>
              <p className="text-white font-medium text-[15px]">Enter the 4-digit code sent to your mobile number.</p>
            </>
          )}
          {step === "register_password" && (
            <>
              <h1 className="text-[32px] font-bold mb-2 leading-tight text-white">Set Password</h1>
              <p className="text-white font-medium text-[15px]">Create a password for your new account.</p>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area - White Card */}
      <div className="flex-1 bg-white rounded-t-[36px] px-6 pt-10 pb-10 flex flex-col z-20 overflow-hidden shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
        {step === "login" && (
          <form onSubmit={handleLogin} className="flex flex-col flex-1">
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Mobile number or User" 
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none"
                required 
              />
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none pr-12"
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

            <div className="flex justify-end mt-4 mb-6">
              <button 
                type="button"
                onClick={() => setStep("forgot_phone")}
                className="text-[#1A1A1A] font-bold text-[14px]"
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="w-full bg-[#eb5b27] text-white font-bold text-[16px] py-4 rounded-[28px] shadow-[0_6px_16px_rgba(235,91,39,0.3)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Log In
            </button>
            
            <div className="mt-12 flex flex-col gap-4">
              <button type="button" className="flex items-center justify-center gap-3 w-full bg-white text-gray-700 font-bold text-[15px] py-4 rounded-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 active:scale-95 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button type="button" className="flex items-center justify-center gap-3 w-full bg-white text-gray-700 font-bold text-[15px] py-4 rounded-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 active:scale-95 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#1877F2"/>
                  <path d="M14.996 12.012H12.63v8.508H9.982v-8.508H8.468V9.756h1.514V8.094c0-1.25.59-3.189 3.189-3.189h2.336v2.186h-1.691c-.28 0-.687.14-.687.75v1.915h2.398l-.307 2.256z" fill="#ffffff"/>
                </svg>
                Continue with Facebook
              </button>
            </div>
          </form>
        )}

        {step === "forgot_phone" && (
          <form onSubmit={handleSendOTP} className="flex flex-col flex-1">
            <div className="flex flex-col gap-4">
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none"
                required 
              />
            </div>
            <button type="submit" className="w-full mt-8 bg-[#eb5b27] text-white font-bold text-[16px] py-4 rounded-[28px] shadow-[0_6px_16px_rgba(235,91,39,0.3)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Send OTP
            </button>
          </form>
        )}

        {step === "forgot_otp" && (
          <form onSubmit={handleVerifyOTP} className="flex flex-col flex-1">
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="----" 
                maxLength={4}
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-bold text-center tracking-[1em] text-[24px] placeholder-gray-300 border-none"
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
            <button type="submit" className="w-full mt-4 bg-[#eb5b27] text-white font-bold text-[16px] py-4 rounded-[28px] shadow-[0_6px_16px_rgba(235,91,39,0.3)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Verify Code
            </button>
          </form>
        )}

        {step === "forgot_reset" && (
          <form onSubmit={handleResetPassword} className="flex flex-col flex-1">
            <div className="flex flex-col gap-4">
              <input 
                type="password" 
                placeholder="New Password" 
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none"
                required 
              />
              <input 
                type="password" 
                placeholder="Confirm Password" 
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none"
                required 
              />
            </div>
            <button type="submit" className="w-full mt-8 bg-[#eb5b27] text-white font-bold text-[16px] py-4 rounded-[28px] shadow-[0_6px_16px_rgba(235,91,39,0.3)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Reset & Log In
            </button>
          </form>
        )}

        {step === "register_details" && (
          <form onSubmit={handleRegisterDetails} className="flex flex-col flex-1 overflow-y-auto no-scrollbar pb-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={regFirstName}
                  onChange={(e) => setRegFirstName(e.target.value)}
                  placeholder="First Name" 
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none disabled:opacity-50"
                  required 
                  disabled={isMatched}
                />
                <input 
                  type="text" 
                  value={regLastName}
                  onChange={(e) => setRegLastName(e.target.value)}
                  placeholder="Last Name" 
                  className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none disabled:opacity-50"
                  required 
                  disabled={isMatched}
                />
              </div>

              <input 
                type="tel" 
                value={regMobile}
                onChange={(e) => setRegMobile(e.target.value)}
                placeholder="Cell Number" 
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none disabled:opacity-50"
                required 
                disabled={isMatched}
              />

              {isMatched && (
                <>
                  <input type="text" placeholder="Address 1" className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none" required />

                  <div className="flex gap-4">
                    <input type="text" placeholder="City" className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none" required />
                    <input type="text" placeholder="State" className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none" required />
                  </div>

                  <select className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none appearance-none" required defaultValue="">
                    <option value="" disabled>Select Zip Country</option>
                    <option value="USA">USA</option>
                    <option value="DOM">Dominican Republic</option>
                  </select>

                  <input type="email" placeholder="Email ID" className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none" required />
                  <input type="tel" placeholder="Telephone Number" className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none" required />
                  
                  <select className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none appearance-none" required defaultValue="">
                    <option value="" disabled>Select Country</option>
                    <option value="USA">USA</option>
                    <option value="DOM">Dominican Republic</option>
                  </select>
                </>
              )}
            </div>

            {regError && (
              <div className="mt-4 bg-red-50 text-red-600 font-medium text-sm p-4 rounded-xl border border-red-100">
                {regError}
              </div>
            )}

            <button type="submit" className="w-full mt-8 shrink-0 bg-[#eb5b27] text-white font-bold text-[16px] py-4 rounded-[28px] shadow-[0_6px_16px_rgba(235,91,39,0.3)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Continue
            </button>
          </form>
        )}

        {step === "register_otp" && (
          <form onSubmit={handleVerifyRegOTP} className="flex flex-col flex-1">
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="----" 
                maxLength={4}
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-bold text-center tracking-[1em] text-[24px] placeholder-gray-300 border-none"
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
            <button type="submit" className="w-full mt-4 bg-[#eb5b27] text-white font-bold text-[16px] py-4 rounded-[28px] shadow-[0_6px_16px_rgba(235,91,39,0.3)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Verify Code
            </button>
          </form>
        )}

        {step === "register_password" && (
          <form onSubmit={handleCreateAccount} className="flex flex-col flex-1">
            <div className="flex flex-col gap-4">
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none"
                required 
              />
              <input 
                type="password" 
                placeholder="Confirm Password" 
                className="w-full bg-[#F4F5F7] text-gray-900 rounded-[16px] px-5 py-4 outline-none font-medium placeholder-gray-400 border-none"
                required 
              />
            </div>
            <button type="submit" className="w-full mt-8 bg-[#eb5b27] text-white font-bold text-[16px] py-4 rounded-[28px] shadow-[0_6px_16px_rgba(235,91,39,0.3)] active:scale-95 transition-transform hover:bg-[#d94d1f]">
              Complete Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
}'''

new_content = content[:start_idx] + new_return
with open('src/app/login/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
