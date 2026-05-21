"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock, Calendar } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.birthday) newErrors.birthday = "Birthday is required";
    if (!formData.gender) newErrors.gender = "Please select a gender";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
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
          <span className="text-sm text-[#65676B]">Already have an account?</span>
          <Link href="/login" className="border border-[#1877F2] text-[#1877F2] hover:bg-[#E7F3FF] font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
            Log In
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-3xl">S</span>
              </div>
              <span className="text-[#1877F2] font-bold text-4xl">SocialConnect</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#050505] leading-tight mb-4">
              Join millions of people sharing their world.
            </h1>
            <p className="text-lg text-[#65676B] leading-relaxed mb-8">
              Create your free account and start connecting with friends, family, and communities that matter to you.
            </p>
            <div className="flex flex-col gap-4 max-w-sm mx-auto lg:mx-0">
              {[
                { emoji: "👥", title: "Connect with Friends", desc: "Find and reconnect with people you know" },
                { emoji: "📸", title: "Share Your Moments", desc: "Post photos, videos, and life updates" },
                { emoji: "💬", title: "Real-time Messaging", desc: "Chat instantly with anyone, anywhere" },
                { emoji: "🔔", title: "Stay Updated", desc: "Never miss important moments from your network" },
              ].map((feature) => (
                <div key={feature.title} className="flex items-center gap-3">
                  <span className="text-2xl">{feature.emoji}</span>
                  <div>
                    <p className="font-semibold text-[#050505] text-sm">{feature.title}</p>
                    <p className="text-xs text-[#65676B]">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-[#050505]">Create Account</h2>
                <div className="flex gap-1">
                  <div className={"w-8 h-1.5 rounded-full " + (step >= 1 ? "bg-[#1877F2]" : "bg-gray-200")} />
                  <div className={"w-8 h-1.5 rounded-full " + (step >= 2 ? "bg-[#1877F2]" : "bg-gray-200")} />
                </div>
              </div>
              <p className="text-[#65676B] text-sm mb-6">
                {step === 1 ? "Step 1 of 2 — Basic information" : "Step 2 of 2 — Security & details"}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {step === 1 && (
                  <>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[#050505] mb-1.5">First Name</label>
                        <div className="relative">
                          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B]" />
                          <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First name"
                            className={"w-full bg-[#F0F2F5] border rounded-xl py-3 pl-9 pr-4 text-sm text-[#050505] placeholder-[#65676B] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all " + (errors.firstName ? "border-red-400" : "border-[#CED0D4]")}
                          />
                        </div>
                        {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[#050505] mb-1.5">Last Name</label>
                        <input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last name"
                          className={"w-full bg-[#F0F2F5] border rounded-xl py-3 px-4 text-sm text-[#050505] placeholder-[#65676B] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all " + (errors.lastName ? "border-red-400" : "border-[#CED0D4]")}
                        />
                        {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#050505] mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B]" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className={"w-full bg-[#F0F2F5] border rounded-xl py-3 pl-10 pr-4 text-sm text-[#050505] placeholder-[#65676B] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all " + (errors.email ? "border-red-400" : "border-[#CED0D4]")}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold py-3 rounded-xl text-base transition-colors mt-2"
                    >
                      Continue
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#050505] mb-1.5">Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B]" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a strong password"
                          className={"w-full bg-[#F0F2F5] border rounded-xl py-3 pl-10 pr-12 text-sm text-[#050505] placeholder-[#65676B] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all " + (errors.password ? "border-red-400" : "border-[#CED0D4]")}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65676B]">
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#050505] mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B]" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className={"w-full bg-[#F0F2F5] border rounded-xl py-3 pl-10 pr-4 text-sm text-[#050505] placeholder-[#65676B] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all " + (errors.confirmPassword ? "border-red-400" : "border-[#CED0D4]")}
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#050505] mb-1.5">Birthday</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B]" />
                        <input
                          type="date"
                          name="birthday"
                          value={formData.birthday}
                          onChange={handleChange}
                          className={"w-full bg-[#F0F2F5] border rounded-xl py-3 pl-10 pr-4 text-sm text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all " + (errors.birthday ? "border-red-400" : "border-[#CED0D4]")}
                        />
                      </div>
                      {errors.birthday && <p className="text-xs text-red-500 mt-1">{errors.birthday}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#050505] mb-1.5">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={"w-full bg-[#F0F2F5] border rounded-xl py-3 px-4 text-sm text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all " + (errors.gender ? "border-red-400" : "border-[#CED0D4]")}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="custom">Custom</option>
                        <option value="prefer-not">Prefer not to say</option>
                      </select>
                      {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
                    </div>

                    <p className="text-xs text-[#65676B]">
                      By clicking Sign Up, you agree to our{" "}
                      <button type="button" className="text-[#1877F2] hover:underline">Terms</button>,{" "}
                      <button type="button" className="text-[#1877F2] hover:underline">Privacy Policy</button> and{" "}
                      <button type="button" className="text-[#1877F2] hover:underline">Cookies Policy</button>.
                    </p>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 border border-gray-300 text-[#050505] font-semibold py-3 rounded-xl text-sm hover:bg-[#F0F2F5] transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-[#42B72A] hover:bg-[#36a420] disabled:bg-[#BCC0C4] text-white font-bold py-3 rounded-xl text-sm transition-colors"
                      >
                        {loading ? "Creating..." : "Sign Up"}
                      </button>
                    </div>
                  </>
                )}
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-[#65676B]">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#1877F2] font-semibold hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
