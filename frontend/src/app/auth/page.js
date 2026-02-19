"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import MedicalOrbitBackground from "@/components/MedicalOrbitBackground";
import Ribbons from "@/components/Ribbons";

export default function AuthPage() {
  const [step, setStep] = useState("aadhar"); // aadhar | otp
  const [aadhar, setAadhar] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const cardRef = useRef(null);

  /* =========================
     GSAP – PAGE ENTRY
  ========================= */
  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out",
      }
    );
  }, []);

  const sendOTP = async (e) => {
    e.preventDefault();
    if (aadhar.length !== 12) {
      alert('Please enter valid 12-digit Aadhar number');
      return;
    }
    setLoading(true);

    try {
      // Use last 10 digits of Aadhar as mobile number for OTP
      const mobile = aadhar.slice(-10);
      
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: mobile, language: 'ta' })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(`OTP sent! Your OTP is: ${data.otp}`);
        setStep("otp");
      } else {
        alert(data.error || 'Failed to send OTP');
      }
    } catch (error) {
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     BACKEND – VERIFY OTP
  ========================= */
  const verifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert('Please enter 6-digit OTP');
      return;
    }
    setLoading(true);

    try {
      const mobile = aadhar.slice(-10);
      
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mobile: mobile, 
          otp: otp,
          name: 'User',
          language: 'ta' 
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = "/dashboard";
      } else {
        alert(data.error || 'Invalid OTP');
        setLoading(false);
      }
    } catch (error) {
      alert('Error connecting to server');
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Cursor Trail Effect */}
      <Ribbons 
        colors={['#16a34a', '#059669']} 
        baseThickness={15}
        speedMultiplier={0.6}
        maxAge={400}
        pointCount={35}
        enableFade={true}
      />
      
      <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none overflow-hidden">
        <MedicalOrbitBackground />
      </div>

      <div className="relative z-10 min-h-screen grid grid-cols-1 md:grid-cols-2 items-center">
        <motion.div
          ref={cardRef}
          className="mx-auto w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 ml-8 md:ml-16"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-700 mb-1">
            Access healthcare anytime, anywhere
          </p>

          <p className="text-gray-600 font-bold mb-6 font-tamil text-sm">
            எப்போது வேண்டுமானாலும், எங்கு வேண்டுமானாலும் தரமான சுகாதார சேவைகளை அணுகுங்கள்
          </p>

          {/* FORM AREA */}
          <AnimatePresence mode="wait">
            {step === "aadhar" && (
              <motion.form
                key="aadhar"
                onSubmit={sendOTP}
                noValidate
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="border border-gray-300 rounded-xl p-3">
                  <label className="block text-sm font-medium mb-1">
                    Aadhar Number
                  </label>
                  <p className="text-xs font-bold text-gray-600 mb-2 font-tamil">
                    ஆதார் எண்
                  </p>
                  <input
                    type="text"
                    value={aadhar}
                    onChange={(e) => setAadhar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    placeholder="Enter 12-digit Aadhar number"
                    maxLength="12"
                    className="w-full px-3 py-2 outline-none bg-transparent"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl text-white font-semibold ${
                    loading
                      ? "bg-green-400"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </motion.button>

                <div className="text-center mt-4">
                  <a href="/privacy-policy" className="text-xs text-gray-500 hover:text-green-600 underline">
                    Privacy Policy
                  </a>
                </div>
              </motion.form>
            )}

            {step === "otp" && (
              <motion.form
                key="otp"
                onSubmit={verifyOTP}
                noValidate
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="border border-gray-300 rounded-xl p-3">
                  <label className="block text-sm font-medium mb-1">
                    Enter OTP
                  </label>
                  <p className="text-xs font-bold text-gray-600 mb-2 font-tamil">
                    OTP எண்ணை உள்ளிடவும்
                  </p>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="6-digit OTP"
                    className="w-full px-3 py-2 outline-none bg-transparent"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl text-white font-semibold ${
                    loading
                      ? "bg-green-400"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
        <div className="hidden md:block"></div>
      </div>
    </main>
  );
}
