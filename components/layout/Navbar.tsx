"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Users, MessageCircle, Bell, Search, Menu, X, Settings, LogOut, User, ChevronDown } from 'lucide-react';
import Avatar from "../ui/Avatar";
import { currentUser } from "../../lib/mockData";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between gap-2">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/" className="flex items-center gap-1">
            <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">S</span>
            </div>
            <span className="hidden md:block text-[#1877F2] font-bold text-xl">SocialConnect</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center bg-[#F0F2F5] rounded-full px-3 py-2 gap-2 w-64">
          <Search size={16} className="text-[#65676B] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search SocialConnect"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-[#050505] placeholder-[#65676B] outline-none w-full"
          />
        </div>

        {/* Center Nav Icons */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className="flex items-center justify-center w-12 h-10 rounded-lg hover:bg-[#F0F2F5] text-[#1877F2] transition-colors" title="Home">
            <Home size={22} />
          </Link>
          <Link href="/friends" className="flex items-center justify-center w-12 h-10 rounded-lg hover:bg-[#F0F2F5] text-[#65676B] hover:text-[#050505] transition-colors" title="Friends">
            <Users size={22} />
          </Link>
          <Link href="/messages" className="relative flex items-center justify-center w-12 h-10 rounded-lg hover:bg-[#F0F2F5] text-[#65676B] hover:text-[#050505] transition-colors" title="Messages">
            <MessageCircle size={22} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">4</span>
          </Link>
          <Link href="/notifications" className="relative flex items-center justify-center w-12 h-10 rounded-lg hover:bg-[#F0F2F5] text-[#65676B] hover:text-[#050505] transition-colors" title="Notifications">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <Link href="/search" className="sm:hidden flex items-center justify-center w-9 h-9 bg-[#F0F2F5] rounded-full hover:bg-[#E4E6EB] transition-colors">
            <Search size={18} className="text-[#050505]" />
          </Link>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1.5 hover:bg-[#F0F2F5] rounded-full p-1 transition-colors"
            >
              <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
              <ChevronDown size={14} className="text-[#65676B] hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                <Link
                  href={"/profile/" + currentUser.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#F0F2F5] transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Avatar src={currentUser.avatar} alt={currentUser.name} size="lg" />
                  <div>
                    <p className="font-semibold text-[#050505]">{currentUser.name}</p>
                    <p className="text-xs text-[#65676B]">View your profile</p>
                  </div>
                </Link>
                <div className="border-t border-gray-100 my-2" />
                <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F0F2F5] transition-colors text-sm" onClick={() => setShowProfileMenu(false)}>
                  <div className="w-8 h-8 bg-[#E4E6EB] rounded-full flex items-center justify-center">
                    <Settings size={16} />
                  </div>
                  <span>Settings & Privacy</span>
                </Link>
                <Link href="/login" className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F0F2F5] transition-colors text-sm" onClick={() => setShowProfileMenu(false)}>
                  <div className="w-8 h-8 bg-[#E4E6EB] rounded-full flex items-center justify-center">
                    <LogOut size={16} />
                  </div>
                  <span>Log Out</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 bg-[#F0F2F5] rounded-full hover:bg-[#E4E6EB] transition-colors"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F0F2F5] text-sm font-medium" onClick={() => setShowMobileMenu(false)}>
            <Home size={20} className="text-[#1877F2]" /> Home
          </Link>
          <Link href="/friends" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F0F2F5] text-sm font-medium" onClick={() => setShowMobileMenu(false)}>
            <Users size={20} className="text-[#1877F2]" /> Friends
          </Link>
          <Link href="/messages" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F0F2F5] text-sm font-medium" onClick={() => setShowMobileMenu(false)}>
            <MessageCircle size={20} className="text-[#1877F2]" /> Messages
          </Link>
          <Link href="/notifications" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F0F2F5] text-sm font-medium" onClick={() => setShowMobileMenu(false)}>
            <Bell size={20} className="text-[#1877F2]" /> Notifications
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F0F2F5] text-sm font-medium" onClick={() => setShowMobileMenu(false)}>
            <Settings size={20} className="text-[#1877F2]" /> Settings
          </Link>
        </div>
      )}
    </nav>
  );
}
