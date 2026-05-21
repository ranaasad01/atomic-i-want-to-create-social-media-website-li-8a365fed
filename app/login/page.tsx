"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-[#1877F2] font-bold text-xl">SocialConnect</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#65676B]">Don&apos;t have an account?</span>
          <Link href="/register" className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side - Branding */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-3xl">S</span>
              </div>
              <span className="text-[#1877F2] font-bold text-4xl">SocialConnect</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#050505] leading-tight mb-4">
              Connect with friends and the world around you.
            </h1>
            <p className="text-lg text-[#65676B] leading-relaxed">
              Share moments, discover stories, and stay connected with the people who matter most to you.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#1877F2]">2B+</p>
                <p className="text-xs text-[#65676B]">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#1877F2]">180+</p>
                <p className="text-xs text-[#65676B]">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#1877F2]">100M+</p>
                <p className="text-xs text-[#65676B]">Posts Daily</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#050505] mb-2">Welcome back</h2>
              <p className="text-[#65676B] text-sm mb-6">Sign in to your account to continue</p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#050505] mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-[#F0F2F5] border border-[#CED0D4] rounded-xl py-3 pl-10 pr-4 text-[#050505] placeholder-[#65676B] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#050505] mb-1.5">Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-[#F0F2F5] border border-[#CED0D4] rounded-xl py-3 pl-10 pr-12 text-[#050505] placeholder-[#65676B] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65676B] hover:text-[#050505] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded accent-[#1877F2]" />
                    <span className="text-sm text-[#65676B]">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-[#1877F2] hover:underline font-medium">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1877F2] hover:bg-[#166FE5] disabled:bg-[#BCC0C4] text-white font-bold py-3 rounded-xl text-base transition-colors disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in..." : "Log In"}
                </button>
              </form>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-[#65676B]">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 hover:bg-[#F0F2F5] transition-colors text-sm font-semibold text-[#050505]">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#65676B]">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-[#1877F2] font-semibold hover:underline">
                    Sign up for free
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {["Privacy", "Terms", "Advertising", "Cookies", "More"].map((item) => (
            <button key={item} className="text-xs text-[#65676B] hover:underline">{item}</button>
          ))}
          <span className="text-xs text-[#65676B]">SocialConnect © 2024</span>
        </div>
      </footer>
    </div>
  );
}
