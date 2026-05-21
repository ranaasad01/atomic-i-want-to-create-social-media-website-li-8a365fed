"use client";

import Link from "next/link";
import { Home, Users, MessageCircle, Bell, Image, Settings, Bookmark, Clock, ChevronDown } from 'lucide-react';
import Avatar from "../ui/Avatar";
import { currentUser } from "../../lib/mockData";

const navItems = [
  { href: "/", icon: Home, label: "Home", active: true },
  { href: "/friends", icon: Users, label: "Friends" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/photos", icon: Image, label: "Photos" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

const shortcuts = [
  { name: "Saved Posts", icon: Bookmark, href: "#" },
  { name: "Memories", icon: Clock, href: "#" },
];

export default function LeftSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-72 fixed left-0 top-14 h-[calc(100vh-56px)] overflow-y-auto py-4 px-2 gap-1">
      {/* Profile Link */}
      <Link
        href={"/profile/" + currentUser.id}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E4E6EB] transition-colors"
      >
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
        <span className="font-semibold text-[#050505] text-sm">{currentUser.name}</span>
      </Link>

      {/* Nav Items */}
      {navItems.map((item) => (
        <Link
          key={item.href + item.label}
          href={item.href}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E4E6EB] transition-colors group"
        >
          <div className="w-9 h-9 bg-[#E4E6EB] rounded-full flex items-center justify-center group-hover:bg-[#D8DADF] transition-colors">
            <item.icon size={20} className="text-[#050505]" />
          </div>
          <span className="font-medium text-[#050505] text-sm">{item.label}</span>
        </Link>
      ))}

      <div className="border-t border-gray-200 my-2" />

      {/* Your Shortcuts */}
      <p className="px-3 text-[#65676B] font-semibold text-sm mb-1">Your Shortcuts</p>
      {shortcuts.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E4E6EB] transition-colors group"
        >
          <div className="w-9 h-9 bg-[#E4E6EB] rounded-full flex items-center justify-center group-hover:bg-[#D8DADF] transition-colors">
            <item.icon size={20} className="text-[#050505]" />
          </div>
          <span className="font-medium text-[#050505] text-sm">{item.name}</span>
        </Link>
      ))}

      <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E4E6EB] transition-colors w-full text-left">
        <div className="w-9 h-9 bg-[#E4E6EB] rounded-full flex items-center justify-center">
          <ChevronDown size={20} className="text-[#050505]" />
        </div>
        <span className="font-medium text-[#050505] text-sm">See more</span>
      </button>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <p className="px-3 text-xs text-[#65676B]">
          Privacy · Terms · Advertising · Cookies · More · SocialConnect © 2024
        </p>
      </div>
    </aside>
  );
}
