"use client";

import Link from "next/link";
import { Home, Users, MessageCircle, Bell, Bookmark, Settings, ChevronRight, ShoppingBag } from 'lucide-react';
import Avatar from "../ui/Avatar";
import { currentUser } from "../../lib/mockData";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/friends", icon: Users, label: "Friends" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
  { href: "/saved", icon: Bookmark, label: "Saved" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function LeftSidebar() {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-72 bg-[#F0F2F5] px-2 py-4 overflow-y-auto z-40">
      {/* Profile Link */}
      <Link
        href="/profile"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E4E6EB] transition-colors mb-1"
      >
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
        <span className="font-semibold text-[#050505] text-sm">{currentUser.name}</span>
      </Link>

      {/* Nav Items */}
      <nav className="flex flex-col gap-0.5">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E4E6EB] transition-colors group"
          >
            <div className="w-9 h-9 bg-[#E4E6EB] group-hover:bg-[#D8DADF] rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
              <Icon size={20} className="text-[#050505]" />
            </div>
            <span className="font-medium text-[#050505] text-sm">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-300 my-3 mx-3" />

      {/* See More */}
      <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E4E6EB] transition-colors w-full">
        <div className="w-9 h-9 bg-[#E4E6EB] rounded-full flex items-center justify-center flex-shrink-0">
          <ChevronRight size={20} className="text-[#050505]" />
        </div>
        <span className="font-medium text-[#050505] text-sm">See More</span>
      </button>

      {/* Footer */}
      <div className="mt-auto px-3 pt-4">
        <p className="text-xs text-[#65676B] leading-relaxed">
          Privacy · Terms · Advertising · Cookies · More · SocialConnect © 2024
        </p>
      </div>
    </aside>
  );
}
