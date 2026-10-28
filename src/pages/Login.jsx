import React, { useState } from "react";
import {
  Lock,
  Mail,
  Shield,
  ArrowRight,
  KeyRound,
  ArrowLeft,
} from "lucide-react";

export default function Login({ onLogin }) {
  // Login Steps: 'CREDENTIALS' -> '2FA'
  const [step, setStep] = useState("CREDENTIALS");
  const [pendingUser, setPendingUser] = useState(null);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [expectedOtp, setExpectedOtp] = useState("");
  const [error, setError] = useState("");

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();

    // EDMS Demo routing logic
    let userContext = null;
    if (email.toLowerCase().includes("admin")) {
      userContext = {
        name: "System Admin",
        role: "admin",
        department: "Ministry HQ & Registry",
      };
    } else if (
      email.toLowerCase().includes("desk") ||
      email.toLowerCase().includes("dept")
    ) {
      // Routes to the Department Inbox to demonstrate read-receipts
      userContext = {
        name: "IT Director",
        role: "department",
        department: "Central Computing",
      };
    } else {
      setError(
        'Invalid credentials. For this demo, use an email containing "admin" or "dept".',
      );
      return;
    }

    // Success: Store user temporarily and transition to 2FA screen
    setPendingUser(userContext);
    setExpectedOtp(Math.floor(100000 + Math.random() * 900000).toString());
    setError("");
    setStep("2FA");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpCode === expectedOtp) {
      onLogin(pendingUser); // Finalize login
    } else {
      setError("Invalid 6-digit code. Please check your authenticator app.");
    }
  };

  // Quick-fill helpers for the live demo
  const fillAdmin = () => {
    setEmail("admin@ict.gov.zw");
    setPassword("demo123");
  };

  const fillDepartment = () => {
    setEmail("dept@ict.gov.zw");
    setPassword("demo123");
  };

  const fillOtp = () => {
    setOtpCode(expectedOtp);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-96 bg-blue-900 skew-y-[-6deg] origin-top-left -z-10 shadow-xl"></div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-800 p-8 text-center border-b-4 border-blue-500">
          <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Ministry of ICTPCS
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Secure Record Tracking System
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-rose-50 text-rose-700 text-sm p-3 rounded-lg mb-6 border border-rose-200">
              {error}
            </div>
          )}

          {step === "CREDENTIALS" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Official Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="e.g., name@ict.gov.zw"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Passphrase
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                Authenticate <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleOtpSubmit}
              className="space-y-5 animate-in slide-in-from-right-4"
            >
              <div className="text-center mb-6">
                <KeyRound className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                <h2 className="text-lg font-bold text-slate-800">
                  Two-Factor Authentication
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Enter the 6-digit code from your authenticator app to verify
                  your identity.
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength="6"
                  autoFocus
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(e.target.value.replace(/\D/g, ""))
                  } // Restrict to numbers
                  className="w-full text-center tracking-[0.75em] text-2xl py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition font-bold text-slate-800"
                  placeholder="000000"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep("CREDENTIALS");
                    setError("");
                    setOtpCode("");
                  }}
                  className="px-4 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  disabled={otpCode.length !== 6}
                  className="flex-1 bg-blue-600 disabled:bg-blue-400 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center shadow-md cursor-pointer"
                >
                  Verify & Login
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Demo Helpers */}
        <div className="bg-slate-50 p-6 border-t border-slate-100">
          <p className="text-xs text-slate-500 text-center font-semibold uppercase tracking-wider mb-3">
            Quick Actions (Demo Only)
          </p>

          {step === "CREDENTIALS" ? (
            <div className="flex gap-2">
              <button
                onClick={fillAdmin}
                className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition shadow-sm cursor-pointer"
              >
                Load Admin
              </button>
              <button
                onClick={fillDepartment}
                className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition shadow-sm cursor-pointer"
              >
                Load Dept Inbox
              </button>
            </div>
          ) : (
            <button
              onClick={fillOtp}
              className="w-full py-2 bg-white border border-slate-200 text-blue-600 rounded-lg text-sm font-bold hover:bg-slate-100 transition shadow-sm cursor-pointer"
            >
              Generate Test Code: {expectedOtp}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
