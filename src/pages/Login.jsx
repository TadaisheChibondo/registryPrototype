import React, { useState } from "react";
import { Lock, Mail, Shield, ArrowRight } from "lucide-react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // EDMS Demo routing logic
    if (email.toLowerCase().includes("admin")) {
      onLogin({
        name: "System Admin",
        role: "admin",
        department: "Ministry HQ & Registry",
      });
    } else if (
      email.toLowerCase().includes("desk") ||
      email.toLowerCase().includes("dept")
    ) {
      // Routes to the Department Inbox to demonstrate read-receipts
      onLogin({
        name: "IT Director",
        role: "department",
        department: "Central Computing",
      });
    } else {
      setError(
        'Invalid credentials. For this demo, use an email containing "admin" or "dept".',
      );
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

          <form onSubmit={handleLogin} className="space-y-5">
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
        </div>

        {/* Demo Helpers */}
        <div className="bg-slate-50 p-6 border-t border-slate-100">
          <p className="text-xs text-slate-500 text-center font-semibold uppercase tracking-wider mb-3">
            Quick Login (Demo Only)
          </p>
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
        </div>
      </div>
    </div>
  );
}
